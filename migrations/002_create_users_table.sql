CREATE TABLE USERS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(235) NOT NULL UNIQUE,

    password_hash TEXT,
    google_id  VARCHAR(255) UNIQUE,

    role VARCHAR(20) NOT NULL DEFAULT 'USER'
        CHECK (role IN('USER', 'ADMIN')),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()

)