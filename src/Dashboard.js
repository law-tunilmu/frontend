import { CourseMiniView } from "./course/CourseMiniView";
import { batchCourseLoader } from "./course/CourseLoader";

export default function Dashboard() {
    const dataLen = 5;
    const data = batchCourseLoader({page_size:dataLen});
    return (
        <div className="container w-11/12 sm:w-4/5 mx-auto min-h-screen mt-2">
            <div className="flex flex-col w-full gap-1">
                {[...data.map((course) => <CourseMiniView courseHeaderData={course}/>)]}
                <div className="basis-1/5">page no</div>
            </div>
        </div>
    );
}