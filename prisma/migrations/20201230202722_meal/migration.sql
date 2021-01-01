-- CreateTable
CREATE TABLE `Meal` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `food` VARCHAR(191) NOT NULL,
    `foodCategory` VARCHAR(191) NOT NULL,
    `grams` INT,
    `ounces` INT,
    `calories` INT,
    `userId` INT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
INDEX `userId`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meal` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
