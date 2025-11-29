import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, type Locale } from '@/lib/translations'

export default function AboutHero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <section className="relative flex items-center justify-center text-white min-h-[60vh] md:min-h-[80vh]">
      {/* Background Image with Next.js Image - using WebP for better performance */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/travel-despre.webp"
          alt={t.about.title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: 'center',
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-[1]"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center py-12 md:py-20">
        <span className="inline-flex items-center rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white mb-6">
          {t.about.badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          {t.about.title}
        </h1>
        <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-10">
          {t.about.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href={`/${locale}/destinations`}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/25 hover:ring-4 hover:ring-primary/20"
          >
            <span className="relative z-10">{t.about.hero.ctaPrimary}</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50"
          >
            <span>{t.about.hero.ctaSecondary}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

