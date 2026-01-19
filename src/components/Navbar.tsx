'use client';
import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import AuthModal from './AuthModal';
import { auth } from '@/lib/firebase';

export default function Navbar() {
    const { user } = useAuth();
    const router = useRouter();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await auth.signOut();
        handleClose();
        router.push('/');
    };

    return (
        <>
            <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => router.push('/')}
                        >
                            RedditCrawler
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4, ml: 10 }}>
                            <Button
                                color="inherit"
                                onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
                                sx={{ textTransform: 'none', fontWeight: 500 }}
                            >
                                Features
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
                                sx={{ textTransform: 'none', fontWeight: 500 }}
                            >
                                How it Works
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => { document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}
                                sx={{ textTransform: 'none', fontWeight: 500 }}
                            >
                                FAQ
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {user ? (
                                <>
                                    <Button color="inherit" onClick={() => router.push('/dashboard')} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        Dashboard
                                    </Button>
                                    <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.displayName || 'User'} src={user.photoURL || undefined} sx={{ width: 32, height: 32 }} />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={() => { router.push('/dashboard'); handleClose(); }}>Dashboard</MenuItem>
                                        <MenuItem onClick={() => { router.push('/keywords'); handleClose(); }}>Keywords</MenuItem>
                                        <MenuItem onClick={() => { router.push('/leads'); handleClose(); }}>Leads</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => setAuthModalOpen(true)}>
                                        Login
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => setAuthModalOpen(true)} sx={{ borderRadius: 10 }}>
                                        Get Started
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
}
