import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa";
import axios from "axios";

import USER_CONSTRAINTS from "./UserConstans";
import { PasswordShowHide } from "./Login";

const SIGN_UP_BE_URL = `${process.env.REACT_APP_AUTH_BE}/auth/signup`

function SignUp() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', 
        role: USER_CONSTRAINTS.ROLES.STUDENT
      });
     
    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginProcess: '',
        role: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onInputChange = e => {
        const { name, value } = e.target;
        
        const error = validateInput(name, value);

        setError(prevErr => ({
            ...prevErr,
            [name]: error
        }));

        setInput(prev => ({
          ...prev,
          [name]: value
        }));
    }
       
    const validateInput = (name, value) => {
        let error = "";
        if (!value) {
            error = `Please enter ${name}.`;
        }
        else {
            switch (name) {
                case "username":
                    if (input.username.length > USER_CONSTRAINTS.USERNAME.MAX_LEN) {
                        error = `Username must not be larger than 
                                                ${USER_CONSTRAINTS.USERNAME.MAX_LEN} characters`
                    }   
                    break; 
                case "password":
                    if (input.confirmPassword && value !== input.confirmPassword) {
                        error = "Password and Confirm Password does not match.";
                    }
                    break;
        
                case "confirmPassword":
                    if (input.password && value !== input.password) {
                        error = "Password and Confirm Password does not match.";
                    }
                    break;
        
                default:
                    break;
            }
        }
        return error;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;

        let _error = "";
        let _name = "";
        for (const name in input) {
            const err = validateInput(name, input[name]);
            if (err) {
                _name = name;
                _error = err;
                break
            }
        }

        if( _error ) {
            setError(prev => ({
                ...prev,
                [_name]: _error
            }));
            return
        }

        setIsSubmitting(true);
        axios(
            {
                method:"post",
                url: SIGN_UP_BE_URL,
                headers:{'Content-Type':"application/json"},
                withCredentials: false,
                data: {
                    "username": input.username,
                    "password":input.password, 
                    "email":input.email,
                    "role":input.role
                },
            },
        )
        .then(_ => {
                navigate('/login', { replace: true });
                toast("Registration is successful", {
                    position: "top-right",
                    type: "success",
                    pauseOnHover: false,
                    autoClose: 4000
                });
            }
        ).catch(err => {
                let errorMsg = "Network Error. Please try again later.";
                if(err.response) {
                    errorMsg = "Username and/or email are already existed";
                } 
                toast(errorMsg, {
                    type: "error",
                    autoClose: false,
                    hideProgressBar: true,
                });  
            }
        ).finally(() => {
                setIsSubmitting(false);
            }
        )
    }

    return (
        <form id="signup" action="" method="post" onSubmit={handleSubmit}>
            <div className="mt-2 w-11/12 sm:w-4/5 md:w-2/5 mx-auto grid grid-cols-1 sm:grid-cols-6 gap-6">
                <h2 className="sm:col-span-full font-semibold text-[1.5rem] text-gray-800 mb-3">
                    <strong>Tunilmu</strong> User Profile
                </h2>

                <div className="sm:col-span-full">
                    <FieldLabel name="username" placeholder="John Doe" 
                                handleChange={onInputChange}/>
                    {error.username && <span className='err text-red-500'>{error.username}</span>}
                </div>
                
                <div className="sm:col-span-full">
                    <FieldLabel name="email" placeholder="John.doe@email.com" 
                                handleChange={onInputChange}/>
                    {error.email && <span className='err text-red-500'>{error.email}</span>}
                </div>
                
                <div className="sm:col-span-full">
                    <FieldLabel name="password" placeholder="********" 
                                handleChange={onInputChange}/>
                    {error.password && <span className='err text-red-500'>{error.password}</span>}
                </div>
                
                <div className="sm:col-span-full">
                    <FieldLabel name="confirmPassword" placeholder="********" 
                                type="password" handleChange={onInputChange}/>
                    {error.confirmPassword && <span className='err text-red-500'>{error.confirmPassword}</span>}
                </div>

                <fieldset className="sm:col-span-full">
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Select Role</legend>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-x-3">
                            <input 
                                name="studentRole" type="radio" 
                                className="h-4 w-4 border-gray-600 bg-gray-100 
                                            text-indigo-600 focus:ring-indigo-600"
                                checked={!input.role || 
                                            input.role === USER_CONSTRAINTS.ROLES.STUDENT}
                                value={USER_CONSTRAINTS.ROLES.STUDENT}
                                onChange={
                                    () => setInput(prev => ({...prev, role:USER_CONSTRAINTS.ROLES.STUDENT}))
                                }
                            />
                            <label htmlFor="studentRole" 
                                    className="block text-sm font-medium 
                                                leading-6 text-gray-900">
                                Student
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input 
                                name="mentorRole" type="radio" 
                                className="h-4 w-4 border-gray-600 bg-gray-100 
                                            text-indigo-600 focus:ring-indigo-600"
                                checked={input.role === USER_CONSTRAINTS.ROLES.MENTOR}
                                value={USER_CONSTRAINTS.ROLES.MENTOR}
                                onChange={
                                    () => setInput(prev => ({...prev, role:USER_CONSTRAINTS.ROLES.MENTOR}))
                                }
                            />
                            <label htmlFor="mentorRole" 
                                    className="block text-sm font-medium 
                                                leading-6 text-gray-900">
                                Mentor
                            </label>
                        </div>
                    </div>
                </fieldset>
                
                <div className="sm:col-span-full justify-self-end flex gap-x-3">
                    <button 
                        type="button" 
                        className="text-sm font-semibold leading-6 text-gray-900 px-2 py-1 
                                    bg-gray-200 hover:bg-gray-300 border-2 rounded-md"
                        onClick={() => navigate("/", {"replace": true})}>
                            Cancel
                    </button>
                    <button 
                        type="submit" 
                        className=" col-span-full place-self-end w-fit py-2 px-2 rounded
                                    inline-flex items-center gap-2 bg-blue-500 
                                    hover:bg-sky-400 text-white font-bold 
                                    focus:outline-none focus:shadow-outline">
                        
                            { 
                                isSubmitting &&
                                    <FaCircleNotch className="animate-spin h-full w-auto min-h-5" color="white"/> 
                            }
                            Register
                    </button>
                </div>
            </div>
        </form>
    );
}

function FieldLabel({name, placeholder, type="text", handleChange}) {
    const nameTitleCase = (name !== "confirmPassword") ? 
                            name.charAt(0).toUpperCase() + name.substring(1) : 
                            "Confirm Password";
    return (
        <>
            <label htmlFor={name} className="mb-1 block text-sm font-semibold leading-6 text-gray-800">
                {nameTitleCase}
            </label>
            {
                (nameTitleCase === "Password") ?
                <PasswordShowHide name={name} onChange={handleChange}/> :
                <input 
                    type={type} name={name}
                    autoComplete={name}
                    className="w-full rounded-md border-[2px] border-gray-400" 
                    placeholder={placeholder || name} 
                    onChange={handleChange}
                /> 
            }
        </>
    );
}

export default SignUp;