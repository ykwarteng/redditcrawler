'use client';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import NextLink from 'next/link';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, borderTop: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 35%' }, mb: { xs: 4, md: 0 } }}>
                        <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 800 }}>
                            RedditCrawler
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                            Empowering marketers and startups with AI-driven Reddit intelligence. Monitor, analyze, and engage with your community effectively.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 45%', sm: '1 1 20%', md: '1 1 15%' } }}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 800 }}>
                            Product
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link href="/#features" component={NextLink} variant="body2" color="text.secondary" underline="hover">
                                Features
                            </Link>
                            <Link href="/#how-it-works" component={NextLink} variant="body2" color="text.secondary" underline="hover">
                                How it Works
                            </Link>
                            <Link href="/#faq" component={NextLink} variant="body2" color="text.secondary" underline="hover">
                                FAQ
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 45%', sm: '1 1 20%', md: '1 1 15%' } }}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 800 }}>
                            Legal
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link href="/privacy" component={NextLink} variant="body2" color="text.secondary" underline="hover">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" component={NextLink} variant="body2" color="text.secondary" underline="hover">
                                Terms of Service
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 20%', md: '1 1 15%' }, mt: { xs: 4, sm: 0 } }}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 800 }}>
                            Support
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link href="mailto:support@redditcrawler.com" variant="body2" color="text.secondary" underline="hover">
                                Contact Us
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.05)' }} />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ opacity: 0.6 }}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' RedditCrawler. All rights reserved. This application is not affiliated with or endorsed by Reddit, Inc.'}
                </Typography>
            </Container>
        </Box>
    );
}
