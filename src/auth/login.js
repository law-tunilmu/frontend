import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react"
import axios from "axios";
import { currentUsername, useAuth } from "./authProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";

const LOGIN_BE_URL=`${process.env.REACT_APP_BACKEND_HOSTNAME}/auth/login`

function Login({redirect_to='/'}) {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                const token = response.data.token;
                const username = currentUsername(token);
                setToken(token);

                navigate(redirect_to, { replace: true });
                toast(`Welcome ${username}`, {
                    type: "info"
                });
            }
        ).catch(err => {
            let msg = "";
            if (err.request) {
                msg = "Network error, please check your internet connection";
            }
            else if (err.response && err.response.status < 500) {
                msg = err.response.data.description;
            } else {
                msg = "Server Error :(, please try again later";
            }
            toast(msg, {
                type: "error",
                autoClose: false,
                hideProgressBar: true,
            });
        })
    }
    
    return (
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
                <div className="mx-auto mt-20 p-4 max-h-screen w-11/12 sm:w-6/12 lg:5/12 xl:w-4/12 border-2 border-gray-500">
                
                    <h1 className="font-bold text-[2rem] text-gray-600">TUNILMU</h1>

                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="username" className="block text-sm font-bold leading-6 text-gray-900">
                                Username
                            </label>
                            <input
                                required
                                type="text"
                                name="username"
                                autoComplete="username"
                                className="mt-2 w-full rounded-md border-[2px] border-gray-400"
                                placeholder="Type your username here"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        
                        <div className="sm:col-span-full">
                            <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900">
                                Password
                            </label>
                            <PasswordShowHide 
                                    name="password" value={password} 
                                    onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="sm:col-span-full text-sm font-semibold text-gray-700 justify-self-end">
                            Didn't have account? <Link to="/signup" className="text-blue-500 font-bold">Signup</Link>
                        </div>

                        <button type="submit" 
                                className=" col-span-full place-self-end w-fit py-2 px-4 rounded
                                            bg-blue-500 hover:bg-sky-400 text-white font-bold 
                                            focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                    </div>
                </div>
        </form>
    );
}

export function PasswordShowHide({name, value, onChange}) {
    const [isShowPass, setIsShowPass] = useState(false);
    const passRef = useRef();
    return (
        <div className="relative w-full h-fit">
            <input
                ref={passRef}
                type={isShowPass ? "text" : "password"}
                name={name}
                className="mt-2 w-full rounded-md border-[2px] border-gray-400 pr-[2rem]"
                placeholder="***********"
                autoComplete="password"
                value={value}
                onChange={onChange}
            />
            <button className="absolute top-[47%] right-2 z-10 w-fit h-fit"
                onClick={e => {
                    e.preventDefault();
                    setIsShowPass(prev => !prev);
                    passRef.current.focus();
                }}>
                { isShowPass ? <FaEye/> : <FaEyeSlash/> }
            </button>
        </div>
    )
}

export default Login;