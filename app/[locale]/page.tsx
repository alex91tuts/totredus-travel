import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CitiesAttractions from '@/components/CitiesAttractions'
import Footer from '@/components/Footer'
import { type Locale, locales, getTranslations } from '@/lib/translations'

import type { Metadata } from 'next'

export function generateStaticParams() {
  return locales.filter((locale) => locale !== 'ro').map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toplocuri.ro'
  const url = locale === 'ro' ? `${siteUrl}/` : `${siteUrl}/${locale}`

  return {
    title: `Travel NextJS - ${t.hero.title}`,
    description: t.hero.subtitle,
    alternates: {
      canonical: url,
      languages: {
        'ro': `${siteUrl}/`,
        'en': `${siteUrl}/en`,
      },
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <Hero locale={locale} />
      <CitiesAttractions locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}

