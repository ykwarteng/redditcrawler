'use client';
import { Box, Typography, Container, Button, Grid, Paper, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import HubIcon from '@mui/icons-material/Hub';
import { useState } from 'react';
import AuthModal from '@/components/AuthModal';

export default function LandingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const features = [
        {
            icon: <SearchIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Smart Keyword Tracking',
            description: 'Monitor Reddit in real-time for any keywords relevant to your business or niche.'
        },
        {
            icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
            title: 'AI Sentiment Analysis',
            description: 'Automatically analyze the mood of discussions to identify positive mentions or pain points.'
        },
        {
            icon: <AutoGraphIcon sx={{ fontSize: 40, color: 'success.main' }} />,
            title: 'Lead Generation',
            description: 'Our AI scores threads and comments to find high-intent leads ready for engagement.'
        }
    ];

    const howItWorks = [
        {
            icon: <HubIcon fontSize="large" color="primary" />,
            title: '1. Connect Reddit',
            description: 'Safely connect your Reddit account via official OAuth. We only request mandatory read permissions.'
        },
        {
            icon: <SearchIcon fontSize="large" color="primary" />,
            title: '2. Define Keywords',
            description: 'Tell us which topics, subreddits, or keywords you want to monitor for your brand.'
        },
        {
            icon: <SpeedIcon fontSize="large" color="primary" />,
            title: '3. Real-time Analysis',
            description: 'Our engine crawls Reddit using the official API to find relevant discussions instantly.'
        },
        {
            icon: <SecurityIcon fontSize="large" color="primary" />,
            title: '4. Engage Safely',
            description: 'Get notifications and AI-assisted insights to engage with your target audience authentically.'
        }
    ];

    const faqs = [
        {
            question: "How does RedditCrawler access Reddit data?",
            answer: "We use the official Reddit API to fetch publicly available data. We strictly follow Reddit's Developer Terms and API usage limits to ensure a safe and compliant experience."
        },
        {
            question: "Is my Reddit account safe?",
            answer: "Yes. We use Reddit OAuth for authentication. We never see or store your Reddit password. You can revoke our access at any time through your Reddit account settings."
        },
        {
            question: "Can I manage multiple subreddits?",
            answer: "Absolutely. You can track keywords across the entire platform or limit your monitoring to specific subreddits that matter most to your business."
        },
        {
            question: "Does it support multiple languages?",
            answer: "Our AI sentiment analysis currently works best with English, but we support keyword tracking for any language supported by Reddit's search."
        }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(180deg, rgba(255,69,0,0.08) 0%, rgba(255,69,0,0) 100%)',
                pt: { xs: 12, md: 20 },
                pb: { xs: 10, md: 15 },
                textAlign: 'center'
            }}>
                <Container maxWidth="md">
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 2, mb: 2, display: 'block' }}>
                        THE ULTIMATE REDDIT MONITORING TOOL
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontSize: { xs: '2.8rem', md: '4.5rem' },
                        fontWeight: 900,
                        mb: 3,
                        background: 'linear-gradient(90deg, #FF4500, #FF8C00)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.1
                    }}>
                        Listen to the Heart of the Internet
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 6, lineHeight: 1.6, maxWidth: '700px', mx: 'auto' }}>
                        RedditCrawler analyzes millions of Reddit conversations to find your next customers, track your brand, and uncover industry trends in real-time.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                        {user ? (
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => router.push('/dashboard')}
                                sx={{ px: 5, py: 2, borderRadius: 10, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(255, 69, 0, 0.3)' }}
                            >
                                Go to Dashboard
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => setAuthModalOpen(true)}
                                sx={{ px: 5, py: 2, borderRadius: 10, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(255, 69, 0, 0.3)' }}
                            >
                                Get Started for Free
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ px: 5, py: 2, borderRadius: 10, fontSize: '1.2rem', borderColor: 'divider' }}
                            onClick={() => {
                                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            See How it Works
                        </Button>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 4, opacity: 0.7 }}>
                        No credit card required. Compliant with Reddit API Policy.
                    </Typography>
                </Container>
            </Box>

            {/* How it Works Section */}
            <Box id="how-it-works" sx={{ py: 15, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 10 }}>
                        How RedditCrawler Works
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 6,
                        justifyContent: 'center'
                    }}>
                        {howItWorks.map((item, index) => (
                            <Box key={index} sx={{
                                flex: { xs: '1 1 100%', sm: '1 1 40%', md: '1 1 20%' },
                                maxWidth: '280px',
                                textAlign: 'center',
                                p: 2
                            }}>
                                <Box sx={{
                                    mb: 3,
                                    display: 'inline-flex',
                                    p: 2.5,
                                    borderRadius: '24px',
                                    bgcolor: 'rgba(255,69,0,0.05)',
                                    border: '1px solid',
                                    borderColor: 'rgba(255,69,0,0.1)',
                                    color: 'primary.main'
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {item.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box id="features" sx={{ py: 15, bgcolor: 'rgba(0,0,0,0.01)' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 10 }}>
                        Powerful Features
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        justifyContent: 'center'
                    }}>
                        {features.map((feature, index) => (
                            <Box key={index} sx={{
                                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 30%' },
                                maxWidth: '400px',
                                display: 'flex'
                            }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 5,
                                        width: '100%',
                                        textAlign: 'center',
                                        borderRadius: 8,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        '&:hover': {
                                            transform: 'translateY(-12px)',
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                                            borderColor: 'primary.main'
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 3, p: 2, borderRadius: '50%', bgcolor: 'rgba(255,69,0,0.04)' }}>{feature.icon}</Box>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 900 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* FAQ Section */}
            <Box id="faq" sx={{ py: 15 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 8 }}>
                        Frequently Asked Questions
                    </Typography>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} elevation={0} sx={{
                            mb: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '12px !important',
                            '&:before': { display: 'none' }
                        }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="text.secondary">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </Box>

            {/* Social Proof / Call to Action */}
            <Box sx={{ py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, #FF4500, #FF8C00)',
                    opacity: 0.9,
                    zIndex: -1
                }} />
                <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h2" sx={{ mb: 3, fontWeight: 900 }}>
                        Start Your Growth Journey on Reddit Today
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}>
                        Join smart marketers who use RedditCrawler to find leads and build authority where it matters most.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            px: 8,
                            py: 2.5,
                            borderRadius: 10,
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            '&:hover': { bgcolor: '#f5f5f5' },
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => user ? router.push('/dashboard') : setAuthModalOpen(true)}
                    >
                        Try it Free Now
                    </Button>
                </Container>
            </Box>

            {!user && <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
        </Box>
    );
}
