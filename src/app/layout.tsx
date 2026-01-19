import type { Metadata } from 'next';
import ThemeRegistry from '@/providers/ThemeRegistry';
import AuthProvider from '@/providers/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Box } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'RedditCrawler - Unlock Reddit Intelligence',
  description: 'AI-powered Reddit intelligence and engagement tool for marketers and startups.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
