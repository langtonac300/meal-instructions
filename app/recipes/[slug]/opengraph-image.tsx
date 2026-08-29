import { ImageResponse } from 'next/og';
import { RECIPES } from '@/data/recipes';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Recipe card';

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: '#F5F4F0', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        Recipe Not Found
      </div>,
      { ...size }
    );
  }

  const applianceLabel = recipe.appliance.replace(/-/g, ' ').toUpperCase();

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
            {applianceLabel}
          </div>
          <div style={{ fontSize: 18, color: '#8E8A82', letterSpacing: '0.1em' }}>
            {`${recipe.totalMinutes} MIN TOTAL`}
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#5A5854', letterSpacing: '0.15em' }}>
          MEAL INSTRUCTIONS
        </div>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em', maxWidth: '90%' }}>
          {recipe.title}
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: 'flex', gap: '40px', borderTop: '2px solid #333', paddingTop: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>COOK TEMP</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#C84B2C' }}>{`${recipe.cookTempF}°F`}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>COOK TIME</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{`${recipe.cookMinutes} min`}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>SAFE INTERNAL</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{`${recipe.safeInternalTempF}°F`}</div>
        </div>
        <div style={{ display: 'flex', flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 16, color: '#5A5854', letterSpacing: '0.1em' }}>NO FLUFF, JUST THE INSTRUCTIONS</div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
