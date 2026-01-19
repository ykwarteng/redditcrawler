'use client';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';

export default function TermsOfService() {
    return (
        <Container maxWidth="md" sx={{ py: 10 }}>
            <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                    Terms of Service
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Last updated: {new Date().toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    1. Acceptance of Terms
                </Typography>
                <Typography variant="body1" paragraph>
                    By accessing or using RedditCrawler, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    2. Use License
                </Typography>
                <Typography variant="body1" paragraph>
                    Permission is granted to temporarily use the RedditCrawler platform for personal or commercial monitoring of Reddit data. This is the grant of a license, not a transfer of title.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    3. Reddit API Usage
                </Typography>
                <Typography variant="body1" paragraph>
                    Our service relies on the Reddit API. You agree to comply with all Reddit policies, including but not limited to Reddit's User Agreement and Developer Terms. Any misuse of Reddit data through our platform is strictly prohibited and may result in account termination.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    4. Prohibited Conduct
                </Typography>
                <Typography variant="body1" paragraph>
                    You agree not to:
                </Typography>
                <ul>
                    <li><Typography variant="body1">Use the service for any illegal purpose</Typography></li>
                    <li><Typography variant="body1">Attempt to gain unauthorized access to our systems</Typography></li>
                    <li><Typography variant="body1">Use our service to harass or spam Reddit users</Typography></li>
                    <li><Typography variant="body1">Bypass any measures we may use to prevent or restrict access to the service</Typography></li>
                </ul>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    5. Disclaimer
                </Typography>
                <Typography variant="body1" paragraph>
                    The materials on RedditCrawler are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    6. Limitations
                </Typography>
                <Typography variant="body1" paragraph>
                    In no event shall RedditCrawler or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    7. Governing Law
                </Typography>
                <Typography variant="body1" paragraph>
                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </Typography>
            </Paper>
        </Container>
    );
}
