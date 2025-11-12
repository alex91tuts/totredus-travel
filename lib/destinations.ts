import { Locale } from './translations'

export interface Destination {
  id: number
  key: string
  image: string
  price: string
  duration: string
}

export const destinations: Destination[] = [
  {
    id: 1,
    key: 'paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    price: '299€',
    duration: '3-5',
  },
  {
    id: 2,
    key: 'tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    price: '599€',
    duration: '5-7',
  },
  {
    id: 3,
    key: 'bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    price: '399€',
    duration: '7-10',
  },
  {
    id: 4,
    key: 'santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    price: '349€',
    duration: '4-6',
  },
  {
    id: 5,
    key: 'ny',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    price: '449€',
    duration: '5-7',
  },
  {
    id: 6,
    key: 'dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    price: '549€',
    duration: '4-6',
  },
]

export function getDestinationById(id: number) {
  return destinations.find(d => d.id === id)
}

export function getDestinationPriceFormatted(price: string, locale: Locale) {
  const t = require('./translations').getTranslations(locale)
  return `${t.destinations.from} ${price}`
}

export function getDestinationDurationFormatted(duration: string, locale: Locale) {
  const t = require('./translations').getTranslations(locale)
  return `${t.destinations.duration}: ${duration} ${locale === 'ro' ? 'zile' : 'days'}`
}

