import type { Metadata } from 'next'
import { locales, defaultLocale, type Locale, getTranslations } from '@/lib/translations'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.filter((locale) => locale !== 'ro').map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = (resolvedParams.locale || defaultLocale) as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const translations = getTranslations(locale)

  return {
    title: `Travel NextJS - ${translations.hero.title}`,
    description: translations.hero.subtitle,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const finalLocale = (locale || defaultLocale) as Locale

  if (!locales.includes(finalLocale)) {
    notFound()
  }

  return <>{children}</>
}

