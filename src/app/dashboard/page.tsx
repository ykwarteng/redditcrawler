'use client';
import { useAuth } from '@/providers/AuthProvider';
import { Box, Typography, Container, Grid, Paper, Button, AppBar, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStats } from '@/actions/dashboard';
import { auth } from '@/lib/firebase';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ keywordCount: 0, leadsCount: 0, avgSentiment: '0' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      getStats(user.uid).then(setStats);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Or loading spinner
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            Reddit Crawler Agent
          </Typography>
          <Button color="inherit" onClick={() => router.push('/keywords')}>Keywords</Button>
          <Button color="inherit" onClick={() => router.push('/leads')}>Leads</Button>
          <Button color="inherit" onClick={() => auth.signOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRadius: 4 }}>
              <Typography variant="h4" gutterBottom>
                Welcome back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track keywords, analyze sentiment, and find leads on Reddit.
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={() => router.push('/keywords')}>
                  Manage Keywords
                </Button>
                <Button variant="outlined" onClick={() => router.push('/leads')}>
                  View Leads
                </Button>
                {/* Trigger Crawl Button (Temporary for spike) */}
                <Button variant="text" onClick={async () => {
                  await fetch('/api/crawl', { method: 'POST', body: JSON.stringify({ userId: user.uid }) });
                  alert('Crawl triggered!');
                }}>
                  Trigger Crawl
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: 200, bgcolor: 'background.paper', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">Monitored Keywords</Typography>
              <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold' }}>{stats.keywordCount}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: 200, bgcolor: 'background.paper', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">Leads Found</Typography>
              <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold', color: 'secondary.main' }}>{stats.leadsCount}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, height: 200, bgcolor: 'background.paper', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">Avg Sentiment</Typography>
              <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold' }}>{stats.avgSentiment}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
