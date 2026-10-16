import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildOgSvg, renderOgPng, type OgInput } from '../../lib/og';
import { site } from '../../lib/site.config';

export async function getStaticPaths() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const paths = [
    {
      params: { route: 'default.png' },
      props: {
        og: {
          kicker: `${site.name.replace(/[\[\]]/g, '')} — Portfolio`,
          title: site.title.replace(/[\[\]]/g, ''),
          subtitle: site.tagline,
        } satisfies OgInput,
      },
    },
    ...projects.map((p) => ({
      params: { route: `projects/${p.data.slug ?? p.id}.png` },
      props: {
        og: {
          kicker: `Project · ${p.data.category}`,
          title: p.data.title,
          subtitle: p.data.summary,
        } satisfies OgInput,
      },
    })),
  ];
  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(buildOgSvg(props.og as OgInput));
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
