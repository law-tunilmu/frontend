import { CourseMiniView } from "./course/CourseMiniView";

export default function Dashboard() {
    return (
        <div className="container w-11/12 sm:w-4/5 mx-auto min-h-screen mt-2">
            <div className="flex flex-col w-full gap-1">
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
                <CourseMiniView />
                <div className="basis-1/5">page no</div>
            </div>
        </div>
    );
}