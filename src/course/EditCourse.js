import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import COURSE_CONST from "./CourseConstants";

export function EditCourseBtn({courseId}) {
    return (
        <Link to={`/course/${courseId}/edit`}>
            <div className=" 
                    text-white backdrop-blur-md rounded-md bg-orange-500 
                    p-2 font-bold hover:bg-orange-500/50"
            >
                Edit
            </div>
        </Link>
    );
}

export default function CourseEdit() {
    const courseHeader = useLoaderData();

    const [ formData, setFormData ] = useState({
        "title": courseHeader.title,
        "picture": null,
        "description": courseHeader.description,
        "price": courseHeader.price 
    });

    const [ errors, setError ] = useState({
        "title": "",
        "picture": "",
        "description": "",
        "price": ""
    });

    const handleReset = (htmlName) => {
        return () => {
            let defaultValue = null;
            if (htmlName !== "picture") {
                defaultValue = courseHeader[htmlName]; 
            }
            setFormData(prev => ({
                ...prev,
                [htmlName]: defaultValue
            }));
            setError(prev => ({
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
        const error = validateInput(name, value);
        
        setError(prev => ({
            ...prev, 
            [name]: error
        }));

        if (!error) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    
    if (!courseHeader) {
        <CourseNotFoundPage />
    }
    else {
        return (
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="bg-slate-800/90 sticky top-0 w-screen">
                    <SubmitAndCancel courseId={courseHeader.id} />
                </div>
                <div className="sm:w-8/12 md:w-7/12 mx-auto divide-y-2 divider-solid divide-slate-400">
                    <div className="flex flex-col">
                        <div className="h-fit w-full sm:w-7/12 md:w-6/12 sm:mx-auto">
                            <img 
                                src={
                                    (formData.picture && URL.createObjectURL(formData.picture)) || 
                                    courseHeader.picture_url
                                } 
                                className="object-scale-down h-64 sm:h-80"
                            />
                            {errors.picture && <p className="text-red-500 font-semibold">{errors.picture}</p>}
                        </div>
                        <div className="self-end flex flex-col gap-2 w-fit">
                            <input 
                                name="picture" type="file" onChange={handleChange} accept="image/*" 
                                className=" file:border-0 file:bg-indigo-500 file:rounded-md file:p-2
                                            grid grid-col-1 
                                            file:text-white file:font-semibold file:text-sm sm:file:text-md
                                            hover:file:cursor-pointer hover:file:bg-indigo-500/60"
                            />
                            <button 
                                className="
                                    bg-gray-500 hover:bg-gray-500/50 py-2 px-4 
                                    text-sm sm:text-md font-bold text-white rounded w-fit
                                    focus:outline-none focus:shadow-outline"
                                onClick={handleReset("picture")}
                            >
                                Reset Pic
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 w-11/12 mx-auto gap-y-[4rem] divider-solid divide-slate-400 divide-y-2">

                        <div className="grid grid-cols gap-y-2">
                            <label htmlFor="title" className="font-bold text-md">Title</label>
                            <textarea
                                name="title"
                                className="break-words"
                                rows={3}
                                value={formData.title}
                                onChange={handleChange}
                            />
                            {errors.title && <p className="text-red-500 font-semibold">{errors.title}</p>}

                            <button 
                                className="
                                    justify-self-end bg-gray-500 hover:bg-gray-500/50 py-2 px-4 
                                    text-sm sm:text-md font-bold text-white rounded w-fit
                                    focus:outline-none focus:shadow-outline"
                                onClick={handleReset("title")}
                            >
                                Reset Title
                            </button>
                        </div>
                        <div className="grid grid-cols gap-y-2">
                            <label htmlFor="description" className="font-bold text-md">Desription</label>
                            <textarea
                                name="description"
                                className="break-words"
                                rows={8}
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && <p className="text-red-500 font-semibold">{errors.description}</p>}

                            <button 
                                className="
                                    justify-self-end bg-gray-500 hover:bg-gray-500/50 py-2 px-4 
                                    text-sm sm:text-md font-bold text-white rounded w-fit
                                    focus:outline-none focus:shadow-outline"
                                onClick={handleReset("description")}
                            >
                                Reset Desc
                            </button>

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
                                            block rounded-md border-0 py-1.5 pl-7 pr-3 left-3 
                                            text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 
                                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.price}
                                        onChange={handleChange}
                                        step={0.01}
                                    />
                                </div>
                                <button onClick={handleReset("price")}><FaClockRotateLeft/></button>
                            </div>
                            {errors.price && <p className="text-red-500 font-semibold">{errors.price}</p>}
                        </div>
                        
                        <div className="mt-2 flex items-center bg-gray-200 w-full h-[50rem]">
                            <div className="w-fit px-2 bg-gray-500 text-xl font-bold text-white mx-auto">
                                Contents here?
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function SubmitAndCancel({courseId}) {
    const navigate  = useNavigate();

    const handleCancel = () => {
        navigate(`/course/${courseId}`);
    }

    return (
        <div className="
                w-full sm:w-8/12 md:w-7/12 mx-auto p-2 text-white
                flex flex-col sm:flex-row justify-center items-center">
            <p className="py-2 mx-2 text-md sm:text-lg">
                Hit &#128293;<strong>Save</strong>&#128293; when you have done editing
            </p>
            <div>
                <button
                    type="submit"
                    className="mr-2 bg-indigo-500 hover:bg-indigo-500/70 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        &#128293;Save&#128293;
                </button>
                
                <button
                    onClick={handleCancel}
                    className="bg-orange-500 hover:bg-orange-400/50 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        Cancel
                </button>
            </div>                        
        </div>
    );
}

function CourseNotFoundPage() {
    return (
        <div className="flex flex-rows justify-center h-screen items-center">
            <div className="w-fit h-fit p-2 bg-gray-200 mx-auto">
                <p className="font-bold text-md sm:text-xl text-gray-600">Oops! course is not found</p>
            </div>
        </div>
    );
}

const validateInput = (name, value) => {
    let error = "";
    const titleName = name[0].toUpperCase() + name.substring(1);
    if (value) {
        switch (name) {    
            case "title":
                if (value.length > COURSE_CONST.MAX_TITLE) {
                    error = `${titleName} must be less than ${COURSE_CONST.MAX_TITLE} characters`;
                }
                break;
    
            case "description":
                if (value.length > COURSE_CONST.MAX_DESC) {
                    error = `${titleName} must be less than ${COURSE_CONST.MAX_DESC} characters`;
                }
                break;
            case "price":
                if (!(parseFloat(value))) {
                    error = `${titleName} must be a valid number`;
                }
                else if(parseFloat(value) < 0) {
                    error = `${titleName} must be positive or zero`;
                }
                break;
            case "picture":
                const file = value;
                if (file && file.size > COURSE_CONST.MAX_PIC_SIZE*1_000_000) {
                    error = `${titleName} is larger than ${COURSE_CONST.MAX_PIC_SIZE}MB`;
                }
                else {
                    const parts = file.name.split(".");
                    const ext = parts[parts.length - 1].toLowerCase();
            
                    if (ext && !(COURSE_CONST.PIC_EXTS.includes(ext))) {
                        error = "File is not a valid image format";   
                    }
                }
            default:
                break;
        }
    } 
    return error;
}