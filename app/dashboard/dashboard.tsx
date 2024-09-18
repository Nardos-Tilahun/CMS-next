'use client'

import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CalendarIcon, ClipboardIcon, DollarSignIcon, HardHatIcon, PlusCircleIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Dashboard() {
  const [activeProject, setActiveProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: "City Center Complex",
      progress: 65,
      startDate: "01/03/2023",
      endDate: "30/09/2024",
      status: "On Track",
      budget: 10000000,
      spent: 7800000,
      timeElapsed: 40,
      resources: {
        material: 3000000,
        labor: 2500000,
        equipment: 1500000,
        subcontractor: 3000000
      }
    },
    {
      id: 2,
      name: "Riverside Apartments",
      progress: 40,
      startDate: "15/05/2023",
      endDate: "20/12/2024",
      status: "Delayed",
      budget: 8000000,
      spent: 3200000,
      timeElapsed: 25,
      resources: {
        material: 2400000,
        labor: 2000000,
        equipment: 1200000,
        subcontractor: 2400000
      }
    },
    {
      id: 3,
      name: "Tech Park Office Buildings",
      progress: 80,
      startDate: "10/01/2023",
      endDate: "30/06/2024",
      status: "Ahead of Schedule",
      budget: 15000000,
      spent: 12000000,
      timeElapsed: 60,
      resources: {
        material: 4500000,
        labor: 3750000,
        equipment: 2250000,
        subcontractor: 4500000
      }
    }
  ]

  const averageProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)

  const resourceAllocationData = projects.map(project => ({
    name: project.name,
    budget: project.budget,
    timeElapsed: project.timeElapsed,
    material: project.resources.material,
    labor: project.resources.labor,
    equipment: project.resources.equipment,
    subcontractor: project.resources.subcontractor
  }))

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57']

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        
        <div className="flex items-center">
          <Button>
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Add Project
          </Button>
          <Avatar className="ml-4">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container px-6 py-8 mx-auto">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {/* Key Metrics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Project Progress</CardTitle>
                <ClipboardIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageProgress}%</div>
                <Progress value={averageProgress} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Financial Summary</CardTitle>
                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${projects.reduce((sum, project) => sum + project.spent, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total spent across all projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <HardHatIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">Ongoing construction projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="text-sm">
                  <li>New equipment delivered</li>
                  <li>Safety inspection completed</li>
                  <li>Project timeline updated</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Resource Allocation */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Resource Allocation Across Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={resourceAllocationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" stackId="a" fill="#8884d8" name="Total Budget" />
                    <Bar dataKey="subcontractor" stackId="b" fill="#82ca9d" name="Subcontractor" />
                    <Bar dataKey="equipment" stackId="b" fill="#ffc658" name="Equipment" />
                    <Bar dataKey="labor" stackId="b" fill="#ff7300" name="Labor" />
                    <Bar dataKey="material" stackId="b" fill="#0088FE" name="Material" />
                    <Bar dataKey="timeElapsed" fill="rgba(0, 0, 0, 0.1)" name="Time Elapsed (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Project List */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Sheet key={project.id}>
                <SheetTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>Progress: {project.progress}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={project.progress} className="mb-2" />
                      <p>Status: {project.status}</p>
                      <p>Budget: ${project.budget.toLocaleString()}</p>
                      <p>Spent: ${project.spent.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{project.name}</SheetTitle>
                    <SheetDescription>Project Details</SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <p>Start Date: {project.startDate}</p>
                        <p>End Date: {project.endDate}</p>
                        <p>Status: {project.status}</p>
                        <p>Progress: {project.progress}%</p>
                        <p>Budget: ${project.budget.toLocaleString()}</p>
                        <p>Spent: ${project.spent.toLocaleString()}</p>
                      </TabsContent>
                      <TabsContent value="tasks">
                        <ul>
                          <li>Foundation work - Completed</li>
                          <li>Steel framework - In Progress</li>
                          <li>Electrical wiring - Pending</li>
                          <li>Plumbing installation - Pending</li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="timeline">
                        <p>Project Milestones:</p>
                        <ul>
                          <li>Planning Phase: Completed</li>
                          <li>Foundation: Completed</li>
                          <li>Structural Work: In Progress (Due: 15/08/2023)</li>
                          <li>Interior Work: Pending (Due: 30/11/2023)</li>
                          <li>Finishing: Pending (Due: 28/02/2024)</li>
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Local Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">72°F</p>
                  <p>Partly Cloudy</p>
                </div>
                <div>
                  <p>Wind: 5 mph</p>
                  <p>Humidity: 65%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
    </div>
  )
}