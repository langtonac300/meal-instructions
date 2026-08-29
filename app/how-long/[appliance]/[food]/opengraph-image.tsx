import { ImageResponse } from 'next/og';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Cook time datasheet';

export function generateStaticParams() {
  return COOK_TIME_DATASHEETS.map((d) => ({
    appliance: d.appliance,
    food: d.foodSlug,
  }));
}

export default async function OGImage({ params }: { params: Promise<{ appliance: string; food: string }> }) {
  const { appliance, food } = await params;
  const sheet = COOK_TIME_DATASHEETS.find(
    (d) => d.appliance === appliance && d.foodSlug === food
  );

  if (!sheet) {
    return new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: '#F5F4F0', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
        Datasheet Not Found
      </div>,
      { ...size }
    );
  }

  const applianceLabel = sheet.appliance.replace(/-/g, ' ').toUpperCase();

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
            VERIFIED DATASHEET
          </div>
          <div style={{ fontSize: 18, color: '#8E8A82', letterSpacing: '0.1em' }}>
            {applianceLabel}
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#5A5854', letterSpacing: '0.15em' }}>
          MEAL INSTRUCTIONS
        </div>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em', maxWidth: '90%' }}>
          {`How Long to Cook ${sheet.food}`}
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: 'flex', gap: '40px', borderTop: '2px solid #333', paddingTop: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>TEMP</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#C84B2C' }}>{sheet.tempFormatted}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>TIME</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{sheet.timeFormatted}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>FLIP</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{sheet.flipAtMinutes > 0 ? `${sheet.flipAtMinutes}m` : 'No Flip'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: 14, color: '#8E8A82', letterSpacing: '0.15em' }}>INTERNAL</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{sheet.internalTempTargetFormatted}</div>
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
