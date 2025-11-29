import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, type Locale } from '@/lib/translations'

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: 'facebook' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
  { href: 'https://youtube.com', label: 'YouTube', icon: 'youtube' },
]

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)

  // Helper to generate localized path
  const getPath = (path: string) => {
    if (locale === 'ro') {
      return path
    }
    return `/${locale}${path}`
  }

  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-30%] h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-[-15%] bottom-[-20%] h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-3 py-12 sm:px-4 sm:py-16">
        <div className="flex flex-col gap-10 border-b border-border/70 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <Link
              href={getPath('/')}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.webp"
                alt="TravelBlog"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold tracking-wide text-primary">
                TravelBlog
              </span>
            </Link>
            <p className="leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href={getPath('/')} className="transition-colors hover:text-primary">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={getPath('/destinations')} className="transition-colors hover:text-primary">
                    {t.nav.destinations}
                  </Link>
                </li>
                <li>
                  <Link href={getPath('/about')} className="transition-colors hover:text-primary">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={getPath('/contact')} className="transition-colors hover:text-primary">
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
                {t.footer.support}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href={getPath('/terms')} className="transition-colors hover:text-primary">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href={getPath('/privacy')} className="transition-colors hover:text-primary">
                    {t.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
                {t.footer.contact}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href={getPath('/contact')} className="transition-colors hover:text-primary">
                    {t.footer.contact}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locale === 'ro' ? 'București, România' : 'Bucharest, Romania'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TravelNextJS. {t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={getPath('/terms')} className="transition-colors hover:text-primary">
              {t.footer.terms}
            </Link>
            <span className="hidden sm:inline text-muted-foreground/60">|</span>
            <Link href={getPath('/privacy')} className="transition-colors hover:text-primary">
              {t.footer.privacy}
            </Link>
            <span className="hidden sm:inline text-muted-foreground/60">|</span>
            <Link href={getPath('/contact')} className="transition-colors hover:text-primary">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
