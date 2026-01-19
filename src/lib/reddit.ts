import Snoowrap from 'snoowrap';

export const redditClient = new Snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT || 'RedditCrawler/0.1',
    clientId: process.env.REDDIT_CLIENT_ID || '', // Fallback to empty string to avoid runtime crash on build
    clientSecret: process.env.REDDIT_CLIENT_SECRET || '',
    username: process.env.REDDIT_USERNAME || '',
    password: process.env.REDDIT_PASSWORD || '',
});

export default redditClient;
