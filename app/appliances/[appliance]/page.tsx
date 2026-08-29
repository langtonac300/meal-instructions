import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ArrowUpRight } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { getRecipesByAppliance } from '@/data/recipes';

interface AppliancePageProps {
  params: Promise<{ appliance: string }>;
}

export async function generateStaticParams() {
  return APPLIANCES.map((app) => ({
    appliance: app.slug,
  }));
}

export async function generateMetadata({ params }: AppliancePageProps): Promise<Metadata> {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    return { title: 'Appliance Guide Not Found | Dad Meals' };
  }

  const recipes = getRecipesByAppliance(appliance);
  const title = `${appMeta.name} Recipes & Temp Guide (${recipes.length} Meals)`;
  const description = `${appMeta.shortDescription} Full time, temperature, and shake guide plus ${recipes.length} battle-tested dad recipes.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dadmeals.com/appliances/${appliance}`,
    },
  };
}

export default async function AppliancePage({ params }: AppliancePageProps) {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    notFound();
  }

  const recipes = getRecipesByAppliance(appliance);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Recipes</span>
        </Link>
        <span className="uppercase text-ink-muted">
          APPLIANCE MASTER // {appMeta.slug}
        </span>
      </div>

      {/* Appliance Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4">
        <div className="micro-label text-accent">APPLIANCE WORKFLOW</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          {appMeta.name}
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          {appMeta.shortDescription}
        </p>
      </section>

      {/* Temperature & Timing Guide Table */}
      {appMeta.tempGuide.length > 0 && (
        <section className="bg-paper-card hairline-border p-6 space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans hairline-b pb-3">
            {appMeta.name} Time & Temperature Cheatsheet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {appMeta.tempGuide.map((item, idx) => (
              <div key={idx} className="bg-paper p-4 hairline-border space-y-1.5">
                <div className="font-bold text-ink text-sm font-sans">{item.food}</div>
                <div className="flex justify-between text-ink-muted">
                  <span>Temp: <strong className="text-ink">{item.temp}</strong></span>
                  <span>Time: <strong className="text-ink">{item.time}</strong></span>
                </div>
                <div className="text-[11px] text-accent font-bold">
                  ↻ {item.shake}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Appliance Recipes List */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
          {recipes.length} {appMeta.name} Recipes
        </h2>
        <div className="bg-paper-card hairline-border overflow-x-auto">
          <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
            <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
              <tr>
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Recipe Title</th>
                <th className="py-3 px-4 w-28 hidden sm:table-cell">Total Time</th>
                <th className="py-3 px-4 w-28 hidden lg:table-cell">Protein</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="hover:bg-paper-subtle/50 transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold text-ink-subtle">
                    #{recipe.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="block group-hover:text-accent transition-colors font-bold text-sm text-ink font-sans"
                    >
                      {recipe.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell font-bold text-ink">
                    {recipe.totalMinutes} MINS
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell uppercase text-ink-muted">
                    {recipe.protein}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper hairline-border group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                    >
                      <span>COOK</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
