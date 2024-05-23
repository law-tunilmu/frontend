import { useRef } from "react";

import { useLoaderData, Link } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { useTruncatedElement } from "../utility/readMore";
import CourseNotFound from "./CourseNotFound";
import courseFallback from "../images/courseFallback.png";

export default function CourseDetailView() {
    const courseHeader = useLoaderData();
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
    
    if (!courseHeader) {
        <CourseNotFound />
    }
    else {
        return (
            <div className="flex flex-col sm:w-8/12 md:w-7/12 mx-auto gap-y-1 px-2">                    
                <img 
                    src={courseHeader.picture_url || courseFallback} alt="" 
                    className="self-center object-cover max-h-64 sm:max-h-80 md:max-h-96"
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
                    Created by <Link to={`/mentor/courses/${courseHeader.creator}`} className="text-orange-500 text-sm">{courseHeader.creator}</Link>
                </p>

                <div>
                    <p ref={descRef} className={`text-justify break-words ${!isShowingMoreDesc && 'line-clamp-6'}`}>
                        <strong>Description: </strong>{courseHeader.description}
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
