'use client'

import React, { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PlusIcon, UserIcon, FileIcon, FlagIcon, PackageIcon, ClipboardIcon, DollarSignIcon, MenuIcon, XIcon, ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'


interface Milestone {
  name: string;
  dueDate: string;
}

interface BOQItem {
  item: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface Project {
  id: number;
  name: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'late';
  profit: number;
  milestones: Milestone[];
  boq: BOQItem[];
}

interface Resource {
  name: string;
  quantity: number;
  unit: string;
  allocated: number;
}

interface ProjectOverviewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

interface ResourceManagementProps {
  resources: Resource[];
}

interface ProfitabilityOverviewProps {
  projects: Project[];
}

// Mock data for demonstration
const projectData = [
  { 
    id: 1,
    name: 'Project A', 
    progress: 75, 
    status: 'in-progress', 
    profit: 50000,
    milestones: [
      { name: 'Foundation Complete', dueDate: '2023-07-15' },
      { name: 'Framing Complete', dueDate: '2023-08-30' }
    ],
    boq: [
      { item: 'Concrete', quantity: 100, unit: 'm³', unitPrice: 100, total: 10000 },
      { item: 'Steel', quantity: 5, unit: 'tons', unitPrice: 1000, total: 5000 }
    ]
  },
  { 
    id: 2,
    name: 'Project B', 
    progress: 100, 
    status: 'completed', 
    profit: 75000,
    milestones: [
      { name: 'Project Handover', dueDate: '2023-06-30' }
    ],
    boq: [
      { item: 'Paint', quantity: 50, unit: 'gallons', unitPrice: 30, total: 1500 },
      { item: 'Tiles', quantity: 1000, unit: 'sq ft', unitPrice: 5, total: 5000 }
    ]
  },
  { 
    id: 3,
    name: 'Project C', 
    progress: 30, 
    status: 'late', 
    profit: 25000,
    milestones: [
      { name: 'Site Preparation', dueDate: '2023-07-01' },
      { name: 'Foundation Start', dueDate: '2023-07-15' }
    ],
    boq: [
      { item: 'Excavation', quantity: 1, unit: 'lot', unitPrice: 5000, total: 5000 },
      { item: 'Gravel', quantity: 200, unit: 'tons', unitPrice: 20, total: 4000 }
    ]
  },
]

const resourceData = [
  { name: 'Cement', quantity: 1000, unit: 'bags', allocated: 70 },
  { name: 'Steel', quantity: 50, unit: 'tons', allocated: 60 },
  { name: 'Concrete', quantity: 500, unit: 'm³', allocated: 40 },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">ABC Contractor</h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <nav>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => { setActiveTab('projects'); setSelectedProject(null); }}>
              <ClipboardIcon className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab('users')}>
              <UserIcon className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab('resources')}>
              <PackageIcon className="mr-2 h-4 w-4" />
              Resources
            </Button>
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => setActiveTab('profitability')}>
              <DollarSignIcon className="mr-2 h-4 w-4" />
              Profitability
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Construction Management Dashboard</h1>
        </header>

        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden md:flex">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="profitability">Profitability</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              {selectedProject ? (
                <ProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />
              ) : (
                <ProjectOverview projects={projectData as Project[]} onSelectProject={setSelectedProject} />
              )}
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UserManagement />
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <ResourceManagement resources={resourceData} />
            </TabsContent>
            <TabsContent value="profitability" className="space-y-4">
              <ProfitabilityOverview projects={projectData as Project[]} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function ProjectOverview({ projects, onSelectProject }: ProjectOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mb-4">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'completed' ? 'bg-green-200 text-green-800' :
                    project.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {project.status}
                  </span>
                  <span className="font-bold">${project.profit.toLocaleString()}</span>
                </div>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectProject(project)}>View Details</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectDetails({ project, onBack }: ProjectDetailsProps) {  return (
    <div className="space-y-4">
      <Button onClick={onBack} variant="outline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{project.name} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Milestones</h3>
              <ul className="space-y-2">
                {project.milestones.map((milestone, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{milestone.name}</span>
                    <span className="text-sm text-gray-500">{milestone.dueDate}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Bill of Quantity (BOQ)</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {project.boq.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td className="text-right">{item.quantity} {item.unit}</td>
                      <td className="text-right">${item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Project Profit</h3>
            <p className="text-2xl font-bold">${project.profit.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mb-4">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New User
        </Button>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample user card */}
          <Card>
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Project Manager</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">Update Profile</Button>
            </CardContent>
          </Card>
          {/* Add more user cards as needed */}
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceManagement({ resources }: ResourceManagementProps) {  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="resource-upload">Upload Resource Excel File</Label>
          <Input id="resource-upload" type="file" accept=".xlsx, .xls" />
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Resource</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Allocated</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{resource.name}</td>
                <td className="border border-gray-300 p-2">{resource.quantity}</td>
                <td className="border border-gray-300 p-2">{resource.unit}</td>
                <td className="border border-gray-300 p-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${resource.allocated}%` }}></div>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <Button variant="outline" size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function ProfitabilityOverview({ projects }: ProfitabilityOverviewProps) {
  const profitData = projects.map(project => ({
    name: project.name,
    profit: project.profit
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profitability Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${projects.reduce((sum, project) => sum + project.profit, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Most Profitable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.reduce((max, project) => max.profit > project.profit ? max : project).name}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Least Profitable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.reduce((min, project) => min.profit < project.profit ? min : project).name}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}