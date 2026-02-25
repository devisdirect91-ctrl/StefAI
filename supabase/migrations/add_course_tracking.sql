CREATE TABLE IF NOT EXISTS course_views (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id  TEXT NOT NULL,
  ip_hash    TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON course_views(course_id);

CREATE TABLE IF NOT EXISTS course_sales (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id         TEXT NOT NULL,
  user_id           TEXT,
  stripe_session_id TEXT UNIQUE NOT NULL,
  amount            INT NOT NULL,
  currency          TEXT NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON course_sales(course_id);

ALTER TABLE course_views  ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sales  ENABLE ROW LEVEL SECURITY;
-- Service role bypasses RLS; no public policies needed.
