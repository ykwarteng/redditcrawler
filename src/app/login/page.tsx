'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Container, Alert, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { syncUser } from '@/actions/user';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSuccess = async (cred: UserCredential) => {
        const { user } = cred;
        await syncUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        });
        router.push('/');
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            let cred;
            if (isSignUp) {
                cred = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                cred = await signInWithEmailAndPassword(auth, email, password);
            }
            await handleSuccess(cred);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const cred = await signInWithPopup(auth, googleProvider);
            await handleSuccess(cred);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{ mb: 2 }}
                    >
                        Sign in with Google
                    </Button>

                    <Divider sx={{ width: '100%', mb: 2 }}>OR</Divider>

                    <Box component="form" onSubmit={handleAuth} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 48 }}
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
