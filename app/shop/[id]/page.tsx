import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MERCH_PRODUCTS } from '@/data/merch';
import ProductDetailClient from '@/components/merch/ProductDetailClient';
import { CartProvider } from '@/components/merch/CartContext';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MERCH_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = MERCH_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Specimen Not Found',
    };
  }

  return {
    title: `${product.title} (${product.sku}) | ${SITE_NAME} Supply`,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/shop/${product.id}`) },
    openGraph: {
      title: `${product.title} | ${SITE_NAME}`,
      description: product.description,
      url: absoluteUrl(`/shop/${product.id}`),
      images: [
        {
          url: product.productImage,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = MERCH_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Schema.org Product structured data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: `${SITE_URL}${product.productImage}`,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/shop/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <ProductDetailClient product={product} />
      </div>
    </CartProvider>
  );
}
