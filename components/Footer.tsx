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
              href={`/${locale}`}
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
            {/* <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-sm uppercase tracking-wide text-muted-foreground/80">
                {locale === 'ro' ? 'Urmărește-ne' : 'Follow us'}
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    aria-label={social.label}
                    className="transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon === 'facebook' && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.3V12h2.3V9.8c0-2.27 1.35-3.53 3.42-3.53.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.46.7-1.46 1.42V12h2.49l-.4 2.88h-2.09v6.99A10 10 0 0022 12z" />
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                        <circle cx="12" cy="12" r="3.5" />
                        <path d="M17.5 6.5h.01" />
                      </svg>
                    )}
                    {social.icon === 'youtube' && (
                      <svg className="h-5 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.8 8s-.2-1.43-.82-2.05c-.78-.82-1.65-.82-2.05-.87C15.9 5 12 5 12 5h-.02s-3.9 0-6.93.08c-.4.05-1.27.05-2.05.87C2.4 6.57 2.2 8 2.2 8S2 9.57 2 11.14v1.7C2 14.43 2.2 16 2.2 16s.2 1.43.82 2.05c.78.82 1.8.8 2.25.89 1.62.16 6.73.21 6.73.21s3.9 0 6.93-.08c.4-.05 1.27-.05 2.05-.87.62-.62.82-2.05.82-2.05s.2-1.57.2-3.14v-1.7C22 9.57 21.8 8 21.8 8zM9.75 14.5v-5l5 2.5-5 2.5z" />
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            </div> */}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href={`/${locale}`} className="transition-colors hover:text-primary">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/destinations`} className="transition-colors hover:text-primary">
                    {t.nav.destinations}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`} className="transition-colors hover:text-primary">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="transition-colors hover:text-primary">
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
                  <Link href={`/${locale}/terms`} className="transition-colors hover:text-primary">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/privacy`} className="transition-colors hover:text-primary">
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
                  <Link href={`/${locale}/contact`} className="transition-colors hover:text-primary">
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
            <Link href={`/${locale}/terms`} className="transition-colors hover:text-primary">
              {t.footer.terms}
            </Link>
            <span className="hidden sm:inline text-muted-foreground/60">|</span>
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-primary">
              {t.footer.privacy}
            </Link>
            <span className="hidden sm:inline text-muted-foreground/60">|</span>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-primary">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

