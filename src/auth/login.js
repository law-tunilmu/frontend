import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios";
import { useAuth } from "./authProvider";

const BACKEND_URL="http://34.34.216.3/auth/login"

function Login({redirect_to='/'}) {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errMsg, setErrMsg] = useState();

    function handleSubmit(e) {
        e.preventDefault()
        
        axios(
            {
                method:"post",
                url: BACKEND_URL,
                headers:{'Content-Type':"application/json"},
                withCredentials: false,
                data: {"username": username, "password":password},
            },
        )
        .then(response => {
                setToken(response.data.token);
                navigate(redirect_to, { replace: true });
            }
        ).catch(err => {
            if (err.response && err.response.status === 403) {
                setErrMsg("Username and/or password are incorrect");
            } else {
                setErrMsg("Network error, please try again later");
            }
        })
    }
    
    return (
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
            <div className="space-y-12 max-h-screen">
                <div className="container mx-auto w-full sm:w-4/12 border-b border-gray-900/40 mt-20 px-8 pb-4">
                
                    <h1 className="text-base font-bold text-2xl text-gray-900">TUNILMU</h1>
                    {errMsg && <ErrorMessage message={errMsg} handleErrClose={_ => setErrMsg("")}/>}

                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="username" className="block text-sm font-bold leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2 w-full">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-full">
                                <input
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Type your username here"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:col-span-full">
                            <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2 w-full">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-full">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="*********"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-full text-sm font-semibold text-gray-700 justify-self-end">
                            Didn't have account? <Link to="/signup" className="text-blue-500 font-bold">Signup</Link>
                        </div>
                        <div className="sm:col-span-full justify-self-end">
                            <button type="submit" className="justify-self-end align-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

function ErrorMessage({message, handleErrClose}) {
    return (
        <div p className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative sm:max-w-lg" role="alert">
            <strong className="font-bold mr-2">Error!</strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={handleErrClose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
            <p className="block">{message}</p>
        </div>
    );
}

export default Login;