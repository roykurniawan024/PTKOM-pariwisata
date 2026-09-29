-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: destinations
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(15, 2) DEFAULT 0.00,
    location VARCHAR(255),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: destination_images
CREATE TABLE destination_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    image_url VARCHAR(1000) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: site_metrics
CREATE TABLE site_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_visitors INT DEFAULT 0,
    active_users INT DEFAULT 0,
    total_bookings INT DEFAULT 0,
    recorded_at DATE NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance and filtering optimization
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_destinations_category_id ON destinations(category_id);
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_location ON destinations(location);
CREATE INDEX idx_destinations_price ON destinations(price);
CREATE INDEX idx_destinations_rating ON destinations(rating);
CREATE INDEX idx_destination_images_destination_id ON destination_images(destination_id);
