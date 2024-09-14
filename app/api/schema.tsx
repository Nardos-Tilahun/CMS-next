import { z } from 'zod';

// Project Table Validation Schema
const ProjectSchema = z.object({
  project_id: z.number().int().optional(),
  project_name: z.string().max(191),
  project_location: z.string().max(191).nullable().optional(),
  start_date: z.date().nullable().optional(),
  end_date: z.date().nullable().optional(),
  contract_amount: z.number().nullable().optional(),
  project_manager_id: z.number().int().nullable().optional(),
  client_id: z.number().int().nullable().optional(),
});

// User Table Validation Schema
const UserSchema = z.object({
  user_id: z.number().int().optional(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .max(191),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(191)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    .optional(),
  first_name: z.string().max(191),
  last_name: z.string().max(191),
  phone_number: z.string().max(191).nullable().optional(),
  role_id: z.number().int().nullable().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

const UserSchemaWithConfirmation = UserSchema.extend({
  confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match',
});

// Role Table Validation Schema
const RoleSchema = z.object({
  role_id: z.number().int().optional(),
  role_name: z.string().max(191),
});

// Bill_of_Quantity Table Validation Schema
const BillOfQuantitySchema = z.object({
  boq_item_id: z.number().int().optional(),
  project_id: z.number().int(),
  item_name: z.string().max(191),
  quantity: z.number(),
  unit: z.string().max(191).nullable().optional(),
  unit_cost: z.number(),
  amount: z.number().default(0),
});

// Milestone Table Validation Schema
const MilestoneSchema = z.object({
  milestone_id: z.number().int().optional(),
  project_id: z.number().int(),
  milestone_name: z.string().max(191),
  milestone_start_date: z.date().nullable().optional(),
  milestone_end_date: z.date().nullable().optional(),
  milestone_budget: z.number().nullable().optional(),
});

// Resource Table Validation Schema
const ResourceSchema = z.object({
  resource_id: z.number().int().optional(),
  resource_name: z.string().max(191),
  resource_type: z.enum(['Equipment', 'Labour', 'Material']),
  resource_unit: z.string().max(191).nullable().optional(),
  resource_cost_per_unit: z.number(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// Financial Table Validation Schema
const FinancialSchema = z.object({
  financial_id: z.number().int().optional(),
  project_id: z.number().int(),
  total_income: z.number(),
  total_expense: z.number(),
  profit_loss: z.number().default(0),
});

// Takeoff Table Validation Schema
const TakeoffSchema = z.object({
  takeoff_id: z.number().int().optional(),
  boq_item_id: z.number().int(),
  milestone_id: z.number().int(),
  takeoff_quantity: z.number(),
});

// Allocation_resource Table Validation Schema
const AllocationResourceSchema = z.object({
  allocation_id: z.number().int().optional(),
  takeoff_id: z.number().int(),
  resource_id: z.number().int(),
  conversionRate: z.number(),
  allocation_amount: z.number().default(0),
});

// Export the validation schemas
export {
  ProjectSchema,
  UserSchema,
  UserSchemaWithConfirmation,
  RoleSchema,
  BillOfQuantitySchema,
  MilestoneSchema,
  ResourceSchema,
  FinancialSchema,
  TakeoffSchema,
  AllocationResourceSchema,
};
