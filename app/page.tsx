import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CitiesAttractions from '@/components/CitiesAttractions'
import Footer from '@/components/Footer'
import { type Locale, getTranslations } from '@/lib/translations'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslations('ro')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toplocuri.ro'

  return {
    title: `Travel NextJS - ${t.hero.title}`,
    description: t.hero.subtitle,
    alternates: {
      canonical: `${siteUrl}/`,
      languages: {
        'ro': `${siteUrl}/`,
        'en': `${siteUrl}/en`,
      },
    },
  }
}

export default function Home() {
  const locale: Locale = 'ro'

  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <Hero locale={locale} />
      <CitiesAttractions locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
