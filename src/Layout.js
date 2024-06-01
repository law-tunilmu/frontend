import { useState } from 'react'
import { useAuth } from './auth/authProvider'
import { FaBars, FaUserAlt, FaBookmark } from 'react-icons/fa'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaCartShopping, FaXmark } from 'react-icons/fa6'
import { FaHome, FaSearch } from 'react-icons/fa'
import { Bounce, ToastContainer } from 'react-toastify';
import LogoutBtn from './auth/Logout'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout() {
  const [chosen, setChosen] = useState();

  return (
    
    <>
      <NavBar chosen={chosen} setChosen={setChosen}/>
      <ToastContainer 
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
      />
      <Outlet />      
      <div className='sm:hidden h-[30vh] w-full'></div>
      <Footer chosen={chosen} setChosen={setChosen}/>
    </>
  )
}

const WIDGETS = [
  {name: 'home', to: '/', icon: <FaHome className='size-6' />},
  {name: 'search', to: '/course/search', icon: <FaSearch className='size-6' />},
  {name: 'collection', to: '#', icon: <FaBookmark className='size-6' />},
  {name: 'cart', to: '#', icon: <FaCartShopping className='size-6' />},
  {name: 'profile', to: '/user/me', icon: <FaUserAlt className='size-6' />}
];

const SIDEBAR_DATA = [
  {id: "sb-profile", name: 'Profile', to: '/user/me'},
  {id: "sb-my-course", name: 'My Course', to: '#'},
  {id: "sb-create-course", name:'Create Course', to:'/course/create'},
];

function NavBar() {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <nav className='sticky top-0 z-[90] w-screen h-[60px] bg-gray-800 flex items-center'>
        <div className='mx-auto h-fit w-full sm:w-10/12 px-2 sm:px-6 lg:px-8 flex items-center justify-between'>

          <button className='relative inline-flex gap-2 items-center justify-center 
                              rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white 
                              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  onClick={() => setIsOpen(prev => !prev)}
          >
            {
              isOpen ? 
                <FaXmark className="block h-6 w-6" aria-hidden="true" /> :
                <FaBars className="block h-6 w-6" aria-hidden="true" />
            } 
          </button>

          <div className='inline-flex items-center'>
            { token ? <LogoutBtn /> : <LoginSignUp /> }
          </div>

        </div>
      </nav>
      
      {/*sidebar*/}
      <div className={classNames(
        isOpen ? "left-0":"left-[-100%]",
        "fixed top-0 bg-gray-800/95 w-[50vw] sm:w-[20vw] h-screen",
        "flex flex-col transition gap-5 z-[100]"
      )}>
        
        <div className='w-full flex items-center justify-between bg-gray-800 h-[60px] border-b-2 px-2'>
          <h1 className='font-bold text-white text-[20px]'>TUNILMU</h1>
          <button onClick={() => setIsOpen(false)}>
            <FaXmark className='size-8' color='white'/>
          </button>
        </div>
        
        {
          SIDEBAR_DATA.map((data, idx) =>
            <Link key={idx} to={data.to} 
                  className={
                            classNames(
                              pathname === data.to ? 
                                      'bg-gray-700 text-white outline-none ring-2 ring-inset ring-white':
                                      'text-gray-400',
                              'font-semibold rounded-md px-4 py-2', 
                              'hover:bg-gray-700 hover:text-white focus:outline-none',
                              'focus:ring-2 focus:ring-inset focus:ring-white'
                            )
                          }
            >
              {data.name}
            </Link>
          )
        }

      </div>
    </>
  );
}


function Footer() {
  const { pathname } = useLocation();
  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 w-full h-fit bg-white z-[90]  flex justify-evenly
                      sm:top-0 sm:bottom-0 sm:left-0 sm:w-fit sm:h-[60vh] sm:my-auto sm:flex-col 
                      shadow-lg rounded-md border-solid border-2 border-gray-200
                       '>
        {
          WIDGETS.map((widget, idx) =>
            <Link key={idx} to={widget.to} 
                className={
                  classNames(
                    pathname === widget.to && 'bg-gray-300',
                    'hover:bg-gray-400 p-2 w-fit h-full sm:w-full sm:h-fit'
                  )
                }
            >
              {widget.icon}
            </Link>
          )
        }
      </div>
    </>
  );
}

function LoginSignUp() {
    return (
        <>
            <Link to="/login" className="outline outline-1 outline-slate-500 m-2 bg-slate-500/40  
                                          text-white font-bold p-2 rounded 
                                          hover:bg-gray-500 focus:shadow-outline">
                Login
            </Link>
            <Link to="/signup" className="outline outline-1 outline-slate-500 bg-blue-500
                                        text-white font-bold p-2 rounded 
                                        hover:bg-blue-500/70 focus:shadow-outline">
                Signup
            </Link>
        </>
    );
}