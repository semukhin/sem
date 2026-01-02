'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, Users, Heart, BookOpen, Star, Calendar, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    imageUrl?: string;
}

export default function Home() {
    const [news, setNews] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load posts from localStorage (admin panel)
        try {
            const savedPosts = localStorage.getItem('semPosts');
            if (savedPosts) {
                const posts = JSON.parse(savedPosts);
                // Sort by date or ID if needed, but for now just take the first 3 (newest assumed first)
                setNews(posts.slice(0, 3));
            }
        } catch (e) {
            console.error("Failed to load news", e);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-primary-foreground overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-20"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-12 left-12 w-24 h-24 border-4 border-white/20 rounded-full opacity-50"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Badge variant="secondary" className="px-4 py-1 text-sm font-medium rounded-full shadow-lg border-2 border-primary/20 bg-background/90 text-foreground backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                            Welcome to Our Ministry
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-xl text-white">
                            Slavic Emigrants Ministry
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto leading-relaxed">
                            Helping Slavic emigrants integrate into life in the United States through community, support, and faith.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-background text-primary hover:bg-white">
                                <Link href="/programs">
                                    Our Programs <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-white/50 bg-transparent text-white hover:bg-white/20 hover:text-white hover:border-white">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values / Features */}
            <section className="py-24 bg-background relative">
                <div className="container relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block pb-2">Our Core Values</h2>
                        <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">We are dedicated to providing comprehensive support for every step of the journey.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            <Card className="relative border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card group-hover:-translate-y-2">
                                <CardHeader className="pb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        <Users className="h-7 w-7 text-primary group-hover:text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Community</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Building strong, lasting connections within our Slavic community to foster a sense of belonging and mutual support.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            <Card className="relative border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card group-hover:-translate-y-2">
                                <CardHeader className="pb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                                        <Heart className="h-7 w-7 text-accent group-hover:text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Support</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Providing practical assistance, emotional care, and guidance for newcomers navigating their new life in the U.S.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            <Card className="relative border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card group-hover:-translate-y-2">
                                <CardHeader className="pb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-secondary-foreground group-hover:text-secondary transition-colors duration-300">
                                        <BookOpen className="h-7 w-7 text-secondary-foreground group-hover:text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Resources</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Access to essential resources including legal aid, employment assistance, educational programs, and more.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-24 bg-muted/30">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Latest News & Updates</h2>
                            <p className="text-lg text-muted-foreground">Stay connected with what's happening at SEM</p>
                        </div>
                        <Button asChild variant="outline" className="gap-2 group">
                            <Link href="/news">
                                View all news <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    {news.length === 0 && !loading ? (
                        <div className="text-center py-16 bg-background rounded-2xl shadow-sm border border-muted">
                            <p className="text-muted-foreground">No news updates available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((post) => (
                                <Link key={post.id} href={`/news/${post.slug}`} className="group h-full">
                                    <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col bg-background">
                                        {post.imageUrl ? (
                                            <div className="h-56 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-56 bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center relative overflow-hidden group-hover:from-primary/10 group-hover:to-primary/30 transition-colors">
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                                <Star className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <CardHeader className="flex-1 pb-2">
                                            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </div>
                                            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="pt-0 pb-6">
                                            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                                                Read more <ArrowUpRight className="w-4 h-4 ml-1" />
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats / Interactive Banner could go here, but leaping to CTA for clean layout */}

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/95 text-primary-foreground">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
                            Join us in our mission to support, empower, and integrate Slavic emigrants into their new communities.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center pt-8">
                            <Button asChild size="lg" variant="secondary" className="px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <Link href="/contact">Get Involved</Link>
                            </Button>
                            <Button asChild size="lg" className="px-10 py-6 text-lg rounded-full shadow-lg border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-300">
                                <Link href="/donation">Donate Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
