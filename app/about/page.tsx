import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function AboutPage() {
    const practices = [
        {
            number: '01',
            title: 'Assistance with Political Asylum in the US',
            description: 'Our dedicated team offers comprehensive support to individuals seeking political asylum in the United States, guiding them through the complex process with expertise and compassion.',
        },
        {
            number: '02',
            title: 'Employment Assistance',
            description: 'From resume preparation to job search strategies and interview tips, we provide valuable assistance to help immigrants secure employment opportunities tailored to their skills and aspirations.',
        },
        {
            number: '03',
            title: 'Financial Management Education and Debt Relief',
            description: 'We offer training in personal finance management and debt relief strategies, empowering individuals to take control of their financial well-being and achieve greater stability in their new lives',
        },
        {
            number: '04',
            title: 'Legal Aid in Cross-Border Disputes',
            description: 'Our legal experts offer guidance and representation in cross-border disputes, particularly in matters of family law, ensuring that our community members receive the support they need during challenging times.',
        },
        {
            number: '05',
            title: 'Social Programs',
            description: 'Our organization hosts various social programs to foster community cohesion and provide opportunities for socialization and recreation. These include outdoor excursions, movie clubs, the “First Steps” adaptation program for new immigrants, and collaboration with Crossroads Bible Church – Eastern European Community, among others.',
        },
        {
            number: '06',
            title: 'Alternative Dispute Resolution (ADR)',
            description: 'Through our Legal Advice and Alternative Dispute Resolution (ADR) Program, we facilitate the resolution of conflicts arising after immigration to the USA, promoting peaceful and efficient solutions for all parties involved.',
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1a365d] via-[#2a4365] to-[#2c5282] text-white overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-24 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>

                <div className="container relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <Badge variant="outline" className="text-white border-white/30 px-4 py-1.5 text-sm uppercase tracking-wider mb-4 animate-fade-in">Established 2023</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-lg leading-tight">
                            Welcome to SEM – <br />the Slavic Emigrants Ministry!
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
                            We are so glad you want to know more about who we are and what we do!
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story & Founders Section */}
            <section className="py-20 lg:py-24">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Text Content */}
                        <div className="space-y-10">
                            {/* History Block */}
                            <div className="space-y-6">
                                <div className="inline-block border-l-4 border-primary pl-4">
                                    <h2 className="text-3xl font-bold text-foreground">SEM History</h2>
                                    <p className="text-primary font-medium mt-1">A New Beginning</p>
                                </div>
                                <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-6">
                                    <p>
                                        Our ministry began in 2022 when Viktor Semukhin, the founder of SEM, and his wife Luda were forced to leave their home in Russia due to persecution by Russian officials. They fled to the state of Washington, where they started their lives anew from scratch.
                                    </p>
                                    <p>
                                        Crossroads Bible Church of Bellevue became a family for Viktor and Luda, offering them not only support and encouragement but also opportunities for spiritual and professional growth.
                                    </p>
                                    <p>
                                        Many other friends also played a vital role in helping Viktor and Luda navigate their new life, providing assistance with work, housing, education, and even moments of rest—essential for avoiding burnout while adjusting to the challenges of a new country and culture.
                                    </p>
                                    <p className="font-medium text-foreground italic border-l-2 border-primary/30 pl-4 py-2 bg-muted/30 rounded-r-lg">
                                        Overwhelmed by the love and support they received, Viktor and Luda felt deeply compelled to give back.
                                    </p>
                                    <p>
                                        They devoted themselves to supporting recent emigrants from former Soviet Union countries, helping them adapt to life in America and become thriving, contributing members of their new communities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image & Actions Block */}
                        <div className="space-y-12">
                            {/* Founders Image */}
                            <div className="relative group">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                    <img
                                        src="/sem-founders.jpg"
                                        alt="Viktor and Luda Semukhin - Founders of SEM"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                    <div className="absolute bottom-6 left-6 text-white z-20">
                                        <p className="font-bold text-2xl">Viktor & Luda Semukhin</p>
                                        <p className="text-white/80 text-sm tracking-wide uppercase mt-1">Founders of SEM</p>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10"></div>
                            </div>

                            {/* Actions Block */}
                            <div className="bg-muted/40 p-8 rounded-2xl border border-border/50 hover:bg-muted/60 transition-colors">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">2024</span>
                                    From Passion to Action
                                </h3>
                                <div className="prose text-muted-foreground leading-relaxed space-y-4">
                                    <p>
                                        In 2024, Viktor and Luda saw the need to formalize their work and established the <strong>Slavic Emigrants Ministry (SEM)</strong> as a 501(c)(3) nonprofit organization under the U.S. Internal Revenue Code, enabling them to expand their impact and provide structured assistance.
                                    </p>
                                    <p>
                                        Viktor and Luda do not draw a salary from SEM, sustaining themselves through full-time jobs while dedicating their free time to the ministry.
                                    </p>
                                    <p>
                                        SEM’s mission is to raise funds and support recent Slavic immigrants in overcoming the challenges of starting a new life in the U.S., including housing, employment, and education. Through SEM, they aim to help these immigrants adapt and thrive in their new communities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas of Practice - Numbered Grid Design */}
            <section className="py-24 bg-muted/30 relative overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

                <div className="container relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <Badge variant="secondary" className="mb-4">Our Services</Badge>
                        <h2 className="text-4xl font-bold mb-6 text-foreground">Areas of Practice</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            How we support our community
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {practices.map((practice, index) => (
                            <Card key={index} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-background overflow-hidden relative h-full flex flex-col">
                                <CardContent className="p-8 pt-10 flex-grow">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-8xl font-black text-primary font-sans leading-none -mr-4 -mt-4 block select-none">
                                            {practice.number}
                                        </span>
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <span className="inline-block text-4xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform origin-left font-mono">
                                            {practice.number}
                                        </span>
                                        <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors pr-8 min-h-[3.5rem] flex items-end">
                                            {practice.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                                            {practice.description}
                                        </p>
                                        <div className="w-12 h-1 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-500 rounded-full mt-auto"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            {/* Our Team Section */}
            <section className="py-24 bg-[#0f1115] text-white">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Team</h2>
                        <div className="space-y-4 max-w-2xl mx-auto">
                            <p className="text-xl text-gray-300 font-light">
                                We want to help you solve the problems you encountered when immigrating to the USA.
                            </p>
                            <p className="text-lg text-gray-400">
                                Our specialists will listen to you and offer solutions.
                            </p>
                        </div>
                        <div className="pt-4">
                            <a
                                href="mailto:info@slavicemigrantsministry.org"
                                className="inline-flex items-center justify-center rounded-full bg-[#9d72a3] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#8a6390] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                Email us
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-8">
                        {/* Viktor */}
                        <div className="space-y-6 flex flex-col items-center text-center px-4">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#9d72a3]/20 shadow-xl">
                                <img
                                    src="/viktor.jpg"
                                    alt="Viktor Semukhin"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-lg text-gray-200">Founder & Executive Director</p>
                                    <h3 className="text-2xl font-bold">Viktor Semukhin</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Has more than 25 years of successful experience in developing non-profit and religious organizations. Emigrated to the USA in 2022, underwent adaptation, understands the problems of new migrants to the USA.
                                </p>
                                <div className="flex gap-4 pt-4 justify-center">
                                    <a href="https://www.instagram.com/vsemukhin/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/vsemukhin/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ilya */}
                        <div className="space-y-6 flex flex-col items-center text-center px-4">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#9d72a3]/20 shadow-xl">
                                <img
                                    src="/ilya.jpg"
                                    alt="Ilya Semukhin"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold text-lg text-gray-200">Program Coordinator</p>
                                    <h3 className="text-2xl font-bold">Ilya Semukhin</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    We are dedicated to supporting education and providing opportunities to those in need.
                                </p>
                                <div className="flex gap-4 pt-4 justify-center">
                                    <a href="https://www.instagram.com/semukhin/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/iliasemukhin/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="https://x.com/Semukhin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
