/*
  Warnings:

  - You are about to alter the column `grams` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `ounces` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE `Meal` ADD COLUMN     `date` VARCHAR(191),
    MODIFY `grams` DECIMAL(65,30),
    MODIFY `ounces` DECIMAL(65,30);

-- CreateTable
CREATE TABLE `Weight` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `pounds` INT NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INT,
INDEX `userId`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Weight` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
