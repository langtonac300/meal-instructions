'use client';

import React, { useState, useMemo } from 'react';
import { MERCH_PRODUCTS, MERCH_CATEGORIES, MerchProduct } from '@/data/merch';
import ProductCard from './ProductCard';
import { Search, Filter, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCart } from './CartContext';

export default function MerchCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { openCart, itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    return MERCH_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.punchline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      
      {/* Category Filter Tabs & Search Bar */}
      <div className="bg-paper-card hairline-border p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-mono text-xs uppercase">
            {MERCH_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? MERCH_PRODUCTS.length
                  : MERCH_PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 whitespace-nowrap transition-colors hairline-border ${
                    selectedCategory === cat.id
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper text-ink-muted hover:text-ink hover:bg-paper-subtle'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1.5 opacity-60">[{count}]</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specs, SKUs, punchlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-paper hairline-border text-xs font-mono text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
            />
          </div>

        </div>

        {/* Status bar */}
        <div className="hairline-t pt-3 flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>INDEX STATUS: 15 / 15 PRODUCTION ARTWORK SPECS LOADED</span>
          </div>
          <div>
            <span>SHOWING {filteredProducts.length} SPECIMENS</span>
          </div>
        </div>
      </div>

      {/* Product Specimen Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center bg-paper-card hairline-border space-y-3 font-mono">
          <div className="text-2xl text-ink-subtle">∅</div>
          <div className="text-sm font-bold text-ink uppercase">No matching specimens found</div>
          <p className="text-xs text-ink-muted">
            Try adjusting your search criteria or resetting category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 bg-ink text-paper text-xs font-mono font-bold uppercase hover:bg-ink-light"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Floating Requisition Button (Bottom Right) */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4">
          <button
            onClick={openCart}
            className="px-5 py-3.5 bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider shadow-float flex items-center gap-3 hover:bg-accent transition-colors hairline-border"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>VIEW CART REQUISITION</span>
            <span className="px-2 py-0.5 bg-paper text-ink rounded-full text-[10px]">
              {itemCount}
            </span>
          </button>
        </div>
      )}

    </div>
  );
}
