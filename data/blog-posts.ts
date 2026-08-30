import { BlogPost, BlogCategory } from '@/lib/types';
import { SCIENCE_POSTS } from './blog/science-posts';
import { HARDWARE_POSTS } from './blog/hardware-posts';
import { CHEMISTRY_POSTS } from './blog/chemistry-posts';
import { SAFETY_POSTS } from './blog/safety-posts';
import { OPERATIONS_POSTS } from './blog/operations-posts';
import { SNIPPET_POSTS } from './blog/snippet-posts';
import { SNIPPET_POSTS_2 } from './blog/snippet-posts-2';

export const BLOG_CATEGORIES: { slug: BlogCategory; name: string; description: string }[] = [
  {
    slug: 'food-science',
    name: 'Food Science & Physics',
    description: 'Thermodynamics, protein denaturation, Maillard reactions, and culinary chemistry.',
  },
  {
    slug: 'equipment',
    name: 'Kitchen Hardware',
    description: 'Thermal mass, pan materials, knife maintenance, and convective airflow mechanics.',
  },
  {
    slug: 'technique',
    name: 'Culinary Technique',
    description: 'Reverse-searing, pan deglazing, spatchcocking, and emulsion stabilization.',
  },
  {
    slug: 'safety-temperatures',
    name: 'Safety & Temperatures',
    description: 'USDA pasteurization dwell curves, internal pull temperatures, and thawing protocols.',
  },
  {
    slug: 'weeknight-ops',
    name: 'Weeknight Operations',
    description: '15-minute meal logistics, meat math, 5S kitchen layout, and feeding picky kids.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  ...SCIENCE_POSTS,
  ...HARDWARE_POSTS,
  ...CHEMISTRY_POSTS,
  ...SAFETY_POSTS,
  ...OPERATIONS_POSTS,
  ...SNIPPET_POSTS,
  ...SNIPPET_POSTS_2,
];

export const BLOG_POST_BY_SLUG: Record<string, BlogPost> = BLOG_POSTS.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {} as Record<string, BlogPost>);

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POST_BY_SLUG[slug];
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedBlogPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== currentPost.slug && (p.category === currentPost.category || p.keywords.some((k) => currentPost.keywords.includes(k)))
  ).slice(0, limit);
}
