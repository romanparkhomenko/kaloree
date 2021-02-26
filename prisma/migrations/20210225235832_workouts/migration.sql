-- CreateTable
CREATE TABLE `Workout` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `workout` VARCHAR(191) NOT NULL,
    `minutes` INT,
    `caloriesBurnt` INT,
    `weight` INT,
    `userId` INT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date` VARCHAR(191),
INDEX `userId`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workout` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
