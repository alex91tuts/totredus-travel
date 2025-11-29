'use client'

import { useState } from 'react'
import { type Locale } from '@/lib/translations'

interface ContactFormProps {
    locale: Locale
    translations: {
        name: string
        email: string
        message: string
        send: string
        sending: string
        success: string
        error: string
        consent: string
    }
}

export default function ContactForm({ locale, translations }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            locale,
            timestamp: new Date().toISOString(),
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setStatus('success')
            // Reset form
            e.currentTarget.reset()
        } catch (error) {
            console.error('Error sending message:', error)
            setStatus('error')
            setErrorMessage(translations.error)
        }
    }

    return (
        <div
            id="contact-form"
            className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm p-8 md:p-12 shadow-xl"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
                    {locale === 'ro' ? 'Trimite-ne un mesaj' : 'Send us a message'}
                </h2>
                <p className="text-muted-foreground">
                    {locale === 'ro'
                        ? 'Ai o întrebare sau o propunere? Completează formularul de mai jos.'
                        : 'Have a question or a proposal? Fill out the form below.'}
                </p>
            </div>

            {status === 'success' ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{translations.success}</h3>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-primary hover:underline mt-4"
                    >
                        {locale === 'ro' ? 'Trimite alt mesaj' : 'Send another message'}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">
                                {translations.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                                placeholder={translations.name}
                                disabled={status === 'loading'}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                {translations.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                                placeholder={translations.email}
                                disabled={status === 'loading'}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                            {translations.message}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            required
                            placeholder={translations.message}
                            disabled={status === 'loading'}
                        ></textarea>
                    </div>

                    {status === 'error' && (
                        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? translations.sending : translations.send}
                    </button>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                        {translations.consent}
                    </p>
                </form>
            )}
        </div>
    )
}
