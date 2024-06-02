import { useMemo, useState } from "react";

import { Dialog, Description } from "@headlessui/react";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const MAX_TITLE_CHARS = 25;

export function DeleteCourseBtn({courseId, courseTitle, className=""}) {
    const [isOpen, setIsOpen] = useState(false);
    const [retypeTitle, setRetypeTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const TITLE_RETYPE_TEST = useMemo(
        () => courseTitle.substring(0, MAX_TITLE_CHARS).trim(), 
        [courseTitle]
    );

    async function handleDelete() {
        if (isLoading) return;
        setIsLoading(true);

        const beUrl = process.env.REACT_APP_COURSE_BE + 
                        "/course/delete?id=" + courseId;
        
        try {
            await axios.delete(beUrl);
            
            closeMainDialog();
            
            navigate(pathname, {replace: true});

            const message = <>
                <p>Course <strong>{TITLE_RETYPE_TEST}</strong> has been deleted.</p>
                <p>Please, <strong>REFRESH</strong> this page to see the update</p>
            </>

            toast(message, {
                type: "info",
                autoClose: 5000,
            });

        } catch(error) {
            let message = "";
            if (error.response) {
                message = error.response.descriptoon || "Server Error. Please try again later";
            } else {
                message = "Network Error. Please check again your connection";
            }
            toast(
                message, 
                {
                    type: "error",
                    autoClose: false,
                    hideProgressBar: true
                }
            );
            throw error;

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
                className={`text-white backdrop-blur-md rounded-md 
                            bg-red-500 p-2 font-bold hover:bg-red-800 ${className}`}
                onClick={openMainDialog}>
                Delete
            </button>
            
            <Dialog open={isOpen} onClose={closeMainDialog} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
                    <div className="max-w-lg space-y-4 border bg-slate-100 p-12">
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
                                className="p-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-sm" 
                                onClick={closeMainDialog}>
                                    Cancel
                            </button>
                            <button 
                                    className="inline-flex gap-2 p-2 bg-red-500 
                                                text-white font-semibold rounded-sm
                                                disabled:bg-red-300 hover:bg-red-800"
                                    onClick={handleDelete}
                                    disabled={retypeTitle !== TITLE_RETYPE_TEST}>                                    
                                
                                { 
                                    isLoading &&
                                        <FaCircleNotch className="animate-spin h-full w-auto min-h-5" color="white"/> 
                                } 
                                Delete

                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
