'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface NewsPost {
    id: string;
    title: string;
    date: string;
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

interface NewsPostClientProps {
    slug: string;
    mockPosts: Record<string, NewsPost>;
}

export default function NewsPostClient({ slug, mockPosts }: NewsPostClientProps) {
    const [post, setPost] = useState<NewsPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load posts from localStorage (admin panel)
        const savedPosts = localStorage.getItem('semPosts');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            const foundPost = posts.find((p: NewsPost) => p.slug === slug);
            if (foundPost) {
                setPost(foundPost);
                setLoading(false);
                return;
            }
        }

        // Fallback to mock data
        const mockPost = mockPosts[slug];
        if (mockPost) {
            setPost(mockPost);
        }
        setLoading(false);
    }, [slug, mockPosts]);

    if (!mounted || loading) {
        return (
            <main style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    if (!post) {
        notFound();
    }

    return (
        <main>
            <article className={styles.article}>
                <div className="container">
                    {post.imageUrl && (
                        <div className={styles.featuredImage}>
                            <img src={post.imageUrl} alt={post.title} />
                        </div>
                    )}

                    <div className={styles.articleHeader}>
                        <time className={styles.date}>{post.date}</time>
                        <h1>{post.title}</h1>
                    </div>

                    {post.videoUrl && (
                        <div className={styles.videoWrapper}>
                            <iframe
                                src={post.videoUrl.replace('watch?v=', 'embed/')}
                                title="Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div
                        className={styles.articleContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {post.imageUrl2 && (
                        <div className={styles.featuredImage}>
                            <img src={post.imageUrl2} alt={`${post.title} - Image 2`} />
                        </div>
                    )}

                    {post.externalLink && (
                        <div style={{ margin: '2rem 0' }}>
                            <a
                                href={post.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'block',
                                    border: '2px solid var(--color-border)',
                                    borderRadius: 'var(--border-radius)',
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {post.externalLinkImage && (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        overflow: 'hidden',
                                        background: 'var(--color-background-alt)'
                                    }}>
                                        <img
                                            src={post.externalLinkImage}
                                            alt={post.externalLinkTitle || 'External link'}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                )}
                                <div style={{ padding: 'var(--spacing-lg)' }}>
                                    {post.externalLinkTitle && (
                                        <h3 style={{
                                            margin: '0 0 var(--spacing-sm) 0',
                                            color: 'var(--color-primary)',
                                            fontSize: '1.25rem'
                                        }}>
                                            {post.externalLinkTitle}
                                        </h3>
                                    )}
                                    {post.externalLinkDescription && (
                                        <p style={{
                                            margin: '0 0 var(--spacing-md) 0',
                                            color: 'var(--color-text)',
                                            lineHeight: 1.6
                                        }}>
                                            {post.externalLinkDescription}
                                        </p>
                                    )}
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--color-accent)',
                                        fontWeight: 600
                                    }}>
                                        <span>Открыть документ</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )}

                    <div className={styles.articleFooter}>
                        <Link href="/news" className="btn btn-primary">← Back to News</Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
