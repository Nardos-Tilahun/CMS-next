'use client'
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserIcon, FileIcon, PackageIcon, DollarSignIcon, XIcon, HardHatIcon } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
 
  const menuItems = [
    { icon: FileIcon, label: 'Projects', path: '/projects' },
    { icon: UserIcon, label: 'Users', path: '/users' },
    { icon: PackageIcon, label: 'Resources', path: '/resources' },
    { icon: DollarSignIcon, label: 'Profitability', path: '/profitability' },
  ];

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center text-xl font-bold">
      Construct<HardHatIcon className="w-8 h-8 text-yellow-500"/>Next
            {/* <h1 className="text-xl font-bold">Next</h1> */}
            </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                router.push(item.path);
                if (window.innerWidth < 768) toggleSidebar();
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}