import { ImageResponse } from 'next/og';
import { BLOG_POSTS } from '@/data/blog-posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Field guide article';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: '#F5F4F0', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        Article Not Found
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#111111',
        color: '#F5F4F0',
        padding: '60px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#C84B2C', padding: '6px 16px', fontSize: 18, fontWeight: 700, letterSpacing: '0.1em' }}>
            FIELD GUIDE
          </div>
          <div style={{ fontSize: 18, color: '#8E8A82', letterSpacing: '0.1em' }}>
            {`${post.categoryName.toUpperCase()} // ${post.readMinutes} MIN READ`}
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#5A5854', letterSpacing: '0.15em' }}>
          MEAL INSTRUCTIONS
        </div>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '-0.02em', maxWidth: '95%' }}>
          {post.title}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #333', paddingTop: '24px', alignItems: 'flex-end' }}>
        <div style={{ fontSize: 20, color: '#8E8A82', maxWidth: '70%', lineHeight: 1.4 }}>
          {post.subtitle}
        </div>
        <div style={{ fontSize: 16, color: '#5A5854', letterSpacing: '0.1em' }}>
          NO FLUFF, JUST THE INSTRUCTIONS
        </div>
      </div>
    </div>,
    { ...size }
  );
}
