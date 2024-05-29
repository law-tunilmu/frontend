import { useMemo, useState } from "react";
import axios from "axios";

import { Dialog, Description } from "@headlessui/react";
import { FallingLines } from "react-loader-spinner";
import { BiError } from "react-icons/bi";

const MAX_TITLE_CHARS = 25;

export function DeleteCourseBtn({courseId, courseTitle}) {
    const [isOpen, setIsOpen] = useState(false);
    const [retypeTitle, setRetypeTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const TITLE_RETYPE_TEST = useMemo(
        () => courseTitle.substring(0, MAX_TITLE_CHARS).trim(), 
        [courseTitle]
    );

    async function handleDelete() {
        const beUrl = process.env.REACT_APP_COURSE_BE + 
                        "/course/delete?id=" + courseId;
        
        setIsLoading(true);
        closeMainDialog();
        try {
            await axios.delete(beUrl);
        } catch(error) {
            let message = "";
            if (error.response) {
                message = error.response.descriptoon || "Server Error. Please try again later";
            } else {
                message = "Network Error. Please check again your connection";
            }
            setErrors({
                message: message
            })
        } finally {
            setIsLoading(false);
        }
    }

    const openMainDialog = () => {
        setIsOpen(true);
        setRetypeTitle("");
    }

    const closeMainDialog = () => {
        setIsOpen(false);
        setRetypeTitle("");
    }
    
    return (
        <>
            <button 
                className="text-white backdrop-blur-md rounded-md 
                            bg-red-600 p-2 font-bold hover:bg-red-400"
                onClick={openMainDialog}>
                Delete
            </button>
            <Dialog open={isLoading} onClose={() => setIsLoading(false)} className="relative z-60">
                <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4 backdrop-blur-sm">
                    <FallingLines color="gray" width="150"/>
                </div>
            </Dialog>
            
            <Dialog open={errors.message !== undefined} onClose={() => setErrors({})} className="relative z-60">
                <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4 backdrop-blur-sm">
                    <div className="p-4 w-fit bg-white rounded-md flex shadow-md shadow-gray/80">
                        <BiError className="self-center mx-auto size-[4rem]" color="red"/>
                        <div className="relative pl-2 flex flex-col gap-2">
                            <p className="text-[1rem] md:text-[1.8rem] font-semibold">{errors.message}</p>
                            <button 
                                onClick={() => setErrors({})}
                                className="self-end w-fit shadow-inner shadow-white/10 py-1.5 px-3 rounded-md
                                             font-semibold text-white bg-gray-400 hover:bg-gray-700">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog open={isOpen} onClose={closeMainDialog} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
                    <div className="max-w-lg space-y-4 border bg-slate-100/95 p-12">
                        <div className="font-bold">Delete Course</div>
                        <Description className="line-clamp-2">
                            This will permanently delete course <strong>{courseTitle}</strong>
                        </Description>
                        <p>Please retype
                            <span className="bg-gray-300 font-semibold ml-1">
                                {courseTitle.substring(0, MAX_TITLE_CHARS).trim()}
                            </span>
                        </p>
                        <input className="w-full rounded-md text-sm h-fit shadow-sm" onChange={(e) => setRetypeTitle(e.target.value)}/>
                        <div className="flex gap-4 justify-end">
                            <button 
                                className="p-2 bg-gray-500 text-white font-semibold rounded-sm" 
                                onClick={closeMainDialog}>
                                    Cancel
                            </button>
                            <button 
                                className="p-2 bg-red-500 text-white font-semibold rounded-sm
                                            disabled:bg-red-300 hover:bg-red-500/60"
                                onClick={handleDelete}
                                disabled={retypeTitle !== TITLE_RETYPE_TEST}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
