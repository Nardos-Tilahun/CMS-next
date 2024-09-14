'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/public/images/logoImage.webp';
import { FaProjectDiagram, FaUsers, FaChartLine } from 'react-icons/fa';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { useSession, signIn, signOut } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    !isProfileMenuOpen;
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-full flex bg-gray-900">
      <div className="flex flex-col justify-between h-full bg-gray-800 p-4 w-64">
        <div>
          <Link href="/">
            <div className="flex items-center mb-8">
              <Image className="h-24 w-24" src={logoImage} alt="Logo" />
            </div>
          </Link>
          <div className="flex flex-col space-y-4">
            <Link href="/projects">
              <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaProjectDiagram className="mr-2" />
                Projects
              </div>
            </Link>
            <Link href="/users">
              <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaUsers className="mr-2" />
                Users
              </div>
            </Link>
            <Link href="/resources">
              <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <FaChartLine className="mr-2" />
                Resources
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-600 focus:outline-none"
              >
                {/* <Image
                  className="h-10 w-10 rounded-full"
                  src={session.user.image || '/default-profile.png'}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                />
                <span>{session.user.name}</span> */}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute bottom-16 bg-gray-700 rounded-md shadow-lg w-48">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center w-full text-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-2 text-sm"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/api/auth/signin">
                <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiLogIn className="mr-2" />
                  Sign In
                </div>
              </Link>
              {/* <Link href="/auth/signup">
                <div className="text-yellow-500 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FiUserPlus className="mr-2" />
                  Sign Up
                </div>
              </Link> */}
            </>
          )}
        </div>
      </div>
      <div className="flex-1 p-10 bg-gray-900">
        {/* Main content goes here */}
      </div>
    </nav>
  );
};

export default NavBar;
