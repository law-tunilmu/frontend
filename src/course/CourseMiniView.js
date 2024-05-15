import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Description, Dialog } from '@headlessui/react'

export function CourseMiniView({courseHeaderData, idx, isCreator=true}) {
    const data = courseHeaderData;
    // console.log(encodeURIComponent(data.creator));
    return (
        <React.Fragment key={idx}>
            <div className="border-2 border-solid flex flex-col gap-1 px-2 py-2 w-full">
                <img
                    src="https://res.cloudinary.com/dwlvcqj0u/image/upload/v1696150547/cld-sample-5.jpg"
                    alt=""
                    className="w-full object-scale-down h-64 sm:h-80"
                />
                <div className="grid grid-cols-1 text-sm sm:text-md gap-2">
                    <Link to={`/course/${data.id}`}>
                        <p className="font-bold break-words text-blue-500 line-clamp-3">
                            {data.title}
                        </p>
                    </Link>

                    <p href="#" className="text-green-700 line-clamp-1 pr-1">
                        <strong className="text-black">created by </strong>
                        <Link to={`/mentor/courses/${data.creator}`}>{data.creator}</Link>
                    </p>
                    <p className="font-bold">$ {data.price}</p>
                    <div className="text-justify relative line-clamp-[9]">
                        {data.description}
                        <div className="w-full h-fit absolute bottom-0 z-1 
                                        flex flex-row justify-end gap-2 
                                        backdrop-blur-sm pt-2 rounded-md"
                            >
                            <Link to={`/course/${data.id}`}>
                                <div className=" 
                                        text-white backdrop-blur-md rounded-md bg-blue-500 
                                        p-2 font-bold hover:bg-blue-500/50"
                                >
                                    Check Course
                                </div>
                            </Link>
                            {isCreator && 
                                <>
                                    <EditCourseBtn courseId={data.id} />
                                    <DeleteCourseBtn courseTitle={data.title} />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


function EditCourseBtn({courseId}) {
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

function DeleteCourseBtn({courseTitle}) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasReTypeTitle, setHasRetypeTitle] = useState(false);
    
    function handleTitleRetype(event) {
        if (event.target.value === courseTitle.substring(0, 25).trim()) {
            setHasRetypeTitle(true);
        }
        else {
            setHasRetypeTitle(false);
        }
    }
    
    return (
        <>
            <button 
                className="text-white backdrop-blur-md rounded-md 
                            bg-red-500 p-2 font-bold hover:bg-red-500/50"
                onClick={() => setIsOpen(true)}>
                Delete
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
                    <div className="max-w-lg space-y-4 border bg-slate-100/90 p-12">
                        <div className="font-bold">Delete Course</div>
                        <Description className="line-clamp-2">
                            This will permanently delete course <strong>{courseTitle}</strong>
                        </Description>
                        <p>Please retype
                            <span className="bg-gray-300 font-semibold ml-1">{courseTitle.substring(0, 25).trim()}</span>
                        </p>
                        <input className="w-full rounded-md text-sm h-fit shadow-sm" onChange={handleTitleRetype}/>
                        <div className="flex gap-4 justify-end">
                            <button 
                                className="p-2 bg-gray-500 text-white font-semibold rounded-sm" 
                                onClick={() => setIsOpen(false)}>
                                    Cancel
                            </button>
                            <button 
                                className="p-2 bg-red-500 text-white font-semibold rounded-sm
                                            disabled:bg-red-300 hover:bg-red-500/60"
                                onClick={() => setIsOpen(false)}
                                disabled={!hasReTypeTitle}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
