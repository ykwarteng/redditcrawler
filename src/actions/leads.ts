'use server';
import { supabase } from '@/lib/supabase';

export async function getLeads() {
    // Ideally filter by user's keywords, but for MVP fetching global leads
    const { data, error } = await supabase
        .from('redditcrawler.posts')
        .select('*')
        .eq('is_lead', true)
        .order('lead_score', { ascending: false })
        .limit(50);

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
    return data;
}
