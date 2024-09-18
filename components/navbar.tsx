'use client'

import React from 'react';
import { useAppContext } from '../lib/context/AppContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HardHatIcon, MenuIcon } from 'lucide-react';
import NavbarProfile from './navbarProfile';
import { UserIcon, FileIcon, PackageIcon, DollarSignIcon, XIcon } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navbar() {
  const { searchQuery, setSearchQuery, toggleSidebar, isSidebarOpen } = useAppContext();
  const pathname = usePathname();

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  const menuItems = [
    { icon: FileIcon, label: 'Projects', path: '/projects' },
    { icon: UserIcon, label: 'Users', path: '/users' },
    { icon: PackageIcon, label: 'Resources', path: '/resources' },
    { icon: DollarSignIcon, label: 'Profitability', path: '/profitability' },
  ];

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-gray-300 shadow-md">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </Button>
          {!isSidebarOpen && (
            <Link href="/" passHref className="flex items-center space-x-2">
              <HardHatIcon className="w-8 h-8 text-yellow-500" />
              <h1 className="text-2xl font-bold">ConstructNext</h1>
            </Link>
          )}
        </div>
        <div className="flex items-center"> 
          <div className="hidden md:flex  space-x-4">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
          <NavbarProfile />
        </div>
        
      </nav>
    </>
  );
}