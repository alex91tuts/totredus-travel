import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getTranslations, type Locale, locales } from '@/lib/translations'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
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
                href={`/${locale}/about`}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {t.contact.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Form Content */}
          <div className="w-full max-w-2xl mx-auto">
            <div
              id="contact-form"
              className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm p-8 md:p-12 shadow-xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">{t.contact.form.title}</h2>
                <p className="text-muted-foreground">{t.contact.form.description}</p>
              </div>

              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                      placeholder={t.contact.form.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                      placeholder={t.contact.form.email}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    required
                    placeholder={t.contact.form.message}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t.contact.form.send}
                </button>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  {locale === 'ro'
                    ? 'Trimițând formularul, ești de acord să te contactăm pentru detalii suplimentare.'
                    : 'By submitting the form you agree to be contacted with additional details.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  )
}
