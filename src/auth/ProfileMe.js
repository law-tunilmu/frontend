import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { MdSubdirectoryArrowRight } from "react-icons/md";

import { FetchLoader } from "../course/components/LoaderPages";
import { ErrorFetch } from "../course/components/ErrorPages";
import { useAuth } from "./authProvider";
import ERRORS from "../course/components/ErrorPages";


export function ProfileMePage() {
    const { token } = useAuth();
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsloading ] = useState(false);
    const [ error, setError ] = useState();
    const { pathname } = useLocation();

    const loginParams = new URLSearchParams();
    loginParams.set("redirect_to", pathname);

    

    useEffect(() => {
        async function getData(token) {
            try {
                setIsloading(true);
                const user = await dataFetcher(token);
                setUser(user);
            } catch (error) {
                setError(error);
            } finally {
                setIsloading(false);
            }
        }
        if (token) {
            getData(token);
        }
    }, [token]);

    if (!token) {
        return <Navigate to={`/login?${loginParams}`} />;
    }
    else {
        return (
            <FetchLoader isLoading={isLoading}>
                <ErrorFetch errors={error}>
                    { 
                        user &&
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
                                {
                                    user.role !== "STUDENT" && 
                                    <Link   to={"/course/by/" + encodeURI(user.username)} 
                                            className="font-bold text-blue-500 hover:text-violet-500 flex items-center gap-2">
                                        <MdSubdirectoryArrowRight color="black"/>
                                        Check All My Courses
                                    </Link>
                                }
                            </div>
                        </div>
                    }
                </ErrorFetch>
            </FetchLoader>
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

async function dataFetcher(token) {
    const beUrl = process.env.REACT_APP_AUTH_BE + "/users/me";
    try {
        const resp = await axios.get(beUrl, {headers: {Authorization: `Bearer ${token}`}});
        return resp.data;
    } catch (error) {
        console.log(error);
        let name = ERRORS.NETWORK;
        let message = "Network Error. Please check your internet connection";
        if (error.response) {
            name = ERRORS.SERVER;
            message = "Server Error. Please try again later";
        }
        throw {
            name: name,
            message: message
        }
    }
}