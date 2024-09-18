'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash, Plus, Upload, Activity, Search, ChevronRight } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'

// Type definitions
type ResourceType = 'materials' | 'labor' | 'equipment' | 'subcontractors'
type Resource = {
  id: number
  name: string
  category: string
  unit: string
  rate: number
}
type Resources = {
  [key in ResourceType]: Resource[]
}

const resourceStructure: Record<ResourceType, Record<string, string[]>> = {
  materials: {
    'Concrete': ['Ready-mix Concrete', 'Cement', 'Sand', 'Gravel'],
    'Steel': ['Reinforcement Bars', 'Structural Steel', 'Wire Mesh'],
    'Wood': ['Plywood', 'Lumber', 'Formwork'],
    'Finishes': ['Paint', 'Tiles', 'Wallpaper']
  },
  labor: {
    'Skilled': ['Carpenters', 'Electricians', 'Plumbers', 'Welders'],
    'Unskilled': ['Helpers', 'Cleaners'],
    'Management': ['Project Managers', 'Site Engineers', 'Supervisors']
  },
  equipment: {
    'Heavy Machinery': ['Excavators', 'Bulldozers', 'Cranes'],
    'Power Tools': ['Drills', 'Saws', 'Grinders'],
    'Vehicles': ['Trucks', 'Forklifts', 'Concrete Mixers']
  },
  subcontractors: {
    'Electrical': ['Wiring Subcontractor', 'Lighting Subcontractor'],
    'Plumbing': ['Pipe Installation', 'Fixture Installation'],
    'HVAC': ['Ductwork Installation', 'AC Installation']
  }
}

const mockResources: Resources = {
  materials: [
    { id: 1, name: 'Ready-mix Concrete', category: 'Concrete', unit: 'm3', rate: 100.00 },
    { id: 2, name: 'Cement', category: 'Concrete', unit: 'bag', rate: 10.00 },
    { id: 3, name: 'Sand', category: 'Concrete', unit: 'm3', rate: 30.00 },
    { id: 4, name: 'Gravel', category: 'Concrete', unit: 'm3', rate: 40.00 },
    { id: 5, name: 'Reinforcement Bars', category: 'Steel', unit: 'ton', rate: 1000.00 },
    { id: 6, name: 'Plywood', category: 'Wood', unit: 'sheet', rate: 20.00 },
  ],
  labor: [
    { id: 1, name: 'Carpenter', category: 'Skilled', unit: 'hour', rate: 25.00 },
    { id: 2, name: 'Helper', category: 'Unskilled', unit: 'hour', rate: 15.00 },
    { id: 3, name: 'Project Manager', category: 'Management', unit: 'month', rate: 5000.00 },
  ],
  equipment: [
    { id: 1, name: 'Excavator', category: 'Heavy Machinery', unit: 'hour', rate: 150.00 },
    { id: 2, name: 'Drill', category: 'Power Tools', unit: 'day', rate: 50.00 },
    { id: 3, name: 'Truck', category: 'Vehicles', unit: 'day', rate: 200.00 },
  ],
  subcontractors: [
    { id: 1, name: 'Wiring Subcontractor', category: 'Electrical', unit: 'project', rate: 10000.00 },
    { id: 2, name: 'Pipe Installation', category: 'Plumbing', unit: 'project', rate: 8000.00 },
    { id: 3, name: 'Ductwork Installation', category: 'HVAC', unit: 'project', rate: 15000.00 },
  ],
}

export function Resources({ params }: { params: { id: string } }) {
  const [resources, setResources] = useState<Resources>(mockResources)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPriceLogModalOpen, setIsPriceLogModalOpen] = useState(false)
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [selectedTab, setSelectedTab] = useState<ResourceType>('materials')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showMainComponentsOnly, setShowMainComponentsOnly] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch resources from an API here
    // For now, we're using the mock data
    setResources(mockResources)
  }, [])

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setUploadedFile(file)
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      setPreviewData(jsonData)
    }
    reader.readAsArrayBuffer(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleEditResource = (updatedResource: Resource) => {
    setResources(prevResources => ({
      ...prevResources,
      [selectedTab]: prevResources[selectedTab].map(resource => 
        resource.id === updatedResource.id ? updatedResource : resource
      )
    }))
    setIsEditModalOpen(false)
  }

  const handleDeleteResource = () => {
    if (selectedResource) {
      setResources(prevResources => ({
        ...prevResources,
        [selectedTab]: prevResources[selectedTab].filter(resource => resource.id !== selectedResource.id)
      }))
    }
    setIsDeleteModalOpen(false)
  }

  const handlePriceUpdate = (newPrice: number, note: string) => {
    if (selectedResource) {
      setResources(prevResources => ({
        ...prevResources,
        [selectedTab]: prevResources[selectedTab].map(resource => 
          resource.id === selectedResource.id ? { ...resource, rate: newPrice } : resource
        )
      }))
    }
    setIsPriceLogModalOpen(false)
  }

  const handleAddResource = (newResource: Omit<Resource, 'id'>) => {
    setResources(prevResources => ({
      ...prevResources,
      [selectedTab]: [...prevResources[selectedTab], { id: Date.now(), ...newResource }]
    }))
    setIsAddResourceModalOpen(false)
  }

  const handleUploadConfirm = () => {
    setResources(prevResources => ({
      ...prevResources,
      [selectedTab]: [...prevResources[selectedTab], ...previewData]
    }))
    setIsUploadModalOpen(false)
    setUploadedFile(null)
    setPreviewData([])
  }

  const filteredResources = resources[selectedTab].filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || resource.category === selectedCategory) &&
    (!selectedSubcategory || resource.name === selectedSubcategory)
  )

  const renderResourceNavigation = () => {
    const structure = resourceStructure[selectedTab]
    return (
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {Object.entries(structure).map(([category, subcategories]) => (
            <div key={category}>
              <button
                className={`flex items-center justify-between w-full p-2 text-left font-medium transition-colors ${
                  selectedCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => {
                  setSelectedCategory(category === selectedCategory ? '' : category)
                  setSelectedSubcategory('')
                }}
              >
                {category}
                <ChevronRight className={`h-4 w-4 transition-transform ${selectedCategory === category ? 'rotate-90' : ''}`} />
              </button>
              {selectedCategory === category && (
                <div className="ml-4 mt-2 space-y-2">
                  {subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      className={`block w-full p-2 text-left transition-colors ${
                        selectedSubcategory === subcategory ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedSubcategory(subcategory === selectedSubcategory ? '' : subcategory)}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  }

  const renderResourceTable = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>{resource.unit}</TableCell>
                  <TableCell>${resource.rate.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedResource(resource)
                        setIsEditModalOpen(true)
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedResource(resource)
                        setIsDeleteModalOpen(true)
                      }}>
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedResource(resource)
                        setIsPriceLogModalOpen(true)
                      }}>
                        <Activity className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resource Management</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsAddResourceModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Resource
            </Button>
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Upload Resources
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 flex-grow">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-main-components"
              checked={showMainComponentsOnly}
              onCheckedChange={setShowMainComponentsOnly}
            />
            <Label htmlFor="show-main-components">Show Main Components Only</Label>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as ResourceType)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="labor">Labor</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="subcontractors">Subcont.</TabsTrigger>
                </TabsList>
              </Tabs>
              {renderResourceNavigation()}
            </CardContent>
          </Card>
          <div className="col-span-3">
            {renderResourceTable()}
          </div>
        </div>

        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Resources</DialogTitle>
              <DialogDescription>Review and confirm the uploaded resource data.</DialogDescription>
            </DialogHeader>
            {previewData.length > 0 ? (
              <div className="max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(previewData[0]).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, cellIndex) => (
                          <TableCell key={cellIndex}>{String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p>No data to preview. Please upload a file.</p>
            )}
            <DialogFooter>
              <Button onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
              <Button onClick={handleUploadConfirm} disabled={previewData.length === 0}>Confirm Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Resource</DialogTitle>
              <DialogDescription>Make changes to the resource details here.</DialogDescription>
            </DialogHeader>
            {selectedResource && (
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const updatedResource: Resource = {
                  ...selectedResource,
                  name: formData.get('resourceName') as string,
                  category: formData.get('category') as string,
                  unit: formData.get('unit') as string,
                  rate: parseFloat(formData.get('rate') as string),
                }
                handleEditResource(updatedResource)
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resourceName">Resource Name</Label>
                    <Input id="resourceName" name="resourceName" defaultValue={selectedResource.name} />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" defaultValue={selectedResource.category} />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" name="unit" defaultValue={selectedResource.unit} />
                  </div>
                  <div>
                    <Label htmlFor="rate">Rate</Label>
                    <Input id="rate" name="rate" type="number" defaultValue={selectedResource.rate} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this resource?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the resource and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteResource}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isPriceLogModalOpen} onOpenChange={setIsPriceLogModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Price Log</DialogTitle>
              <DialogDescription>View and update price history for this resource.</DialogDescription>
            </DialogHeader>
            {selectedResource && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Price History for {selectedResource.name}</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  handlePriceUpdate(
                    parseFloat(formData.get('newPrice') as string),
                    formData.get('note') as string
                  )
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="newPrice">New Price</Label>
                    <Input id="newPrice" name="newPrice" type="number" required />
                  </div>
                  <div>
                    <Label htmlFor="note">Note</Label>
                    <Textarea id="note" name="note" placeholder="Reason for price change" />
                  </div>
                  <Button type="submit">Log Price Change</Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isAddResourceModalOpen} onOpenChange={setIsAddResourceModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Enter the details of the new resource.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const newResource: Omit<Resource, 'id'> = {
                name: formData.get('resourceName') as string,
                category: formData.get('category') as string,
                unit: formData.get('unit') as string,
                rate: parseFloat(formData.get('rate') as string),
              }
              handleAddResource(newResource)
            }}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resourceName">Resource Name</Label>
                  <Input id="resourceName" name="resourceName" required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(resourceStructure[selectedTab]).map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" name="unit" required />
                </div>
                <div>
                  <Label htmlFor="rate">Rate</Label>
                  <Input id="rate" name="rate" type="number" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}