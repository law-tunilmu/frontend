import { useState } from "react";
import { CourseForm } from "./CourseForm";

export default function CreateCourse() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    return (
        <div className="mt-2 px-2 sm:w-8/12 md:w-7/12 mx-auto">
            <h2 className="text-lg leading-7 font-bold mb-5">Create New Course</h2>
            <CourseForm 
                className="gap-y-6 divide-y-2 divider-solid divide-slate-400"
                formUseState={[formData, setFormData]}
                errorUseState={[errors, setErrors]}
            />
        </div>
    );
}
