'use server';
import { supabase } from '@/lib/supabase';

export async function getStats(userId: string) {
    const { count: keywordCount } = await supabase
        .from('redditcrawler.monitored_keywords')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

    const { count: leadsCount } = await supabase
        .from('redditcrawler.posts')
        .select('*', { count: 'exact', head: true })
        .eq('is_lead', true);

    const { data: sentimentData } = await supabase
        .from('redditcrawler.posts')
        .select('sentiment_score')
        .not('sentiment_score', 'is', null)
        .limit(100);

    const totalSentiment = sentimentData?.reduce((acc: number, curr: { sentiment_score: number }) => acc + curr.sentiment_score, 0) || 0;
    const avgSentiment = sentimentData?.length ? (totalSentiment / sentimentData.length) : 0;

    return {
        keywordCount: keywordCount || 0,
        leadsCount: leadsCount || 0,
        avgSentiment: avgSentiment.toFixed(2)
    };
}
