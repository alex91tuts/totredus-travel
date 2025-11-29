import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { type Locale, getTranslations } from '@/lib/translations'

export function generateStaticParams() {
    return [{ locale: 'ro' }, { locale: 'en' }]
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params
    const t = getTranslations(locale)

    return (
        <main className="min-h-screen bg-background w-full flex flex-col">
            <Header locale={locale} />

            <section className="flex-grow py-12 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground text-center">
                        {locale === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'}
                    </h1>

                    <div className="max-w-none space-y-8 text-muted-foreground">
                        <p className="text-xl leading-relaxed">
                            {locale === 'ro'
                                ? 'Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza site-ul nostru.'
                                : 'Please read these terms and conditions carefully before using our website.'}
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '1. Introducere' : '1. Introduction'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Acești Termeni și Condiții guvernează utilizarea site-ului nostru web; prin utilizarea site-ului nostru web, acceptați acești termeni și condiții în totalitate. Dacă nu sunteți de acord cu acești termeni și condiții sau cu orice parte a acestor termeni și condiții, nu trebuie să utilizați site-ul nostru web.'
                                    : 'These Terms and Conditions govern your use of our website; by using our website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '2. Drepturi de proprietate intelectuală' : '2. Intellectual Property Rights'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Cu excepția cazului în care se specifică altfel, noi sau licențiatorii noștri deținem drepturile de proprietate intelectuală asupra site-ului web și a materialelor de pe site-ul web. Sub rezerva licenței de mai jos, toate aceste drepturi de proprietate intelectuală sunt rezervate.'
                                    : 'Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '3. Licența de utilizare a site-ului web' : '3. License to Use Website'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Puteți vizualiza, descărca doar în scopuri de stocare în cache și imprima pagini de pe site-ul web pentru uzul dumneavoastră personal, sub rezerva restricțiilor stabilite mai jos și în altă parte în acești termeni și condiții.'
                                    : 'You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '4. Limitări de răspundere' : '4. Limitations of Liability'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Informațiile de pe acest site web sunt furnizate gratuit și nu veți trage la răspundere pentru nicio pierdere sau daună de orice natură suferită ca urmare a utilizării informațiilor de pe acest site.'
                                    : 'The information on this website is provided free-of-charge, and you acknowledge that it would be unreasonable to hold us liable in respect of this website and the information on this website.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {locale === 'ro' ? '5. Modificări' : '5. Variation'}
                            </h2>
                            <p className="leading-relaxed">
                                {locale === 'ro'
                                    ? 'Putem revizui acești termeni și condiții din când în când. Termenii și condițiile revizuite se vor aplica utilizării site-ului nostru web de la data publicării termenilor și condițiilor revizuite pe site-ul nostru web.'
                                    : 'We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms and conditions on our website.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer locale={locale} />
        </main>
    )
}
