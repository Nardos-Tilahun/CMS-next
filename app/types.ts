export interface ProjectType {
  project_id: number;
  project_name: string;
  project_location: string;
  start_date: Date;
  end_date: Date;
  contract_amount: number;
  project_manager_name: string;
  client_name: string;
  project_progress : number;
  project_status: string;
  over_head_cost_percent: number;
  profit_cost_percent: number;
}

export interface UserType {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleType {
  role_id: number;
  role_name: string;
}

export interface BillOfQuantitiesType {
  boq_item_id: number;
  project_id: number;
  item_name: string;
  quantity: number;
  unit: string;
  unit_cost: number;
  material_output: number;
  labor_output: number;
  equipment_output: number;
  amount: number; // This is a calculated field in the database
}

export interface MilestoneType {
  milestone_id: number;
  project_id: number;
  milestone_name: string;
  milestone_start_date: Date;
  milestone_end_date: Date;
  milestone_budget: number;
}

export interface TakeoffType {
  takeoff_id: number;
  takeoff_name: string;
  boq_item_id: number;
  milestone_id: number;
  takeoff_quantity: number;
  status: 'finished' | 'late' | 'inProgress';
}

export interface MaterialType {
  material_id: number;
  material_name: string;
  material_unit: string;
  material_rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LaborType {
  labor_id: number;
  labor_name: string;
  labor_unit: string;
  labor_rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentType {
  equipment_id: number;
  equipment_name: string;
  equipment_unit: string;
  equipment_rate: number;
  fuel_rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialAllocationType {
  material_allocation_id: number;
  boq_item_id: number;
  material_id: number;
  conversionRate: number;
  cost_per_unit: number;
}

export interface LaborAllocationType {
  labor_allocation_id: number;
  boq_item_id: number;
  labor_id: number;
  utilization_factor: number;
  conversionRate: number;
  cost_per_unit: number;
}

export interface EquipmentAllocationType {
  equipment_allocation_id: number;
  boq_item_id: number;
  equipment_id: number;
  utilization_factor: number;
  conversionRate: number;
  rental_cost: number;
  fuel_consumption: number;
  fuel_cost: number;
}

export interface ActivityReportType {
  activity_report_id: number;
  takeoff_id: number;
  quantity: number;
  activityDate: Date;
}

export interface ProjectOverviewProps {
  projects: ProjectType[];
}