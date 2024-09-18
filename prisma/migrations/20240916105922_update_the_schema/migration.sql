/*
  Warnings:

  - You are about to alter the column `takeoff_quantity` on the `Takeoff` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the `Allocation_resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bill_of_Quantity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Financial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Milestone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Allocation_resource` DROP FOREIGN KEY `Allocation_resource_resource_id_fkey`;

-- DropForeignKey
ALTER TABLE `Allocation_resource` DROP FOREIGN KEY `Allocation_resource_takeoff_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bill_of_Quantity` DROP FOREIGN KEY `Bill_of_Quantity_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Financial` DROP FOREIGN KEY `Financial_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_project_manager_id_fkey`;

-- DropForeignKey
ALTER TABLE `Takeoff` DROP FOREIGN KEY `Takeoff_boq_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Takeoff` DROP FOREIGN KEY `Takeoff_milestone_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- AlterTable
ALTER TABLE `Takeoff` ADD COLUMN `status` VARCHAR(191) NULL,
    MODIFY `takeoff_quantity` DECIMAL(10, 2) NOT NULL;

-- DropTable
DROP TABLE `Allocation_resource`;

-- DropTable
DROP TABLE `Bill_of_Quantity`;

-- DropTable
DROP TABLE `Financial`;

-- DropTable
DROP TABLE `Milestone`;

-- DropTable
DROP TABLE `Project`;

-- DropTable
DROP TABLE `Resource`;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Projects` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `project_location` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `contract_amount` DECIMAL(10, 2) NULL,
    `project_manager_id` INTEGER NULL,
    `client_id` INTEGER NULL,
    `over_head_cost_percent` DECIMAL(10, 2) NULL,
    `profit_cost_percent` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `role_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_role_name_key`(`role_name`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill_of_Quantities` (
    `boq_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(10, 2) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `unit_cost` DECIMAL(10, 2) NOT NULL,
    `material_output` DECIMAL(10, 2) NULL,
    `labor_output` DECIMAL(10, 2) NULL,
    `equipment_output` DECIMAL(10, 2) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`boq_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Milestones` (
    `milestone_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `milestone_name` VARCHAR(191) NOT NULL,
    `milestone_start_date` DATETIME(3) NULL,
    `milestone_end_date` DATETIME(3) NULL,
    `milestone_budget` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`milestone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `material_id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_name` VARCHAR(191) NOT NULL,
    `material_unit` VARCHAR(191) NULL,
    `material_rate` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labor` (
    `labor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `labor_name` VARCHAR(191) NOT NULL,
    `labor_unit` VARCHAR(191) NULL,
    `labor_rate` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`labor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment` (
    `equipment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipment_name` VARCHAR(191) NOT NULL,
    `equipment_unit` VARCHAR(191) NULL,
    `equipment_rate` DECIMAL(10, 2) NOT NULL,
    `fuel_rate` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`equipment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_allocation` (
    `material_allocation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boq_item_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `conversionRate` DECIMAL(10, 2) NOT NULL,
    `cost_per_unit` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`material_allocation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labor_allocation` (
    `labor_allocation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boq_item_id` INTEGER NOT NULL,
    `labor_id` INTEGER NOT NULL,
    `utilization_factor` DECIMAL(10, 2) NOT NULL,
    `conversionRate` DECIMAL(10, 2) NOT NULL,
    `cost_per_unit` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`labor_allocation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment_allocation` (
    `equipment_allocation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boq_item_id` INTEGER NOT NULL,
    `equipment_id` INTEGER NOT NULL,
    `utilization_factor` DECIMAL(10, 2) NOT NULL,
    `conversionRate` DECIMAL(10, 2) NOT NULL,
    `rental_cost` DECIMAL(10, 2) NOT NULL,
    `fuel_consumption` DECIMAL(10, 2) NOT NULL,
    `fuel_cost` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`equipment_allocation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_report` (
    `activity_report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `takeoff_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `activityDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activity_report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_project_manager_id_fkey` FOREIGN KEY (`project_manager_id`) REFERENCES `Users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill_of_Quantities` ADD CONSTRAINT `Bill_of_Quantities_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestones` ADD CONSTRAINT `Milestones_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Takeoff` ADD CONSTRAINT `Takeoff_boq_item_id_fkey` FOREIGN KEY (`boq_item_id`) REFERENCES `Bill_of_Quantities`(`boq_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Takeoff` ADD CONSTRAINT `Takeoff_milestone_id_fkey` FOREIGN KEY (`milestone_id`) REFERENCES `Milestones`(`milestone_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_allocation` ADD CONSTRAINT `material_allocation_boq_item_id_fkey` FOREIGN KEY (`boq_item_id`) REFERENCES `Bill_of_Quantities`(`boq_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_allocation` ADD CONSTRAINT `material_allocation_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `material`(`material_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labor_allocation` ADD CONSTRAINT `labor_allocation_boq_item_id_fkey` FOREIGN KEY (`boq_item_id`) REFERENCES `Bill_of_Quantities`(`boq_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labor_allocation` ADD CONSTRAINT `labor_allocation_labor_id_fkey` FOREIGN KEY (`labor_id`) REFERENCES `labor`(`labor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_allocation` ADD CONSTRAINT `equipment_allocation_boq_item_id_fkey` FOREIGN KEY (`boq_item_id`) REFERENCES `Bill_of_Quantities`(`boq_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equipment_allocation` ADD CONSTRAINT `equipment_allocation_equipment_id_fkey` FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`equipment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_report` ADD CONSTRAINT `activity_report_takeoff_id_fkey` FOREIGN KEY (`takeoff_id`) REFERENCES `Takeoff`(`takeoff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
