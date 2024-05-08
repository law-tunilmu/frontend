import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios";
import { useAuth } from "./authProvider";

import FormErrorMessage from "../components/FormErrorMessage";

const LOGIN_BE_URL=`${process.env.REACT_APP_BACKEND_HOSTNAME}/auth/login`

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
                url: LOGIN_BE_URL,
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
            if (err.response) {
                setErrMsg(err.response.data.description);
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
                    {errMsg && <FormErrorMessage message={errMsg} handleErrClose={_ => setErrMsg("")}/>}

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


export default Login;