import { useState } from "react";
import { CourseForm } from "./CourseForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { currentUsername, useAuth } from "../auth/authProvider";
import { validateCourse } from "./courseValidator";
import { toBase64 } from "../utility/byteEncoding";
import FormErrorMessage from "../components/FormErrorMessage";


export default function CreateCourse() {
    const [formData, setFormData] = useState({});
    // const token = useAuth();
    // const creator = currentUsername(token);
    const creator = "abc";
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    return (
        <div className="mt-2 px-2 sm:w-8/12 md:w-7/12 mx-auto">
            <h2 className="text-lg leading-7 font-bold mb-5">Create New Course</h2>
            {errors.submit && 
                <FormErrorMessage
                    message={errors.submit}
                    handleErrClose={
                        () => setErrors(prevErr => ({
                            ...prevErr, "submit":""
                        }))
                    }
                />
            }
            <CourseForm 
                className="gap-y-6 divide-y-2 divider-solid divide-slate-400"
                formUseState={[formData, setFormData]}
                errorUseState={[errors, setErrors]}
                handleSubmit={handleSubmit(creator, formData, setErrors, navigate)}
            />
        </div>
    );
}


const handleSubmit = (creator, formData, setErrors, navigate) => async (event) => {
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
        navigate(`/course/${result.data.id}`, {replace: true});
    
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
