import { ProjectOverview } from './ProjectOverview';
import { ProjectType } from '../types';

const mockProjects: ProjectType[] = [
  {
    project_id: 1,
    project_name: 'Project One',
    project_location: 'Location One',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-12-31'),
    contract_amount: 1000000,
    project_manager_name: 'Manager One',
    client_name: 'Client One',
    project_progress: 50,
    project_status: 'In Progress',
    over_head_cost_percent: 10,
    profit_cost_percent: 20,
  },
  {
    project_id: 2,
    project_name: 'Project Two',
    project_location: 'Location Two',
    start_date: new Date('2023-02-01'),
    end_date: new Date('2023-11-30'),
    contract_amount: 2000000,
    project_manager_name: 'Manager Two',
    client_name: 'Client Two',
    project_progress: 75,
    project_status: 'In Progress',
    over_head_cost_percent: 12,
    profit_cost_percent: 18,
  },
  {
    project_id: 3,
    project_name: 'Project Three',
    project_location: 'Location Three',
    start_date: new Date('2023-03-01'),
    end_date: new Date('2023-10-31'),
    contract_amount: 1500000,
    project_manager_name: 'Manager Three',
    client_name: 'Client Three',
    project_progress: 30,
    project_status: 'In Progress',
    over_head_cost_percent: 15,
    profit_cost_percent: 25,
  },
];

async function getProjects(): Promise<ProjectType[]> {
  try {
    const res = await fetch('https://your-backend-api.com/projects', { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error('Failed to fetch projects:', res.status, res.statusText);
      throw new Error('Failed to fetch projects');
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid response format:', contentType);
      throw new Error('Invalid response format');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching projects, using mock data:', error);
    return mockProjects;
  }
}

export default async function Projects() {
  try {
    const projects: ProjectType[] = await getProjects();
    return <ProjectOverview projects={projects} />;
  } catch (error) {
    console.error('Error in Projects component:', error);
    return <div>Error loading projects</div>;
  }
}