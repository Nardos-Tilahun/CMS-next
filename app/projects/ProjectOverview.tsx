'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from 'lucide-react';
import { ProjectType, ProjectOverviewProps } from '../types';

export function ProjectOverview({ projects }: ProjectOverviewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const onSelectProject = async (project: ProjectType) => {
    try {
      const res = await fetch(`https://your-backend-api.com/projects/${project.project_id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch project details');
      }
      const projectDetails = await res.json();
      setSelectedProject(projectDetails);
    } catch (error) {
      console.error('Error fetching project details:', error);
      // Handle error (e.g., show error message to user)
    }
  };
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
            <Card key={project.project_id}>
              <CardHeader>
                <CardTitle>{project.project_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>Progress</span>
                    <span>{project.project_progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${project.project_progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.project_status === 'completed' ? 'bg-green-200 text-green-800' :
                    project.project_status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {project.project_status}
                  </span>
                  <span className="font-bold">${project.project_status.toLocaleString()}</span>
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
  );
}