import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One Markdown file per project, in src/content/projects/.
 * Images live next to the file: src/content/projects/<slug>/assets/.
 * See README.md → "Add a new project in 2 minutes".
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    repo: z.string().describe('GitHub repo as "owner/name" — used to merge live stats'),
    /** Private repo: suppresses the GitHub button (the URL would 404 for visitors). */
    privateRepo: z.boolean().default(false),
    summary: z.string().max(160).describe('One-line summary shown on cards'),
    description: z.string().describe('Longer intro shown on the case study page'),
    category: z.string(),
    tech: z.array(z.string()),
    status: z.enum(['active', 'maintained', 'wip', 'archived']).default('active'),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    date: z.coerce.date().optional(),
    cover: z.string().describe('Cover image path relative to this file, e.g. ./assets/cover.svg'),
    gallery: z
      .array(
        z.object({
          src: z.string().describe('Path relative to this file'),
          alt: z.string(),
          caption: z.string().optional(),
          frame: z.enum(['browser', 'phone']).default('browser'),
        })
      )
      .default([]),
    demo: z.string().url().optional().describe('Live demo URL'),
    video: z
      .object({
        type: z.enum(['youtube', 'loom', 'mp4', 'gif']),
        src: z.string(),
        title: z.string().optional(),
      })
      .optional(),
    features: z.array(z.string()).default([]),
    overview: z.object({
      problem: z.string(),
      solution: z.string(),
      result: z.string(),
    }),
    howItWorks: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .default([]),
    challenges: z
      .array(z.object({ challenge: z.string(), resolution: z.string() }))
      .default([]),
    lessons: z.array(z.string()).default([]),
    /** Optional fallback README content for sample/placeholder repos with no real repo. */
    readme: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
