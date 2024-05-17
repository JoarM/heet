CREATE TABLE `confirm_email` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(8),
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `confirm_email_id` PRIMARY KEY(`id`)
);

ALTER TABLE `user` ADD `two_factor_secret` varchar(255);
ALTER TABLE `confirm_email` ADD CONSTRAINT `confirm_email_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;