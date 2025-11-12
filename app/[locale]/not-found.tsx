import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTranslations, type Locale, defaultLocale } from '@/lib/translations'

export default async function NotFound({ params }: { params?: Promise<{ locale: Locale }> }) {
  const resolvedParams = params ? await params : null
  const locale = resolvedParams?.locale || defaultLocale
  const t = getTranslations(locale)

  return (
    <main className="min-h-screen pt-20">
      <Header locale={locale} />
      <section className="flex items-center justify-center min-h-[60vh] bg-gray-50">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">{t.notFound.title}</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.notFound.heading}</h2>
          <p className="text-gray-600 mb-8">
            {t.notFound.message}
          </p>
          <Link href={`/${locale}`} className="btn-primary">
            {t.notFound.backHome}
          </Link>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

