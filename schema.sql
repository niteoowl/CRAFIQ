-- 1. ADD METADATA & LEGAL COLUMNS TO NOVELS
ALTER TABLE novels 
ADD COLUMN IF NOT EXISTS description text, -- Short description
ADD COLUMN IF NOT EXISTS synopsis text, -- Long plot summary
ADD COLUMN IF NOT EXISTS age_rating text DEFAULT 'All', -- All, 12+, 15+, 19+
ADD COLUMN IF NOT EXISTS copyright_type text DEFAULT 'Rental', -- Rental, Perpetual
ADD COLUMN IF NOT EXISTS copyright_terms text, -- Custom legal text
ADD COLUMN IF NOT EXISTS tags text[]; -- Array of tags

-- 2. CREATE COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id), -- Link to Auth User
    profile_id uuid REFERENCES profiles(id), -- Link to Profile for name/avatar
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 3. CREATE FEATURED (MD PICK) TABLE
CREATE TABLE IF NOT EXISTS featured_novels (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
    display_order int DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- 4. ENABLE RLS (Row Level Security) - OPTIONAL BUT RECOMMENDED
-- (Assuming standard public read is enabled for new tables if not strict)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE featured_novels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Featured is viewable by everyone" ON featured_novels FOR SELECT USING (true);
-- Only Admin/Service Role can insert/delete (handled by Supabase Dashboard usually)
