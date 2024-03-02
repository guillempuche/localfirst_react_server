-- Create the authors table
CREATE TABLE IF NOT EXISTS authors (
    id UUID NOT NULL,
    fullname TEXT NOT NULL,
    birth_date TIMESTAMP WITH TIME ZONE,
    is_draft BOOLEAN NOT NULL,
    CONSTRAINT "authors_pkey" PRIMARY KEY (id)
);
-- Create the collections table
CREATE TABLE IF NOT EXISTS collections (
    id UUID NOT NULL,
    name TEXT NOT NULL,
    parent_ref UUID,
    CONSTRAINT "collections_pkey" PRIMARY KEY (id),
    CONSTRAINT fk_parent_collection FOREIGN KEY (parent_ref) REFERENCES collections(id)
);
-- Create the quotes table with foreign keys to authors and collections
CREATE TABLE IF NOT EXISTS quotes (
    id UUID NOT NULL,
    text TEXT NOT NULL,
    author_ref UUID,
    collection_ref UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_draft BOOLEAN NOT NULL,
    CONSTRAINT "quotes_pkey" PRIMARY KEY (id)
);
-- -- Add foreign key constraints to the quotes table before electrifying tables.
-- ALTER TABLE quotes
-- ADD CONSTRAINT fk_author FOREIGN KEY (author_ref) REFERENCES authors(id);
-- ALTER TABLE quotes
-- ADD CONSTRAINT fk_collection FOREIGN KEY (collection_ref) REFERENCES collections(id);
-- After all table alterations are complete, enable Electric SQL
ALTER TABLE quotes ENABLE ELECTRIC;
ALTER TABLE authors ENABLE ELECTRIC;
ALTER TABLE collections ENABLE ELECTRIC;