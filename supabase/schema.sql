-- Create a dedicated schema for the Reddit Crawler
CREATE SCHEMA IF NOT EXISTS redditcrawler;

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: redditcrawler.subreddits
CREATE TABLE IF NOT EXISTS redditcrawler.subreddits (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    subscriber_count BIGINT,
    nsfw BOOLEAN DEFAULT FALSE,
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: redditcrawler.monitored_keywords
CREATE TABLE IF NOT EXISTS redditcrawler.monitored_keywords (
    id SERIAL PRIMARY KEY,
    keyword TEXT NOT NULL,
    user_id TEXT NOT NULL, -- Firebase UID
    match_type TEXT DEFAULT 'exact', -- exact, phrase
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: redditcrawler.users
CREATE TABLE IF NOT EXISTS redditcrawler.users (
    id TEXT PRIMARY KEY, -- Firebase UID
    email TEXT,
    display_name TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: redditcrawler.posts
CREATE TABLE IF NOT EXISTS redditcrawler.posts (
    id TEXT PRIMARY KEY, -- Reddit Post ID (e.g., t3_...)
    title TEXT NOT NULL,
    body TEXT,
    subreddit TEXT NOT NULL,
    author TEXT,
    url TEXT,
    upvotes INTEGER,
    downvotes INTEGER,
    score INTEGER,
    comment_count INTEGER,
    created_utc TIMESTAMP WITH TIME ZONE,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sentiment_score FLOAT, -- From AI analysis
    sentiment_label TEXT, -- e.g. Positive, Negative, Neutral
    lead_score FLOAT, -- From AI analysis
    is_lead BOOLEAN DEFAULT FALSE,
    raw_data JSONB -- Store full raw object if needed
);

-- Table: redditcrawler.comments
CREATE TABLE IF NOT EXISTS redditcrawler.comments (
    id TEXT PRIMARY KEY, -- Reddit Comment ID
    post_id TEXT REFERENCES redditcrawler.posts(id),
    parent_id TEXT,
    body TEXT,
    author TEXT,
    score INTEGER,
    created_utc TIMESTAMP WITH TIME ZONE,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sentiment_score FLOAT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_subreddit ON redditcrawler.posts(subreddit);
CREATE INDEX IF NOT EXISTS idx_posts_created_utc ON redditcrawler.posts(created_utc);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON redditcrawler.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_keywords_user_id ON redditcrawler.monitored_keywords(user_id);
