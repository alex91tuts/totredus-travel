import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHero from '@/components/AboutHero'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, type Locale } from '@/lib/translations'
import {
    CheckCircle2,
    Globe2,
    Award,
    Heart,
    Users,
    Target,
    Sparkles,
    ArrowRight,
    Quote
} from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const t = getTranslations('ro')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://locuirivizitat.workers.dev'

    return {
        title: `${t.about.title} | Travel Blog`,
        description: t.about.subtitle,
        alternates: {
            canonical: `${siteUrl}/about`,
            languages: {
                'ro': `${siteUrl}/about`,
                'en': `${siteUrl}/en/about`,
            },
        },
    }
}

export default function AboutPage() {
    const locale: Locale = 'ro'
    const t = getTranslations(locale)

    const missionPoints = t.about.mission.points ?? []
    const teamMembers = t.about.team?.members ?? []
    const missionImage = t.about.gallery?.mission

    // Stats data
    const stats = t.about.highlights?.stats ?? []

    const values = [
        {
            icon: <Globe2 className="h-8 w-8" />,
            title: t.about.values.sustainability.title,
            description: t.about.values.sustainability.description,
            color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        },
        {
            icon: <Award className="h-8 w-8" />,
            title: t.about.values.quality.title,
            description: t.about.values.quality.description,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: t.about.values.passion.title,
            description: t.about.values.passion.description,
            color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
        },
    ]

    return (
        <main className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-primary/20">
            <Header locale={locale} />
            <AboutHero locale={locale} />

            {/* Mission Section */}
            <section className="py-12 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="flex flex-col relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit mb-6 ring-1 ring-inset ring-primary/20">
                                <Target className="h-4 w-4" />
                                <span>{t.about.badge}</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-6 leading-tight">
                                {t.about.mission.title}
                            </h2>
                            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                                {t.about.mission.content}
                            </p>

                            <div className="space-y-4 mb-10">
                                {missionPoints.map((point, index) => (
                                    <div key={index} className="flex items-start gap-3 group">
                                        <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{point}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Highlight Box */}
                            <div className="relative rounded-2xl bg-muted/30 p-8 border border-border/50 overflow-hidden group hover:border-primary/20 transition-colors">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="h-12 w-12 transform rotate-180" />
                                </div>
                                <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                                    {t.about.mission.highlight.title}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed relative z-10">
                                    {t.about.mission.highlight.description}
                                </p>
                            </div>
                        </div>

                        <div className="relative h-[400px] lg:h-[600px]">
                            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-muted shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 ease-out border border-border/50">
                                {missionImage ? (
                                    <Image
                                        src={missionImage.image}
                                        alt={missionImage.alt}
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                                        Image unavailable
                                    </div>
                                )}

                                {/* Floating Badge */}
                                {missionImage?.caption && (
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl p-4 shadow-lg transform translate-y-2 hover:translate-y-0 transition-transform">
                                            <p className="text-white/90 text-sm font-medium text-center">{missionImage.caption}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Background Elements */}
                            <div className="absolute -z-10 -bottom-12 -left-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                            <div className="absolute -z-10 -top-12 -right-12 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Improved */}
            <section className="py-12 md:py-20 bg-muted/20 border-y border-border/40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-2xl bg-background p-8 shadow-sm ring-1 ring-gray-900/5 hover:ring-primary/20 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors blur-2xl"></div>

                                <dt className="text-4xl font-extrabold text-foreground mb-2 group-hover:scale-110 origin-left transition-transform duration-300">
                                    {stat.value}
                                </dt>
                                <dd className="text-sm font-bold uppercase tracking-wide text-primary mb-3">
                                    {stat.label}
                                </dd>
                                <dd className="text-sm text-muted-foreground leading-relaxed">
                                    {stat.description}
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section - Cards with Icon Backgrounds */}
            <section className="py-16 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center mb-20">
                        <h2 className="text-4xl font-bold text-foreground mb-6">{t.about.values.title}</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">{t.about.values.subtitle}</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-3xl bg-card p-10 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${value.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    {value.icon}
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-foreground">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    {value.description}
                                </p>

                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl group-hover:from-primary/10 transition-all"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - Sticky Layout */}
            <section className="py-16 md:py-24 bg-muted/30 relative">
                <div className="container mx-auto px-4">
                    <div className="grid gap-16 lg:grid-cols-12 items-start">

                        {/* Content Column */}
                        <div className="lg:col-span-7 space-y-12">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit mb-6">
                                    <Users className="h-4 w-4" />
                                    <span>{t.about.team.title}</span>
                                </div>
                                <h2 className="text-4xl font-bold text-foreground md:text-5xl mb-6">
                                    {t.about.team.subtitle}
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-6">
                                    {t.about.team.content}
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-2xl bg-background p-6 shadow-sm hover:shadow-md border border-border/50 transition-all"
                                    >
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Sparkles className="h-5 w-5 text-primary/40" />
                                        </div>

                                        <div className="mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                                            {member.name.charAt(0)}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                        <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Column - Sticky */}
                        <div className="lg:col-span-5 relative lg:sticky lg:top-32">
                            {t.about.team.image && (
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-background shadow-2xl ring-1 ring-black/5 transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
                                    <Image
                                        src={t.about.team.image.src}
                                        alt={t.about.team.image.alt}
                                        fill
                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-8 left-8">
                                        <p className="text-white text-lg font-semibold tracking-wide">{t.about.team.image.alt}</p>
                                    </div>
                                </div>
                            )}
                            {/* Abstract Shapes */}
                            <div className="absolute -z-10 top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Modern Gradient */}
            {/* CTA Section - Modern Gradient */}
            <section className="py-16 md:py-24 px-4">
                <div className="container mx-auto">
                    <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-primary via-purple-600 to-indigo-700 px-6 py-16 md:px-8 md:py-24 text-center shadow-2xl sm:px-16">
                        {/* Background Patterns */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h3 className="text-4xl font-bold text-white md:text-6xl mb-8 leading-tight tracking-tight">
                                {t.about.cta.title}
                            </h3>
                            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                                {t.about.cta.subtitle}
                            </p>
                            <Link
                                href={`/destinations`}
                                className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-white px-12 text-lg font-bold text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.7)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {t.about.cta.button}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer locale={locale} />
        </main>
    )
}
