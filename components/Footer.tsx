import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, type Locale } from '@/lib/translations'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 w-full">
      <div className="mx-auto px-3 sm:px-4 max-w-7xl w-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-10 border-b border-gray-800">
          <div className="max-w-sm space-y-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo.webp"
                alt="TravelBlog"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold tracking-wide text-primary-200">
                TravelBlog
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-sm uppercase tracking-wide text-gray-500">
                {locale === 'ro' ? 'Urmărește-ne' : 'Follow us'}
              </span>
              <div className="flex items-center gap-3">
                <Link href="https://facebook.com" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.3V12h2.3V9.8c0-2.27 1.35-3.53 3.42-3.53.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.46.7-1.46 1.42V12h2.49l-.4 2.88h-2.09v6.99A10 10 0 0022 12z" />
                  </svg>
                </Link>
                <Link href="https://instagram.com" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </Link>
                <Link href="https://youtube.com" className="hover:text-primary-400 transition-colors" aria-label="YouTube">
                  <svg className="w-6 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.8 8s-.2-1.43-.82-2.05c-.78-.82-1.65-.82-2.05-.87C15.9 5 12 5 12 5h-.02s-3.9 0-6.93.08c-.4.05-1.27.05-2.05.87C2.4 6.57 2.2 8 2.2 8S2 9.57 2 11.14v1.7C2 14.43 2.2 16 2.2 16s.2 1.43.82 2.05c.78.82 1.8.8 2.25.89 1.62.16 6.73.21 6.73.21s3.9 0 6.93-.08c.4-.05 1.27-.05 2.05-.87.62-.62.82-2.05.82-2.05s.2-1.57.2-3.14v-1.7C22 9.57 21.8 8 21.8 8zM9.75 14.5v-5l5 2.5-5 2.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-1">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}`} className="hover:text-white transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">
                    {t.nav.destinations}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">{t.footer.support}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}/faq`} className="hover:text-white transition-colors">
                    {t.footer.faq}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                    {t.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  contact@travelnextjs.ro
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +40 123 456 789
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locale === 'ro' ? 'București, România' : 'Bucharest, Romania'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TravelNextJS. {t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <span className="hidden sm:inline text-gray-700">|</span>
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <span className="hidden sm:inline text-gray-700">|</span>
            <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

