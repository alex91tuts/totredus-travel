import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { type Locale, getTranslations } from '@/lib/translations'

export function generateStaticParams() {
    return [{ locale: 'ro' }, { locale: 'en' }]
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params
    const t = getTranslations(locale)

    return (
        <main className="min-h-screen bg-background w-full flex flex-col">
            <Header locale={locale} />

            <section className="flex-grow py-12 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground text-center">
                        {locale === 'ro' ? 'Politica de Confidențialitate' : 'Privacy Policy'}
                    </h1>

                    <div className="max-w-none space-y-8 text-muted-foreground">
                        <p className="text-xl leading-relaxed">
                            {locale === 'ro'
                                ? 'Confidențialitatea dumneavoastră este importantă pentru noi.'
                                : 'Your privacy is important to us.'}
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '1. Colectarea informațiilor' : '1. Information Collection'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Colectăm informații atunci când vizitați site-ul nostru, vă înregistrați pe site, plasați o comandă, vă abonați la newsletter sau completați un formular. Informațiile colectate pot include numele, adresa de e-mail, numărul de telefon și/sau detaliile cardului de credit.'
                                    : 'We collect information from you when you visit our site, register on our site, place an order, subscribe to our newsletter or fill out a form. The collected information may include your name, e-mail address, phone number and/or credit card details.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '2. Utilizarea informațiilor' : '2. Use of Information'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Oricare dintre informațiile pe care le colectăm de la dumneavoastră poate fi utilizată pentru a vă personaliza experiența, pentru a îmbunătăți site-ul nostru web, pentru a îmbunătăți serviciul clienți, pentru a procesa tranzacții sau pentru a trimite e-mailuri periodice.'
                                    : 'Any of the information we collect from you may be used to personalize your experience, improve our website, improve customer service, process transactions, or send periodic emails.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '3. Protecția informațiilor' : '3. Information Protection'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Implementăm o varietate de măsuri de securitate pentru a menține siguranța informațiilor dumneavoastră personale atunci când introduceți, trimiteți sau accesați informațiile dumneavoastră personale.'
                                    : 'We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '4. Cookie-uri' : '4. Cookies'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Utilizăm cookie-uri pentru a înțelege și a salva preferințele dumneavoastră pentru vizitele viitoare și pentru a compila date agregate despre traficul site-ului și interacțiunea site-ului, astfel încât să putem oferi experiențe și instrumente mai bune pe site în viitor.'
                                    : 'We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '5. Divulgarea către terți' : '5. Third Party Disclosure'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Nu vindem, nu comercializăm și nu transferăm în alt mod către părți externe informațiile dumneavoastră de identificare personală. Acest lucru nu include partenerii de găzduire a site-ului web și alte părți care ne ajută în operarea site-ului nostru web, desfășurarea afacerii noastre sau deservirea dumneavoastră, atâta timp cât aceste părți sunt de acord să păstreze aceste informații confidențiale.'
                                    : 'We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer locale={locale} />
        </main>
    )
}
