import { CourseMiniView } from "./course/CourseMiniView";
import { batchCourseLoader } from "./course/CourseLoader";

export default function Dashboard() {
    const dataLen = 5;
    const data = batchCourseLoader({page_size:dataLen});
    return (
        <div className="container w-11/12 sm:w-4/5 mx-auto min-h-screen mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-1">
                {[...data.map((course) => <CourseMiniView courseHeaderData={course}/>)]}
            </div>
        </div>
    );
}