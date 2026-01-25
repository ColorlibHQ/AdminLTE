-- Tricoci University Marketing Dashboard Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- REFERENCE TABLES
-- =============================================

-- Campuses (15 Tricoci University locations)
CREATE TABLE campuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the 15 campuses
INSERT INTO campuses (name, code) VALUES
  ('Bloomington', 'BLM'),
  ('Bridgeview', 'BRV'),
  ('Chicago NE', 'CNE'),
  ('Chicago NW', 'CNW'),
  ('Elgin', 'ELG'),
  ('Glendale Heights', 'GDH'),
  ('Highland', 'HIG'),
  ('Indianapolis NE', 'IND'),
  ('Janesville', 'JAN'),
  ('Lafayette', 'LAF'),
  ('Libertyville', 'LIB'),
  ('Normal', 'NOR'),
  ('Peoria', 'PEO'),
  ('Rockford', 'ROC'),
  ('Urbana', 'URB');

-- Programs offered
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketing Channels
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('paid', 'organic')),
  platform TEXT, -- 'google', 'meta', 'organic', 'direct', etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default channels
INSERT INTO channels (name, type, platform) VALUES
  ('Paid SEM', 'paid', 'google'),
  ('Paid Social', 'paid', 'meta'),
  ('Organic/Direct', 'organic', NULL);

-- =============================================
-- LEADS DATA (from LeadSquared)
-- =============================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  leadsquared_id TEXT UNIQUE,

  -- Lead Information
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,

  -- Attribution
  campus_id UUID REFERENCES campuses(id),
  program_id UUID REFERENCES programs(id),
  channel_id UUID REFERENCES channels(id),
  source TEXT,                -- Specific source (Google Ads, Facebook, etc.)
  source_medium TEXT,         -- utm_medium
  source_campaign TEXT,       -- utm_campaign

  -- Status & Funnel
  lead_status TEXT,
  lead_stage TEXT,
  is_enrolled BOOLEAN DEFAULT false,

  -- Dates
  created_date DATE NOT NULL,
  enrolled_date DATE,

  -- Financial
  revenue DECIMAL(12,2) DEFAULT 0,

  -- Raw data storage for additional fields
  raw_data JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_leads_created_date ON leads(created_date);
CREATE INDEX idx_leads_campus ON leads(campus_id);
CREATE INDEX idx_leads_channel ON leads(channel_id);
CREATE INDEX idx_leads_status ON leads(lead_status);
CREATE INDEX idx_leads_enrolled ON leads(is_enrolled);

-- =============================================
-- DAILY MARKETING METRICS (Aggregated)
-- =============================================

-- Daily metrics per channel/campus combination
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  campus_id UUID REFERENCES campuses(id),
  channel_id UUID REFERENCES channels(id) NOT NULL,

  -- Core metrics from spreadsheet
  lead_expense_gross DECIMAL(12,2) DEFAULT 0, -- Total ad spend
  lead_expense_net DECIMAL(12,2) DEFAULT 0,   -- Net after adjustments
  leads_count INTEGER DEFAULT 0,
  enrolls_count INTEGER DEFAULT 0,

  -- Calculated metrics (can be computed, but stored for performance)
  lte_percent DECIMAL(5,2),  -- Lead to Enroll %
  cpl DECIMAL(10,2),         -- Cost Per Lead
  cpe DECIMAL(10,2),         -- Cost Per Enroll

  -- Additional metrics from ad platforms
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(date, campus_id, channel_id)
);

-- Index for date range queries
CREATE INDEX idx_daily_metrics_date ON daily_metrics(date);
CREATE INDEX idx_daily_metrics_campus_date ON daily_metrics(campus_id, date);
CREATE INDEX idx_daily_metrics_channel_date ON daily_metrics(channel_id, date);

-- =============================================
-- AD SPEND DATA (from Google Ads / Meta)
-- =============================================

CREATE TABLE daily_ad_spend (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google_ads', 'meta')),

  -- Attribution
  campus_id UUID REFERENCES campuses(id),
  channel_id UUID REFERENCES channels(id),

  -- Campaign details
  campaign_id TEXT,
  campaign_name TEXT,
  ad_group_name TEXT,

  -- Metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  spend DECIMAL(12,2) DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  conversion_value DECIMAL(12,2) DEFAULT 0,

  -- Raw API response
  raw_data JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(date, platform, campaign_id)
);

CREATE INDEX idx_daily_ad_spend_date ON daily_ad_spend(date);
CREATE INDEX idx_daily_ad_spend_platform ON daily_ad_spend(platform, date);

-- =============================================
-- BUDGET & REVENUE (Manual Input)
-- =============================================

-- Monthly budget allocations
CREATE TABLE monthly_budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month DATE NOT NULL, -- First day of month (e.g., 2026-01-01)
  campus_id UUID REFERENCES campuses(id),
  channel_id UUID REFERENCES channels(id) NOT NULL,

  budget_amount DECIMAL(12,2) NOT NULL,
  notes TEXT,

  created_by TEXT, -- User who entered
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(month, campus_id, channel_id)
);

-- Revenue entries (manual tracking)
CREATE TABLE revenue_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  month DATE NOT NULL, -- First day of month
  campus_id UUID REFERENCES campuses(id),
  program_id UUID REFERENCES programs(id),
  channel_id UUID REFERENCES channels(id),

  enrollments INTEGER DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  notes TEXT,

  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(month, campus_id, program_id, channel_id)
);

-- =============================================
-- SYNC & AUDIT LOGS
-- =============================================

CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sync_type TEXT NOT NULL, -- 'leadsquared', 'google_ads', 'meta', 'manual'
  status TEXT NOT NULL CHECK (status IN ('started', 'success', 'error', 'partial')),

  records_processed INTEGER DEFAULT 0,
  records_created INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,

  error_message TEXT,
  error_details JSONB,

  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sync_logs_type ON sync_logs(sync_type, created_at DESC);

-- =============================================
-- HELPER VIEWS
-- =============================================

-- Weekly aggregation view
CREATE VIEW weekly_metrics AS
SELECT
  DATE_TRUNC('week', date)::DATE as week_start,
  (DATE_TRUNC('week', date) + INTERVAL '6 days')::DATE as week_end,
  EXTRACT(WEEK FROM date) as week_number,
  campus_id,
  channel_id,
  SUM(lead_expense_gross) as lead_expense,
  SUM(leads_count) as leads,
  SUM(enrolls_count) as enrolls,
  CASE WHEN SUM(leads_count) > 0
       THEN ROUND((SUM(enrolls_count)::DECIMAL / SUM(leads_count)) * 100, 2)
       ELSE 0 END as lte_percent,
  CASE WHEN SUM(leads_count) > 0
       THEN ROUND(SUM(lead_expense_gross) / SUM(leads_count), 2)
       ELSE 0 END as cpl,
  CASE WHEN SUM(enrolls_count) > 0
       THEN ROUND(SUM(lead_expense_gross) / SUM(enrolls_count), 2)
       ELSE 0 END as cpe
FROM daily_metrics
GROUP BY DATE_TRUNC('week', date), campus_id, channel_id;

-- Monthly aggregation view
CREATE VIEW monthly_metrics AS
SELECT
  DATE_TRUNC('month', date)::DATE as month,
  EXTRACT(MONTH FROM date) as month_number,
  campus_id,
  channel_id,
  SUM(lead_expense_gross) as lead_expense,
  SUM(leads_count) as leads,
  SUM(enrolls_count) as enrolls,
  CASE WHEN SUM(leads_count) > 0
       THEN ROUND((SUM(enrolls_count)::DECIMAL / SUM(leads_count)) * 100, 2)
       ELSE 0 END as lte_percent,
  CASE WHEN SUM(leads_count) > 0
       THEN ROUND(SUM(lead_expense_gross) / SUM(leads_count), 2)
       ELSE 0 END as cpl,
  CASE WHEN SUM(enrolls_count) > 0
       THEN ROUND(SUM(lead_expense_gross) / SUM(enrolls_count), 2)
       ELSE 0 END as cpe
FROM daily_metrics
GROUP BY DATE_TRUNC('month', date), campus_id, channel_id;

-- =============================================
-- ROW LEVEL SECURITY (Optional - for multi-tenant)
-- =============================================

-- Enable RLS on tables (uncomment if needed)
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE monthly_budgets ENABLE ROW LEVEL SECURITY;

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_metrics_updated_at BEFORE UPDATE ON daily_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_budgets_updated_at BEFORE UPDATE ON monthly_budgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_revenue_entries_updated_at BEFORE UPDATE ON revenue_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campuses_updated_at BEFORE UPDATE ON campuses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
