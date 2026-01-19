'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getKeywords, addKeyword, deleteKeyword } from '@/actions/keywords';
import { Box, Typography, Container, TextField, Button, List, ListItem, ListItemText, IconButton, Paper, AppBar, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function KeywordsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [keywords, setKeywords] = useState<any[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadKeywords();
        }
    }, [user]);

    async function loadKeywords() {
        if (!user) return;
        setLoading(true);
        const data = await getKeywords(user.uid);
        setKeywords(data);
        setLoading(false);
    }

    async function handleAdd() {
        if (!user || !newKeyword.trim()) return;
        await addKeyword(newKeyword, user.uid);
        setNewKeyword('');
        loadKeywords();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure?')) return;
        await deleteKeyword(id);
        loadKeywords();
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => router.push('/')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                        Manage Keywords
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <TextField
                            fullWidth
                            label="New Keyword"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleAdd} disabled={!newKeyword.trim()}>
                            Add
                        </Button>
                    </Box>
                    <List>
                        {loading ? <Typography>Loading...</Typography> : keywords.map((kw) => (
                            <ListItem key={kw.id} divider
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleDelete(kw.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={kw.keyword} secondary={kw.match_type} />
                            </ListItem>
                        ))}
                        {!loading && keywords.length === 0 && (
                            <Typography color="text.secondary" align="center">No keywords monitored yet.</Typography>
                        )}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
}
