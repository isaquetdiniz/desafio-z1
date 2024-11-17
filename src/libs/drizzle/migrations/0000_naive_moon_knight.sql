CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`genre` text NOT NULL,
	`publish_year` integer NOT NULL,
	`quantity` integer NOT NULL
);
