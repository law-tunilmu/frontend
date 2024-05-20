import { useRef } from "react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useParams } from "react-router-dom";

import { CourseMiniView } from "./CourseMiniView";
import { batchCourseLoader } from "./CourseLoader";
import { useInfiniteScroll, Loader, NoMoreData } from "../utility/useInfiniteScroll";

export function CreatedCourseMentor() {
    const { mentorUsername } = useParams(); 
    const loaderRef = useRef(null);

    const {items, isLoading, isNoDataLeft} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: batchCourseLoader
    });

    return (
        <div className="mx-auto flex flex-col w-11/12 lg:w-9/12 xl:w-7/12 divide-y-2 min-h-screen">
            <div className="flex flex-row items-center h-fit pl-2 lg:pl-8">
                <PiChalkboardTeacher className="w-24 h-24"/>
                <div className="grow pl-2">
                    <p className="text-sm font-bold content-center line-clamp-1 text-blue-500">
                        {mentorUsername}
                    </p>
                    <p className="text-gray-500 font-semibold">Mentor</p>
                </div>
            </div>
            <div className="mt-2 border-t-2 border-gray-600">
                <p className="w-full text-md font-semibold pb-2 line-clamp-1">{`${mentorUsername}'s Courses`}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                    {[...items.map((course, idx) => <CourseMiniView data={course} key={idx}/>)]}
                </div>
                <div ref={loaderRef}> { isLoading && <Loader />} </div>
                {isNoDataLeft && <NoMoreData />}
            </div>
        </div>
    );
}