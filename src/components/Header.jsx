import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faEllipsisH,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faBell,
  faChevronDown,
  faUser,
  faCog,
  faCircleInfo,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

// Import your logo images
import logoLight from '../assets/images/logo/logo.svg';
import logoDark from '../assets/images/logo/logo-dark.svg';
import ownerImage from '../assets/images/user/owner.jpg';

const Header = ({ sidebarToggle, setSidebarToggle }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const notifications = [
    {
      id: 1,
      user: {
        name: 'Terry Franci',
        image: 'user-02.jpg',
        online: true
      },
      project: 'Project - Nganter App',
      time: '5 min ago'
    },
    // Add more notifications as needed
  ];

  return (
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white lg:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
        <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4 dark:border-gray-800">
          {/* Hamburger Toggle Button */}
          <button 
            className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 lg:border dark:border-gray-800 dark:text-gray-400 ${
              sidebarToggle ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => setSidebarToggle(!sidebarToggle)}
          >
            <FontAwesomeIcon 
              icon={sidebarToggle ? faXmark : faBars} 
              className="fill-current"
            />
          </button>

          {/* Logo */}
          <Link to="/" className="lg:hidden">
            <img className="dark:hidden" src={logoLight} alt="Logo" />
            <img className="hidden dark:block" src={logoDark} alt="Logo" />
          </Link>

          {/* Menu Toggle Button */}
          <button 
            className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800 ${
              menuToggle ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => setMenuToggle(!menuToggle)}
          >
            <FontAwesomeIcon icon={faEllipsisH} className="fill-current" />
          </button>

          {/* Search Bar */}
          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    className="fill-gray-500 dark:fill-gray-400" 
                  />
                </span>
                <input 
                  type="text"
                  placeholder="Search or type command..."
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
                />
                <button className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                  <span>⌘</span>
                  <span>K</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side Menu */}
        <div className={`${menuToggle ? 'flex' : 'hidden'} shadow-theme-md w-full items-center justify-between gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0 lg:shadow-none`}>
          <div className="2xsm:gap-3 flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button 
              className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>

            {/* Notification Button */}
            <div className="relative">
              <button 
                className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setNotifying(false);
                }}
              >
                {notifying && (
                  <span className="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400">
                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  </span>
                )}
                <FontAwesomeIcon icon={faBell} />
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="shadow-theme-lg dark:bg-gray-dark absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0 dark:border-gray-800">
                  {/* Add notification content here */}
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-700 dark:text-gray-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <img src={ownerImage} alt="User" />
              </span>
              <span className="text-theme-sm mr-1 block font-medium">Musharof</span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`stroke-gray-500 dark:stroke-gray-400 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown */}
            {dropdownOpen && (
              <div className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800">
                {/* Add user dropdown content here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;