import { useRef, useState } from "react";

import { useInfiniteScroll, Loader, NoMoreData } from "./utility/useInfiniteScroll";
import { batchCourseLoader } from "./course/utility/courseLoader";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import BackToTopBtn from "./components/BackToTop";
import CourseCard from "./course/components/CourseCard";
import { ErrorFetch } from "./course/components/ErrorPages";

const COURSE_FIELDS = ["id", "title", "creator", "price"];

export default function Dashboard() {
    const [sortKey, setSortKey] = useState("id");
    const [isDescending, setIsDescending] = useState(false);
    
    return (
        <div className="container w-11/12 lg:w-10/12 xl:w-8/12 mx-auto min-h-screen mt-2">
            <div className="w-full h-fit my-2 flex justify-end items-center gap-2">
                <p className="font-semibold">sort by:</p>
                <select className="rounded-md py-1" value={sortKey} onChange={e => setSortKey(e.target.value)}>
                    {
                        COURSE_FIELDS.map((name, idx) => 
                            <option key={idx} value={name}>
                                {name}
                            </option>
                        )
                    }
                </select>
                <button onClick={() => setIsDescending(prev => !prev)}>
                    {
                        isDescending ? <FaArrowDown /> : <FaArrowUp />
                    }
                </button>
            </div>
            <CourseList key={sortKey + isDescending} sortKey={sortKey} isDescending={isDescending} />
        </div>
    );
}

function CourseList({sortKey="id", isDescending=false}) {
    const loaderRef = useRef(null);

    const {items, isLoading, isNoDataLeft, errors} = useInfiniteScroll({
        loaderRef: loaderRef,
        dataFetcher: props => batchCourseLoader({...props, sortKey:sortKey, isDescending:isDescending})
    });

    return (
        <ErrorFetch errors={errors}>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 md:gap-4 h-fit">
                {[...items.map((course, idx) => <CourseCard data={course} key={idx}/>)]}
            </div>
            <div ref={loaderRef} className="min-h-[1px]"> { isLoading && <Loader />} </div>
            {isNoDataLeft && <NoMoreData />}
            <BackToTopBtn />
        </ErrorFetch>
    );
}