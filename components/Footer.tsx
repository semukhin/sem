'use client';

import Link from 'next/link';
import { Facebook, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t bg-muted/30">
            <div className="container">
                {/* Main Footer Content */}
                <div className="py-8 md:py-12">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* About */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">About SEM</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Helping Slavic emigrants integrate into life in the United States through community support and practical assistance.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Quick Links</h3>
                            <nav className="flex flex-col gap-2">
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    About Us
                                </Link>
                                <Link href="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Our Programs
                                </Link>
                                <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    News
                                </Link>
                            </nav>
                        </div>

                        {/* Contact */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Contact</h3>
                            <div className="space-y-2">
                                <a
                                    href="mailto:info@slavicemigrantsministry.org"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                                >
                                    info@slavicemigrantsministry.org
                                </a>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                                >
                                    Contact Form
                                </Link>
                            </div>
                        </div>

                        {/* Social & Actions */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Connect</h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.facebook.com/slavicemigrantsministry"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={scrollToTop}
                                    className="gap-2"
                                >
                                    <ArrowUp className="h-3 w-3" />
                                    Back to Top
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t py-6">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Slavic Emigrants Ministry. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
