'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getLeads } from '@/actions/leads';
import { Box, Typography, Container, Card, CardContent, CardActions, Button, Chip, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function LeadsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadLeads();
        }
    }, [user]);

    async function loadLeads() {
        setLoading(true);
        const data = await getLeads();
        setLeads(data);
        setLoading(false);
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => router.push('/')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                        Detected Leads
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {loading ? <Typography>Loading leads...</Typography> : leads.map((post) => (
                    <Card key={post.id} sx={{ mb: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h6" component="div">
                                    {post.title}
                                </Typography>
                                <Chip
                                    label={`Score: ${(post.lead_score * 10).toFixed(1)}`}
                                    color="secondary"
                                    size="small"
                                />
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph sx={{ maxHeight: 100, overflow: 'hidden' }}>
                                {post.body}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Chip label={post.sentiment_label} size="small" variant="outlined" />
                                <Chip label={`r/${post.subreddit}`} size="small" variant="outlined" />
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small" href={post.url} target="_blank">View on Reddit</Button>
                        </CardActions>
                    </Card>
                ))}
                {!loading && leads.length === 0 && (
                    <Typography align="center" color="text.secondary">No leads found yet. Try adding keywords and running the crawler.</Typography>
                )}
            </Container>
        </Box>
    );
}
