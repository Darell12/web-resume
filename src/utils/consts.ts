export const SITE = {
  name: 'Darell Orlando Estren Escorcia',
  title: 'Desarrollador de Software',
  description: 'Desarrollador de Software con experiencia en front-end y back-end para aplicaciones web y móviles.',
  email: 'darellorlandoe@gmail.com',
  github: 'https://github.com/Darell12',
  linkedin: 'https://linkedin.com/in/darellestren',
  domain: 'darellorlandoe.dev',
} as const;

export const LOCALES = ['en', 'es'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';
