import Image from 'next/image'
import { getTranslations, type Locale } from '@/lib/translations'

export default function Hero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <section 
      className="relative flex items-center justify-center text-white py-[15px] md:min-h-[calc(100vh-72px)]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/travel-the-world.jpg)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10 text-center py-[15px] md:py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-3">
          {t.hero.title}
        </h1>
        <div className="mb-2 md:mb-3 max-w-md md:max-w-lg mx-auto">
          <Image
            src="/travel-beatifully.svg"
            alt="Travel beautifully"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
        <p className="text-lg md:text-xl text-primary-100 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  )
}

