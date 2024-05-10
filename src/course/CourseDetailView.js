import { useState, useEffect, useRef } from "react";

import { useLoaderData } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default function CourseDetailView() {
    const courseHeader = useLoaderData();
    const descRef = useRef(null);
    const [ isTruncatedDesc, isShowingMoreDesc, toggleIsShowingDesc ] = useTruncatedElement({ref: descRef});

    const titleRef = useRef(null);
    const [ isTruncatedTitle, isShowingMoreTitle, toggleIsShowingMoreTitle ] = useTruncatedElement({ref: titleRef});
    
    return (
        <div className="sm:w-8/12 md:w-7/12 mx-auto">
            <img src={courseHeader.picture_url} className="max-h-64 w-full sm:max-h-80 sm:w-7/12 md:w-6/12 sm:mx-auto"/>
            <div className="mt-3 grid grid-cols-1 w-11/12 mx-auto gap-y-1">
                <div className="grid grid-cols-1">
                    <p ref={titleRef} className={`${!isShowingMoreTitle && 'line-clamp-4'} font-bold text-lg w-full`}>
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
                <div className="font-bold text-md bg-emerald-200 w-fit px-2">${courseHeader.price}</div>
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
            </div>
        </div>
    );
}


function useTruncatedElement({ ref }) {
    const [isTruncated, setIsTruncated] = useState(false);
    const [isShowingMore, setIsShowingMore] = useState(false);

    useEffect(() => {
        const { offsetHeight, scrollHeight} = ref.current || {};
        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false);
        }
    }, [ref]);

    const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

    return [
        isTruncated,
        isShowingMore,
        toggleIsShowingMore
    ];
}