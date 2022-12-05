-- AlterTable
ALTER TABLE `community` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `content` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `description` LONGTEXT NOT NULL;
