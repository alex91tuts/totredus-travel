import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTranslations, type Locale, locales } from '@/lib/translations'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t.about.title}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-foreground">{t.about.mission.title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t.about.mission.content}
            </p>
            <h2 className="text-3xl font-bold mb-6 text-foreground mt-12">{t.about.values.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t.about.values.sustainability.title}</h3>
                <p className="text-muted-foreground">
                  {t.about.values.sustainability.description}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t.about.values.quality.title}</h3>
                <p className="text-muted-foreground">
                  {t.about.values.quality.description}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t.about.values.passion.title}</h3>
                <p className="text-muted-foreground">
                  {t.about.values.passion.description}
                </p>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-foreground mt-12">{t.about.team.title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t.about.team.content}
            </p>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

