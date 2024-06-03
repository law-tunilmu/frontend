import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import axios from "axios";


import CourseForm from "./components/CourseForm";
import ERRORS, { ErrorFetch } from "./components/ErrorPages";
import { useAuth, currentUsername } from "../auth/authProvider";
import { singleCourseLoader } from "./utility/courseLoader";
import { validateCourse } from "./utility/courseValidator";
import { toBase64 } from "../utility/byteEncoding";
import { FetchLoader } from "./components/LoaderPages";
import { toast } from "react-toastify";

export function EditCourseBtn({courseId, className=""}) {
    return (
        <button className={` 
                text-white backdrop-blur-md rounded-md bg-teal-500 
                p-2 font-bold hover:bg-teal-800 ${className}`}
        >
            <Link to={`/course/edit/${courseId}`}>Edit</Link>
        </button>
    );
}

export default function CourseEdit() {
    const { id } = useParams();
    const [courseHeader, setCourseHeader] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState();

    const [formData, setFormData] = useState();
    const [formErrors, setFormErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await singleCourseLoader({courseId: id});
                const creator = currentUsername(token);
                if (creator === data.creator) {
                    setCourseHeader({...data});
                    setFormData(data);
                } else {
                    setFetchError({
                        name: ERRORS.AUTH,
                        message: "You do not have permission to edit the course"
                    })
                }
            } catch(error) {
                setFetchError(error);
            } finally {
                setIsFetching(false);
            }
        }
    
        fetchData();        
    }, [id, token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;
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
            setFormErrors(prevErr => ({
                ...prevErr, [_name]: _error
            }))
            return;
        }

        try {
            setIsSubmitting(true);
            let encodedImage = "";
            if (formData.picture) {
                encodedImage = await toBase64(formData.picture);
            }
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
                position: "top-right",
                type: "success",
                pauseOnHover: false,
                autoClose: 4000
            });

        } catch(error) {
            let message = "";
            if (error.name === "AxiosError") {
                if (error.response) {
                    if (error.response.data && error.response.data.detail) {
                        message = error.response.data.detail;
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
    
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <FetchLoader isLoading={isFetching}>
            <ErrorFetch errors={fetchError}>
                {
                    courseHeader && 
                    <CourseForm 
                        className="divide-y-2 divider-solid divide-slate-400 gap-5"
                        defaultValues={courseHeader}
                        formUseState={[formData, setFormData]}
                        errorUseState={[formErrors, setFormErrors]}
                        handleSubmit={handleSubmit}
                    >
                        <div className="inline-flex w-full h-fit justify-end font-semibold gap-2 pb-5 mb-5 border-b-2 border-gray-500">
                            <button
                                onClick={() => navigate(`/course/detail/${id}`, {replace: true})}
                                type="reset"
                                className="bg-gray-300 
                                        py-2 px-4 rounded w-fit h-fit text-gray-800
                                        hover:bg-gray-500 hover:text-white
                                        focus:outline-none focus:shadow-outline">
                                    Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-800 
                                            py-2 px-4 rounded w-fit h-fit text-white
                                            focus:outline-none focus:shadow-outline">
                                    { 
                                        isSubmitting &&
                                            <FaCircleNotch className="animate-spin h-full w-auto min-h-5" color="white"/> 
                                    }
                                    Save
                            </button>
                        </div>
                    </CourseForm>
                }
                <div className="mt-2 sm:w-8/12 md:w-7/12 mx-auto h-[50rem] bg-gray-200 flex items-center">
                    <div className="w-fit px-2 bg-gray-500 text-xl font-bold text-white mx-auto">
                        Contents here?
                    </div>
                </div>
            </ErrorFetch>
        </FetchLoader>
    );
}
