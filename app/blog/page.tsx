import React from 'react';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import BlogIndexClient from './BlogIndexClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Field Guides & Culinary Science (${BLOG_POSTS.length} Articles)`,
  description:
    `${BLOG_POSTS.length} verified culinary science field guides, equipment physics breakdowns, and weeknight operational protocols. Zero fluff, just the science and instructions.`,
  keywords: [
    'culinary physics',
    'food science articles',
    'meat cooking temperature guide',
    'cast iron seasoning chemistry',
    'air fryer convection physics',
    'maillard reaction steak',
    'dry brining science',
    'weeknight dinner logistics',
  ],
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    title: 'Field Guides & Culinary Science // Meal Instructions',
    description:
      `${BLOG_POSTS.length} verified culinary science field guides, equipment physics breakdowns, and weeknight operational protocols.`,
    url: absoluteUrl('/blog'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Field Guides & Culinary Science // Meal Instructions',
    description: `${BLOG_POSTS.length} verified culinary science field guides and equipment physics breakdowns.`,
  },
};

export default function BlogIndexPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Field Guides & Culinary Science',
    description:
      `${BLOG_POSTS.length} verified culinary science field guides, equipment physics breakdowns, and weeknight operational protocols.`,
    url: absoluteUrl('/blog'),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: BLOG_POSTS.map((post, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        description: post.summary,
      })),
    },
  };

  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Blog', path: '/blog' }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <BlogIndexClient posts={BLOG_POSTS} />
    </>
  );
}
