export default function CourseNotFound() {
    return (
        <div className="flex flex-rows justify-center h-screen items-center bg-gradient-to-br bg-gray-200">
            <div className="w-fit h-fit p-2 bg-gray-300 mx-auto">
                <p className="font-bold text-md md:text-[3rem] text-gray-600">
                    Oops! course is not found
                </p>
            </div>
        </div>
    );
}