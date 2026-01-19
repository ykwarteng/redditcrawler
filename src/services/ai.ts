import { openai } from '@/lib/openai';

export interface AnalysisResult {
    sentiment_score: number;
    sentiment_label: 'Positive' | 'Negative' | 'Neutral';
    lead_score: number;
    is_lead: boolean;
}

export async function analyzePost(title: string, body: string): Promise<AnalysisResult> {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('OpenAI API Key missing, skipping analysis');
        return { sentiment_score: 0, sentiment_label: 'Neutral', lead_score: 0, is_lead: false };
    }

    const content = `Title: ${title}\nBody: ${body}\n\nAnalyze the sentiment of this Reddit post. Also determine if this post represents a sales lead or high intent for a product/service solution (Lead Generation). Return JSON: { "sentiment_score": number (-1 to 1), "sentiment_label": string, "lead_score": number (0 to 1), "is_lead": boolean }`;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
        });

        const result = JSON.parse(completion.choices[0].message.content || '{}');
        return {
            sentiment_score: result.sentiment_score || 0,
            sentiment_label: result.sentiment_label || 'Neutral',
            lead_score: result.lead_score || 0,
            is_lead: result.is_lead || false,
        };
    } catch (error) {
        console.error('AI Analysis failed:', error);
        return { sentiment_score: 0, sentiment_label: 'Neutral', lead_score: 0, is_lead: false };
    }
}
