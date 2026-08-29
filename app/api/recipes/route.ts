import { NextRequest, NextResponse } from 'next/server';
import { RECIPES } from '@/data/recipes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const appliance = searchParams.get('appliance');
  const protein = searchParams.get('protein');
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  let filtered = RECIPES;

  if (category) {
    filtered = filtered.filter((r) => r.categories.includes(category as any));
  }
  if (appliance) {
    filtered = filtered.filter((r) => r.appliance === appliance);
  }
  if (protein) {
    filtered = filtered.filter((r) => r.protein === protein);
  }
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    total: filtered.length,
    recipes: filtered.slice(0, limit),
  });
}
