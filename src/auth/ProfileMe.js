import { useEffect, useState } from "react";

import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { userLoader } from "./UserLoader";
import { Loader } from "../utility/useInfiniteScroll";

export function ProfileMePage() {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        userLoader().then(resp => setUser(resp));
    }, []);

    if (!user) {
        return <Loader />;
    }
    else {
        return (
            <div className="sm:w-8/12 xl:w-7/12 mx-auto grid grid-cols-1 gap-2 content-start">
                <div className="mt-4 w-full flex flex-row items-center divide-x-2 divide-solid divide-black">
                    {
                        (user.role === "STUDENT") ? 
                            <PiStudent className="w-24 h-24"/> : 
                            <PiChalkboardTeacher className="w-24 h-24"/>
                    }
                    <p className="grow h-full text-lg font-bold content-center pl-2">User Profile</p>
                </div>
                <div className="px-4 grid grid-cols-1 gap-6">
                    <LabelDisabledInput FName={"Username"} IValue={user.username}/>
                    <LabelDisabledInput FName={"Email"} IValue={user.email}/>
                    <fieldset className="sm:col-span-full">
                        <legend className="text-md font-bold text-gray-900">Role</legend>
                        <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-x-3">
                                <input 
                                    name="studentRole" type="radio" 
                                    className="h-4 w-4 border-gray-600 bg-gray-500 
                                                text-indigo-600 focus:ring-indigo-600"
                                    checked={!user.role || user.role === "STUDENT"}
                                    disabled
                                />
                                <label htmlFor="studentRole" 
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                    Student
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input 
                                    name="mentorRole" type="radio" 
                                    className="h-4 w-4 border-gray-600 bg-gray-500 
                                                text-indigo-600 focus:ring-indigo-600"
                                    checked={!user.role || user.role !== "STUDENT"}
                                    disabled
                                />
                                <label htmlFor="mentorRole"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                    Mentor
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

function LabelDisabledInput({FName, IValue}) {
    return (
        <div className="w-full flex flex-col h-fit">
            <div className="w-24 font-semibold">{FName}</div>            
            <input 
                className="grow bg-gray-200
                            py-1.5 pl-1 text-gray-900 
                            focus:ring-0" 
                disabled 
                value={IValue}
            />
        </div>
    );
}