import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getTranslations, type Locale, locales } from '@/lib/translations'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <main className="min-h-screen bg-background w-full">
      <Header locale={locale} />
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t.contact.title}</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">{t.contact.info.title}</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📧</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.info.email}</h3>
                    <p className="text-muted-foreground">contact@travelblog.ro</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📞</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.info.phone}</h3>
                    <p className="text-muted-foreground">+40 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.info.address}</h3>
                    <p className="text-muted-foreground">București, România</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🕐</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t.contact.info.hours}</h3>
                    <p className="text-muted-foreground">{t.contact.info.hoursWeek}</p>
                    <p className="text-muted-foreground">{t.contact.info.hoursSat}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{t.contact.form.title}</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  {t.contact.form.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

