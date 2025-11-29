import { getTranslations, type Locale } from '@/lib/translations'

export default function Features({ locale }: { locale: Locale }) {
  const t = getTranslations(locale)
  
  const features = [
    {
      icon: '✍️',
      title: t.features.destinations.title,
      description: t.features.destinations.description,
    },
    {
      icon: '📸',
      title: t.features.prices.title,
      description: t.features.prices.description,
    },
    {
      icon: '🗺️',
      title: t.features.experience.title,
      description: t.features.experience.description,
    },
    {
      icon: '💡',
      title: t.features.safety.title,
      description: t.features.safety.description,
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="blog-card p-6 text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

