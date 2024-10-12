'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortfolioRoute = pathname.startsWith('/portfolio');

  const [isContentShort, setIsContentShort] = useState(true);

  useEffect(() => {
    const checkContentHeight = () => {
      const windowHeight = window.innerHeight;
      const contentHeight = document.body.scrollHeight;
      setIsContentShort(contentHeight <= windowHeight);
    };

    checkContentHeight();
    window.addEventListener('resize', checkContentHeight);

    return () => window.removeEventListener('resize', checkContentHeight);
  }, [children]);


  if (isPortfolioRoute) {
    return <>{children}</>;
  }

    return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
      <div className={isContentShort ? "mt-auto" : ""}>
        <Footer />
      </div>
    </div>
  );
}