ALTER TABLE "organizations" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "slug" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "team_id" text;