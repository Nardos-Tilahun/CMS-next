import React from 'react';
import Link from 'next/link';
import logoImage from '@/public/images/logoImage.webp';
import Image from 'next/image';
import { FaProjectDiagram, FaUsers, FaChartLine } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <button className="flex-shrink-0 ml-12">
              <Link href="/">
                <Image className="h-24 w-24" src={logoImage} alt="Logo" />
              </Link>
            </button>
            <div className="w-full flex flex-between">
              <div className="hidden lg:block">
                <div className="ml-10 flex items-baseline space-x-4">
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
              <div className="">
                <div className="ml-10 flex items-baseline space-x-4">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
