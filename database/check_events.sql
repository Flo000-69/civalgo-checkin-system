CREATE TABLE IF NOT EXISTS check_events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  site_id TEXT NOT NULL,
  type TEXT CHECK (type IN ('in', 'out')) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);