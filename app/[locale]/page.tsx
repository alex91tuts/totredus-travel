import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import { type Locale, locales } from '@/lib/translations'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  
  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <Hero locale={locale} />
      <Features locale={locale} />
      <Destinations locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}

