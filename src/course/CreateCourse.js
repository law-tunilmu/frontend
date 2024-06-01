import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

import { currentUsername, useAuth } from "../auth/authProvider";
import { validateCourse } from "./utility/courseValidator";
import { toBase64 } from "../utility/byteEncoding";
import CourseForm from "./components/CourseForm";

export default function CreateCourse() {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    
    const { token } = useAuth();
    const creator = currentUsername(token);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/", {replace: true});
    }

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
            const result = await axios.post(
                `${process.env.REACT_APP_COURSE_BE}/course/create`,
                {
                    title: formData.title,
                    description: formData.description,
                    creator: creator,
                    picture: encodedImage,
                    price: parseFloat(formData.price)
                }
            )
            navigate(`/course/detail/${result.data.id}`, {replace: true});
            toast("A new course has been created", {
                position: "top-right",
                type: "success",
                pauseOnHover: false,
                autoClose: 4000
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
                    message = "Network error, please check your internet connection"
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
        <>
            <h2 className="text-lg leading-7 font-bold mb-5">Create New Course</h2>
            <CourseForm 
                    className="gap-y-6 divide-y-2 divider-solid divide-slate-400"
                    formUseState={[formData, setFormData]}
                    errorUseState={[formErrors, setFormErrors]}
                    handleSubmit={handleSubmit}
            >
                <div className="inline-flex w-full h-fit justify-end font-semibold gap-2 mb-5">
                    <button
                        onClick={handleCancel}
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
        </>
    );
}
