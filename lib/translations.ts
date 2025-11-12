export type Locale = 'ro' | 'en'

export const locales: Locale[] = ['ro', 'en']
export const defaultLocale: Locale = 'ro'

export const translations = {
  ro: {
    nav: {
      home: 'Acasă',
      destinations: 'Destinații',
      about: 'Despre',
      contact: 'Contact',
      book: 'Rezervă Acum',
    },
    breadcrumb: {
      home: 'Acasă',
      blog: 'Blog',
    },
    hero: {
      title: 'Blog de Călătorii',
      subtitle: 'Povești, experiențe și sfaturi despre cele mai frumoase destinații din lume. Descoperă lumea prin ochii noștri.',
      explore: 'Citește Articole',
      learnMore: 'Despre Blog',
    },
    features: {
      title: 'Ce Găsești Aici?',
      subtitle: 'Un blog dedicat tuturor celor care iubesc să călătorească și să descopere lumea',
      destinations: {
        title: 'Povești Adevărate',
        description: 'Experiențe reale și povestiri autentice din călătoriile noastre',
      },
      prices: {
        title: 'Fotografii Spectaculoase',
        description: 'Imagini și momente capturate din cele mai frumoase locuri',
      },
      experience: {
        title: 'Ghiduri Complete',
        description: 'Sfaturi practice și informații utile pentru călătoriile tale',
      },
      safety: {
        title: 'Inspirație',
        description: 'Idei și destinații care te vor inspira să explorezi lumea',
      },
    },
    destinations: {
      title: 'Articole Recente',
      subtitle: 'Descoperă cele mai recente povestiri și experiențe din călătorii',
      learnMore: 'Citește articolul',
      from: 'De la',
      pageTitle: 'Toate Articolele',
      pageSubtitle: 'Explorează toate articolele despre destinațiile noastre de vis',
      duration: 'Durată',
      bookNow: 'Citește Mai Mult',
      contactUs: 'Contactează-ne',
      about: 'Despre Destinație',
      highlights: 'Atracții Principale',
      details: 'Detalii Călătorie',
    },
    about: {
      title: 'Despre Blog',
      subtitle: 'Pasiunea noastră pentru călătorii și povestiri',
      mission: {
        title: 'Misiunea Noastră',
        content: 'Acest blog de călătorii este dedicat tuturor celor care iubesc să exploreze lumea. Împărtășim experiențele noastre reale, fotografii autentice și sfaturi practice despre cele mai frumoase destinații. Credem că călătoriile ne transformă și ne deschid mintea la culturi și peisaje noi. Misiunea noastră este să inspirăm și să informăm alți călători prin povestirile și experiențele noastre.',
      },
      values: {
        title: 'Valorile Noastre',
        sustainability: {
          title: 'Sustenabilitate',
          description: 'Promovăm călătoriile responsabile care respectă mediul și comunitățile locale.',
        },
        quality: {
          title: 'Calitate',
          description: 'Ne asigurăm că fiecare călătorie este organizată cu atenție la detalii.',
        },
        passion: {
          title: 'Pasiune',
          description: 'Iubim ce facem și suntem dedicați să oferim cea mai bună experiență.',
        },
      },
      team: {
        title: 'Echipa Noastră',
        content: 'Echipa noastră este formată din experți în călătorii care au explorat lumea și cunosc cele mai bune destinații. Suntem aici pentru a-ți ajuta să planifici călătoria perfectă, indiferent dacă ești în căutarea unei aventuri extreme sau a unui sejur relaxant.',
      },
    },
    contact: {
      title: 'Contactează-ne',
      subtitle: 'Suntem aici să te ajutăm cu orice întrebare despre călătoriile tale',
      info: {
        title: 'Informații de Contact',
        email: 'Email',
        phone: 'Telefon',
        address: 'Adresă',
        hours: 'Program',
        hoursWeek: 'Luni - Vineri: 09:00 - 18:00',
        hoursSat: 'Sâmbătă: 10:00 - 14:00',
      },
      form: {
        title: 'Trimite-ne un Mesaj',
        name: 'Nume',
        email: 'Email',
        message: 'Mesaj',
        send: 'Trimite Mesajul',
      },
    },
    footer: {
      tagline: 'Descoperă lumea cu noi și creează amintiri de neuitat.',
      quickLinks: 'Link-uri Rapide',
      support: 'Suport',
      faq: 'Întrebări Frecvente',
      terms: 'Termeni și Condiții',
      privacy: 'Confidențialitate',
      contact: 'Contact',
      copyright: 'Toate drepturile rezervate.',
    },
    notFound: {
      title: '404',
      heading: 'Pagina nu a fost găsită',
      message: 'Pagina pe care o cauți nu există sau a fost mutată.',
      backHome: 'Înapoi la Acasă',
    },
    destinationsList: {
      paris: {
        name: 'Paris, Franța',
        description: 'Orașul luminilor și al artei',
        longDescription: 'Paris, capitala Franței, este unul dintre cele mai frumoase și romantice orașe din lume. Descoperă Turnul Eiffel, Muzeul Luvru, Catedrala Notre-Dame și multe altele.',
        highlights: ['Turnul Eiffel', 'Muzeul Luvru', 'Catedrala Notre-Dame', 'Arcul de Triumf'],
      },
      tokyo: {
        name: 'Tokyo, Japonia',
        description: 'Tradiție și modernitate',
        longDescription: 'Tokyo combină arhitectura tradițională cu tehnologia de ultimă generație. Explorează templele antice, cartierele moderne și bucătăria japoneză autentică.',
        highlights: ['Templul Senso-ji', 'Shibuya Crossing', 'Palatul Imperial', 'Muntele Fuji'],
      },
      bali: {
        name: 'Bali, Indonezia',
        description: 'Paradis tropical',
        longDescription: 'Bali oferă plaje de vis, temple spirituale și o cultură bogată. Relaxează-te pe plaje de nisip alb sau explorează terasele de orez și munții vulcanici.',
        highlights: ['Templul Uluwatu', 'Terasele de orez', 'Plaja Kuta', 'Muntele Batur'],
      },
      santorini: {
        name: 'Santorini, Grecia',
        description: 'Soare și mări azurii',
        longDescription: 'Santorini este cunoscut pentru casele albe cu acoperișuri albastre, apusurile de soare spectaculoase și vinurile locale delicioase.',
        highlights: ['Oia', 'Fira', 'Plajele roșii și negre', 'Vinăriile'],
      },
      ny: {
        name: 'New York, SUA',
        description: 'Orașul care nu doarme niciodată',
        longDescription: 'New York oferă experiențe unice: Times Square, Central Park, Statuia Libertății și o scenă culturală vibrantă.',
        highlights: ['Times Square', 'Central Park', 'Statuia Libertății', 'Brooklyn Bridge'],
      },
      dubai: {
        name: 'Dubai, EAU',
        description: 'Lux și modernitate',
        longDescription: 'Dubai combină luxul modern cu tradiția arabă. Vizitează Burj Khalifa, insulele artificiale și bazarurile tradiționale.',
        highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Bazarul de Aur'],
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      about: 'About',
      contact: 'Contact',
      book: 'Book Now',
    },
    breadcrumb: {
      home: 'Home',
      blog: 'Blog',
    },
    hero: {
      title: 'Travel Blog',
      subtitle: 'Stories, experiences and tips about the most beautiful destinations in the world. Discover the world through our eyes.',
      explore: 'Read Articles',
      learnMore: 'About the Blog',
    },
    features: {
      title: 'What You\'ll Find Here?',
      subtitle: 'A blog dedicated to everyone who loves to travel and discover the world',
      destinations: {
        title: 'Real Stories',
        description: 'Real experiences and authentic stories from our travels',
      },
      prices: {
        title: 'Spectacular Photos',
        description: 'Images and moments captured from the most beautiful places',
      },
      experience: {
        title: 'Complete Guides',
        description: 'Practical tips and useful information for your travels',
      },
      safety: {
        title: 'Inspiration',
        description: 'Ideas and destinations that will inspire you to explore the world',
      },
    },
    destinations: {
      title: 'Recent Articles',
      subtitle: 'Discover the latest stories and experiences from travels',
      learnMore: 'Read article',
      from: 'From',
      pageTitle: 'All Articles',
      pageSubtitle: 'Explore all articles about our dream destinations',
      duration: 'Duration',
      bookNow: 'Read More',
      contactUs: 'Contact Us',
      about: 'About Destination',
      highlights: 'Main Attractions',
      details: 'Travel Details',
    },
    about: {
      title: 'About the Blog',
      subtitle: 'Our passion for travel and storytelling',
      mission: {
        title: 'Our Mission',
        content: 'This travel blog is dedicated to everyone who loves to explore the world. We share our real experiences, authentic photos and practical tips about the most beautiful destinations. We believe that travel transforms us and opens our minds to new cultures and landscapes. Our mission is to inspire and inform other travelers through our stories and experiences.',
      },
      values: {
        title: 'Our Values',
        sustainability: {
          title: 'Sustainability',
          description: 'We promote responsible travel that respects the environment and local communities.',
        },
        quality: {
          title: 'Quality',
          description: 'We ensure that every trip is organized with attention to detail.',
        },
        passion: {
          title: 'Passion',
          description: 'We love what we do and are dedicated to providing the best experience.',
        },
      },
      team: {
        title: 'Our Team',
        content: 'Our team consists of travel experts who have explored the world and know the best destinations. We are here to help you plan the perfect trip, whether you are looking for an extreme adventure or a relaxing stay.',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help you with any questions about your travels',
      info: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        hours: 'Hours',
        hoursWeek: 'Monday - Friday: 09:00 - 18:00',
        hoursSat: 'Saturday: 10:00 - 14:00',
      },
      form: {
        title: 'Send Us a Message',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
      },
    },
    footer: {
      tagline: 'Discover the world with us and create unforgettable memories.',
      quickLinks: 'Quick Links',
      support: 'Support',
      faq: 'FAQ',
      terms: 'Terms & Conditions',
      privacy: 'Privacy',
      contact: 'Contact',
      copyright: 'All rights reserved.',
    },
    notFound: {
      title: '404',
      heading: 'Page Not Found',
      message: 'The page you are looking for does not exist or has been moved.',
      backHome: 'Back to Home',
    },
    destinationsList: {
      paris: {
        name: 'Paris, France',
        description: 'The City of Light and Art',
        longDescription: 'Paris, the capital of France, is one of the most beautiful and romantic cities in the world. Discover the Eiffel Tower, the Louvre Museum, Notre-Dame Cathedral and much more.',
        highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe'],
      },
      tokyo: {
        name: 'Tokyo, Japan',
        description: 'Tradition and Modernity',
        longDescription: 'Tokyo combines traditional architecture with cutting-edge technology. Explore ancient temples, modern neighborhoods and authentic Japanese cuisine.',
        highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'Imperial Palace', 'Mount Fuji'],
      },
      bali: {
        name: 'Bali, Indonesia',
        description: 'Tropical Paradise',
        longDescription: 'Bali offers dream beaches, spiritual temples and a rich culture. Relax on white sand beaches or explore rice terraces and volcanic mountains.',
        highlights: ['Uluwatu Temple', 'Rice Terraces', 'Kuta Beach', 'Mount Batur'],
      },
      santorini: {
        name: 'Santorini, Greece',
        description: 'Sun and Azure Seas',
        longDescription: 'Santorini is known for white houses with blue roofs, spectacular sunsets and delicious local wines.',
        highlights: ['Oia', 'Fira', 'Red and Black Beaches', 'Wineries'],
      },
      ny: {
        name: 'New York, USA',
        description: 'The City That Never Sleeps',
        longDescription: 'New York offers unique experiences: Times Square, Central Park, Statue of Liberty and a vibrant cultural scene.',
        highlights: ['Times Square', 'Central Park', 'Statue of Liberty', 'Brooklyn Bridge'],
      },
      dubai: {
        name: 'Dubai, UAE',
        description: 'Luxury and Modernity',
        longDescription: 'Dubai combines modern luxury with Arab tradition. Visit Burj Khalifa, artificial islands and traditional bazaars.',
        highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Gold Souk'],
      },
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}

