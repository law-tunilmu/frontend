import { useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { validateCourse } from "../utility/courseValidator";

import courseFallback from "../../images/courseFallback.png"


const EMPTY_COUSE = {
    "title": "",
    "picture": "",
    "description": "",
    "price": 0.0
}

export default function CourseForm({ 
        children, className="", defaultValues=EMPTY_COUSE,
        formUseState, errorUseState, handleSubmit
    }) {
    
    const [formData, setFormData] = formUseState;
    const [errors, setErrors] = errorUseState;

    // reset picture input
    const [ pictKey, setPictKey ] = useState(null);

    const handleReset = (htmlName) => {
        return () => {
            let defaultValue = null;
            if (htmlName !== "picture") {
                defaultValue = defaultValues[htmlName]; 
            } else {
                setPictKey(Date.now());
            }
            setFormData(prev => ({
                ...prev,
                [htmlName]: defaultValue
            }));
            setErrors(prev => ({
                    ...prev,
                    [htmlName]: ""
                })
            );
        }
    }
    
    const handleChange = (e) => {
        const { name } = e.target;
        let { value } = e.target;
        if (name === "picture") {
            value = e.target.files[0];
        }
        const error = validateCourse(name, value);
        
        setErrors(prev => ({
            ...prev, 
            [name]: error
        }));
        

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <form action="" method="post" onSubmit={handleSubmit} className="relative">
            <div className={`${className} flex flex-col`}>
                <div className="grid grid-cols gap-y-2">
                    <label htmlFor="title" className="font-bold text-md">Title</label>
                    <textarea
                        name="title"
                        className="break-words"
                        rows={3}
                        placeholder="Write your awesome title here"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500 font-semibold">{errors.title}</p>}
                    <ResetBtn htmlName="Title" onClick={handleReset("title")} />
                </div>

                <div className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="picture" className="font-semibold text-md">Course Picture</label>
                        <p className="text-gray-500 text-xs font-semibold italic">
                            Put the most iconic picture for your course
                        </p>
                    </div>
                    <div className="h-fit w-fit mx-auto">
                        <img 
                            src={
                                (formData.picture && URL.createObjectURL(formData.picture)) || 
                                defaultValues.picture_url || courseFallback
                            } 
                            className="object-cover max-h-64 sm:max-h-80 md:max-h-96"
                            alt=""
                        />
                        {errors.picture && <p className="text-red-500 font-semibold">{errors.picture}</p>}
                    </div>
                    <div className="w-full px-2 flex flex-row">
                        <ResetBtn htmlName="Pic" onClick={handleReset("picture")} className="mr-2 flex-0 text-nowrap"/>
                        <input 
                            name="picture" type="file" onChange={handleChange} accept="image/*"
                            key={pictKey}
                            className=" w-full sm:w-fit file:border-0 file:bg-blue-500 file:rounded-md file:p-2
                                        file:text-white file:font-semibold file:text-sm sm:file:text-md
                                        hover:file:cursor-pointer hover:file:bg-blue-500/60"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols gap-y-2">
                    <label htmlFor="description" className="font-bold text-md">Desription</label>
                    <textarea
                        name="description"
                        className="break-words"
                        rows={8}
                        placeholder="Give a short description for your course"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <p className="text-red-500 font-semibold">{errors.description}</p>}
                    <ResetBtn htmlName="Description" onClick={handleReset("description")} />
                </div>

                <div className="grid grid-cols">
                    <label htmlFor="price" className="block font-bold text-md">
                        Price
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm flex flex-row gap-4">
                        <div className="w-fit">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                                <span className="text-gray-600 sm:text-sm font-bold">$</span>
                            </div>
                            <input
                                type="number"
                                name="price"
                                min={0}
                                className="
                                    block rounded-md border-0 py-1.5 pl-7 pr-3 left-3 w-80
                                    text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 
                                    focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={formData.price}
                                onChange={handleChange}
                                step={0.01}
                            />
                        </div>
                        <button type="button" onClick={handleReset("price")}><FaClockRotateLeft/></button>
                    </div>
                    {errors.price && <p className="text-red-500 font-semibold">{errors.price}</p>}
                </div>
            </div>
            
            {children}

        </form>
    );
}

function ResetBtn({htmlName, onClick, className=""}) {
    return (
        <button 
            type="button"
            className={`
                ${className} justify-self-end bg-gray-500 hover:bg-gray-500/50 py-2 px-4 
                text-sm sm:text-md font-bold text-white rounded w-fit
                focus:outline-none focus:shadow-outline`}
            onClick={onClick}
        >
            {`Reset ${htmlName}`}
        </button>
    );
}
