'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPosts } from '@/app/actions/content';
import { NewsPost } from '@/lib/types';

export default function NewsPage() {
    const [allNews, setAllNews] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                // Load posts from server
                const userPosts = await getPosts();
                // Only show user posts
                setAllNews(userPosts);
            } catch (error) {
                console.error("Failed to load news:", error);
                setAllNews([]);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        window.location.reload();
    };

    return (
        <main className="min-h-screen bg-muted/5">
            {/* Hero Section with Rich Gradient */}
            <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-primary-foreground overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-12 right-12 w-12 h-12 border-4 border-white/20 rounded-full"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
                            Latest News & Updates
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
                            Stories of hope, community events, and the latest announcements from our ministry.
                        </p>
                    </div>
                </div>
            </section>

            {/* News Grid Section */}
            <section className="py-16 md:py-24">
                <div className="container">
                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    ) : allNews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-20">
                            <div className="bg-muted p-6 rounded-full mb-6">
                                <RefreshCw className="w-12 h-12 text-muted-foreground opacity-50" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">No News Yet</h2>
                            <p className="text-muted-foreground max-w-md mb-8">
                                We haven&apos;t posted any news updates yet. Please check back later or contact us directly.
                            </p>
                            <div className="flex gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/">Return Home</Link>
                                </Button>
                                <Button onClick={handleRefresh}>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Refresh News
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {allNews.map((post) => (
                                <NewsCard
                                    key={post.id}
                                    title={post.title}
                                    date={post.date}
                                    excerpt={post.excerpt}
                                    content={post.content}
                                    slug={post.slug}
                                    imageUrl={post.imageUrl}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
