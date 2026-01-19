import { redditClient } from '@/lib/reddit';
import { supabase } from '@/lib/supabase';
import { analyzePost } from './ai';

export async function crawlKeywords(userId?: string) {
    // 1. Fetch keywords
    let query = supabase.from('redditcrawler.monitored_keywords').select('*');
    if (userId) {
        query = query.eq('user_id', userId);
    }
    const { data: keywords, error } = await query;

    if (error || !keywords) {
        console.error('Failed to fetch keywords', error);
        return;
    }

    for (const kw of keywords) {
        try {
            // 2. Search Reddit
            const searchResults = await redditClient.search({
                query: kw.keyword,
                sort: 'new',
                time: 'day', // specific to daily crawl
                limit: 25,
            });

            for (const post of searchResults) {
                // 3. Check if exists
                const { data: existing } = await supabase
                    .from('redditcrawler.posts')
                    .select('id')
                    .eq('id', post.id)
                    .single();

                if (existing) continue;

                // 4. Analyze
                const analysis = await analyzePost(post.title, post.selftext);

                // 5. Save Post
                await supabase.from('redditcrawler.posts').insert({
                    id: post.id,
                    title: post.title,
                    body: post.selftext,
                    subreddit: post.subreddit.display_name,
                    author: post.author.name,
                    url: post.url,
                    upvotes: post.ups,
                    downvotes: post.downs,
                    score: post.score,
                    comment_count: post.num_comments,
                    created_utc: new Date(post.created_utc * 1000).toISOString(),
                    sentiment_score: analysis.sentiment_score,
                    sentiment_label: analysis.sentiment_label,
                    lead_score: analysis.lead_score,
                    is_lead: analysis.is_lead,
                    raw_data: post
                });

                // Optional: Fetch comments logic (omitted for brevity, can be added)
            }
        } catch (err) {
            console.error(`Failed to crawl keyword ${kw.keyword}:`, err);
        }
    }
}
