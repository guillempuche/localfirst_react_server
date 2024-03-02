CREATE TABLE IF NOT EXISTS "authors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"is_draft" boolean NOT NULL,
	"fork" uuid,
	"birth_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"parent_ref" uuid,
	"fork" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"is_draft" boolean NOT NULL,
	"author_ref" uuid,
	"collection_ref" uuid,
	"fork" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authors" ADD CONSTRAINT "authors_fork_authors_id_fk" FOREIGN KEY ("fork") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_parent_ref_collections_id_fk" FOREIGN KEY ("parent_ref") REFERENCES "collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_fork_collections_id_fk" FOREIGN KEY ("fork") REFERENCES "collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotes" ADD CONSTRAINT "quotes_author_ref_authors_id_fk" FOREIGN KEY ("author_ref") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotes" ADD CONSTRAINT "quotes_collection_ref_collections_id_fk" FOREIGN KEY ("collection_ref") REFERENCES "collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fork_quotes_id_fk" FOREIGN KEY ("fork") REFERENCES "quotes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- After all table alterations are complete, enable Electric SQL
ALTER TABLE quotes ENABLE ELECTRIC;
ALTER TABLE authors ENABLE ELECTRIC;
ALTER TABLE collections ENABLE ELECTRIC;