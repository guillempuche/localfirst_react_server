-- UUID needs to be a group of sizes 8, 4, 4, 4 and 12, separated by hyphens. Read more here https://neon.tech/docs/data-types/uuid
-- Insert authors
INSERT INTO authors (id, fullname, birth_date)
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        'Mark Twain',
        '1835-11-30T00:00:00Z'
    ),
    (
        '456f7890-fa1b-23c4-d567-526715184001',
        'Albert Einstein',
        '1879-03-14T00:00:00Z'
    );
-- Insert quotes, matching authors' UUIDs
INSERT INTO quotes (id, text, author_id, collections_id, created_at)
VALUES (
        '123e4567-e89b-12d3-a456-426655440000',
        'The secret of getting ahead is getting started.',
        '123e4567-e89b-12d3-a456-426614174000',
        NULL,
        '2023-01-01T00:00:00Z'
    ),
    (
        'bb3e4567-e89b-12d3-a456-426655440000',
        'The lack of money is the root of all evil.',
        '123e4567-e89b-12d3-a456-426614174000',
        NULL,
        '2023-01-02T00:00:00Z'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Life is like riding a bicycle. To keep your balance, you must keep moving.',
        '456f7890-fa1b-23c4-d567-526715184001',
        NULL,
        '2023-02-01T00:00:00Z'
    ),
    (
        'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Imagination is more important than knowledge.',
        '456f7890-fa1b-23c4-d567-526715184001',
        NULL,
        '2023-02-02T00:00:00Z'
    );