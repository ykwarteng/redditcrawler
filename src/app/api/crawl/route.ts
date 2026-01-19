import { NextResponse } from 'next/server';
import { crawlKeywords } from '@/services/crawler';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = body; // Optional: trigger for specific user

        // In a production app, verify the Firebase ID token from 'Authorization' header here.

        // Trigger the crawl
        // Note: This might time out on Vercel (10s limit on free tier), 
        // so ideally this should queue a job. For this spike, we run directly.
        await crawlKeywords(userId);

        return NextResponse.json({ success: true, message: 'Crawl completed successfully' });
    } catch (error) {
        console.error('Crawl API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
