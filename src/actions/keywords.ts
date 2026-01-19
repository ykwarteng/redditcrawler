'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addKeyword(keyword: string, userId: string) {
    if (!keyword || !userId) return { error: 'Invalid input' };

    const { data, error } = await supabase
        .from('redditcrawler.monitored_keywords')
        .insert({ keyword, user_id: userId, match_type: 'exact' });

    if (error) {
        console.error('Add keyword error:', error);
        return { error: 'Failed to add keyword' };
    }
    revalidatePath('/keywords');
    return { success: true };
}

export async function deleteKeyword(id: number) {
    const { data, error } = await supabase
        .from('redditcrawler.monitored_keywords')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Delete keyword error:', error);
        return { error: 'Failed to delete keyword' };
    }
    revalidatePath('/keywords');
    return { success: true };
}

export async function getKeywords(userId: string) {
    const { data, error } = await supabase
        .from('redditcrawler.monitored_keywords')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) return [];
    return data;
}
