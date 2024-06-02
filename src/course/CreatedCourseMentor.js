import { useRef } from "react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useInfiniteScroll, Loader, NoMoreData } from "../utility/useInfiniteScroll";
import CourseCard from "./components/CourseCard";
import BackToTopBtn from "../components/BackToTop";
import ERRORS, { ErrorFetch } from "./components/ErrorPages";

export default function CreatedCourseMentor() {
    const { mentorUsername } = useParams(); 
    const loaderRef = useRef(null);

    const {items, isLoading, isNoDataLeft, errors} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: dataFetcher({mentorUsername: mentorUsername})
    });

    return (
        <div className="flex flex-col">
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
                <ErrorFetch errors={errors} 
                            className="flex items-center justify-center 
                                        text-lg md:text-[2rem] w-full h-screen 
                                        bg-gradient-to-br from-gray-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[...items.map((course, idx) => <CourseCard data={course} key={idx}/>)]}
                    </div>
                    <div ref={loaderRef} className="min-h-[1px]"> { isLoading && <Loader />} </div>
                    {isNoDataLeft && <NoMoreData />}
                </ErrorFetch>
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
            let name = ERRORS.NETWORK;
            let message = "Network Error. Please check your internet connection";
            if (error.response) {
                name = ERRORS.SERVER;
                message = "Server Error. Please try again later";
            }
            throw {
                name: name,
                message: message
            }
        }
    }
}