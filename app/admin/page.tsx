'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgramsManager from './ProgramsManager';

interface NewsPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    slug: string;
    imageUrl?: string;
    imageUrl2?: string;
    videoUrl?: string;
    externalLink?: string;
    externalLinkTitle?: string;
    externalLinkDescription?: string;
    externalLinkImage?: string;
}

interface Program {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    order: number;
}

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'news' | 'programs'>('news');
    const [posts, setPosts] = useState<NewsPost[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<NewsPost | null>(null);
    const [isEditingProgram, setIsEditingProgram] = useState(false);
    const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
    const [mounted, setMounted] = useState(false);


    // Simple authentication (in production, use proper auth)
    const ADMIN_PASSWORD = 'admin123'; // Change this!

    useEffect(() => {
        setMounted(true);
        // Load posts from localStorage
        const savedPosts = localStorage.getItem('semPosts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
        // Load programs from localStorage
        const savedPrograms = localStorage.getItem('semPrograms');
        if (savedPrograms) {
            setPrograms(JSON.parse(savedPrograms));
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Неверный пароль!');
        }
    };

    const savePosts = (newPosts: NewsPost[]) => {
        try {
            localStorage.setItem('semPosts', JSON.stringify(newPosts));
            setPosts(newPosts);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                alert('Ошибка: Превышен лимит хранилища!\n\nИзображения автоматически сжимаются, но у вас слишком много постов.\n\nРекомендации:\n- Удалите старые посты\n- Используйте меньше изображений\n- Используйте изображения меньшего размера');
            } else {
                alert('Ошибка при сохранении поста');
            }
            console.error('Error saving posts:', error);
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

    const handleDelete = (id: string) => {
        if (confirm('Вы уверены, что хотите удалить этот пост?')) {
            const newPosts = posts.filter(p => p.id !== id);
            savePosts(newPosts);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPost) return;

        // Generate slug from title if empty
        if (!currentPost.slug) {
            currentPost.slug = currentPost.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const existingIndex = posts.findIndex(p => p.id === currentPost.id);
        let newPosts;

        if (existingIndex >= 0) {
            newPosts = [...posts];
            newPosts[existingIndex] = currentPost;
        } else {
            newPosts = [currentPost, ...posts];
        }

        savePosts(newPosts);
        setIsEditing(false);
        setCurrentPost(null);
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

                    // Resize if image is too large
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
                        // Compress to JPEG with 0.7 quality
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
                setCurrentPost({
                    ...currentPost,
                    imageUrl: compressedImage,
                });
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
                setCurrentPost({
                    ...currentPost,
                    imageUrl2: compressedImage,
                })
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Ошибка при загрузке изображения');
            }
        }
    };

    // Program management functions
    const savePrograms = (newPrograms: Program[]) => {
        try {
            localStorage.setItem('semPrograms', JSON.stringify(newPrograms));
            setPrograms(newPrograms);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                alert('Ошибка: Превышен лимит хранилища!\n\nУдалите старые программы или уменьшите размер изображений.');
            } else {
                alert('Ошибка при сохранении программы');
            }
            console.error('Error saving programs:', error);
        }
    };

    const handleCreateNewProgram = () => {
        setCurrentProgram({
            id: Date.now().toString(),
            title: '',
            description: '',
            imageUrl: '',
            order: programs.length + 1,
        });
        setIsEditingProgram(true);
    };

    const handleEditProgram = (program: Program) => {
        setCurrentProgram(program);
        setIsEditingProgram(true);
    };

    const handleDeleteProgram = (id: string) => {
        if (confirm('Вы уверены, что хотите удалить эту программу?')) {
            const newPrograms = programs.filter(p => p.id !== id);
            savePrograms(newPrograms);
        }
    };

    const handleSaveProgram = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProgram) return;

        const existingIndex = programs.findIndex(p => p.id === currentProgram.id);
        let newPrograms;

        if (existingIndex >= 0) {
            newPrograms = [...programs];
            newPrograms[existingIndex] = currentProgram;
        } else {
            newPrograms = [...programs, currentProgram];
        }

        // Sort by order
        newPrograms.sort((a, b) => a.order - b.order);

        savePrograms(newPrograms);
        setIsEditingProgram(false);
        setCurrentProgram(null);
    };

    const handleProgramImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && currentProgram) {
            try {
                const compressedImage = await compressImage(file);
                setCurrentProgram({
                    ...currentProgram,
                    imageUrl: compressedImage,
                });
            } catch (error) {
                console.error('Error compressing image:', error);
                alert('Ошибка при загрузке изображения');
            }
        }
    };


    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-alt)' }}>
                <div style={{ background: 'white', padding: 'var(--spacing-2xl)', borderRadius: 'var(--border-radius)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }}>Админ-панель SEM</h1>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                        />
                        <button type="submit" className="btn btn-primary">
                            Войти
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    if (isEditing && currentPost) {
        return (
            <main style={{ padding: 'var(--spacing-xl) 0', minHeight: '80vh' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-md)', borderBottom: '2px solid var(--color-border)' }}>
                        <h1 style={{ margin: 0 }}>{currentPost.id && posts.find(p => p.id === currentPost.id) ? 'Редактировать пост' : 'Создать новый пост'}</h1>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setCurrentPost(null);
                            }}
                            className="btn btn-primary"
                        >
                            ← Назад к списку
                        </button>
                    </div>

                    <form onSubmit={handleSave} style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Заголовок *</label>
                            <input
                                type="text"
                                value={currentPost.title}
                                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                required
                                placeholder="Введите заголовок новости"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Дата публикации *</label>
                            <input
                                type="text"
                                value={currentPost.date}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCurrentPost({ ...currentPost, date: inputValue });
                                }}
                                onBlur={(e) => {
                                    // Try to parse and format the date when user leaves the field
                                    const inputValue = e.target.value;
                                    try {
                                        const parsedDate = new Date(inputValue);
                                        if (!isNaN(parsedDate.getTime())) {
                                            const formattedDate = parsedDate.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            });
                                            setCurrentPost({ ...currentPost, date: formattedDate });
                                        }
                                    } catch (error) {
                                        // Keep the original value if parsing fails
                                    }
                                }}
                                required
                                placeholder="MM/DD/YYYY или August 11, 2025"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Введите дату в формате MM/DD/YYYY (например: 08/11/2025) или полный формат
                            </small>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Slug (URL) *</label>
                            <input
                                type="text"
                                value={currentPost.slug}
                                onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                placeholder="url-friendly-name (оставьте пустым для автогенерации)"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Будет использоваться в URL: /news/{currentPost.slug || 'auto-generated'}
                            </small>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Краткое описание *</label>
                            <textarea
                                value={currentPost.excerpt}
                                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                required
                                rows={3}
                                placeholder="Краткое описание для карточки новости"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Полный текст *</label>
                            <textarea
                                value={currentPost.content}
                                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                required
                                rows={10}
                                placeholder="Полный текст новости (поддерживается HTML)"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Можно использовать HTML теги: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;
                            </small>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Изображение 1 (до текста)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ width: '100%', padding: 'var(--spacing-sm)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Изображения автоматически сжимаются для экономии места
                            </small>
                            {currentPost.imageUrl && (
                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    <img src={currentPost.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--border-radius)', display: 'block' }} />
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPost({ ...currentPost, imageUrl: '' })}
                                        style={{ marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-xs) var(--spacing-md)', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
                                    >
                                        Удалить изображение
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Изображение 2 (после текста)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage2Upload}
                                style={{ width: '100%', padding: 'var(--spacing-sm)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Изображения автоматически сжимаются для экономии места
                            </small>
                            {currentPost.imageUrl2 && (
                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    <img src={currentPost.imageUrl2} alt="Preview 2" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--border-radius)', display: 'block' }} />
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPost({ ...currentPost, imageUrl2: '' })}
                                        style={{ marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-xs) var(--spacing-md)', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
                                    >
                                        Удалить изображение
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Видео URL (YouTube, Vimeo)</label>
                            <input
                                type="url"
                                value={currentPost.videoUrl}
                                onChange={(e) => setCurrentPost({ ...currentPost, videoUrl: e.target.value })}
                                placeholder="https://www.youtube.com/watch?v=..."
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Ссылка на внешний источник</label>
                            <input
                                type="url"
                                value={currentPost.externalLink}
                                onChange={(e) => setCurrentPost({ ...currentPost, externalLink: e.target.value })}
                                placeholder="https://example.com/document.pdf"
                                style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                            />
                            <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                Ссылка на PDF, статью или другой внешний ресурс
                            </small>

                            {currentPost.externalLink && (
                                <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: 'var(--color-background-alt)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
                                    <p style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)', fontSize: '0.9rem' }}>Настройки превью ссылки:</p>

                                    <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 'var(--spacing-xs)' }}>Заголовок превью</label>
                                        <input
                                            type="text"
                                            value={currentPost.externalLinkTitle}
                                            onChange={(e) => setCurrentPost({ ...currentPost, externalLinkTitle: e.target.value })}
                                            placeholder="Название документа или статьи"
                                            style={{ width: '100%', padding: 'var(--spacing-xs) var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '0.9rem' }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 'var(--spacing-xs)' }}>Описание превью</label>
                                        <textarea
                                            value={currentPost.externalLinkDescription}
                                            onChange={(e) => setCurrentPost({ ...currentPost, externalLinkDescription: e.target.value })}
                                            rows={2}
                                            placeholder="Краткое описание документа"
                                            style={{ width: '100%', padding: 'var(--spacing-xs) var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 'var(--spacing-xs)' }}>URL изображения для превью</label>
                                        <input
                                            type="url"
                                            value={currentPost.externalLinkImage}
                                            onChange={(e) => setCurrentPost({ ...currentPost, externalLinkImage: e.target.value })}
                                            placeholder="https://example.com/preview-image.jpg"
                                            style={{ width: '100%', padding: 'var(--spacing-xs) var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                            <button type="submit" className="btn btn-primary">
                                Сохранить пост
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentPost(null);
                                }}
                                className="btn"
                                style={{ background: '#ccc' }}
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main style={{ padding: 'var(--spacing-xl) 0', minHeight: '80vh' }}>
            <div className="container">
                {/* Tab Navigation */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', borderBottom: '2px solid var(--color-border)', marginBottom: 'var(--spacing-lg)' }}>
                        <button
                            onClick={() => setActiveTab('news')}
                            style={{
                                padding: 'var(--spacing-md) var(--spacing-lg)',
                                background: activeTab === 'news' ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === 'news' ? 'white' : 'var(--color-text)',
                                border: 'none',
                                borderBottom: activeTab === 'news' ? '3px solid var(--color-primary)' : '3px solid transparent',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            📰 Новости
                        </button>
                        <button
                            onClick={() => setActiveTab('programs')}
                            style={{
                                padding: 'var(--spacing-md) var(--spacing-lg)',
                                background: activeTab === 'programs' ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === 'programs' ? 'white' : 'var(--color-text)',
                                border: 'none',
                                borderBottom: activeTab === 'programs' ? '3px solid var(--color-primary)' : '3px solid transparent',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            🎯 Программы
                        </button>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="btn btn-primary"
                        style={{ marginBottom: 'var(--spacing-md)' }}
                    >
                        Перейти на сайт
                    </button>
                </div>

                {/* News Tab */}
                {activeTab === 'news' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-md)', borderBottom: '2px solid var(--color-border)' }}>
                            <h2 style={{ margin: 0 }}>Управление новостями</h2>
                            <button onClick={handleCreateNew} className="btn btn-accent">
                                + Создать новость
                            </button>
                        </div>

                        {posts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', background: 'var(--color-background-alt)', borderRadius: 'var(--border-radius)' }}>
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>Новостей пока нет. Создайте первую!</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {posts.map((post) => (
                                    <div key={post.id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: post.imageUrl ? 'auto 1fr auto' : '1fr auto', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                        {post.imageUrl && (
                                            <div style={{ width: '100px', height: '100px', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                                                <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                        <div>
                                            <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '1.2rem' }}>{post.title}</h3>
                                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: 'var(--spacing-xs)' }}>{post.date}</p>
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{post.excerpt}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="btn btn-primary"
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="btn"
                                                style={{ background: '#e74c3c', color: 'white' }}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Programs Tab */}
                {activeTab === 'programs' && (
                    <ProgramsManager
                        programs={programs}
                        onSave={savePrograms}
                        onImageUpload={(e, program, setProgram) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                compressImage(file).then(compressedImage => {
                                    setProgram({ ...program, imageUrl: compressedImage });
                                }).catch(error => {
                                    console.error('Error compressing image:', error);
                                    alert('Ошибка при загрузке изображения');
                                });
                            }
                        }}
                    />
                )}
            </div>
        </main>
    );
}
