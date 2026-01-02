'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Heart, Building2, CreditCard, Mail } from 'lucide-react';

export default function DonationPage() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [activeImpactCard, setActiveImpactCard] = useState<number | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleImpactClick = (amount: number) => {
        navigator.clipboard.writeText('slavicemigrantsministry@gmail.com');
        setActiveImpactCard(amount);
        setTimeout(() => setActiveImpactCard(null), 3000);
        // Open Zelle website in a new tab
        window.open('https://www.zellepay.com', '_blank', 'noopener,noreferrer');
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-primary-foreground overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                {/* Hearts decoration */}
                <div className="absolute top-12 right-24 opacity-20"><Heart className="w-24 h-24" fill="currentColor" /></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">Ways to Help</h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
                            Support our mission to help Slavic emigrants build a new future
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container max-w-5xl mx-auto space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl font-bold text-foreground">Your Support Makes a Difference</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Your generous donations help us provide essential services to Slavic
                            emigrants, including legal assistance, employment support, and community
                            programs. Every contribution, no matter the size, makes a real impact
                            in someone&apos;s life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Zelle Section */}
                        <Card className="border-none shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    Donate via Zelle
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground">
                                    The fastest and easiest way to support our mission is through Zelle.
                                    Simply use the information below:
                                </p>

                                <div className="space-y-4">
                                    {/* Name */}
                                    <div className="group bg-muted/50 p-4 rounded-lg flex items-center justify-between hover:bg-muted transition-colors">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Name</p>
                                            <p className="font-medium text-lg">Slavic Emigrants Ministry</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard('Slavic Emigrants Ministry', 'name')}
                                            className="text-primary hover:bg-primary/10"
                                        >
                                            {copiedField === 'name' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copiedField === 'name' ? 'Copied' : 'Copy'}
                                        </Button>
                                    </div>

                                    {/* Email */}
                                    <div className="group bg-muted/50 p-4 rounded-lg flex items-center justify-between hover:bg-muted transition-colors">
                                        <div className="overflow-hidden">
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Email</p>
                                            <p className="font-medium text-lg truncate">slavicemigrantsministry@gmail.com</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard('slavicemigrantsministry@gmail.com', 'email')}
                                            className="text-primary hover:bg-primary/10 flex-shrink-0 ml-2"
                                        >
                                            {copiedField === 'email' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copiedField === 'email' ? 'Copied' : 'Copy'}
                                        </Button>
                                    </div>

                                    {/* Phone */}
                                    <div className="group bg-muted/50 p-4 rounded-lg flex items-center justify-between hover:bg-muted transition-colors">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Phone</p>
                                            <p className="font-medium text-lg">(206) 555-1234</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard('(206) 555-1234', 'phone')}
                                            className="text-primary hover:bg-primary/10"
                                        >
                                            {copiedField === 'phone' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copiedField === 'phone' ? 'Copied' : 'Copy'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Other Methods */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <Mail className="w-5 h-5 text-accent" />
                                        By Check
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2 text-muted-foreground">Make checks payable to:</p>
                                    <div className="bg-muted p-4 rounded-lg font-mono text-sm leading-relaxed border-l-4 border-accent">
                                        <strong>Slavic Emigrants Ministry</strong><br />
                                        123 Main Street<br />
                                        Bellevue, WA 98004
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <Building2 className="w-5 h-5 text-primary" />
                                        Bank Transfer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">Contact us for wire transfer details and instructions.</p>
                                    <a href="mailto:slavicemigrantsministry@gmail.com" className="text-primary font-medium hover:underline flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        slavicemigrantsministry@gmail.com
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="section bg-muted/30">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { amount: 50, text: "Provides translation services for one family" },
                            { amount: 100, text: "Covers legal consultation for asylum application" },
                            { amount: 250, text: "Supports employment workshop for 10 people" },
                            { amount: 500, text: "Funds a month of community programs" }
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="border-none shadow-lg text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative overflow-hidden group"
                                onClick={() => handleImpactClick(item.amount)}
                            >
                                {activeImpactCard === item.amount && (
                                    <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center text-primary-foreground z-20 animate-in fade-in zoom-in duration-300">
                                        <div className="bg-white/20 p-3 rounded-full mb-3">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <p className="font-bold text-xl mb-1">Email Copied!</p>
                                        <p className="text-sm opacity-90 px-6 leading-snug">
                                            Open your banking app to send Zelle using our email.
                                        </p>
                                    </div>
                                )}
                                <CardContent className="pt-8 pb-8 px-6 space-y-4">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-2 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        ${item.amount}
                                    </div>
                                    <p className="text-muted-foreground font-medium min-h-[3rem] group-hover:text-foreground transition-colors">
                                        {item.text}
                                    </p>
                                    <p className="text-xs text-muted-foreground/50 uppercase tracking-widest font-semibold pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to Donate
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
