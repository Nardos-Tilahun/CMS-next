-- CreateTable
CREATE TABLE `Projects` (
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
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `role_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
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
    `quantity` DECIMAL(65, 30) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `unit_cost` DECIMAL(65, 30) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`boq_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Milestones` (
    `milestone_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `milestone_name` VARCHAR(191) NOT NULL,
    `milestone_start_date` DATETIME(3) NULL,
    `milestone_end_date` DATETIME(3) NULL,
    `milestone_budget` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`milestone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Takeoff` (
    `takeoff_id` INTEGER NOT NULL AUTO_INCREMENT,
    `takeoff_name` VARCHAR(191) NULL,
    `boq_item_id` INTEGER NOT NULL,
    `milestone_id` INTEGER NOT NULL,
    `takeoff_quantity` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`takeoff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resources` (
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
CREATE TABLE `Allocation_resource` (
    `allocation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `takeoff_id` INTEGER NOT NULL,
    `resource_id` INTEGER NOT NULL,
    `conversionRate` DECIMAL(65, 30) NOT NULL,
    `allocation_amount` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`allocation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Financials` (
    `financial_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `total_income` DECIMAL(65, 30) NOT NULL,
    `total_expense` DECIMAL(65, 30) NOT NULL,
    `profit_loss` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    UNIQUE INDEX `Financials_project_id_key`(`project_id`),
    PRIMARY KEY (`financial_id`)
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
ALTER TABLE `Allocation_resource` ADD CONSTRAINT `Allocation_resource_takeoff_id_fkey` FOREIGN KEY (`takeoff_id`) REFERENCES `Takeoff`(`takeoff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Allocation_resource` ADD CONSTRAINT `Allocation_resource_resource_id_fkey` FOREIGN KEY (`resource_id`) REFERENCES `Resources`(`resource_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financials` ADD CONSTRAINT `Financials_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
