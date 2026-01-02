'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Program {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    order: number;
}

// Mock programs for fallback (Rich content with images)
const mockPrograms: Program[] = [
    {
        id: 'mock-p1',
        title: 'Legal Assistance',
        description: '<p>Navigating the legal system can be overwhelming. We provide guidance on immigration processes, asylum applications, and connect you with trusted legal professionals who understand your needs.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        order: 1
    },
    {
        id: 'mock-p2',
        title: 'Educational Programs',
        description: '<p>Education is key to success. We offer English language classes (ESL), computer literacy workshops, and tutoring for children to help them succeed in school.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        order: 2
    },
    {
        id: 'mock-p3',
        title: 'Employment Support',
        description: '<p>Finding a job is a crucial step in settlement. Our employment support includes resume building, interview preparation, and job fairs connecting you with local employers.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7985ccfd11f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        order: 3
    },
    {
        id: 'mock-p4',
        title: 'Community Integration',
        description: '<p>Building a new life means building new connections. We organize community events, cultural celebrations, and support groups to help you feel at home.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        order: 4
    }
];

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load programs from localStorage
        const savedPrograms = localStorage.getItem('semPrograms');
        if (savedPrograms) {
            const parsedPrograms = JSON.parse(savedPrograms);
            if (parsedPrograms.length > 0) {
                setPrograms(parsedPrograms.sort((a: Program, b: Program) => a.order - b.order));
            } else {
                setPrograms(mockPrograms);
            }
        } else {
            setPrograms(mockPrograms);
        }
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-primary-foreground overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">Our Programs</h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
                            Comprehensive support initiatives designed to empower our community
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs Sections */}
            <div className="py-12">
                {programs.map((program, index) => (
                    <section
                        key={program.id}
                        className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                    >
                        <div className="container">
                            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
                                <div className={`space-y-6 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{program.title}</h2>
                                    <div
                                        className="prose prose-lg text-muted-foreground leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: program.description }}
                                    />
                                    <div className="pt-4">
                                        <Button asChild className="rounded-full px-8">
                                            <Link href="/contact">Learn More</Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className={`aspect-video rounded-xl overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                                    {program.imageUrl ? (
                                        <img
                                            src={program.imageUrl}
                                            alt={program.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                            <span>No Image Available</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Interested in our programs?</h2>
                    <p className="text-xl opacity-90">Let&apos;s talk about how we can help you or how you can get involved!</p>
                    <Button asChild size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <a href="mailto:info@slavicemigrantsministry.org">
                            Contact Us Today
                        </a>
                    </Button>
                </div>
            </section>
        </main>
    );
}
