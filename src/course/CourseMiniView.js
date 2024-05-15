import { Link } from "react-router-dom";
import React from "react";

import { DeleteCourseBtn } from "./DeleteCourse";
import { EditCourseBtn } from "./EditCourse";

export function CourseMiniView({courseHeaderData, idx, isCreator=true}) {
    const data = courseHeaderData;

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
