import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import CourseForm from "./components/CourseForm";
import { singleCourseLoader } from "./utility/courseLoader";
import { validateCourse } from "./utility/courseValidator";
import { toBase64 } from "../utility/byteEncoding";
import { FetchLoader } from "./components/LoaderPages";
import { ErrorFetch } from "./components/ErrorPages";
import { Bounce, toast } from "react-toastify";

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
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState();

    const [formData, setFormData] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await singleCourseLoader({courseId: id});
                setCourseHeader({...data});
                setFormData(data);
            } catch(error) {
                setFetchError(error);
            } finally {
                setIsFetching(false);
            }
        }
    
        fetchData();        
    }, [id])
    return (
        <FetchLoader isLoading={isFetching}>
            <ErrorFetch errors={fetchError}>
                {
                    courseHeader && 
                    <CourseForm 
                        className="divide-y-2 divider-solid divide-slate-400"
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
                }
            </ErrorFetch>
        </FetchLoader>
    );
}


function SubmitAndCancel({courseId}) {
    const navigate  = useNavigate();

    const handleCancel = () => {
        navigate(`/course/detail/${courseId}`);
    }

    return (
        <div className="
                sticky top-0 text-white bg-slate-800/90 z-[90]
                flex flex-col gap-2 py-2 
                sm:flex-row justify-center place-items-center"
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
        toast("Course has been updated", {
            type: "info"
        });  
    } catch(error) {
        let message = "";
        if (error.name === "AxiosError") {
            if (error.response) {
                if (error.response.status < 500) {  // 4xx error code
                    message = error.response.data.description;
                }
                else {
                    message = "Server error, please try again later";
                }
            } else if (error.request) {
                message = "Network Error, please check your internet connection"
            }
        }
        else {
            message = "Cannot process course image";
        }
        toast(message, {
            type: "error",
            autoClose: false,
            hideProgressBar: true,
        });

    }
}

