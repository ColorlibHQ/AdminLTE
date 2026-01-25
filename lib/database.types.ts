// Database types for Supabase
// Run `npm run db:generate-types` to regenerate from your Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      campuses: {
        Row: {
          id: string
          name: string
          code: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          code: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      channels: {
        Row: {
          id: string
          name: string
          type: 'paid' | 'organic'
          platform: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'paid' | 'organic'
          platform?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'paid' | 'organic'
          platform?: string | null
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          leadsquared_id: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          campus_id: string | null
          program_id: string | null
          channel_id: string | null
          source: string | null
          source_medium: string | null
          source_campaign: string | null
          lead_status: string | null
          lead_stage: string | null
          is_enrolled: boolean
          created_date: string
          enrolled_date: string | null
          revenue: number
          raw_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          leadsquared_id?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          campus_id?: string | null
          program_id?: string | null
          channel_id?: string | null
          source?: string | null
          source_medium?: string | null
          source_campaign?: string | null
          lead_status?: string | null
          lead_stage?: string | null
          is_enrolled?: boolean
          created_date: string
          enrolled_date?: string | null
          revenue?: number
          raw_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          leadsquared_id?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          campus_id?: string | null
          program_id?: string | null
          channel_id?: string | null
          source?: string | null
          source_medium?: string | null
          source_campaign?: string | null
          lead_status?: string | null
          lead_stage?: string | null
          is_enrolled?: boolean
          created_date?: string
          enrolled_date?: string | null
          revenue?: number
          raw_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      daily_metrics: {
        Row: {
          id: string
          date: string
          campus_id: string | null
          channel_id: string
          lead_expense_gross: number
          lead_expense_net: number
          leads_count: number
          enrolls_count: number
          lte_percent: number | null
          cpl: number | null
          cpe: number | null
          impressions: number
          clicks: number
          conversions: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          campus_id?: string | null
          channel_id: string
          lead_expense_gross?: number
          lead_expense_net?: number
          leads_count?: number
          enrolls_count?: number
          lte_percent?: number | null
          cpl?: number | null
          cpe?: number | null
          impressions?: number
          clicks?: number
          conversions?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          campus_id?: string | null
          channel_id?: string
          lead_expense_gross?: number
          lead_expense_net?: number
          leads_count?: number
          enrolls_count?: number
          lte_percent?: number | null
          cpl?: number | null
          cpe?: number | null
          impressions?: number
          clicks?: number
          conversions?: number
          created_at?: string
          updated_at?: string
        }
      }
      daily_ad_spend: {
        Row: {
          id: string
          date: string
          platform: 'google_ads' | 'meta'
          campus_id: string | null
          channel_id: string | null
          campaign_id: string | null
          campaign_name: string | null
          ad_group_name: string | null
          impressions: number
          clicks: number
          spend: number
          conversions: number
          conversion_value: number
          raw_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          platform: 'google_ads' | 'meta'
          campus_id?: string | null
          channel_id?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          ad_group_name?: string | null
          impressions?: number
          clicks?: number
          spend?: number
          conversions?: number
          conversion_value?: number
          raw_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          platform?: 'google_ads' | 'meta'
          campus_id?: string | null
          channel_id?: string | null
          campaign_id?: string | null
          campaign_name?: string | null
          ad_group_name?: string | null
          impressions?: number
          clicks?: number
          spend?: number
          conversions?: number
          conversion_value?: number
          raw_data?: Json | null
          created_at?: string
        }
      }
      monthly_budgets: {
        Row: {
          id: string
          month: string
          campus_id: string | null
          channel_id: string
          budget_amount: number
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          month: string
          campus_id?: string | null
          channel_id: string
          budget_amount: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          month?: string
          campus_id?: string | null
          channel_id?: string
          budget_amount?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      revenue_entries: {
        Row: {
          id: string
          month: string
          campus_id: string | null
          program_id: string | null
          channel_id: string | null
          enrollments: number
          revenue: number
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          month: string
          campus_id?: string | null
          program_id?: string | null
          channel_id?: string | null
          enrollments?: number
          revenue?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          month?: string
          campus_id?: string | null
          program_id?: string | null
          channel_id?: string | null
          enrollments?: number
          revenue?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          sync_type: string
          status: 'started' | 'success' | 'error' | 'partial'
          records_processed: number
          records_created: number
          records_updated: number
          records_failed: number
          error_message: string | null
          error_details: Json | null
          started_at: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sync_type: string
          status: 'started' | 'success' | 'error' | 'partial'
          records_processed?: number
          records_created?: number
          records_updated?: number
          records_failed?: number
          error_message?: string | null
          error_details?: Json | null
          started_at: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sync_type?: string
          status?: 'started' | 'success' | 'error' | 'partial'
          records_processed?: number
          records_created?: number
          records_updated?: number
          records_failed?: number
          error_message?: string | null
          error_details?: Json | null
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      weekly_metrics: {
        Row: {
          week_start: string
          week_end: string
          week_number: number
          campus_id: string | null
          channel_id: string
          lead_expense: number
          leads: number
          enrolls: number
          lte_percent: number
          cpl: number
          cpe: number
        }
      }
      monthly_metrics: {
        Row: {
          month: string
          month_number: number
          campus_id: string | null
          channel_id: string
          lead_expense: number
          leads: number
          enrolls: number
          lte_percent: number
          cpl: number
          cpe: number
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row']
