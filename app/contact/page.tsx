import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getTranslations, type Locale } from '@/lib/translations'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const t = getTranslations('ro')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://locuirivizitat.workers.dev'

    return {
        title: `${t.contact.title} | Travel Blog`,
        description: t.contact.subtitle,
        alternates: {
            canonical: `${siteUrl}/contact`,
            languages: {
                'ro': `${siteUrl}/contact`,
                'en': `${siteUrl}/en/contact`,
            },
        },
    }
}

export default function ContactPage() {
    const locale: Locale = 'ro'
    const t = getTranslations(locale)

    return (
        <main className="min-h-screen bg-background w-full flex flex-col">
            <Header locale={locale} />

            {/* Combined Hero and Form Section */}
            <section className="relative overflow-hidden py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
                <div className="absolute inset-0">
                    <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-50"></div>
                    <div className="absolute right-[-10%] bottom-[-20%] h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-50"></div>
                </div>

                <div className="container relative mx-auto px-4">
                    {/* Hero Content */}
                    <div className="mx-auto max-w-4xl text-center mb-16">
                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                            {t.contact.badge}
                        </span>
                        <h1 className="mt-6 text-4xl font-bold text-foreground md:text-6xl">{t.contact.title}</h1>
                        <p className="mt-6 text-lg text-muted-foreground md:text-xl">{t.contact.subtitle}</p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="#contact-form"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                {t.contact.hero.ctaPrimary}
                            </a>
                            <Link
                                href={`/about`}
                                className="btn-secondary inline-flex items-center justify-center"
                            >
                                {t.contact.hero.ctaSecondary}
                            </Link>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="w-full max-w-2xl mx-auto">
                        <ContactForm locale={locale} translations={t.contact.form} />
                    </div>
                </div>
            </section>

            <Footer locale={locale} />
        </main>
    )
}
