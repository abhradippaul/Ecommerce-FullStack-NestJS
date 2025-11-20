ALTER TABLE "customers" ADD COLUMN "total_orders" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "total_spent" integer DEFAULT 0 NOT NULL;