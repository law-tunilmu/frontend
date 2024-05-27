import { Link } from "react-router-dom";
import React from "react";

import { DeleteCourseBtn } from "./DeleteCourse";
import { EditCourseBtn } from "./EditCourse";
import courseFallback from "../images/courseFallback.png"

export function CourseCard({data, idx, isCreator=true, className=""}) {
    return (
        <div key={idx} className="border-2 border-solid rounded-md text-sm sm:text-md
                                    w-full h-[60vh] sm:h-[80vh] p-2 flex flex-col gap-1 ">
            <img
                src={data.picture_url || courseFallback}
                alt="course image"
                className="object-cover max-w-full h-[60%] min-h-[40%]"
            />
            <Link to={`/course/${data.id}`}>
                <p className="font-bold break-words text-blue-500 line-clamp-3">
                    {data.title}
                </p>
            </Link>

            <p className="text-green-700 line-clamp-1 pr-1">
                <strong className="text-black">created by </strong>
                <Link to={`/mentor/courses/${data.creator}`}>{data.creator}</Link>
            </p>
            <p className="font-bold">$ <span className="text-">{data.price}</span></p>
            <div className="grow text-justify relative">
                <strong>Description: </strong>{data.description}
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
    )
}
