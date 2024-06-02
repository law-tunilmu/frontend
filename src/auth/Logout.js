import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from './authProvider';
import { Dialog } from "@headlessui/react";
import { FaCircleNotch } from "react-icons/fa";
import { useState } from 'react';

export default function LogoutBtn() {
  const { setToken } = useAuth();
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoading) return;

    const beUrl = process.env.REACT_APP_AUTH_BE + "/auth/logout";
    try {
      setIsLoading(true);
      await axios.post(beUrl);
    } catch (e) {
      throw(e);
      
    } finally {
      setIsLoading(false);
      setToken();
      navigate('/', { replace: true });
      toast("Good Bye", {type: "info", pauseOnHover: false, autoClose: 4000});
    }
  }
  return (
    <>
      <button className='flex gap-2 rounded-md p-2 text-gray-200 hover:bg-gray-700 
                          hover:text-white focus:outline-none 
                          focus:ring-2 focus:ring-inset focus:ring-white'
              onClick={() => setIsOpen(true)}>
          <p>Logout</p>
          <FiLogOut className='size-6' />
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm">
            <div className="max-w-xl space-y-4 border shadow-md shadow-gray-200 bg-white px-12 py-5">
              <p className='font-bold text-lg'>TUNILMU</p>
              <p>Are you sure to <strong>Logout</strong> now?</p>
              <div className="flex gap-4 justify-center">
                <button 
                    className="p-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-sm" 
                    onClick={() => setIsOpen(false)}>
                        Cancel
                </button>
                <button 
                        className="inline-flex gap-2 p-2 bg-red-500 
                                    text-white font-semibold rounded-sm
                                    hover:bg-red-800"
                        onClick={handleLogout}>                                                        
                    { 
                        isLoading &&
                            <FaCircleNotch className="animate-spin h-full w-auto min-h-5" color="white"/> 
                    } 
                    Logout

                </button>
              </div>

          </div>
        </div>
      </Dialog>
    </>
  )
}