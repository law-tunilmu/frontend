import { useRef } from "react";

import { useLoaderData } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { useTruncatedElement } from "../utility/readMore";

export default function CourseDetailView() {
    const courseHeader = useLoaderData();
    const descRef = useRef(null);
    const [ isTruncatedDesc, isShowingMoreDesc, toggleIsShowingDesc ] = useTruncatedElement({ref: descRef});

    const titleRef = useRef(null);
    const [ isTruncatedTitle, isShowingMoreTitle, toggleIsShowingMoreTitle ] = useTruncatedElement({ref: titleRef});
    
    if (!courseHeader) {
        return (
            <div className="flex flex-rows justify-center h-screen items-center">
                <div className="w-fit h-fit p-2 bg-gray-200 mx-auto">
                    <p className="font-bold text-md sm:text-xl text-gray-600">Oops! course is not found</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col">
                <div className="sm:w-8/12 md:w-7/12 mx-auto grow-1">
                    <img src={courseHeader.picture_url} className="max-h-64 w-full sm:max-h-80 sm:w-7/12 md:w-6/12 sm:mx-auto"/>
                    <div className="mt-3 grid grid-cols-1 w-11/12 mx-auto gap-y-1">
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
                        <p className="line-clamp-1 ellipsis pr-4 font-bold sm:w-11/12">
                            Created by <a href="#" className="text-orange-500 text-sm">{courseHeader.creator}</a>
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
                        <div className="sticky top-3 flex flex-row justify-self-end bg-violet-600/30 w-fit p-2 rounded-lg">
                            <p className="py-2 mx-2 text-md sm:text-lg">For only <strong>${courseHeader.price}</strong></p>
                            <button 
                                className="bg-violet-800 hover:bg-violet-600 
                                        text-white text-sm sm:text-md font-bold 
                                        py-2 px-4 rounded 
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
                </div>
            </div>
        );
    }
}
