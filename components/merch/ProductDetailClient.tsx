'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, UserCheck, Ruler } from 'lucide-react';
import { MerchProduct, MERCH_PRODUCTS } from '@/data/merch';
import { useCart } from './CartContext';
import CartDrawer from './CartDrawer';
import ProductCard from './ProductCard';

export default function ProductDetailClient({ product }: { product: MerchProduct }) {
  const { addToCart, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState<'product' | 'model'>('product');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);

  const hasModel = Boolean(product.modelImage && product.modelImage !== product.productImage);
  const currentImageUrl =
    selectedImage === 'model' && product.modelImage ? product.modelImage : product.productImage;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = MERCH_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Merch Supply Archive</span>
        </Link>
        <span className="uppercase text-ink-muted">SPECIMEN // {product.sku}</span>
      </div>

      {/* Main Specimen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Photo Viewport */}
          <div className="bg-paper-card hairline-border aspect-square relative overflow-hidden">
            <Image
              src={currentImageUrl}
              alt={`${product.title} - ${selectedImage === 'model' ? 'Field Fit' : 'Product Spec'}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />

            <div className="absolute top-4 left-4 font-mono text-xs px-2.5 py-1 bg-ink text-paper font-bold uppercase">
              {product.sku}
            </div>

            {product.badge && (
              <div className="absolute top-4 right-4 font-mono text-xs px-2.5 py-1 bg-paper-card hairline-border text-accent font-bold uppercase shadow-xs">
                {product.badge}
              </div>
            )}

            {selectedImage === 'model' && product.modelCaption && (
              <div className="absolute bottom-4 left-4 right-4 bg-ink/85 text-paper text-xs font-mono p-2.5 backdrop-blur-xs">
                📷 {product.modelCaption}
              </div>
            )}
          </div>

          {/* Thumbnail View Switcher */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <button
              onClick={() => setSelectedImage('product')}
              className={`p-3 bg-paper-card hairline-border flex items-center gap-3 text-left transition-colors ${
                selectedImage === 'product'
                  ? 'border-ink bg-paper-subtle font-bold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <div className="w-12 h-12 bg-paper hairline-border relative flex-shrink-0 overflow-hidden">
                <Image
                  src={product.productImage}
                  alt="Flat Lay Spec"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="uppercase text-ink font-bold text-[11px]">View 01: Product Spec</div>
                <div className="text-[10px] text-ink-subtle">Standalone Flat Lay</div>
              </div>
            </button>

            {hasModel && product.modelImage ? (
              <button
                onClick={() => setSelectedImage('model')}
                className={`p-3 bg-paper-card hairline-border flex items-center gap-3 text-left transition-colors ${
                  selectedImage === 'model'
                    ? 'border-ink bg-paper-subtle font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <div className="w-12 h-12 bg-paper hairline-border relative flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.modelImage}
                    alt="Field Fit"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="uppercase text-ink font-bold text-[11px] flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-700" />
                    <span>View 02: Field Fit</span>
                  </div>
                  <div className="text-[10px] text-ink-subtle">Authentic Dad Worn</div>
                </div>
              </button>
            ) : (
              <div className="p-3 bg-paper hairline-border flex items-center text-ink-subtle text-[11px]">
                <span>Single specimen geometry</span>
              </div>
            )}
          </div>

        </div>

        {/* Right: Technical Spec Sheet & Requisition (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <div className="micro-label text-accent">HARDWARE // UNIFORM SPEC</div>
            <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink font-sans">
              {product.title}
            </h1>
            <div className="font-mono text-xs text-ink-muted">{product.subtitle}</div>
            <div className="font-mono text-2xl font-bold text-ink pt-1">
              ${product.price}.00 USD
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink font-sans leading-relaxed">
            {product.description}
          </p>

          {/* Punchline Callout */}
          <div className="p-4 bg-paper-card hairline-border space-y-1 font-mono text-xs">
            <div className="text-ink-subtle uppercase text-[10px] font-bold">OPERATIONAL DIRECTIVE</div>
            <div className="text-ink font-bold">&ldquo;{product.punchline}&rdquo;</div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-ink-muted uppercase">
              <span>COLOR PALETTE:</span>
              <span className="font-bold text-ink">{selectedColor}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 text-xs uppercase hairline-border transition-colors ${
                    selectedColor === color
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper-card text-ink-muted hover:text-ink hover:bg-paper-subtle'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-ink-muted uppercase">
              <span>DIMENSION / SIZING:</span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-ink underline hover:text-accent flex items-center gap-1 text-[11px]"
              >
                <Ruler className="w-3 h-3" />
                <span>{showSizeGuide ? 'Hide Tolerances' : 'Chest Tolerances'}</span>
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-2 text-xs uppercase hairline-border transition-colors ${
                    selectedSize === size
                      ? 'bg-ink text-paper font-bold'
                      : 'bg-paper-card text-ink-muted hover:text-ink hover:bg-paper-subtle'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Dimensional Tolerance Table */}
            {showSizeGuide && (
              <div className="p-3 bg-paper hairline-border mt-2 space-y-2 text-[11px]">
                <div className="font-bold text-ink uppercase hairline-b pb-1">
                  Dimensional Spec Table (Inches)
                </div>
                <div className="grid grid-cols-4 gap-2 text-ink-muted">
                  <div>SIZE</div>
                  <div>CHEST</div>
                  <div>LENGTH</div>
                  <div>SLEEVE</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-ink">
                  <div>S</div><div>36–38&quot;</div><div>28.0&quot;</div><div>8.5&quot;</div>
                  <div>M</div><div>40–42&quot;</div><div>29.0&quot;</div><div>9.0&quot;</div>
                  <div>L</div><div>44–46&quot;</div><div>30.0&quot;</div><div>9.5&quot;</div>
                  <div>XL</div><div>48–50&quot;</div><div>31.0&quot;</div><div>10.0&quot;</div>
                  <div>2XL</div><div>52–54&quot;</div><div>32.0&quot;</div><div>10.5&quot;</div>
                </div>
              </div>
            )}
          </div>

          {/* Requisition Action */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <div className="flex items-center hairline-border bg-paper-card">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-xs font-mono text-ink-muted hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2 font-mono text-xs font-bold text-ink">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-3 text-xs font-mono text-ink-muted hover:text-ink"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  added ? 'bg-emerald-800 text-paper' : 'bg-ink text-paper hover:bg-ink-light'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ITEM REQUISITIONED TO CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART REQUISITION (${product.price * quantity})</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted px-1">
              <span>✓ Ships in 100% Kraft Mailers</span>
              <span>✓ Free Domestic Shipping &gt; $60</span>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="hairline-t pt-6 space-y-3">
            <div className="font-bold font-mono text-xs text-ink uppercase">
              Technical Datasheet Specifications
            </div>
            <div className="bg-paper-card hairline-border divide-y divide-hairline font-mono text-xs">
              <div className="p-2.5 flex justify-between">
                <span className="text-ink-muted uppercase">SKU IDENTIFIER</span>
                <span className="text-ink font-bold">{product.sku}</span>
              </div>
              {product.specs.map((spec) => (
                <div key={spec.label} className="p-2.5 flex justify-between">
                  <span className="text-ink-muted uppercase">{spec.label}</span>
                  <span className="text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Related Specimens */}
      <div className="hairline-t pt-12 space-y-6">
        <div className="space-y-1">
          <div className="micro-label text-ink-muted">ADDITIONAL GEAR</div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-ink font-sans">
            Related Culinary Specimens
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      <CartDrawer />

    </div>
  );
}
