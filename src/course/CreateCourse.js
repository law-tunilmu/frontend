import courseFallback from "../images/courseFallback.png"
import COURSE_CONST from "./CourseConstants";
export default function CreateCourse() {
    return (
        <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
            <div className="px-2 sm:w-8/12 md:w-7/12 mx-auto flex flex-col gap-[1rem]">
                
                <h2 className="text-lg leading-7 font-bold">Create New Course</h2>

                <div className="grid grid-cols gap-y-2">
                    <label htmlFor="title" className="font-semibold text-md">Title</label>
                    <textarea
                        name="title"
                        className="break-words"
                        placeholder="Write your awesome title here"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols gap-y-2">
                    <div>
                        <label htmlFor="picture" className="font-semibold text-md">Course Picture</label>
                        <p className="text-gray-500 text-xs font-semibold italic">
                            Put the most iconic picture for your course
                        </p>
                    </div>
                    <div className="mt-1 h-fit w-fit mx-auto">
                        <img 
                            src={null || courseFallback} 
                            className={`object-cover max-h-64 sm:max-h-80 md:max-h-96`}
                            alt=""
                        />
                    </div>
                    <input 
                        name="picture" type="file" accept="image/*" 
                        className=" w-fit file:border-0 file:bg-blue-500 file:rounded-md file:p-2                                    
                                    file:text-white file:font-semibold file:text-sm sm:file:text-md
                                    hover:file:cursor-pointer hover:file:bg-blue-800"
                    />
                </div>

                <div className="grid grid-cols gap-y-2">
                    <label htmlFor="description" className="font-semibold text-md">Desription</label>
                    <textarea
                        name="description"
                        className="break-words"
                        placeholder="Give a short description for your course"
                        rows={8}
                    />                
                </div>

                <div className="grid grid-cols">
                    <label htmlFor="price" className="block font-semibold text-md">
                        Price
                    </label>
                    <div className="relative -z-10 mt-2 rounded-md shadow-sm flex flex-row gap-4">
                        <div className="w-fit">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                                <span className="text-gray-600 sm:text-sm font-semibold">$</span>
                            </div>
                            <input
                                type="number"
                                name="price"
                                min={0}
                                placeholder="5.00"
                                className="
                                    block rounded-md border-0 py-1.5 pl-7 pr-3 left-3 
                                    text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 
                                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                step={0.01}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-fit h-fit self-end flex flex-row gap-2
                                text-white text-sm sm:text-lg font-bold">
                    <button
                        className="bg-orange-500 hover:opacity-80 
                                py-2 px-4 rounded w-fit h-fit
                                focus:outline-none focus:shadow-outline">
                            Cancel
                    </button>
                    <button
                        type="submit"
                        className="mr-2 mb-2 bg-blue-500 hover:opacity-80 
                                    py-2 px-4 rounded w-fit h-fit
                                    focus:outline-none focus:shadow-outline">
                            Save
                    </button>
                </div>
            </div>
        </form>
    );
}