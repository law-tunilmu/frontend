import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormErrorMessage from "../components/FormErrorMessage";

const SIGN_UP_BE_URL = `${process.env.REACT_APP_BACKEND_HOSTNAME}/auth/signup`
const ROLES = {"STUDENT": "STUDENT", "MENTOR": "MENTOR"};

function SignUp() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
     
    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginProcess: ''
    })

    const [role, setRole] = useState(ROLES.STUDENT);

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(name, value);
    }

    const onRoleChange = e => {
        setRole(e.target.value);
    }
       
    const validateInput = (name, value) => {
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
    
            switch (name) {    
            case "password":
                if (!value) {
                    stateObj[name] = "Please enter Password.";
                } else if (input.confirmPassword && value !== input.confirmPassword) {
                    stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                } else {
                    stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                }
                break;
    
            case "confirmPassword":
                if (!value) {
                    stateObj[name] = "Please enter Confirm Password.";
                } else if (input.password && value !== input.password) {
                    stateObj[name] = "Password and Confirm Password does not match.";
                }
                break;
    
            default:
                if (!value) {
                    stateObj[name] = `Please enter ${name}.`;
                }
                break;
            }
    
            return stateObj;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(error.username || error.email || error.password || error.confirmPassword ) return
        if(!(input.username || input.email || input.password)) {
            setError(prev => ({
                ...prev,
                "username": "Please enter username."
              }));
            return
        }
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
                    "role":role || ROLES.STUDENT
                },
            },
        )
        .then(_ => {
                navigate('/login', { replace: true });
            }
        ).catch(err => {
            let errorMsg = "Network Error. Please try again later.";
            if(err.response) {
                errorMsg = "Username and/or email are already existed";
            } 
            setError(prev => ({
                ...prev,
                "loginProcess":errorMsg
              }));
        })
    }

    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="mt-2 space-y-10 w-11/12 sm:w-4/5 md:w-2/5 mx-auto">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="font-semibold text-lg text-gray-800 mb-3">User Profile</h2>

                    {error.loginProcess && 
                        <FormErrorMessage message={error.loginProcess} 
                            handleErrClose={() => setError(prev => ({...prev, "loginProcess":""}))}
                        />
                    }

                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <FieldLabel name="username" placeholder="John Doe" handleChange={onInputChange}/>
                            {error.username && <span className='err text-red-500'>{error.username}</span>}
                        </div>
                        <div className="sm:col-span-full">
                            <FieldLabel name="email" placeholder="John.doe@email.com" handleChange={onInputChange}/>
                            {error.email && <span className='err text-red-500'>{error.email}</span>}
                        </div>
                        <div className="sm:col-span-full">
                            <FieldLabel name="password" placeholder="********" type="password" handleChange={onInputChange}/>
                            {error.password && <span className='err text-red-500'>{error.password}</span>}
                        </div>
                        <div className="sm:col-span-full">
                            <FieldLabel name="confirmPassword" placeholder="********" type="password" handleChange={onInputChange}/>
                            {error.confirmPassword && <span className='err text-red-500'>{error.confirmPassword}</span>}
                        </div>
                        <fieldset className="sm:col-span-full">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Select Role</legend>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">Role is <span className="font-bold">PERMANENT</span></p> */}
                            <div className="mt-4 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input 
                                        name="studentRole" type="radio" 
                                        className="h-4 w-4 border-gray-600 bg-gray-100 text-indigo-600 focus:ring-indigo-600"
                                        checked={!role || role === ROLES.STUDENT}
                                        value={ROLES.STUDENT}
                                        onChange={onRoleChange}
                                    />
                                    <label for="studentRole" className="block text-sm font-medium leading-6 text-gray-900">Student</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input 
                                        name="mentorRole" type="radio" 
                                        className="h-4 w-4 border-gray-600 bg-gray-100 text-indigo-600 focus:ring-indigo-600"
                                        checked={role === ROLES.MENTOR}
                                        value={ROLES.MENTOR}
                                        onChange={onRoleChange}
                                    />
                                    <label for="mentorRole" className="block text-sm font-medium leading-6 text-gray-900">Mentor</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-x-6 sm:max-w-lg">
                        <button 
                            type="button" 
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => navigate("/", {"replace": true})}>
                                Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white 
                                shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function FieldLabel({name, placeholder, type="text", handleChange}) {
    const nameTitleCase = (name !== "confirmPassword") ? name.charAt(0).toUpperCase() + name.substring(1) : "Confirm Password";
    return (
        <>
          <label for={name} className="block text-sm font-semibold leading-6 text-gray-600">{nameTitleCase}</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
              <input 
                type={type} name={name} id={name}
                autoComplete={name}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                placeholder={placeholder || name} 
                onChange={handleChange}
                />
            </div>
          </div>
        </>
    );
}

export default SignUp;