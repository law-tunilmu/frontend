import { PiChalkboardTeacher } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { CourseMiniView } from "../course/CourseMiniView";
import { courseDummyData, courseLoader } from "../course/CourseLoader";

export function CreatedCourseMentor() {
    const { mentorUsername } = useParams(); 
    return (
        <div className="mx-auto flex flex-col sm:w-6/12 divide-y-2 min-h-screen">
            <div className="mt-4 flex flex-row items-center h-fit">
                <PiChalkboardTeacher className="w-24 h-24"/>
                <div className="grow pl-2">
                    <p className="text-lg font-bold content-center line-clamp-1 text-blue-500">
                        {mentorUsername}
                    </p>
                    <p className="text-gray-500 font-semibold">Mentor</p>
                </div>
            </div>
            <div className="mt-2 border-t-2 border-gray-600">
                <p className="w-full text-md font-semibold pb-2 line-clamp-1">{`${mentorUsername}'s Courses`}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
                    <CourseMiniView courseHeaderData={courseDummyData(1)}/>
                    <CourseMiniView courseHeaderData={courseDummyData(1)}/>
                    <CourseMiniView courseHeaderData={courseDummyData(1)}/>
                    <CourseMiniView courseHeaderData={courseDummyData(1)}/>
                </div>
            </div>
        </div>
    );
}