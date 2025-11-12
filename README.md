# Travel NextJS - Site de Călătorii

Un site modern de călătorii construit cu Next.js 14 (SSG), TypeScript și Tailwind CSS.

## 🚀 Caracteristici

- **Next.js 14** cu App Router
- **Static Site Generation (SSG)** pentru performanță optimă
- **TypeScript** pentru siguranță de tipuri
- **Tailwind CSS** pentru design modern și responsive
- **Design modern** cu UI/UX best practices
- **SEO optimizat** cu metadata dinamică
- **Responsive design** pentru toate dispozitivele

## 📦 Instalare

1. Instalează dependențele:
```bash
npm install
```

2. Rulează serverul de dezvoltare:
```bash
npm run dev
```

3. Deschide [http://localhost:3000](http://localhost:3000) în browser.

## 🏗️ Build pentru producție

Pentru a genera site-ul static:

```bash
npm run build
```

Site-ul va fi generat în folderul `out/` și poate fi hostat pe orice server static.

## 📁 Structura Proiectului

```
travel-nextjs/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Pagina principală
│   ├── globals.css        # Stiluri globale
│   ├── destinations/      # Pagini destinații
│   ├── about/             # Pagina despre
│   └── contact/           # Pagina contact
├── components/            # Componente reutilizabile
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── Destinations.tsx
├── public/                # Fișiere statice
└── package.json
```

## 🎨 Personalizare

### Culori

Culorile pot fi personalizate în `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Culorile tale personalizate
  }
}
```

### Conținut

Conținutul destinațiilor poate fi editat în:
- `components/Destinations.tsx` - pentru pagina principală
- `app/destinations/page.tsx` - pentru pagina de destinații
- `app/destinations/[id]/page.tsx` - pentru detaliile destinațiilor

## 🛠️ Tehnologii

- **Next.js 14** - Framework React
- **TypeScript** - Tipuri statice
- **Tailwind CSS** - Framework CSS
- **React 18** - Biblioteca UI

## 📄 Licență

Acest proiect este open source și disponibil sub licență MIT.

