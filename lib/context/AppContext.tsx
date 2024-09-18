'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Tab = 'projects' | 'users' | 'resources' | 'profitability';

interface AppContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const value = {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    setSearchQuery
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context ) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}