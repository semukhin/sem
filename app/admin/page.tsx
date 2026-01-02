'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgramsManager from './ProgramsManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit, Save, ArrowLeft, LogOut, Loader2, Image as ImageIcon, ExternalLink, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getPosts, savePost, deletePost, getPrograms, savePrograms as saveProgramsAction } from '@/app/actions/content';
import { NewsPost, Program } from '@/lib/types';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'news' | 'programs'>('news');
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<NewsPost | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Simple authentication (in production, use proper auth)
    const ADMIN_PASSWORD = 'admin123';

    useEffect(() => {
        setMounted(true);
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [fetchedPosts, fetchedPrograms] = await Promise.all([
                getPosts(),
                getPrograms()
            ]);
            setPosts(fetchedPosts);
            setPrograms(fetchedPrograms);
        } catch (error) {
            console.error('Failed to load data:', error);
            alert('Failed to load data from server');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Неверный пароль!');
        }
    };

    const handleCreateNew = () => {
        setCurrentPost({
            id: Date.now().toString(),
            title: '',
            date: new Date().toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            }),
            excerpt: '',
            content: '',
            slug: '',
            imageUrl: '',
            imageUrl2: '',
            videoUrl: '',
            externalLink: '',
            externalLinkTitle: '',
            externalLinkDescription: '',
            externalLinkImage: '',
        });
        setIsEditing(true);
    };

    const handleEdit = (post: NewsPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Вы уверены, что хотите удалить этот пост?')) {
            setIsLoading(true);
            try {
                const result = await deletePost(id);
                if (result.success) {
                    // Update local state
                    setPosts(posts.filter(p => p.id !== id));
                } else {
                    alert('Ошибка при удалении поста');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Ошибка при удалении поста');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPost) return;

        setIsLoading(true);

        // Generate slug from title if empty
        if (!currentPost.slug) {
            currentPost.slug = currentPost.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        try {
            const result = await savePost(currentPost);
            if (result.success) {
                // Refresh list
                const updatedPosts = await getPosts();
                setPosts(updatedPosts);
                setIsEditing(false);
                setCurrentPost(null);
            } else {
                alert('Ошибка при сохранении поста');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Ошибка при сохранении поста');
        } finally {
            setIsLoading(false);
        }
    };

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const maxWidth = 1200;
                    const maxHeight = 1200;

                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        } else {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                        resolve(compressedDataUrl);
                    } else {
                        reject(new Error('Failed to get canvas context'));
                    }
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && currentPost) {
            try {
                const compressedImage = await compressImage(file);
                setCurrentPost({ ...currentPost, imageUrl: compressedImage });
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Ошибка при загрузке изображения');
            }
        }
    };

    const handleImage2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && currentPost) {
            try {
                const compressedImage = await compressImage(file);
                setCurrentPost({ ...currentPost, imageUrl2: compressedImage });
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Ошибка при загрузке изображения');
            }
        }
    };

    // Callback for ProgramsManager to update programs state
    const handleSavePrograms = async (newPrograms: Program[]) => {
        setIsLoading(true);
        try {
            const result = await saveProgramsAction(newPrograms);
            if (result.success) {
                setPrograms(newPrograms);
            } else {
                alert('Ошибка при сохранении программы');
            }
        } catch (error) {
            console.error('Error saving programs:', error);
            alert('Ошибка при сохранении программы');
        } finally {
            setIsLoading(false);
        }
    };


    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-primary">Admin Panel</CardTitle>
                        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter password"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        );
    }

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const textareaClass = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    if (isEditing && currentPost) {
        return (
            <main className="py-12 px-4 md:px-8 max-w-5xl mx-auto min-h-screen">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {posts.find(p => p.id === currentPost.id) ? 'Edit Post' : 'Create New Post'}
                    </h1>
                    <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentPost(null); }} disabled={isLoading}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Button>
                </div>

                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title *</label>
                                <input type="text" value={currentPost.title} onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })} required className={inputClass} placeholder="News Title" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date *</label>
                                    <input type="text" value={currentPost.date} onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })} required className={inputClass} placeholder="MM/DD/YYYY" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Slug (URL)</label>
                                    <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })} className={inputClass} placeholder="auto-generated" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Excerpt *</label>
                                <textarea value={currentPost.excerpt} onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })} required rows={3} className={textareaClass} placeholder="Brief summary" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content (HTML supported) *</label>
                                <textarea value={currentPost.content} onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })} required rows={10} className={textareaClass} placeholder="Full content..." />
                            </div>

                            {/* Images Section */}
                            <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                                <div className="space-y-4">
                                    <label className="text-sm font-medium flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Header Image</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className={inputClass} />
                                    {currentPost.imageUrl && (
                                        <div className="relative group rounded-md overflow-hidden border">
                                            <img src={currentPost.imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                                            <button type="button" onClick={() => setCurrentPost({ ...currentPost, imageUrl: '' })} className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Footer Image</label>
                                    <input type="file" accept="image/*" onChange={handleImage2Upload} className={inputClass} />
                                    {currentPost.imageUrl2 && (
                                        <div className="relative group rounded-md overflow-hidden border">
                                            <img src={currentPost.imageUrl2} alt="Preview 2" className="w-full h-48 object-cover" />
                                            <button type="button" onClick={() => setCurrentPost({ ...currentPost, imageUrl2: '' })} className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* External Link Section */}
                            <div className="space-y-4 p-4 border rounded-lg">
                                <h3 className="text-sm font-semibold flex items-center gap-2"><ExternalLink className="w-4 h-4" /> External Resource (Optional)</h3>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium">Link URL</label>
                                    <input type="url" value={currentPost.externalLink} onChange={(e) => setCurrentPost({ ...currentPost, externalLink: e.target.value })} className={inputClass} placeholder="https://..." />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="w-full md:w-auto px-8 gap-2" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Post
                                </Button>
                                <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setCurrentPost(null); }} className="w-full md:w-auto" disabled={isLoading}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="py-12 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your website content</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.push('/')}>
                        Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setIsAuthenticated(false)}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </div>

            {/* Custom Tabs Implementation using Tailwind */}
            <div className="space-y-6">
                <div className="flex border-b">
                    <button
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'news' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setActiveTab('news')}
                    >
                        News Management
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'programs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setActiveTab('programs')}
                    >
                        Programs Management
                    </button>
                </div>

                <div className="min-h-[500px]">
                    {isLoading && !isEditing ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            {activeTab === 'news' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center bg-muted/20 p-4 rounded-lg">
                                        <h2 className="text-xl font-semibold">News Posts ({posts.length})</h2>
                                        <Button onClick={handleCreateNew} className="gap-2">
                                            <Plus className="w-4 h-4" /> Create Post
                                        </Button>
                                    </div>

                                    {posts.length === 0 ? (
                                        <Card className="border-dashed">
                                            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                                                <div className="bg-muted p-4 rounded-full mb-4">
                                                    <RefreshCw className="w-8 h-8 text-muted-foreground opacity-50" />
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2">No News Posts Yet</h3>
                                                <p className="text-muted-foreground max-w-sm mb-6">Start by creating your first news post to share updates with your community.</p>
                                                <Button onClick={handleCreateNew}>Create Post</Button>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <div className="grid gap-4">
                                            {posts.map((post) => (
                                                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                                                    <div className="flex flex-col sm:flex-row">
                                                        {post.imageUrl && (
                                                            <div className="sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0 relative">
                                                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                                            </div>
                                                        )}
                                                        <CardContent className="flex-1 p-6 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h3 className="text-xl font-bold line-clamp-1">{post.title}</h3>
                                                                    <Badge variant="outline">{post.date}</Badge>
                                                                </div>
                                                                <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                                                            </div>
                                                            <div className="flex justify-end gap-3 pt-4 border-t mt-2">
                                                                <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="gap-2">
                                                                    <Edit className="w-4 h-4" /> Edit
                                                                </Button>
                                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)} className="gap-2">
                                                                    <Trash2 className="w-4 h-4" /> Delete
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'programs' && (
                                <div className="p-4 bg-background rounded-lg border shadow-sm">
                                    <ProgramsManager
                                        programs={programs}
                                        onSave={handleSavePrograms}
                                        onImageUpload={(e, program, setProgram) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                compressImage(file).then(compressedImage => {
                                                    setProgram({ ...program, imageUrl: compressedImage });
                                                }).catch(error => {
                                                    console.error('Error compressing image:', error);
                                                    alert('Error uploading image');
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
