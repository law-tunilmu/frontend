import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// import { currentUsername, useAuth } from "../auth/authProvider";
import { validateCourse } from "./utility/courseValidator";
import { toBase64 } from "../utility/byteEncoding";
import CourseForm from "./components/CourseForm";
import { SubmitLoader } from "./components/LoaderPages";

export default function CreateCourse() {
    const [formData, setFormData] = useState({});
    // const token = useAuth();
    // const creator = currentUsername(token);
    const creator = "abc";
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <SubmitLoader isLoading={isSubmitting}>
                <h2 className="text-lg leading-7 font-bold mb-5">Create New Course</h2>
                <CourseForm 
                    className="gap-y-6 divide-y-2 divider-solid divide-slate-400"
                    formUseState={[formData, setFormData]}
                    errorUseState={[errors, setErrors]}
                    handleSubmit={handleSubmit(creator, formData, setErrors, setIsSubmitting, navigate)}
                />
            </SubmitLoader>
        </>
    );
}


const handleSubmit = (creator, formData, setErrors, setIsSubmmitting, navigate) => async (event) => {
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
        console.log("aa");
        setIsSubmmitting(true);
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
        setIsSubmmitting(false);
    }
}
