'use client'

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  )
}

export function MobileMenuContainer({ 
  isOpen, 
  children 
}: { 
  isOpen: boolean
  children: React.ReactNode 
}) {
  if (!isOpen) return null
  
  return (
    <div 
      className="md:hidden absolute inset-x-0 w-full bg-background border-b border-border shadow-lg z-50" 
      style={{ 
        top: '64px', 
        margin: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginTop: 0, 
        marginBottom: 0 
      }}
    >
      <div className="px-4 pb-4">
        {children}
      </div>
    </div>
  )
}

