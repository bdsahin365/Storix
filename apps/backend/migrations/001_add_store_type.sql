-- Migration: Add store_type column to shops table
-- Date: 2026-01-08

-- Add store_type column to shops table
ALTER TABLE shops 
ADD COLUMN IF NOT EXISTS store_type VARCHAR(50);

-- Add comment to column
COMMENT ON COLUMN shops.store_type IS 'Type of store: মুদি দোকান, ফার্মেসি, হার্ডওয়্যার, পাইকারি, অন্যান্য';

-- Optional: Create index if needed for filtering by store type
-- CREATE INDEX IF NOT EXISTS idx_shops_store_type ON shops(store_type);
