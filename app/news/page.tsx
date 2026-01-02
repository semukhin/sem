'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface NewsPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    imageUrl?: string;
}

// Mock data with IMAGES as fallback/demo
const mockNews: NewsPost[] = [
    {
        id: 'mock-1',
        title: 'Welcome to Slavic Emigrants Ministry',
        date: 'December 20, 2024',
        excerpt: 'We are excited to announce the launch of our new website. Our mission is to help Slavic emigrants integrate into life in the United States and build a strong, supportive community.',
        slug: 'welcome-to-sem',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Friends/Community image
    },
    {
        id: 'mock-2',
        title: 'New Programs for 2025',
        date: 'December 15, 2024',
        excerpt: 'We are introducing several new programs to better serve our community, including expanded legal aid, English classes, and employment assistance workshops.',
        slug: 'new-programs-2025',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Learning/Classroom image
    },
    {
        id: 'mock-3',
        title: 'Community Gathering Success',
        date: 'December 10, 2024',
        excerpt: 'Our recent community gathering brought together over 100 families for an evening of music, food, and fellowship. Thank you to all who participated!',
        slug: 'community-gathering-success',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Gathering image
    },
    {
        id: 'mock-4',
        title: 'Legal Aid Workshop Announcement',
        date: 'December 5, 2024',
        excerpt: 'Join us for a free legal aid workshop covering immigration law basics and asylum application processes. Expert lawyers will be answering your questions.',
        slug: 'legal-aid-workshop',
        imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Legal image
    },
    {
        id: 'mock-5',
        title: 'Volunteer Appreciation Event',
        date: 'November 28, 2024',
        excerpt: 'We celebrated our amazing volunteers who dedicate their time to helping our community thrive. Their selfless service is the backbone of our ministry.',
        slug: 'volunteer-appreciation',
        imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Volunteers image
    },
    {
        id: 'mock-6',
        title: 'Employment Fair Success',
        date: 'November 20, 2024',
        excerpt: 'Over 50 employers participated in our employment fair, connecting with job seekers from our community. Many attendees secured interviews on the spot!',
        slug: 'employment-fair-success',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7985ccfd11f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Handshake image
    },
];

export default function NewsPage() {
    const [allNews, setAllNews] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = () => {
            try {
                // Load posts from localStorage
                const savedPosts = localStorage.getItem('semPosts');
                let userPosts: NewsPost[] = [];

                if (savedPosts) {
                    userPosts = JSON.parse(savedPosts);
                }

                // MERGE STRATEGY: Show User Posts + Mock Posts
                // This ensures the page is never "empty" and looks beautiful immediately
                setAllNews([...userPosts, ...mockNews]);

            } catch (error) {
                console.error("Failed to load news:", error);
                setAllNews(mockNews);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

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
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {allNews.map((post) => (
                                <NewsCard
                                    key={post.id}
                                    title={post.title}
                                    date={post.date}
                                    excerpt={post.excerpt}
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
