import { type Locale, getTranslations } from '@/lib/translations'
import { User, MapPin } from 'lucide-react'

interface AuthorBoxProps {
  author: string
  locale: Locale
}

export default function AuthorBox({ author, locale }: AuthorBoxProps) {
  const t = getTranslations(locale)
  
  // Helper to get author details based on the name
  // In a real app, this might come from a CMS or a separate config
  const getAuthorDetails = (name: string) => {
    // Try to match with team members from translations
    const teamMembers = t.about.team?.members ?? []
    const member = teamMembers.find(m => m.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(m.name.toLowerCase()))
    
    if (member) {
      return {
        name: member.name,
        role: member.role,
        bio: member.bio,
        // We don't have specific images for them in the codebase yet except the group one
        // so we'll use initials or a placeholder
      }
    }
    
    return {
      name: name,
      role: locale === 'ro' ? 'Autor' : 'Author',
      bio: locale === 'ro' 
        ? 'Explorator pasionat, mereu în căutarea următoarei aventuri și a poveștilor autentice.' 
        : 'Passionate explorer, always looking for the next adventure and authentic stories.',
    }
  }

  const details = getAuthorDetails(author)

  return (
    <div className="mt-12 mb-8 rounded-3xl border border-border/60 bg-muted/30 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative h-20 w-20 flex-shrink-0 rounded-full bg-background border-2 border-border shadow-sm flex items-center justify-center overflow-hidden">
           <div className="text-2xl font-bold text-primary">
              {details.name.charAt(0)}
           </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">{details.name}</h3>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-muted-foreground/30"></span>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              {details.role}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {details.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

