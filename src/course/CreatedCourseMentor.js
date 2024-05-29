import { useRef } from "react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useParams } from "react-router-dom";

import { useInfiniteScroll, Loader, NoMoreData } from "../utility/useInfiniteScroll";
import BackToTopBtn from "../components/BackToTop";
import { CourseCard } from "./CourseCard";
import axios from "axios";

export function CreatedCourseMentor() {
    const { mentorUsername } = useParams(); 
    const loaderRef = useRef(null);

    const {items, isLoading, isNoDataLeft} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: dataFetcher({mentorUsername: mentorUsername})
    });

    return (
        <div className="mx-auto flex flex-col w-11/12 lg:w-9/12 xl:w-7/12 divide-y-2 h-screen">
            <div className="flex flex-row items-center h-fit pl-2 lg:pl-8">
                <PiChalkboardTeacher className="w-24 h-24"/>
                <div className="grow pl-2">
                    <p className="text-sm font-bold content-center line-clamp-1 text-blue-500">
                        {mentorUsername}
                    </p>
                    <p className="text-gray-500 font-semibold">Mentor</p>
                </div>
            </div>
            <div className="mt-2 border-t-2 border-gray-600 min-h-screen">
                <p className="w-full text-md font-semibold pb-2 line-clamp-1">
                    Courses:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[...items.map((course, idx) => <CourseCard data={course} key={idx}/>)]}
                </div>
                <div ref={loaderRef} className="min-h-[1px]"> { isLoading && <Loader />} </div>
                {isNoDataLeft && <NoMoreData />}
                <BackToTopBtn />
            </div>
        </div>
    );
}

function dataFetcher({mentorUsername}) {
    return async ({page, page_size}) => {
        const params = new URLSearchParams();
        params.append("mentor", mentorUsername);
        params.append("page", String(page));
        params.append("page_size", String(page_size));

        const courseBeUrl = process.env.REACT_APP_COURSE_BE +
                            `/course/created_by?${params}`;

        try {
            const resp = await axios.get(courseBeUrl);
            return resp.data;
        } catch (error) {
            let name = "network";
            let message = "Network error. Please check your internet connection";
            if (error.response) {
                name = "server";
                message = "Server error. Please try again later";
            }
            throw {
                name: name,
                message: message
            }
        }
    }
}