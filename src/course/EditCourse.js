import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { TbRobotOff, TbWifiOff } from "react-icons/tb";
import { ThreeCircles } from "react-loader-spinner";

import CourseNotFound from "./CourseNotFound";
import { CourseForm } from "./CourseForm";
import { singleCourseLoader } from "./courseLoader";
import { validateCourse } from "./courseValidator";
import { toBase64 } from "../utility/byteEncoding";

export function EditCourseBtn({courseId}) {
    return (
        <Link to={`/course/edit/${courseId}`}>
            <div className=" 
                    text-white backdrop-blur-md rounded-md bg-orange-500 
                    p-2 font-bold hover:bg-orange-300"
            >
                Edit
            </div>
        </Link>
    );
}

export default function CourseEdit() {
    const { id } = useParams();
    const [courseHeader, setCourseHeader] = useState();
    const [formData, setFormData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingErr, setIsLoadingErr] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await singleCourseLoader({courseId: id});
                setCourseHeader({...data});
                setFormData(data);
            } catch(error) {
                setIsLoadingErr(error);
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchData();        
    }, [id])

    if (isLoading) {
        return (
            <div className="mx-auto w-fit h-screen flex items-center">
                <ThreeCircles color="#03cffc" />
            </div>
        );
    }
    else if (isLoadingErr) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-lg md:text-[2rem] 
                            bg-gradient-to-br from-gray-300">
                {errors.name === "network" ? <TbWifiOff size={200}/> : <TbRobotOff size={200}/>}
                    <span className="pl-2">{errors.message}</span>
            </div>
        )
    } 
    else if (!courseHeader) {
        return <CourseNotFound />;
    } else {
        return (
            <CourseForm 
                className="mt-2 px-2 sm:w-8/12 md:w-7/12 mx-auto gap-y-6 
                            divide-y-2 divider-solid divide-slate-400"
                defaultValues={courseHeader}
                submitCancelBtn={<SubmitAndCancel courseId={courseHeader.id}/>}
                submitOnTop={true}
                formUseState={[formData, setFormData]}
                errorUseState={[errors, setErrors]}
                handleSubmit={handleSubmit(formData, setErrors, navigate)}
            >
                <div className="mt-2 sm:w-8/12 md:w-7/12 mx-auto h-[50rem] bg-gray-200 flex items-center">
                    <div className="w-fit px-2 bg-gray-500 text-xl font-bold text-white mx-auto">
                        Contents here?
                    </div>
                </div>
            </CourseForm>
        );
    }
}


function SubmitAndCancel({courseId}) {
    const navigate  = useNavigate();

    const handleCancel = () => {
        navigate(`/course/detail/${courseId}`);
    }

    return (
        <div className="
                sticky top-0 w-screen text-white bg-slate-800/90
                flex flex-col gap-2 py-2 sm:flex-row justify-center place-items-center"
            >
            <p className="mx-2 text-md sm:text-lg">
                Hit &#128293;<strong>Save</strong>&#128293; when you have done editing
            </p>
            <div>
                <button
                    onClick={handleCancel}
                    className="mr-2 bg-orange-500 hover:bg-orange-400/50 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        Cancel
                </button>
    
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-500/70 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        &#128293;Save&#128293;
                </button>
            </div>                        
        </div>
    );
}

const handleSubmit = (formData, setErrors, navigate) => async (event) => {
    event.preventDefault();
    let _error = "";
    let _name = "";
    for (const name in formData) {
        const err = validateCourse(name, formData[name]);
        if (err) {
            _name = name;
            _error = err;
        }
    }

    if (_error) {
        setErrors(prevErr => ({
            ...prevErr, [_name]: _error
        }))
        return;
    }
    try {
        const encodedImage = await toBase64(formData.picture);
        const result = await axios.put(
            `${process.env.REACT_APP_COURSE_BE}/course/edit`,
            {
                id: formData.id,
                title: formData.title,
                description: formData.description,
                creator: formData.creator,
                picture: encodedImage,
                price: parseFloat(formData.price)
            }
        )
        navigate(`/course/detail/${result.data.id}`, {replace: true});   
    } catch(error) {
        if (error.name === "AxiosError") {
            _name = "submit"
            if (error.response) {
                if (error.response.status < 500) {  // 4xx error code
                    _error = error.response.data.description;
                }
                else {
                    _error = "Server error, please try again later";
                }
            } else if (error.request) {
                _error = "Network error, please check your internet connection"
            }
        }
        else {
            _name = "picture";
            _error = "Cannot process course image";
        }
        setErrors(prevErr => ({
            ...prevErr, [_name]: _error
        }))

    }
}

