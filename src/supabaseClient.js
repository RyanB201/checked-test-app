import { createClient } from '@supabase/supabase-js'

// Clean up the environment variables just in case they were pasted with extra spaces or quotes
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/['"]/g, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim().replace(/['"]/g, '')

// Ensure the URL starts with https:// if they accidentally omitted it
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        'Supabase credentials missing! The app will not function correctly. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables.'
    )
}

// Provide a dummy URL and key so the app doesn't crash completely (white screen) on boot
const fallbackUrl = 'https://placeholder-project.supabase.co'
const fallbackKey = 'public-anon-key-placeholder'

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
)
