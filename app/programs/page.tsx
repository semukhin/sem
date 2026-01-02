'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Program {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    order: number;
}

// Programs Data
const programsData: Program[] = [
    {
        id: 'p1',
        title: 'Relaxium',
        description: '<p class="font-medium text-lg text-primary mb-2">Enhancing Leisure for Emigrants</p><p>Relaxium is a charity program dedicated to providing leisure activities for emigrants to reduce stress during their adaptation to a new country and culture. We organize nature trips, movie nights, and sports games to foster community and well-being among newcomers. Join us to relax, connect, and enjoy enriching experiences in your new home.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
        order: 1
    },
    {
        id: 'p2',
        title: 'Volunteereum',
        description: '<p class="font-medium text-lg text-primary mb-2">Empowering Emigrants to Strengthen Washington Communities</p><p>Volunteereum is a charity initiative dedicated to mobilizing emigrants in Washington State to actively participate in community service. Our mission is to harness the unique skills and perspectives of emigrants, turning them into powerful agents of change within their new communities.</p><p class="mt-4">Join Volunteereum to be part of a movement transforming lives and communities. Whether you’re an emigrant looking to give back or an organization seeking volunteers, Volunteereum welcomes you. Together, we can build a compassionate and united community.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
        order: 2
    },
    {
        id: 'p3',
        title: 'First Steps',
        description: '<p class="font-medium text-lg text-primary mb-2">Helping New Emigrants Adapt in the USA</p><p>First Steps is a charity program designed to assist new emigrants in their initial adaptation to life in the USA. We provide essential support and resources to help newcomers navigate their new environment and start their journey with confidence.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200',
        order: 3
    },
    {
        id: 'p4',
        title: 'Legal and Financial Counseling',
        description: '<p class="font-medium text-lg text-primary mb-2">Empowering Emigrants</p><p>Our program offers legal and financial guidance to emigrants, helping them navigate complex systems and achieve stability in their new home. Join us for expert support and resources.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
        order: 4
    },
    {
        id: 'p5',
        title: 'Alternative Dispute Resolution (ADR)',
        description: '<p class="font-medium text-lg text-primary mb-2">Resolving Conflicts Peacefully</p><p>Our ADR program provides emigrants with mediation and conflict resolution services in Russian language, promoting peaceful and fair solutions to disputes. Join us to find constructive ways to resolve conflicts and foster harmony in your community, work and family.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=1200',
        order: 5
    }
];

export default function ProgramsPage() {
    const [programs] = useState<Program[]>(programsData);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1a365d] via-[#2a4365] to-[#2c5282] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-24 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                            Our Programs
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
                            Comprehensive initiatives designed to empower, connect, and support our community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs Sections */}
            <div className="py-12 bg-background">
                {programs.map((program, index) => (
                    <section
                        key={program.id}
                        className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                    >
                        <div className="container">
                            <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
                                <div className={`space-y-6 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground relative inline-block">
                                        {program.title}
                                        <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></div>
                                    </h2>
                                    <div
                                        className="prose prose-lg text-muted-foreground leading-relaxed program-description"
                                        dangerouslySetInnerHTML={{ __html: program.description }}
                                    />
                                    <div className="pt-6">
                                        <Button asChild className="rounded-full px-8 h-12 text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                                            <Link href="/contact" className="flex items-center gap-2">
                                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className={`group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                                    {program.imageUrl ? (
                                        <>
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <img
                                                src={program.imageUrl}
                                                alt={program.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </>
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
            <section className="py-24 bg-[#0f1115] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
                <div className="container max-w-4xl mx-auto space-y-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Interested in our programs?</h2>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Let&apos;s talk about how we can help you or how you can volunteer with us!
                    </p>
                    <div className="pt-4">
                        <Button asChild size="lg" className="bg-[#9d72a3] hover:bg-[#8a6390] text-white font-bold text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                            <a href="mailto:slavicemigrantsministry@gmail.com">
                                Contact Us Today
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
