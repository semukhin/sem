'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Heart, BookOpen } from 'lucide-react';

interface NewsPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    imageUrl?: string;
}

// Mock data as fallback
const mockNews: NewsPost[] = [
    {
        id: '1',
        title: 'Welcome to Slavic Emigrants Ministry',
        date: 'December 20, 2024',
        excerpt: 'We are excited to announce the launch of our new website. Our mission is to help Slavic emigrants integrate into life in the United States.',
        slug: 'welcome-to-sem',
    },
    {
        id: '2',
        title: 'New Programs for 2025',
        date: 'December 15, 2024',
        excerpt: 'We are introducing several new programs to better serve our community, including expanded legal aid and employment assistance.',
        slug: 'new-programs-2025',
    },
    {
        id: '3',
        title: 'Community Gathering Success',
        date: 'December 10, 2024',
        excerpt: 'Our recent community gathering brought together over 100 families. Thank you to all who participated and made it a memorable event.',
        slug: 'community-gathering-success',
    },
];

export default function Home() {
    const [news, setNews] = useState<NewsPost[]>(mockNews);

    useEffect(() => {
        // Load posts from localStorage (admin panel)
        const savedPosts = localStorage.getItem('semPosts');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            setNews(posts.length > 0 ? posts.slice(0, 3) : mockNews);
        }
    }, []);

    return (
        <main>
            {/* Hero Section - Минималистичный */}
            <section className="section-sm bg-gradient-to-b from-background to-muted/20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Slavic Emigrants Ministry
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Helping Slavic emigrants integrate into life in the United States
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center pt-4">
                            <Button asChild size="lg">
                                <Link href="/programs">
                                    Our Programs <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Компактный */}
            <section className="section-sm">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-none shadow-soft hover:shadow-soft-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Community</CardTitle>
                                <CardDescription>
                                    Building strong connections within our Slavic community
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-none shadow-soft hover:shadow-soft-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                                    <Heart className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle className="text-xl">Support</CardTitle>
                                <CardDescription>
                                    Providing practical assistance and guidance for newcomers
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-none shadow-soft hover:shadow-soft-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-3">
                                    <BookOpen className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <CardTitle className="text-xl">Resources</CardTitle>
                                <CardDescription>
                                    Access to legal aid, employment help, and educational programs
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* News Section - Минималистичный */}
            <section className="section-sm bg-muted/30">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
                            <p className="text-muted-foreground mt-1">Stay updated with our community</p>
                        </div>
                        <Button asChild variant="ghost">
                            <Link href="/news">
                                View all <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((post) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className="group">
                                <Card className="h-full hover:shadow-md transition-all">
                                    {post.imageUrl && (
                                        <div className="aspect-video overflow-hidden rounded-t-lg">
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="pb-3">
                                        <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="line-clamp-2">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Компактный */}
            <section className="section-sm">
                <div className="container">
                    <Card className="bg-primary text-primary-foreground border-none">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-3xl">Get Involved</CardTitle>
                            <CardDescription className="text-primary-foreground/80 text-lg">
                                Join our community and make a difference
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center gap-4">
                            <Button asChild variant="secondary" size="lg">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                <Link href="/programs">Learn More</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}
