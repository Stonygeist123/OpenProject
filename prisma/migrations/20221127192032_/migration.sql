/*
  Warnings:

  - You are about to drop the column `community_name` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_community_name_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `community_name`,
    ADD COLUMN `communityName` VARCHAR(191) NULL,
    ADD COLUMN `tags` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_communityName_fkey` FOREIGN KEY (`communityName`) REFERENCES `Community`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
