CREATE TABLE `event` (
	`id` int AUTO_INCREMENT NOT NULL,
	`host_id` varchar(255) NOT NULL,
	`longitude` float,
	`latitude` float,
	`title` varchar(128),
	`description` varchar(512),
	`activity` varchar(64),
	`from` datetime,
	`to` datetime,
	CONSTRAINT `event_id` PRIMARY KEY(`id`)
);

CREATE TABLE `review` (
	`publisher_id` varchar(255) NOT NULL,
	`title` varchar(128),
	`body` varchar(512),
	`rating` smallint,
	`host_id` varchar(255) NOT NULL
);

CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`username` varchar(128),
	`email` varchar(255) NOT NULL,
	`emailConfirmed` boolean DEFAULT false,
	`phoneNumber` varchar(32),
	`country` varchar(128),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_id_unique` UNIQUE(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);

ALTER TABLE `event` ADD CONSTRAINT `event_host_id_user_id_fk` FOREIGN KEY (`host_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `review` ADD CONSTRAINT `review_publisher_id_user_id_fk` FOREIGN KEY (`publisher_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `review` ADD CONSTRAINT `review_host_id_user_id_fk` FOREIGN KEY (`host_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;