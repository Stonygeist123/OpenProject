-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
