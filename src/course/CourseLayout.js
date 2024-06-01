import { Outlet } from "react-router-dom";

export default function CourseLayout() {
    return (
        <div className="container w-11/12 lg:w-10/12 xl:w-7/12 mx-auto mt-2">
            <Outlet />
        </div>
    );
}