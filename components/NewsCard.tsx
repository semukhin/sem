'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

interface NewsCardProps {
    title: string;
    date: string;
    excerpt: string;
    content: string;
    slug: string;
    imageUrl?: string;
    imageUrl2?: string;
}

export default function NewsCard({ title, date, excerpt, content, slug, imageUrl, imageUrl2 }: NewsCardProps) {
    return (
        <Dialog>
            <Card className="overflow-hidden flex flex-col h-full border-none shadow-soft hover:shadow-soft-md transition-shadow duration-300">
                {imageUrl && (
                    <div className="aspect-video w-full overflow-hidden bg-muted relative">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        <time>{date}</time>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                        <Link href={`/news/${slug}`}>
                            {title}
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {excerpt}
                    </p>
                </CardContent>
                <CardFooter className="pt-0">
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent group">
                            <span className="flex items-center gap-1">
                                Read
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Button>
                    </DialogTrigger>
                </CardFooter>
            </Card>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 flex flex-col">
                <div className="relative shrink-0">
                    {imageUrl && (
                        <div className="w-full h-64 sm:h-80 md:h-96 relative">
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                        </div>
                    )}
                    <DialogClose className="absolute right-4 top-4 z-50 bg-background/50 hover:bg-background p-2 rounded-full transition-colors backdrop-blur-sm">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                <div className="p-6 sm:p-8 -mt-12 relative z-10 flex-1">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                            <Calendar className="h-4 w-4" />
                            <time>{date}</time>
                        </div>
                        <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{title}</DialogTitle>
                    </DialogHeader>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content || excerpt }} />

                    {imageUrl2 && (
                        <div className="mt-8 rounded-lg overflow-hidden border shadow-sm">
                            <img src={imageUrl2} alt={`${title} - Footer`} className="w-full h-auto object-cover" />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
