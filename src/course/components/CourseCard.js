import { Link } from "react-router-dom";
import React from "react";

import { DeleteCourseBtn } from "../DeleteCourse";
import { EditCourseBtn } from "../EditCourse";
import { useAuth, currentUsername } from "../../auth/authProvider";
import courseFallback from "../../images/courseFallback.png"

export default function CourseCard({data, idx}) {
    const { token } = useAuth();
    const isCreator = token && (currentUsername(token) === data.creator);

    return (
        <div key={idx} className="border-2 border-solid rounded-md text-sm sm:text-md
                                    w-full h-[60vh] sm:h-[80vh] flex flex-col gap-1 p-2">
            <img
                src={data.picture_url || courseFallback}
                alt="course"
                className="object-cover max-w-full max-h-[60%] min-h-[40%]"
            />
            <Link to={`/course/detail/${data.id}`}>
                <p className="font-bold break-words text-blue-500 line-clamp-3">
                    {data.title}
                </p>
            </Link>

            <p className="text-green-700 line-clamp-1 pr-1">
                <strong className="text-black">created by </strong>
                <Link to={`/course/by/${data.creator}`}>{data.creator}</Link>
            </p>
            <p className="font-bold">$ <span className="text-">{data.price}</span></p>
            <div className="grow text-justify relative line-clamp-[7]">
                <strong>Description: </strong>{data.description}
                <div className="absolute bottom-0 right-0 h-fit w-fit flex flex-row z-1 
                                gap-2 pt-1 backdrop-blur-sm"
                    >
                    <Link to={`/course/detail/${data.id}`}>
                        <div className=" 
                                text-white rounded-md bg-blue-500 
                                p-2 font-bold hover:bg-blue-800"
                        >
                            Check Course
                        </div>
                    </Link>
                    {isCreator && 
                        <>
                            <EditCourseBtn courseId={data.id} />
                            <DeleteCourseBtn courseId={data.id} courseTitle={data.title} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
