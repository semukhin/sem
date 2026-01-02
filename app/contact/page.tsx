import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, Mail, User } from 'lucide-react';

export default function ContactPage() {
    const boardMembers = [
        { name: 'John Smith', position: 'President', image: null },
        { name: 'Maria Ivanova', position: 'Vice President', image: null },
        { name: 'Dmitry Petrov', position: 'Secretary', image: null },
        { name: 'Elena Sokolova', position: 'Treasurer', image: null },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary/90 via-primary to-accent/90 text-primary-foreground overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">Contact Us</h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
                            Get in touch with our team
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="section bg-background">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-all h-full">
                            <CardHeader className="bg-muted/50 pb-6 border-b">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <MapPin className="text-primary w-6 h-6" />
                                    Bellevue, WA
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                                        <div>
                                            <p className="font-semibold text-foreground">Address</p>
                                            <p className="text-muted-foreground">123 Main Street<br />Bellevue, WA 98004</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-foreground">Phone</p>
                                            <a href="tel:+12065551234" className="text-primary hover:underline font-medium">(206) 555-1234</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-foreground">Email</p>
                                            <a href="mailto:info@slavicemigrantsministry.org" className="text-primary hover:underline font-medium break-all">info@slavicemigrantsministry.org</a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-all h-full">
                            <CardHeader className="bg-muted/50 pb-6 border-b">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <MapPin className="text-accent w-6 h-6" />
                                    Portugal Office
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                                        <div>
                                            <p className="font-semibold text-foreground">Address</p>
                                            <p className="text-muted-foreground">Rua Example, 123<br />Lisbon, Portugal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-foreground">Email</p>
                                            <a href="mailto:portugal@slavicemigrantsministry.org" className="text-primary hover:underline font-medium break-all">portugal@slavicemigrantsministry.org</a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Board of Directors */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Board of Directors</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {boardMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-4 group">
                                <Avatar className="w-32 h-32 border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} alt={member.name} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Have questions?</h2>
                    <p className="text-xl opacity-90">We&apos;re here to help. Reach out to us anytime!</p>
                    <Button asChild size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <a href="mailto:info@slavicemigrantsministry.org">
                            Send us an email
                        </a>
                    </Button>
                </div>
            </section>
        </main>
    );
}
