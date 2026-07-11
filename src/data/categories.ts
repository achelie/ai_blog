export const categories = [
  {
    slug: 'ai-coding-tools',
    name: 'AI Coding Tools',
    marker: '01',
    description:
      'Editors, agents, and coding copilots tested on work a solo developer actually ships.',
  },
  {
    slug: 'ai-website-builders',
    name: 'AI Website Builders',
    marker: '02',
    description: 'Prompt-to-site tools examined beyond the polished homepage demo.',
  },
  {
    slug: 'ai-seo-tools',
    name: 'AI SEO Tools',
    marker: '03',
    description:
      'Research, writing, and auditing tools checked against practical publishing workflows.',
  },
  {
    slug: 'ai-automation-tools',
    name: 'AI Automation Tools',
    marker: '04',
    description: 'Automation products judged by how much fiddling they remove—not add.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
