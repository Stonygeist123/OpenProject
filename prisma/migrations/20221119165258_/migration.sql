/*
  Warnings:

  - Added the required column `owner` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `community` ADD COLUMN `owner` VARCHAR(191) NOT NULL;
