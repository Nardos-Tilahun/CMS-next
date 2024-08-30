'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaProjectDiagram,
  FaUsers,
  FaChartLine,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMediumScreen) {
      setIsOpen(false); // Close sidebar on medium screens and larger
    }
  }, [isMediumScreen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Small Screens */}

      {/* Sidebar */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 h-screen bg-gray-900 flex flex-col transform transition-transform md:relative md:w-48 md:flex md:flex-col md:max-w-48 md:translate-x-0 z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            className="text-2xl fixed top-1 left-1 lg:hidden bg-gray-900 text-yellow-500 p-3 rounded-md z-50"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="mt-32 flex-1">
            <nav className="flex flex-col space-y-8">
              <Link href="/projects">
                <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-3 rounded-md text-sm font-medium flex items-center ml-4">
                  <FaProjectDiagram className="mr-2" />
                  Projects
                </div>
              </Link>
              <Link href="/users">
                <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-3 rounded-md text-sm font-medium flex items-center ml-4 ">
                  <FaUsers className="mr-2" />
                  Users
                </div>
              </Link>
              <Link href="/resources">
                <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-3 rounded-md text-sm font-medium flex items-center ml-4 ">
                  <FaChartLine className="mr-2" />
                  Resources
                </div>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Overlay for Small Screens */}
      {!isOpen && (
        <button
          className="text-2xl fixed top-1 left-1 lg:hidden bg-gray-900 text-yellow-500 p-3 rounded-md z-50"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
    </>
  );
};

export default Sidebar;
