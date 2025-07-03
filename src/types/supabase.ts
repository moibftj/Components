export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          role: 'user' | 'lawyer' | 'admin'
          full_name: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
          status: string
        }
        Insert: {
          id: string
          username: string
          email: string
          role?: 'user' | 'lawyer' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
          status?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          role?: 'user' | 'lawyer' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
          status?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          content: string
          variables: Json | null
          category: string | null
          is_active: boolean | null
          created_at: string | null
          created_by: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          content: string
          variables?: Json | null
          category?: string | null
          is_active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          content?: string
          variables?: Json | null
          category?: string | null
          is_active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          updated_at?: string | null
        }
      }
      letters: {
        Row: {
          id: string
          user_id: string
          template_id: string
          title: string
          generated_content: string
          blurred_content: string | null
          variables: Json | null
          status: 'draft' | 'pending_payment' | 'blurred_preview' | 'under_review' | 'approved' | 'rejected'
          lawyer_id: string | null
          lawyer_notes: string | null
          payment_status: string
          payment_amount: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          title: string
          generated_content: string
          blurred_content?: string | null
          variables?: Json | null
          status?: 'draft' | 'pending_payment' | 'blurred_preview' | 'under_review' | 'approved' | 'rejected'
          lawyer_id?: string | null
          lawyer_notes?: string | null
          payment_status?: string
          payment_amount?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          title?: string
          generated_content?: string
          blurred_content?: string | null
          variables?: Json | null
          status?: 'draft' | 'pending_payment' | 'blurred_preview' | 'under_review' | 'approved' | 'rejected'
          lawyer_id?: string | null
          lawyer_notes?: string | null
          payment_status?: string
          payment_amount?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          letter_id: string
          user_id: string
          amount: number
          currency: string | null
          status: string
          transaction_id: string | null
          payment_method: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          letter_id: string
          user_id: string
          amount: number
          currency?: string | null
          status?: string
          transaction_id?: string | null
          payment_method?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          letter_id?: string
          user_id?: string
          amount?: number
          currency?: string | null
          status?: string
          transaction_id?: string | null
          payment_method?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          letter_id: string | null
          type: 'letter_approved' | 'letter_rejected' | 'letter_assigned' | 'payment_confirmed' | 'letter_generated'
          title: string
          message: string
          is_read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          letter_id?: string | null
          type: 'letter_approved' | 'letter_rejected' | 'letter_assigned' | 'payment_confirmed' | 'letter_generated'
          title: string
          message: string
          is_read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          letter_id?: string | null
          type?: 'letter_approved' | 'letter_rejected' | 'letter_assigned' | 'payment_confirmed' | 'letter_generated'
          title?: string
          message?: string
          is_read?: boolean | null
          created_at?: string | null
        }
      }
      system_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'user' | 'lawyer' | 'admin'
      letter_status: 'draft' | 'pending_payment' | 'blurred_preview' | 'under_review' | 'approved' | 'rejected'
      notification_type: 'letter_approved' | 'letter_rejected' | 'letter_assigned' | 'payment_confirmed' | 'letter_generated'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}