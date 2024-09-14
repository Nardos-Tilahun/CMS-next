/*
  Warnings:

  - You are about to drop the `Bill_of_Quantities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Financials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Milestones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Allocation_resource` DROP FOREIGN KEY `Allocation_resource_resource_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bill_of_Quantities` DROP FOREIGN KEY `Bill_of_Quantities_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Financials` DROP FOREIGN KEY `Financials_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Milestones` DROP FOREIGN KEY `Milestones_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Projects` DROP FOREIGN KEY `Projects_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `Projects` DROP FOREIGN KEY `Projects_project_manager_id_fkey`;

-- DropForeignKey
ALTER TABLE `Takeoff` DROP FOREIGN KEY `Takeoff_boq_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Takeoff` DROP FOREIGN KEY `Takeoff_milestone_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_role_id_fkey`;

-- DropTable
DROP TABLE `Bill_of_Quantities`;

-- DropTable
DROP TABLE `Financials`;

-- DropTable
DROP TABLE `Milestones`;

-- DropTable
DROP TABLE `Projects`;

-- DropTable
DROP TABLE `Resources`;

-- DropTable
DROP TABLE `Roles`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `Project` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `project_location` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `contract_amount` DECIMAL(65, 30) NULL,
    `project_manager_id` INTEGER NULL,
    `client_id` INTEGER NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `role_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_role_name_key`(`role_name`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bill_of_Quantity` (
    `boq_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `unit_cost` DECIMAL(65, 30) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`boq_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Milestone` (
    `milestone_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `milestone_name` VARCHAR(191) NOT NULL,
    `milestone_start_date` DATETIME(3) NULL,
    `milestone_end_date` DATETIME(3) NULL,
    `milestone_budget` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`milestone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resource` (
    `resource_id` INTEGER NOT NULL AUTO_INCREMENT,
    `resource_name` VARCHAR(191) NOT NULL,
    `resource_type` ENUM('Equipment', 'Labour', 'Material') NOT NULL,
    `resource_unit` VARCHAR(191) NULL,
    `resource_cost_per_unit` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`resource_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Financial` (
    `financial_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `total_income` DECIMAL(65, 30) NOT NULL,
    `total_expense` DECIMAL(65, 30) NOT NULL,
    `profit_loss` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    UNIQUE INDEX `Financial_project_id_key`(`project_id`),
    PRIMARY KEY (`financial_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_project_manager_id_fkey` FOREIGN KEY (`project_manager_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill_of_Quantity` ADD CONSTRAINT `Bill_of_Quantity_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Takeoff` ADD CONSTRAINT `Takeoff_boq_item_id_fkey` FOREIGN KEY (`boq_item_id`) REFERENCES `Bill_of_Quantity`(`boq_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Takeoff` ADD CONSTRAINT `Takeoff_milestone_id_fkey` FOREIGN KEY (`milestone_id`) REFERENCES `Milestone`(`milestone_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Allocation_resource` ADD CONSTRAINT `Allocation_resource_resource_id_fkey` FOREIGN KEY (`resource_id`) REFERENCES `Resource`(`resource_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financial` ADD CONSTRAINT `Financial_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
