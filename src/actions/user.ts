'use server';
import { supabase } from '@/lib/supabase';

export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export async function syncUser(user: UserData) {
    if (!user.uid) return { error: 'Invalid user data' };

    const { error } = await supabase
        .from('redditcrawler.users')
        .upsert({
            id: user.uid,
            email: user.email,
            display_name: user.displayName,
            photo_url: user.photoURL,
            last_login: new Date().toISOString()
        }, { onConflict: 'id' });

    if (error) {
        console.error('Error syncing user:', error);
        return { error: 'Failed to sync user' };
    }
    return { success: true };
}
