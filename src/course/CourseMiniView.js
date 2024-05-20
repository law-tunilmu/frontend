import { Link } from "react-router-dom";
import React from "react";

import { DeleteCourseBtn } from "./DeleteCourse";
import { EditCourseBtn } from "./EditCourse";

export function CourseMiniView({data, idx, isCreator=true}) {
    return (
        <div key={idx} className="border-2 border-solid flex flex-col gap-1 px-2 pb-2 w-full">
            <img
                src={data.picture_url}
                alt=""
                className="w-full object-scale-down h-64 sm:h-80"
            />
            <div className="grid grid-cols-1 text-sm sm:text-md gap-2">
                <Link to={`/course/${data.id}`}>
                    <p className="font-bold break-words text-blue-500 line-clamp-3">
                        {data.title}
                    </p>
                </Link>

                <p className="text-green-700 line-clamp-1 pr-1">
                    <strong className="text-black">created by </strong>
                    <Link to={`/mentor/courses/${data.creator}`}>{data.creator}</Link>
                </p>
                <p className="font-bold">$ {data.price}</p>
                <div className="text-justify relative line-clamp-[9]">
                    {data.description}
                    <div className="absolute bottom-0 right-0 h-fit w-fit flex flex-row z-1 
                                    gap-2 pt-1 backdrop-blur-sm"
                        >
                        <Link to={`/course/${data.id}`}>
                            <div className=" 
                                    text-white rounded-md bg-blue-600 
                                    p-2 font-bold hover:bg-blue-500"
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
    )
}
