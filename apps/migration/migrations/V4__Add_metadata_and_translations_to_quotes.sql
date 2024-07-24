-- Add the metadata field
ALTER TABLE quotes ADD COLUMN metadata JSONB;

-- Add the translations field
ALTER TABLE quotes ADD COLUMN translations JSONB;

-- Update metadata and translations for two quotes
UPDATE quotes
SET metadata = '{"source": {"url": "https://www.goodreads.com/quotes/12345", "publication": "Goodreads"}, "tags": ["motivation", "success"]}',
    translations = '{"languages": {"es": {"text": "El secreto para salir adelante es comenzar.", "translator": "Carlos García"}, "fr": {"text": "Le secret pour avancer est de commencer.", "translator": "Marie Dubois"}}}'
WHERE id = '123e4567-e89b-12d3-a456-426655440000';

UPDATE quotes
SET metadata = '{"source": {"url": "https://www.goodreads.com/quotes/67890", "publication": "Goodreads"}, "tags": ["money", "wisdom"]}',
    translations = '{"languages": {"de": {"text": "Der Mangel an Geld ist die Wurzel allen Übels.", "translator": "Hans Müller"}, "it": {"text": "La mancanza di denaro è la radice di tutti i mali.", "translator": "Luca Bianchi"}}}'
WHERE id = 'bb3e4567-e89b-12d3-a456-426655440000';