export const categoryMapRo: Record<string, string> = {
  '001': 'Locuri Istorice și Culturale',
  '002': 'Muzee și Galerii de Artă',
  '003': 'Parcuri Naturale și Rezervații',
  '004': 'Plaje și Zone de Coastă',
  '005': 'Zone Montane și de Aventură',
  '006': 'Locuri de Recreere și Divertisment',
  '007': 'Zone Urbane și Arhitecturale',
  '008': 'Centre Comerciale și Piețe',
  '009': 'Evenimente Culturale și Festivaluri',
  '010': 'Patrimoniu Gastronomic și Vinicol',
  '011': 'Tururi Ghidate și Experiențe Locale',
  '012': 'Destinații Spirituale și Religioase',
  '013': 'Atracții Ecoturistice',
  '014': 'Atracții Educaționale și Științifice',
  '015': 'Situri UNESCO și Patrimoniu Mondial',
  '016': 'Experiențe de Navigație și Croaziere',
  '017': 'Atracții de Artă Stradală și Cultură Urbană',
  '018': 'Sate și Comunități Tradiționale',
  '019': 'Tururi Gastronomice și Degustări',
  '020': 'Activități de Aventură și Sportive',
}

export const categoryMapEn: Record<string, string> = {
  '001': 'Historical and Cultural Sites',
  '002': 'Museums and Art Galleries',
  '003': 'Natural Parks and Reserves',
  '004': 'Beaches and Coastal Areas',
  '005': 'Mountain and Adventure Areas',
  '006': 'Recreation and Entertainment Places',
  '007': 'Urban and Architectural Areas',
  '008': 'Shopping Centers and Markets',
  '009': 'Cultural Events and Festivals',
  '010': 'Gastronomic and Wine Heritage',
  '011': 'Guided Tours and Local Experiences',
  '012': 'Spiritual and Religious Destinations',
  '013': 'Ecotourism Attractions',
  '014': 'Educational and Scientific Attractions',
  '015': 'UNESCO Sites and World Heritage',
  '016': 'Navigation and Cruise Experiences',
  '017': 'Street Art and Urban Culture Attractions',
  '018': 'Traditional Villages and Communities',
  '019': 'Gastronomic Tours and Tastings',
  '020': 'Adventure and Sports Activities',
}

export function getCategoryName(code: string, locale: 'ro' | 'en' = 'ro'): string {
  const map = locale === 'en' ? categoryMapEn : categoryMapRo
  return map[code] || code
}

// For backward compatibility
export const categoryMap = categoryMapRo

