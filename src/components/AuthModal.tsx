'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { syncUser } from '@/actions/user';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Divider,
    IconButton,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
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
            photoURL: user.photoURL,
        });
        onClose();
        router.push('/dashboard');
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
        <Modal open={open} onClose={onClose} aria-labelledby="auth-modal-title">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography id="auth-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    sx={{ mb: 2, borderRadius: 10 }}
                >
                    Continue with Google
                </Button>

                <Divider sx={{ mb: 2 }}>OR</Divider>

                <Box component="form" onSubmit={handleAuth} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        size="small"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, borderRadius: 10, py: 1 }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Box>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="text" size="small" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
