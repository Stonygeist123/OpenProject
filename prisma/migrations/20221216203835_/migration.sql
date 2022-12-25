/*
  Warnings:

  - Added the required column `hasReplies` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `hasReplies` BOOLEAN NOT NULL;
