'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Eye, Check, Sparkles, UserCheck, Shield } from 'lucide-react';
import { MerchProduct } from '@/data/merch';
import { useCart } from './CartContext';
import MerchGraphic from './MerchGraphic';

interface ProductCardProps {
  product: MerchProduct;
  onQuickView?: (product: MerchProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [viewMode, setViewMode] = useState<'product' | 'model'>('product');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const hasModelImage = Boolean(product.modelImage && product.modelImage !== product.productImage);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group bg-paper-card hairline-border flex flex-col justify-between hover:border-ink transition-colors duration-200">
      
      {/* Top Image & View Switcher */}
      <div className="relative bg-paper hairline-b aspect-square overflow-hidden">
        
        {/* Product / Model Image (Clickable Link) */}
        <Link href={`/shop/${product.id}`} className="block w-full h-full relative transition-transform duration-300 group-hover:scale-[1.02]">
          <MerchGraphic product={product} viewMode={viewMode} />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none z-10">
          <div className="font-mono text-[9px] px-2 py-0.5 bg-ink text-paper font-bold uppercase tracking-wider">
            {product.sku}
          </div>
          {product.badge && (
            <div className="font-mono text-[9px] px-2 py-0.5 bg-paper-card/95 hairline-border text-accent font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
              {product.badge}
            </div>
          )}
        </div>

        {/* Dual View Toggle (Product vs Field Fit) */}
        {hasModelImage && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center z-10">
            <div className="bg-ink/90 backdrop-blur-md p-0.5 flex gap-0.5 hairline-border text-[10px] font-mono shadow-float">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('product');
                }}
                className={`px-2.5 py-1 uppercase tracking-wider transition-colors ${
                  viewMode === 'product'
                    ? 'bg-paper text-ink font-bold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                Flat Lay
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('model');
                }}
                className={`px-2.5 py-1 uppercase tracking-wider transition-colors flex items-center gap-1 ${
                  viewMode === 'model'
                    ? 'bg-paper text-ink font-bold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span>Dad Worn</span>
              </button>
            </div>
          </div>
        )}

        {/* Model Caption Overlay (if model active) */}
        {viewMode === 'model' && product.modelCaption && (
          <div className="absolute top-9 left-3 right-3 pointer-events-none z-10">
            <div className="bg-ink/80 text-paper text-[10px] font-mono px-2 py-1 backdrop-blur-xs max-w-fit">
              📷 {product.modelCaption}
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Price Header */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/shop/${product.id}`}
              className="text-sm sm:text-base font-bold uppercase tracking-tight text-ink font-sans hover:text-accent transition-colors"
            >
              {product.title}
            </Link>
            <span className="font-mono text-sm sm:text-base font-bold text-ink whitespace-nowrap">
              ${product.price}
            </span>
          </div>
          <div className="text-xs font-mono text-ink-muted leading-tight line-clamp-1">
            {product.subtitle}
          </div>
          <p className="text-xs text-ink-subtle font-sans leading-relaxed line-clamp-2 pt-1">
            {product.description}
          </p>
        </div>

        {/* Punchline / Zero Fluff Quote */}
        <div className="bg-paper p-2.5 hairline-border font-mono text-[11px] text-ink-muted">
          <span className="text-ink font-bold">SPEC NOTE:</span> &ldquo;{product.punchline}&rdquo;
        </div>

        {/* Options (Color & Size) */}
        <div className="space-y-2.5 pt-1 hairline-t">
          {/* Color Selector */}
          {product.colorOptions.length > 1 && (
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-ink-subtle uppercase">COLOR:</span>
              <div className="flex gap-1.5">
                {product.colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2 py-0.5 text-[10px] uppercase font-mono hairline-border transition-colors ${
                      selectedColor === color
                        ? 'bg-ink text-paper font-bold'
                        : 'bg-paper text-ink-muted hover:text-ink hover:bg-paper-subtle'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes.length > 1 && (
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-ink-subtle uppercase">SIZE:</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[28px] h-6 px-1.5 text-[10px] uppercase font-mono hairline-border transition-colors ${
                      selectedSize === size
                        ? 'bg-ink text-paper font-bold'
                        : 'bg-paper text-ink-muted hover:text-ink hover:bg-paper-subtle'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 px-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
              addedAnimation
                ? 'bg-emerald-800 text-paper'
                : 'bg-ink text-paper hover:bg-ink-light'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>SPEC REQUISITIONED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart (${product.price})</span>
              </>
            )}
          </button>

          <Link
            href={`/shop/${product.id}`}
            className="p-2.5 bg-paper hairline-border hover:border-ink hover:bg-paper-subtle transition-colors text-ink-muted hover:text-ink flex items-center justify-center"
            title="View Full Technical Datasheet"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
