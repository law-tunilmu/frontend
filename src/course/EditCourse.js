import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CourseForm } from "./CourseForm";
import CourseNotFound from "./CourseNotFound";

export function EditCourseBtn({courseId}) {
    return (
        <Link to={`/course/${courseId}/edit`}>
            <div className=" 
                    text-white backdrop-blur-md rounded-md bg-orange-500 
                    p-2 font-bold hover:bg-orange-300"
            >
                Edit
            </div>
        </Link>
    );
}

export default function CourseEdit() {
    const courseHeader = useLoaderData();
    const [formData, setFormData] = useState(courseHeader);
    const [errors, setErrors] = useState({});
    if (!courseHeader) {
        return <CourseNotFound />;
    } else {
        return (
            <>
                <CourseForm 
                    className="mt-2 px-2 sm:w-8/12 md:w-7/12 mx-auto gap-y-6 
                                divide-y-2 divider-solid divide-slate-400"
                    courseData={courseHeader}
                    submitCancelBtn={<SubmitAndCancel courseId={courseHeader.id}/>}
                    submitOnTop={true}
                    formUseState={[formData, setFormData]}
                    errorUseState={[errors, setErrors]}
                >
                    <div className="mt-2 sm:w-8/12 md:w-7/12 mx-auto h-[50rem] bg-gray-200">
                        <input name="abc" type="text" className="w-full" value={FormData.abc}/>
                        <div className="w-fit px-2 bg-gray-500 text-xl font-bold text-white mx-auto">
                            Contents here?
                        </div>
                    </div>
                </CourseForm>
            </>
        );
    }
}


function SubmitAndCancel({courseId}) {
    const navigate  = useNavigate();

    const handleCancel = () => {
        navigate(`/course/${courseId}`);
    }

    return (
        <div className="
                sticky top-0 w-screen text-white bg-slate-800/90
                flex flex-col gap-2 py-2 sm:flex-row justify-center place-items-center"
            >
            <p className="mx-2 text-md sm:text-lg">
                Hit &#128293;<strong>Save</strong>&#128293; when you have done editing
            </p>
            <div>
                <button
                    type="submit"
                    className="mr-2 bg-blue-500 hover:bg-blue-500/70 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        &#128293;Save&#128293;
                </button>
                
                <button
                    onClick={handleCancel}
                    className="bg-orange-500 hover:bg-orange-400/50 
                            text-sm sm:text-lg font-bold 
                            py-2 px-4 rounded w-fit
                            focus:outline-none focus:shadow-outline">
                        Cancel
                </button>
            </div>                        
        </div>
    );
}
