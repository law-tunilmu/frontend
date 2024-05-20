import { useRef } from "react";

import { useInfiniteScroll, Loader, NoMoreData } from "./utility/useInfiniteScroll";
import { CourseMiniView } from "./course/CourseMiniView";
import { batchCourseLoader } from "./course/CourseLoader";

export default function Dashboard() {
    const loaderRef = useRef(null);

    const {items, isLoading, isNoDataLeft} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: batchCourseLoader
    });
    
    return (
        <div className="justify-center container w-11/12 lg:w-10/12 xl:w-8/12 mx-auto min-h-screen mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-4">
                {[...items.map((course, idx) => <CourseMiniView data={course} key={idx}/>)]}
            </div>
            <div ref={loaderRef}> { isLoading && <Loader />} </div>
            {isNoDataLeft && <NoMoreData />}
        </div>
    );
}
