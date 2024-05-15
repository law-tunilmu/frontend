import { useState } from "react";

import { Dialog, Description } from "@headlessui/react";

const MAX_TITLE_CHARS = 25;

export function DeleteCourseBtn({courseTitle}) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasReTypeTitle, setHasRetypeTitle] = useState(false);
    
    function handleTitleRetype(event) {
        if (event.target.value === courseTitle.substring(0, MAX_TITLE_CHARS).trim()) {
            setHasRetypeTitle(true);
        }
        else {
            setHasRetypeTitle(false);
        }
    }
    
    return (
        <>
            <button 
                className="text-white backdrop-blur-md rounded-md 
                            bg-red-500 p-2 font-bold hover:bg-red-500/50"
                onClick={() => setIsOpen(true)}>
                Delete
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
                    <div className="max-w-lg space-y-4 border bg-slate-100/90 p-12">
                        <div className="font-bold">Delete Course</div>
                        <Description className="line-clamp-2">
                            This will permanently delete course <strong>{courseTitle}</strong>
                        </Description>
                        <p>Please retype
                            <span className="bg-gray-300 font-semibold ml-1">
                                {courseTitle.substring(0, MAX_TITLE_CHARS).trim()}
                            </span>
                        </p>
                        <input className="w-full rounded-md text-sm h-fit shadow-sm" onChange={handleTitleRetype}/>
                        <div className="flex gap-4 justify-end">
                            <button 
                                className="p-2 bg-gray-500 text-white font-semibold rounded-sm" 
                                onClick={() => setIsOpen(false)}>
                                    Cancel
                            </button>
                            <button 
                                className="p-2 bg-red-500 text-white font-semibold rounded-sm
                                            disabled:bg-red-300 hover:bg-red-500/60"
                                onClick={() => setIsOpen(false)}
                                disabled={!hasReTypeTitle}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
