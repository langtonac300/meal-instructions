'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost, BlogCategory } from '@/lib/types';
import { BLOG_CATEGORIES } from '@/data/blog-posts';
import { BookOpen, Clock, ArrowRight, Layers, ShieldCheck, Cpu, Flame } from 'lucide-react';

interface BlogIndexClientProps {
  posts: BlogPost[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header Banner */}
      <div className="border-b border-hairline pb-8 mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-paper-200 border border-hairline text-ink font-mono text-[10px] uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>TECHNICAL CULINARY REFERENCE // {posts.length} FIELD GUIDES</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink">
          Culinary Physics &amp; Field Manuals
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-muted font-sans max-w-3xl leading-relaxed">
          Thermodynamics, protein denaturation kinetics, hardware material physics, and weeknight operational logistics. Zero childhood memoirs. 100% verified culinary science.
        </p>

        {/* Search Bar & Category Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-ink text-paper font-bold'
                  : 'bg-paper-100 hover:bg-paper-200 text-ink border border-hairline'
              }`}
            >
              ALL [{posts.length}]
            </button>

            {BLOG_CATEGORIES.map((cat) => {
              const count = posts.filter((p) => p.category === cat.slug).length;
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper-100 hover:bg-paper-200 text-ink border border-hairline'
                  }`}
                >
                  {cat.name.split('&')[0]} [{count}]
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative shrink-0 w-full md:w-64">
            <input
              type="text"
              placeholder="Search 50 guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 bg-paper-card hairline-border text-xs font-mono text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink rounded"
            />
          </div>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-paper-card hairline-border p-6 flex flex-col justify-between hover:border-ink transition-all group rounded hover:shadow-subtle"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-ink-subtle uppercase tracking-wider mb-3">
                <span className="text-accent font-bold">{post.categoryName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readMinutes} MIN</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-sans text-lg font-bold text-ink group-hover:text-accent transition-colors leading-snug uppercase">
                {post.title}
              </h2>

              {/* Subtitle / Summary */}
              <p className="mt-2 text-xs text-ink-muted font-sans line-clamp-3 leading-relaxed">
                {post.summary}
              </p>

              {/* Key Takeaway Snippet */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-ink-muted bg-paper-50 p-2.5 rounded">
                  <span className="text-[9px] uppercase font-bold text-ink block mb-1">CORE PRINCIPLE:</span>
                  <p className="line-clamp-2 italic text-ink">{post.keyTakeaways[0]}</p>
                </div>
              )}
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-3 border-t border-hairline flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink font-bold group-hover:translate-x-0.5 transition-transform">
              <span>READ FIELD GUIDE</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent" />
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-paper-50 hairline-border p-8 font-mono rounded">
          <p className="text-sm text-ink font-bold">No articles match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-ink text-paper rounded text-xs uppercase font-bold hover:bg-accent transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
