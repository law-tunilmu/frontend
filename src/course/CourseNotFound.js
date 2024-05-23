export default function CourseNotFound() {
    return (
        <div className="flex flex-rows justify-center h-screen items-center">
            <div className="w-fit h-fit p-2 bg-gray-200 mx-auto">
                <p className="font-bold text-md sm:text-xl text-gray-600">
                    Oops! course is not found
                </p>
            </div>
        </div>
    );
}