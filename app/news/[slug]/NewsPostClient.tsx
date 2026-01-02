'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

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
}

export default function NewsPostClient({ slug }: NewsPostClientProps) {
    const [post, setPost] = useState<NewsPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const loadPost = async () => {
            try {
                const { getPosts } = await import('@/app/actions/content');
                const posts = await getPosts();
                const foundPost = posts.find((p) => p.slug === slug);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    console.log('Post not found on server');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [slug]);

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Post Not Found</h1>
                <Button asChild>
                    <Link href="/news">Back to News</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen pb-20">
            {/* Hero Image */}
            {post.imageUrl && (
                <div className="w-full h-[400px] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}

            <article className="container max-w-4xl mx-auto -mt-20 relative z-20">
                <Card className="shadow-xl">
                    <CardContent className="p-8 md:p-12">
                        <div className="flex items-center justify-between mb-6">
                            <Button asChild variant="ghost" className="pl-0 gap-2 text-muted-foreground hover:text-foreground">
                                <Link href="/news"><ArrowLeft className="w-4 h-4" /> Back to News</Link>
                            </Button>
                            <Badge variant="outline" className="text-sm px-3 py-1 flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </Badge>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-foreground">{post.title}</h1>

                        {post.videoUrl && (
                            <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 shadow-sm border bg-muted">
                                <iframe
                                    src={post.videoUrl.replace('watch?v=', 'embed/')}
                                    title="Video"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none mb-10 text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.imageUrl2 && (
                            <div className="rounded-xl overflow-hidden my-10 shadow-lg border">
                                <img src={post.imageUrl2} alt="Additional content" className="w-full h-auto" />
                            </div>
                        )}

                        {post.externalLink && (
                            <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className="block mt-10 no-underline group">
                                <Card className="overflow-hidden border-2 hover:border-primary transition-colors duration-300">
                                    <div className="flex flex-col md:flex-row">
                                        {post.externalLinkImage && (
                                            <div className="md:w-1/3 h-48 md:h-auto relative">
                                                <img src={post.externalLinkImage} alt="External link" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            {post.externalLinkTitle && <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.externalLinkTitle}</h3>}
                                            {post.externalLinkDescription && <p className="text-muted-foreground mb-4">{post.externalLinkDescription}</p>}
                                            <div className="flex items-center text-primary font-semibold mt-auto gap-2">
                                                Open Resource <ExternalLink className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        )}
                    </CardContent>
                </Card>
            </article>
        </main>
    );
}
