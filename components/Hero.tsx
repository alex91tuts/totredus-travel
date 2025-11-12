import Link from 'next/link'
import { getTranslations, type Locale } from '@/lib/translations'

export default function Hero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 text-white">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10 text-center pt-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/destinations`} className="btn-primary bg-card text-primary hover:bg-muted">
            {t.hero.explore}
          </Link>
          <Link href={`/${locale}/about`} className="btn-secondary border-white text-white hover:bg-white/10">
            {t.hero.learnMore}
          </Link>
        </div>
      </div>
    </section>
  )
}

