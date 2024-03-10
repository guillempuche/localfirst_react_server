-- Create the authors table
CREATE TABLE IF NOT EXISTS authors (
    id UUID NOT NULL,
    fullname TEXT NOT NULL,
    birth_date TIMESTAMP WITH TIME ZONE,
    CONSTRAINT "authors_pkey" PRIMARY KEY (id)
);
-- Create the collections table
CREATE TABLE IF NOT EXISTS collections (
    id UUID NOT NULL,
    name TEXT NOT NULL,
    parent_id UUID,
    CONSTRAINT "collections_pkey" PRIMARY KEY (id),
    CONSTRAINT fk_parent_collection FOREIGN KEY (parent_id) REFERENCES collections(id)
);
-- Create the quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID NOT NULL,
    text TEXT NOT NULL,
    author_id UUID,
    collections_id UUID [],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC') NOT NULL,
    CONSTRAINT "quotes_pkey" PRIMARY KEY (id)
);
-- Create the editors table
CREATE TABLE IF NOT EXISTS editors (
    id UUID NOT NULL,
    text TEXT,
    fullname TEXT,
    birth_date TIMESTAMP WITH TIME ZONE,
    author_id UUID,
    collections_id UUID [],
    quote_ref UUID,
    author_ref UUID,
    CONSTRAINT "editors_pkey" PRIMARY KEY (id)
);