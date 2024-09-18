import { z } from 'zod';

// Projects Table Validation Schema
const ProjectSchema = z.object({
  project_id: z.number().int().optional(),
  project_name: z.string().max(255),
  project_location: z.string().max(255).nullable().optional(),
  start_date: z.date().nullable().optional(),
  end_date: z.date().nullable().optional(),
  contract_amount: z.number().nullable().optional(),
  project_manager_id: z.number().int().nullable().optional(),
  client_id: z.number().int().nullable().optional(),
  over_head_cost_percent: z.number().nullable().optional(),
  profit_cost_percent: z.number().nullable().optional(),
});

// Users Table Validation Schema
const UserSchema = z.object({
  user_id: z.number().int().optional(),
  email: z.string().email().max(100),
  password: z.string().max(255),
  first_name: z.string().max(50).nullable().optional(),
  last_name: z.string().max(50).nullable().optional(),
  phone_number: z.string().max(20).nullable().optional(),
  role_id: z.number().int().nullable().optional(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

// Roles Table Validation Schema
const RoleSchema = z.object({
  role_id: z.number().int().optional(),
  role_name: z.string().max(50),
});

// Bill_of_Quantities Table Validation Schema
const BillOfQuantitySchema = z.object({
  boq_item_id: z.number().int().optional(),
  project_id: z.number().int(),
  item_name: z.string().max(255),
  quantity: z.number(),
  unit: z.string().max(50).nullable().optional(),
  unit_cost: z.number(),
  material_output: z.number().nullable().optional(),
  labor_output: z.number().nullable().optional(),
  equipment_output: z.number().nullable().optional(),
  amount: z.number().optional(), // This is a generated column
});

// Milestones Table Validation Schema
const MilestoneSchema = z.object({
  milestone_id: z.number().int().optional(),
  project_id: z.number().int(),
  milestone_name: z.string().max(255),
  milestone_start_date: z.date().nullable().optional(),
  milestone_end_date: z.date().nullable().optional(),
  milestone_budget: z.number().nullable().optional(),
});

// Takeoff Table Validation Schema
const TakeoffSchema = z.object({
  takeoff_id: z.number().int().optional(),
  takeoff_name: z.string().max(255).nullable().optional(),
  boq_item_id: z.number().int(),
  milestone_id: z.number().int(),
  takeoff_quantity: z.number(),
  status: z.enum(['finished', 'late', 'inProgress']).nullable().optional(),
});

// Material Table Validation Schema
const MaterialSchema = z.object({
  material_id: z.number().int().optional(),
  material_name: z.string().max(255),
  material_unit: z.string().max(50).nullable().optional(),
  material_rate: z.number(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

// Labor Table Validation Schema
const LaborSchema = z.object({
  labor_id: z.number().int().optional(),
  labor_name: z.string().max(255),
  labor_unit: z.string().max(50).nullable().optional(),
  labor_rate: z.number(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

// Equipment Table Validation Schema
const EquipmentSchema = z.object({
  equipment_id: z.number().int().optional(),
  equipment_name: z.string().max(255),
  equipment_unit: z.string().max(50).nullable().optional(),
  equipment_rate: z.number(),
  fuel_rate: z.number(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

// Material Allocation Table Validation Schema
const MaterialAllocationSchema = z.object({
  material_allocation_id: z.number().int().optional(),
  boq_item_id: z.number().int(),
  material_id: z.number().int(),
  conversionRate: z.number(),
  cost_per_unit: z.number(),
});

// Labor Allocation Table Validation Schema
const LaborAllocationSchema = z.object({
  labor_allocation_id: z.number().int().optional(),
  boq_item_id: z.number().int(),
  labor_id: z.number().int(),
  utilization_factor: z.number(),
  conversionRate: z.number(),
  cost_per_unit: z.number(),
});

// Equipment Allocation Table Validation Schema
const EquipmentAllocationSchema = z.object({
  equipment_allocation_id: z.number().int().optional(),
  boq_item_id: z.number().int(),
  equipment_id: z.number().int(),
  utilization_factor: z.number(),
  conversionRate: z.number(),
  rental_cost: z.number(),
  fuel_consumption: z.number(),
  fuel_cost: z.number(),
});

// Activity Report Table Validation Schema
const ActivityReportSchema = z.object({
  activity_report_id: z.number().int().optional(),
  takeoff_id: z.number().int(),
  quantity: z.number().int(),
  activityDate: z.date(),
});

export {
  ProjectSchema,
  UserSchema,
  RoleSchema,
  BillOfQuantitySchema,
  MilestoneSchema,
  TakeoffSchema,
  MaterialSchema,
  LaborSchema,
  EquipmentSchema,
  MaterialAllocationSchema,
  LaborAllocationSchema,
  EquipmentAllocationSchema,
  ActivityReportSchema,
};