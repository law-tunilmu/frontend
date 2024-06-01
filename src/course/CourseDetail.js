import { useEffect, useRef, useState } from "react";

import { useParams, Link } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { useTruncatedElement } from "../utility/readMore";
import { singleCourseLoader } from "./utility/courseLoader";
import { FetchLoader } from "./components/LoaderPages";
import { ErrorFetch } from "./components/ErrorPages";

import courseFallback from "../images/courseFallback.png";
import { currentUsername, useAuth } from "../auth/authProvider";
import { EditCourseBtn } from "./EditCourse";
import { DeleteCourseBtn } from "./DeleteCourse";

export default function CourseDetail() {
    const { id } = useParams();

    const [courseHeader, setCourseHeader] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState();


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

    return (
        <FetchLoader isLoading={isLoading}>
            <ErrorFetch errors={errors}>
                {courseHeader && <Detail courseHeader={courseHeader}/>}
            </ErrorFetch>
        </FetchLoader>
    );
}

function Detail({courseHeader}) {
    const descRef = useRef(null);
    
    const { token } = useAuth();
    const username = token ? currentUsername(token) : "";
    
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

    return (
        <div className="relative flex flex-col">
            {
                username === courseHeader.creator &&
                <div className="fixed right-0 bottom-20 md:right-5 xl:right-60 z-[20] 
                                text-lg text-center flex flex-col gap-2">
                    
                    <EditCourseBtn courseId={courseHeader.id} className="grow flex items-center justify-center"/>
                    <DeleteCourseBtn courseId={courseHeader.id} courseTitle={courseHeader.title} className="grow"/>
                </div>
            }                    
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
                                to={`/course/by/${courseHeader.creator}`} 
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
            <div className="sticky top-16 self-end flex flex-row max-w-full 
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

function processDateTime(timestamp) {
    const jsDateTimeFormat = timestamp.replace("T", " ") + " UTC";
    const date = (new Date(jsDateTimeFormat));
    return date.toLocaleString('default', {dateStyle: "medium", timeStyle: "short", hour12: false});
}