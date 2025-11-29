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
      subtitle: 'Povești, experiențe și sfaturi despre cele mai frumoase destinații din lume. Descoperă lumea prin ghiduri autentice și inspirație.',
      explore: 'Citește Articole',
      learnMore: 'Despre Blog',
    },
    features: {
      title: 'Ce Găsești Aici?',
      subtitle: 'Un blog dedicat tuturor celor care iubesc să călătorească și să descopere lumea',
      destinations: {
        title: 'Povești Adevărate',
        description: 'Povestiri autentice și experiențe reale despre destinații din întreaga lume',
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
      pageTitle: 'DESTINAȚII',
      pageSubtitle: 'Lumea la picioarele tale: inspiră-te pentru următoarea evadare',
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
      badge: 'Cunoaște-ne povestea',
      hero: {
        ctaPrimary: 'Explorează destinațiile',
        ctaSecondary: 'Scrie-ne un mesaj',
      },
      mission: {
        title: 'Misiunea Noastră',
        content: 'Acest blog de călătorii este dedicat tuturor celor care iubesc să exploreze lumea. Călătoriile ne transformă și ne deschid mintea la culturi și peisaje noi. Misiunea noastră este să te inspirăm!',
        points: [
          'Documentăm cu atenție fiecare destinație pentru a oferi informații reale și utile.',
          'Colaborăm cu ghizi locali și comunități pentru a promova turismul responsabil.',
          'Selectăm destinațiile și traseele în funcție de impactul lor cultural și emoțional.',
          'Îmbinăm povestirile autentice cu ghiduri practice pentru a te ajuta să pleci pregătit.',
        ],
        highlight: {
          title: 'Cum lucrăm',
          description: 'Creăm conținut cu atenție, combinând documentarea riguroasă cu interviuri locale și fotografii originale. Fiecare articol trece printr-un proces editorial pentru a garanta calitatea informațiilor.',
        },
      },
      highlights: {
        title: 'Blogul în cifre',
        subtitle: 'Rezultatul comunității noastre de exploratori și al pasiunii pentru povești autentice',
        stats: [
          {
            value: '120+',
            label: 'Articole publicate',
            description: 'Ghiduri, povești și sfaturi verificate despre destinații din toată lumea.',
          },
          {
            value: '45',
            label: 'Țări explorate',
            description: 'De la orașe emblematice la locuri mai puțin cunoscute, dar memorabile.',
          },
          {
            value: '250k',
            label: 'Cititori lunari',
            description: 'O comunitate activă de călători care își împărtășesc impresiile și recomandările.',
          },
          {
            value: '6000+',
            label: 'Fotografii originale',
            description: 'Imagini curate și pregătite pentru inspirație, care capturează esența fiecărei destinații.',
          },
        ],
      },
      values: {
        title: 'Valorile Noastre',
        subtitle: 'Principiile care ne ghidează în fiecare articol publicat',
        sustainability: {
          title: 'Sustenabilitate',
          description: 'Promovăm călătoriile responsabile care respectă mediul și comunitățile locale.',
        },
        quality: {
          title: 'Calitate',
          description: 'Ne asigurăm că fiecare articol este creat cu atenție la detalii și acuratețe.',
        },
        passion: {
          title: 'Pasiune',
          description: 'Iubim ce facem și suntem dedicați să oferim cea mai bună experiență de lectură.',
        },
      },
      team: {
        title: 'Echipa Noastră',
        subtitle: 'Fabrica de amintiri',
        content: 'Suntem o echipă pasionată de călătorii și de crearea de conținut autentic despre destinațiile din întreaga lume. Împreună, transformăm experiențele de călătorie în povești și ghiduri care te vor inspira să explorezi lumea.',
        members: [
          {
            name: 'Damian',
            role: 'Co-fondator',
            bio: 'Pasiunea pentru călătorii și pentru crearea de amintiri durabile îl motivează pe Damian să exploreze și să documenteze destinații din întreaga lume.',
          },
          {
            name: 'Simina',
            role: 'Co-fondator',
            bio: 'Simina aduce creativitate și atenție la detalii în fiecare proiect, transformând fiecare călătorie într-o poveste autentică și memorabilă.',
          },
        ],
        image: {
          src: '/fabrica de amintiri.jpg',
          alt: 'Fabrica de amintiri - Damian și Simina',
        },
      },
      cta: {
        title: 'Gata să planifici următoarea evadare?',
        subtitle: 'Descoperă articolele noastre și creează-ți propriul itinerariu cu ajutorul ghidurilor detaliate.',
        button: 'Vezi articolele',
      },
      gallery: {
        mission: {
          alt: 'Turnul Eiffel, Paris',
          caption: 'Turnul Eiffel, Paris',
          image: '/turnul-eifell.jpg',
        },
        highlight: {
          alt: 'Străzile vibrante din Tokyo',
          caption: 'Lumini în Shibuya Crossing, Tokyo',
          image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80',
        },
      },
    },
    contact: {
      title: 'Contactează-ne',
      subtitle: 'Suntem aici să te ajutăm cu orice întrebare despre călătoriile tale',
      badge: 'Hai să stăm de vorbă',
      hero: {
        ctaPrimary: 'Completează formularul',
        ctaSecondary: 'Descoperă povestea noastră',
      },
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
        description: 'Spune-ne câteva detalii despre planurile tale, iar echipa noastră îți răspunde în cel mult o zi lucrătoare.',
        name: 'Nume',
        email: 'Email',
        message: 'Mesaj',
        send: 'Trimite Mesajul',
      },
      highlights: {
        title: 'Când ne contactezi',
        subtitle: 'Răspundem rapid și oferim soluții personalizate pentru fiecare călător.',
        stats: [
          {
            value: '<24h',
            label: 'Timp mediu de răspuns',
            description: 'Îți trimitem răspuns la mesaj în cel mult o zi lucrătoare.',
          },
          {
            value: '300+',
            label: 'Planuri personalizate',
            description: 'Itinerarii create împreună cu cititorii noștri din întreaga lume.',
          },
          {
            value: '5/5',
            label: 'Rating comunitate',
            description: 'Feedback excelent din partea cititorilor și călătorilor care ne-au scris.',
          },
        ],
      },
      channels: {
        title: 'Alege canalul preferat',
        subtitle: 'Suntem la un mesaj distanță pe mail, telefon sau social media.',
        items: [
          {
            icon: '💬',
            title: 'Consultanță rapidă',
            description: 'Programează un call de 20 de minute pentru sfaturi despre destinații și bugete.',
            action: 'Rezervă un call',
          },
          {
            icon: '✉️',
            title: 'Scrie-ne pe email',
            description: 'Detaliază-ne planurile și primești un ghid personalizat cu recomandări.',
            action: 'Trimite email',
          },
          {
            icon: '🌐',
            title: 'Comunitate online',
            description: 'Intră în grupul nostru și discută cu alți călători despre experiențe.',
            action: 'Alătură-te comunității',
          },
        ],
      },
      cta: {
        title: 'Pregătit să explorezi?',
        subtitle: 'Vezi cele mai noi articole și planifică următoarea aventură inspirându-te din ghidurile noastre.',
        button: 'Descoperă articolele',
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
      subtitle: 'Stories, experiences and tips about the most beautiful destinations in the world. Discover the world through authentic guides and inspiration.',
      explore: 'Read Articles',
      learnMore: 'About the Blog',
    },
    features: {
      title: 'What You\'ll Find Here?',
      subtitle: 'A blog dedicated to everyone who loves to travel and discover the world',
      destinations: {
        title: 'Real Stories',
        description: 'Authentic stories and real experiences about destinations around the world',
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
      pageTitle: 'DESTINATIONS',
      pageSubtitle: 'The world at your feet: get inspired for your next escape',
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
      badge: 'Meet our story',
      hero: {
        ctaPrimary: 'Explore destinations',
        ctaSecondary: 'Send us a message',
      },
      mission: {
        title: 'Our Mission',
        content: 'This travel blog is dedicated to everyone who loves to explore the world. Travel transforms us and opens our minds to new cultures and landscapes. Our mission is to inspire you!',
        points: [
          'We carefully document each destination to provide real, useful information.',
          'We collaborate with local guides and communities to promote responsible travel.',
          'We select destinations and routes based on their cultural and emotional impact.',
          'We combine authentic storytelling with practical guides so you can travel prepared.',
        ],
        highlight: {
          title: 'How we work',
          description: 'We create content with intention, blending thorough research with local interviews and original photography. Every article goes through an editorial process to guarantee quality.',
        },
      },
      highlights: {
        title: 'The blog in numbers',
        subtitle: 'A snapshot of our travel community and the passion behind every published story',
        stats: [
          {
            value: '120+',
            label: 'Published articles',
            description: 'Guides, stories and verified tips covering destinations across the globe.',
          },
          {
            value: '45',
            label: 'Countries explored',
            description: 'From iconic cities to lesser-known places that left a lasting impression.',
          },
          {
            value: '250k',
            label: 'Monthly readers',
            description: 'An active community of travelers sharing impressions and recommendations.',
          },
          {
            value: '6000+',
            label: 'Original photos',
            description: 'Curated images ready to inspire, capturing the essence of each destination.',
          },
        ],
      },
      values: {
        title: 'Our Values',
        subtitle: 'The principles guiding every article we publish',
        sustainability: {
          title: 'Sustainability',
          description: 'We promote responsible travel that respects the environment and local communities.',
        },
        quality: {
          title: 'Quality',
          description: 'We ensure that every article is created with attention to detail and accuracy.',
        },
        passion: {
          title: 'Passion',
          description: 'We love what we do and are dedicated to providing the best reading experience.',
        },
      },
      team: {
        title: 'Our Team',
        subtitle: 'Fabrica de amintiri',
        content: 'We are a team passionate about travel and creating authentic content about destinations around the world. Together, we transform travel experiences into stories and guides that will inspire you to explore the world.',
        members: [
          {
            name: 'Damian',
            role: 'Co-founder',
            bio: 'Damian\'s passion for travel and creating lasting memories drives him to explore and document destinations around the world.',
          },
          {
            name: 'Simina',
            role: 'Co-founder',
            bio: 'Simina brings creativity and attention to detail to every project, turning each journey into an authentic and memorable story.',
          },
        ],
        image: {
          src: '/fabrica de amintiri.jpg',
          alt: 'Fabrica de amintiri - Damian and Simina',
        },
      },
      cta: {
        title: 'Ready to plan your next escape?',
        subtitle: 'Browse our articles and craft your own itinerary with detailed guides and tips.',
        button: 'View articles',
      },
      gallery: {
        mission: {
          alt: 'Eiffel Tower, Paris',
          caption: 'Eiffel Tower, Paris',
          image: '/turnul-eifell.jpg',
        },
        highlight: {
          alt: 'Vibrant streets of Tokyo',
          caption: 'Lights of Shibuya Crossing, Tokyo',
          image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80',
        },
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are here to help you with any questions about your travels',
      badge: 'Let’s talk',
      hero: {
        ctaPrimary: 'Complete the form',
        ctaSecondary: 'Learn about us',
      },
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
        description: 'Share a few details about your plans and our team will reply within one business day.',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
      },
      highlights: {
        title: 'When you reach out',
        subtitle: 'We respond quickly and tailor every answer to your travel goals.',
        stats: [
          {
            value: '<24h',
            label: 'Average response time',
            description: 'You receive a reply within one business day.',
          },
          {
            value: '300+',
            label: 'Custom travel plans',
            description: 'Itineraries we co-created with readers from around the world.',
          },
          {
            value: '5/5',
            label: 'Community rating',
            description: 'Excellent feedback from travelers who contacted us.',
          },
        ],
      },
      channels: {
        title: 'Choose your channel',
        subtitle: 'Reach out by email, phone or join our travel community.',
        items: [
          {
            icon: '💬',
            title: 'Quick consultation',
            description: 'Book a 20-minute call for tips on destinations and budgets.',
            action: 'Book a call',
          },
          {
            icon: '✉️',
            title: 'Write us an email',
            description: 'Share your plans and get a tailored guide with recommendations.',
            action: 'Send email',
          },
          {
            icon: '🌐',
            title: 'Online community',
            description: 'Join our group and talk with fellow travelers about real experiences.',
            action: 'Join the community',
          },
        ],
      },
      cta: {
        title: 'Ready to explore?',
        subtitle: 'Browse our latest articles and plan your next adventure with detailed guides.',
        button: 'Browse articles',
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

