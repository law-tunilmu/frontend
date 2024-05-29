import { useEffect, useRef, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { TbRobotOff, TbWifiOff } from "react-icons/tb";

import { useTruncatedElement } from "../utility/readMore";
import CourseNotFound from "./CourseNotFound";
import courseFallback from "../images/courseFallback.png";
import { singleCourseLoader } from "./courseLoader";
import { ThreeCircles } from "react-loader-spinner";

export default function CourseDetailView() {
    const [courseHeader, setCourseHeader] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState();
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await singleCourseLoader({courseId: id});
                setCourseHeader(data);
            } catch(error) {
                setErrors(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);


    const descRef = useRef(null);
    const [
        isTruncatedDesc,
        isShowingMoreDesc,
        toggleIsShowingDesc 
    ] = useTruncatedElement({ref: descRef});

    const titleRef = useRef(null);
    const [
        isTruncatedTitle,
        isShowingMoreTitle,
        toggleIsShowingMoreTitle
    ] = useTruncatedElement({ref: titleRef});
    
    if (isLoading) {
        return (
            <div className="mx-auto w-fit h-screen flex items-center">
                <ThreeCircles color="#03cffc" />
            </div>
        );
    }
    else if (errors) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-lg md:text-[2rem] 
                            bg-gradient-to-br from-gray-300">
                {errors.name === "network" ? <TbWifiOff size={200}/> : <TbRobotOff size={200}/>}
                    <span className="pl-2">{errors.message}</span> 
            </div>
        )
    }
    else if (!courseHeader) {
        return (<CourseNotFound />)
    }
    else {
        return (
            <div className="flex flex-col sm:w-8/12 md:w-7/12 mx-auto gap-y-2 px-2">                    
                <img 
                    src={courseHeader.picture_url || courseFallback} alt="" 
                    className="self-center object-cover min-h-[30vh] max-h-[43vh] md:min-h-[50vh] md:max-h-[60vh]"
                />
                
                <div className="grid grid-cols-1">
                    <p ref={titleRef} className={`${!isShowingMoreTitle && 'line-clamp-2 sm:line-clamp-3'} font-bold text-lg w-full`}>
                        {courseHeader.title}
                    </p>
                    {isTruncatedTitle &&
                            (
                                <button onClick={toggleIsShowingMoreTitle} className="justify-self-end">
                                    {isShowingMoreTitle ? <FaAngleUp fontSize={20}/> : <FaAngleDown fontSize={20}/>}
                                </button>
                            )
                        }
                </div>
                
                <p className="line-clamp-1 ellipsis pr-4 font-bold">
                    Created by <Link 
                                    to={`/mentor/courses/${courseHeader.creator}`} 
                                    className="text-orange-500 text-sm">
                                        {courseHeader.creator}
                                </Link>
                </p>

                <p><strong>Last Update </strong>{processDateTime(courseHeader.last_update_at)}</p>
                
                <div>
                    <p ref={descRef} className={`text-justify break-words ${!isShowingMoreDesc && 'line-clamp-6'}`}>
                        {courseHeader.description}
                    </p>
                    {isTruncatedDesc &&
                        (
                            <button onClick={toggleIsShowingDesc} className="text-blue-500 font-semibold">
                                {isShowingMoreDesc ? 'Read less' : 'Read more'}
                            </button>
                        )
                    }
                </div>

                {/*TODO: 
                    1. handle check if user has read access
                    2. handle onClick, buy the course
                */}
                <div className="sticky top-3 self-end flex flex-row max-w-full 
                                bg-violet-600/30 p-2 rounded-lg items-center">
                    
                    <p className="py-2 mx-2 text-md sm:text-lg break-all">
                        For only <strong>${courseHeader.price}</strong>
                    </p>
                    
                    <button 
                        className="flex-0 w-fit h-fit py-2 px-4 rounded
                                    bg-violet-600 hover:bg-violet-800
                                    text-white text-sm sm:text-md font-bold  
                                    focus:outline-none focus:shadow-outline">
                        Get Full Access
                    </button>
                
                </div>

                <div className="mt-2 flex items-center bg-gray-200 w-full h-[50rem]">
                    <div className="w-fit px-2 bg-gray-500 text-xl font-bold text-white mx-auto">
                        Contents here?
                    </div>
                </div>
            </div>
        );
    }
}

function processDateTime(timestamp) {
    const jsDateTimeFormat = timestamp.replace("T", " ") + " UTC";
    const date = (new Date(jsDateTimeFormat));
    return date.toLocaleString('default', {dateStyle: "medium", timeStyle: "short", hour12: false});
}