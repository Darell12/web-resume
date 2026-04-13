import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.array(z.string()),
  tech: z.array(z.string()).optional(),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const skillSchema = z.object({
  name: z.string(),
  level: z.enum(['basic', 'intermediate', 'advanced', 'expert']).optional(),
  category: z.string(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

const certificationSchema = z.object({
  issuer: z.string(),
  name: z.string(),
  date: z.string(),
  credentialUrl: z.string().url().optional(),
});

const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string(),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/experience' }),
  schema: experienceSchema,
});

const educationCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/education' }),
  schema: educationSchema,
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/skills' }),
  schema: skillSchema,
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/projects' }),
  schema: projectSchema,
});

const certificationsCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/certifications' }),
  schema: certificationSchema,
});

const metaCollection = defineCollection({
  loader: glob({ pattern: '**/*', base: './src/content/meta' }),
  schema: metaSchema,
});

export const collections = {
  experience: experienceCollection,
  education: educationCollection,
  skills: skillsCollection,
  projects: projectsCollection,
  certifications: certificationsCollection,
  meta: metaCollection,
};
