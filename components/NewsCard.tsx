
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface NewsCardProps {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    imageUrl?: string;
}

export default function NewsCard({ title, date, excerpt, slug, imageUrl }: NewsCardProps) {
    return (
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
                <Button asChild variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent group">
                    <Link href={`/news/${slug}`} className="flex items-center gap-1">
                        Read full article
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
