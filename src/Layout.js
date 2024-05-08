import { Fragment } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuItems, MenuItem, MenuButton, Transition } from '@headlessui/react'
import { useAuth } from './auth/authProvider'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaXing, FaUserAlt } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'My Course', href: '#', current: false },
  { name: 'Payment', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout() {
    const { token } = useAuth();

    return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaXing className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className='font-bold text-white'>TUNILMU</h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {
                    (token && <ProfileDropdown />) || 
                    (
                        <div className='invisible sm:visible'>
                            <LoginSignUp />
                        </div>
                    )
                }
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
                {!token && <LoginSignUp />}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
    <Outlet />
    </>
  )
}

function LoginSignUp() {
    return (
        <>
            <Link to="/login" className="outline outline-1 outline-slate-500 text-white font-bold py-2 px-4 mx-2 rounded hover:bg-gray-500 focus:shadow-outline">
                Login
            </Link>
            <Link to="/signup">
                <button className="outline outline-1 outline-blue-500 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:shadow-outline">Signup</button>
            </Link>
        </>
    );
}

function ProfileDropdown() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setToken();  
    navigate("/", {'replace': true});
  }

  return (
    <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <FaUserAlt className='h-8 w-8 rounded-full bg-gray-500' color='white'/>
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* <MenuItem>
            {({ active }) => (
                <a
                href="#"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Your Profile
                </a>
            )}
            </MenuItem> */}
            <MenuItem>
              {({ active }) => (
                  <a
                    onClick={handleLogout}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Sign out
                  </a>
              )}
            </MenuItem>
        </MenuItems>
        </Transition>
    </Menu>
  );
}