export type Locale = 'en' | 'es';

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const translations: Record<Locale, Record<string, string>> = {
      en: {
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.certifications': 'Certifications',
        'nav.contact': 'Contact',
        'section.experience': 'Experience',
        'section.education': 'Education',
        'section.skills': 'Skills',
        'section.projects': 'Projects',
        'section.certifications': 'Certifications',
        'section.contact': 'Contact',
        'experience.present': 'Present',
        'contact.email': 'Email me',
        'contact.github': 'GitHub',
        'contact.linkedin': 'LinkedIn',
        'footer.copyright': 'All rights reserved.',
        'nav.home': 'Go Home',
        'seo.pageNotFound': 'Page Not Found',
        'seo.pageNotFoundDesc': "Looks like this page doesn't exist. Let's get you back on track.",
      },
      es: {
        'nav.experience': 'Experiencia',
        'nav.education': 'Educación',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Proyectos',
        'nav.certifications': 'Certificaciones',
        'nav.contact': 'Contacto',
        'section.experience': 'Experiencia',
        'section.education': 'Educación',
        'section.skills': 'Habilidades',
        'section.projects': 'Proyectos',
        'section.certifications': 'Certificaciones',
        'section.contact': 'Contacto',
        'experience.present': 'Presente',
        'contact.email': 'Escríbeme',
        'contact.github': 'GitHub',
        'contact.linkedin': 'LinkedIn',
        'footer.copyright': 'Todos los derechos reservados.',
        'nav.home': 'Volver al inicio',
        'seo.pageNotFound': 'Página no encontrada',
        'seo.pageNotFoundDesc': 'Esta página no existe. Te llevo de vuelta a casa.',
      },
    };
    return translations[locale][key] ?? key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(en|es)/, '').replace(/^\//, '');
  if (locale === 'en') {
    return `/${cleanPath}`;
  }
  return `/${locale}/${cleanPath}`;
}
