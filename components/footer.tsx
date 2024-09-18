'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes('#')) {
      const id = pathname.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  return (
    <div className="px-6 py-4 bg-gray-300">
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <p>&copy; 2024 ConstructNext. </p>
        <p>All rights reserved. </p>
        <div className="flex space-x-4">
          <Link href="/portfolio/#about" className="hover:text-gray-700">About us</Link>
        </div>
      </div>
    </div>
  </div>
  )
}
