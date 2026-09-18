CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`project` text DEFAULT 'General inquiry' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`city` text NOT NULL,
	`category` text NOT NULL,
	`price` real NOT NULL,
	`down_payment_percent` real DEFAULT 20 NOT NULL,
	`installment_months` integer DEFAULT 36 NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '/lmar-hero.jpg' NOT NULL,
	`video_url` text DEFAULT '' NOT NULL,
	`brochure_url` text DEFAULT '/lmar-brochure.html' NOT NULL,
	`location_url` text DEFAULT '' NOT NULL,
	`construction_progress` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_visits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`preferred_date` text NOT NULL,
	`interest` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
