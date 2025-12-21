import React, { useState } from 'react';
import { Menu, Search, Video, EllipsisVertical, User, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeUser } from '../store/slices/userSlice';

interface NavbarProps {
    toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(removeUser());
     setIsProfileOpen(false);
     navigate('/login');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-400 rounded-full hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-full">
               <Video className="w-5 h-5 fill-current" />
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-white sm:block font-display">
              VStream
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden max-w-2xl flex-1 mx-8 md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              className="block w-full p-2.5 pl-10 text-sm text-white bg-gray-900 border border-gray-700 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 outline-none transition-all"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
           {/* Mobile Search Icon */}
           <button className="p-2 text-gray-400 rounded-full md:hidden hover:bg-gray-800">
            <Search className="w-6 h-6" />
          </button>

          <button className="p-2 text-gray-400 rounded-full hover:bg-gray-800">
            <EllipsisVertical className="w-6 h-6" />
          </button>

          {user ? (
             <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-800 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                   {user.avatar ? (
                     <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                   ) : (
                      <User className="w-6 h-6 text-gray-400" />
                   )}
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 z-50 w-48 mt-2 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white" role="none">
                        {user.fullName || user.username}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link 
                            to="/profile" 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <User className='w-4 h-4 mr-2' />
                          Profile
                        </Link>
                      </li>
                      <li>
                         <Link 
                             to="/settings" 
                             className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                             onClick={() => setIsProfileOpen(false)}
                         >
                            <Settings className='w-4 h-4 mr-2' />
                             Settings
                         </Link>
                      </li>
                      <li>
                        <button 
                           onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        >
                            <LogOut className='w-4 h-4 mr-2' />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
             </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full hover:bg-gray-800">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Log in</span>
              </Link>
              
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-black transition-colors bg-purple-500 rounded-full hover:bg-purple-400">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
