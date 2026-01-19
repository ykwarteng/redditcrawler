'use client';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 10 }}>
            <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Last updated: {new Date().toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    1. Introduction
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to RedditCrawler. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    2. Data We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    We collect information to provide better services to our users. The types of personal information we collect include:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Email address and name (via Google/social login)</Typography></li>
                    <li><Typography variant="body1">Usage data and search queries related to Reddit monitoring</Typography></li>
                    <li><Typography variant="body1">Authentication data provided by third-party services</Typography></li>
                </ul>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    3. How We Use Your Data
                </Typography>
                <Typography variant="body1" paragraph>
                    We use the collected data for various purposes:
                </Typography>
                <ul>
                    <li><Typography variant="body1">To provide and maintain our Service</Typography></li>
                    <li><Typography variant="body1">To notify you about changes to our Service</Typography></li>
                    <li><Typography variant="body1">To provide customer support</Typography></li>
                    <li><Typography variant="body1">To gather analysis or valuable information so that we can improve our Service</Typography></li>
                </ul>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    4. Reddit API Compliance
                </Typography>
                <Typography variant="body1" paragraph>
                    RedditCrawler uses the Reddit API to provide its monitoring features. By using our service, you are also bound by Reddit's User Agreement and Privacy Policy. We do not store Reddit user passwords, and all access to Reddit data is performed through official API channels in compliance with Reddit's Developer Terms.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    5. Data Security
                </Typography>
                <Typography variant="body1" paragraph>
                    The security of your data is important to us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    6. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions about this Privacy Policy, please contact us at support@redditcrawler.com.
                </Typography>
            </Paper>
        </Container>
    );
}
