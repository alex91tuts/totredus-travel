import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { getTranslations, type Locale, locales } from '@/lib/translations'
import { getDestinationById, destinations } from '@/lib/destinations'

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; id: string }> = []
  
  destinations.forEach((dest) => {
    locales.forEach((locale) => {
      params.push({ locale, id: dest.id.toString() })
    })
  })
  
  return params
}

export default async function DestinationDetail({ params }: { params: Promise<{ locale: Locale; id: string }> }) {
  const { locale, id } = await params
  const destination = getDestinationById(Number(id))
  const t = getTranslations(locale)

  if (!destination) {
    notFound()
  }

  const destInfo = t.destinationsList[destination.key as keyof typeof t.destinationsList]
  const daysText = locale === 'ro' ? 'zile' : 'days'

  return (
    <main className="min-h-screen pt-20">
      <Header locale={locale} />
      <section className="relative h-96 overflow-hidden">
        <img
          src={destination.image}
          alt={destInfo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{destInfo.name}</h1>
            <p className="text-xl">{destInfo.description}</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{t.destinations.about}</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {destInfo.longDescription}
              </p>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.destinations.highlights}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destInfo.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.destinations.details}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">
                      {locale === 'ro' ? 'Preț' : 'Price'}
                    </p>
                    <p className="text-3xl font-bold text-primary-600">
                      {t.destinations.from} {destination.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t.destinations.duration}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {destination.duration} {daysText}
                    </p>
                  </div>
                </div>
                <button className="btn-primary w-full mb-4">
                  {t.destinations.bookNow}
                </button>
                <button className="btn-secondary w-full">
                  {t.destinations.contactUs}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

