import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blog-posts';
import { getRecipeBySlug } from '@/data/recipes';
import { getDatasheetByCompositeSlug } from '@/data/cook-times';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import {
  generateBlogPostingSchema,
  generateBlogBreadcrumbsSchema,
  generateBlogFaqSchema,
  formatBlogMarkdownToHtml,
} from '@/lib/blog-utils';
import { Clock, Calendar, ArrowLeft, ArrowRight, CheckCircle2, Wrench, BookOpen, Share2, ShieldCheck } from 'lucide-react';
import RecipeCard from '@/components/RecipeCard';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Meal Instructions',
    };
  }

  const title = `${post.title}`;
  const description = post.summary;

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.lastUpdated,
      tags: post.keywords,
      url: absoluteUrl(`/blog/${post.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postSchema = generateBlogPostingSchema(post);
  const breadcrumbSchema = generateBlogBreadcrumbsSchema(post);
  const faqSchema = generateBlogFaqSchema(post);
  const relatedPosts = getRelatedBlogPosts(post, 3);
  const htmlContent = formatBlogMarkdownToHtml(post.contentMarkdown);

  // Resolve related recipes if present
  const relatedRecipes = (post.relatedRecipeSlugs || [])
    .map((s) => getRecipeBySlug(s))
    .filter(Boolean);

  // Resolve related datasheets if present
  const relatedDatasheets = (post.relatedDatasheetSlugs || [])
    .map((s) => getDatasheetByCompositeSlug(s))
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="min-h-screen bg-paper pb-20">
        {/* Top Breadcrumb Header Bar */}
        <div className="bg-paper-100 border-b border-hairline py-3 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between font-mono text-xs text-ink-muted">
            <Link
              href="/blog"
              className="flex items-center gap-1.5 hover:text-ink transition-colors uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Field Guides ({BLOG_POSTS.length})</span>
            </Link>
            <span className="hidden sm:inline text-[11px] text-ink-subtle uppercase">
              SPEC NO: {post.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Article Header Container */}
        <header className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 pb-8 border-b border-hairline">
          {/* Metadata Ticker */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4 text-ink-subtle uppercase tracking-wider">
            <span className="px-2.5 py-0.5 bg-paper-200 text-accent font-bold rounded border border-hairline">
              {post.categoryName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readMinutes} MIN READ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>UPDATED {post.lastUpdated}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink leading-[1.05]">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-ink-muted font-sans leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Byline */}
          <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-ink-subtle">
            <div>
              <span className="text-ink-muted uppercase">AUTHORED BY: </span>
              <span className="font-bold text-ink">{post.author}</span>
            </div>
            <div className="text-[11px] uppercase">VERIFIED CULINARY PHYSICS</div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
          {/* Key Takeaways Callout Card */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-paper-100 border border-hairline p-6 rounded-lg mb-10 shadow-subtle">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 border-b border-hairline pb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>EXECUTIVE SUMMARY // CORE TECHNICAL PRINCIPLES</span>
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-ink leading-relaxed">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">[{idx + 1}]</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Markdown Body Content */}
          <div
            className="prose prose-neutral max-w-none text-ink font-sans leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Related Interactive Tool Engines Callout */}
          {post.relatedToolLinks && post.relatedToolLinks.length > 0 && (
            <div className="mt-12 bg-paper-card border border-hairline p-6 rounded-lg">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4">
                <Wrench className="w-4 h-4" />
                <span>RELATED INTERACTIVE KITCHEN ENGINES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.relatedToolLinks.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="p-4 bg-paper-50 hairline-border hover:border-ink transition-colors block rounded group"
                  >
                    <span className="font-mono text-xs font-bold text-ink group-hover:text-accent uppercase block transition-colors">
                      {tool.title} →
                    </span>
                    <span className="text-xs text-ink-muted font-sans mt-1 block">
                      {tool.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Frequently Asked Questions (FAQ Section) */}
          {post.faq && post.faq.length > 0 && (
            <section className="mt-12 pt-8 border-t border-hairline">
              <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-ink mb-6">
                Technical FAQ
              </h2>
              <div className="space-y-4 font-sans">
                {post.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-paper-50 hairline-border p-5 rounded space-y-2"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-ink">
                      Q: {item.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Tested Recipes */}
          {relatedRecipes.length > 0 && (
            <section className="mt-12 pt-8 border-t border-hairline">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-ink">
                  Tested Application Recipes
                </h2>
                <span className="font-mono text-xs text-ink-muted uppercase">
                  ZERO FLUFF // DIRECT EXECUTION
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-appliance-sort>
                {relatedRecipes.map((recipe) => (
                  <RecipeCard key={recipe!.id} recipe={recipe!} />
                ))}
              </div>
            </section>
          )}

          {/* Related Verified Cook-Time Datasheets */}
          {relatedDatasheets.length > 0 && (
            <section className="mt-12 pt-8 border-t border-hairline">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-ink">
                  Verified Cook-Time Datasheets
                </h2>
                <span className="font-mono text-xs text-ink-muted uppercase">
                  LAB-TESTED // EXACT SPECS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedDatasheets.map((ds) => (
                  <Link
                    key={ds!.id}
                    href={`/how-long/${ds!.appliance}/${ds!.foodSlug}`}
                    className="p-5 bg-paper-card hairline-border border-l-2 border-l-emerald-700 hover:border-ink transition-colors block group"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-mono text-[10px] text-emerald-700 font-bold uppercase">
                        Verified Datasheet
                      </span>
                    </div>
                    <h3 className="font-sans text-sm font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                      {ds!.food}
                    </h3>
                    <div className="mt-3 flex items-center gap-4 font-mono text-xs text-ink-muted">
                      <span>{ds!.tempFormatted}</span>
                      <span className="text-hairline">|</span>
                      <span>{ds!.timeFormatted}</span>
                      {ds!.internalTempTargetF && (
                        <>
                          <span className="text-hairline">|</span>
                          <span className="text-accent font-bold">{ds!.internalTempTargetF}°F pull</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Field Guides */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t border-hairline">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-xl font-bold uppercase tracking-tight text-ink">
                  More Field Guides &amp; Science
                </h2>
                <Link
                  href="/blog"
                  className="font-mono text-xs text-ink hover:underline uppercase flex items-center gap-1"
                >
                  <span>View All 50</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.slug}`}
                    className="p-4 bg-paper-card hairline-border hover:border-ink transition-colors block rounded group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-accent font-bold uppercase block mb-1">
                        {rPost.categoryName}
                      </span>
                      <h3 className="font-bold text-ink group-hover:text-accent transition-colors font-sans text-sm leading-snug">
                        {rPost.title}
                      </h3>
                    </div>
                    <span className="mt-4 text-[10px] text-ink-muted flex items-center justify-between border-t border-hairline pt-2 uppercase">
                      <span>{rPost.readMinutes} MIN READ</span>
                      <span>READ →</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
