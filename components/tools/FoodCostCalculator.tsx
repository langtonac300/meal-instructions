'use client';

import React, { useState } from 'react';
import { FOOD_COST_PRESETS, FoodCostPreset, FoodCostItem } from '@/data/tools-data';
import { DollarSign, Plus, Trash2, TrendingDown, PiggyBank, Sparkles } from 'lucide-react';

export default function FoodCostCalculator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(FOOD_COST_PRESETS[0].id);
  const [servings, setServings] = useState<number>(FOOD_COST_PRESETS[0].servings);
  const [restaurantPrice, setRestaurantPrice] = useState<number>(FOOD_COST_PRESETS[0].restaurantEquivalentPrice);
  const [items, setItems] = useState<FoodCostItem[]>(FOOD_COST_PRESETS[0].defaultItems);

  const applyPreset = (preset: FoodCostPreset) => {
    setSelectedPresetId(preset.id);
    setServings(preset.servings);
    setRestaurantPrice(preset.restaurantEquivalentPrice);
    setItems(preset.defaultItems);
  };

  const updateItem = (index: number, field: keyof FoodCostItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: 'New Ingredient', packagePrice: 4.99, packageQuantity: 16, packageUnit: 'oz', recipeQuantity: 8 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Calculations
  const totalMealCost = items.reduce((sum, item) => {
    const unitCost = item.packageQuantity > 0 ? item.packagePrice / item.packageQuantity : 0;
    return sum + unitCost * item.recipeQuantity;
  }, 0);

  const costPerServing = servings > 0 ? totalMealCost / servings : 0;
  const totalRestaurantCost = restaurantPrice * servings;
  const savingsPerBatch = Math.max(0, totalRestaurantCost - totalMealCost);
  const savingsPercentage = totalRestaurantCost > 0 ? Math.round((savingsPerBatch / totalRestaurantCost) * 100) : 0;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Presets */}
      <div className="space-y-2">
        <div className="micro-label text-ink-muted">1. LOAD MEAL PREP PRESET:</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {FOOD_COST_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[75px] ${
                  isSelected
                    ? 'bg-paper-card border-2 border-ink shadow-subtle'
                    : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`font-bold font-sans text-xs ${isSelected ? 'text-ink' : ''}`}>
                  {preset.mealName.split('(')[0]}
                </span>
                <span className="text-[10px] text-accent font-bold mt-2">
                  {preset.servings} Servings @ ${preset.restaurantEquivalentPrice.toFixed(2)} takeout
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Calculator Interface */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Servings & Takeout Baseline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">PORTIONS / SERVINGS PRODUCED:</label>
              <span className="text-xl font-bold text-accent">{servings} MEALS</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">RESTAURANT TAKEOUT EQUIVALENT:</label>
              <span className="text-xl font-bold text-ink">${restaurantPrice.toFixed(2)} / meal</span>
            </div>
            <input
              type="range"
              min="8"
              max="35"
              step="1"
              value={restaurantPrice}
              onChange={(e) => setRestaurantPrice(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* Ingredient Breakdown Table */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <div className="micro-label text-ink-muted">INGREDIENT ITEMIZATION</div>
            <button
              onClick={addItem}
              className="px-2.5 py-1 bg-paper hairline-border hover:border-ink font-mono text-xs text-ink flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3 text-accent" />
              <span>ADD INGREDIENT</span>
            </button>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {items.map((item, idx) => {
              const itemCost =
                item.packageQuantity > 0
                  ? (item.packagePrice / item.packageQuantity) * item.recipeQuantity
                  : 0;

              return (
                <div
                  key={idx}
                  className="bg-paper hairline-border p-3 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                >
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(idx, 'name', e.target.value)}
                      className="w-full bg-transparent font-sans font-bold text-ink text-xs focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center gap-1 text-[11px] text-ink-muted">
                    <span>Pkg: $</span>
                    <input
                      type="number"
                      step="0.1"
                      value={item.packagePrice}
                      onChange={(e) => updateItem(idx, 'packagePrice', Number(e.target.value))}
                      className="w-14 bg-paper-card hairline-border px-1 py-0.5 text-ink focus:outline-none"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      value={item.packageQuantity}
                      onChange={(e) => updateItem(idx, 'packageQuantity', Number(e.target.value))}
                      className="w-12 bg-paper-card hairline-border px-1 py-0.5 text-ink focus:outline-none"
                    />
                    <span>{item.packageUnit}</span>
                  </div>

                  <div className="sm:col-span-3 flex items-center gap-1 text-[11px] text-ink-muted">
                    <span>Used:</span>
                    <input
                      type="number"
                      step="0.5"
                      value={item.recipeQuantity}
                      onChange={(e) => updateItem(idx, 'recipeQuantity', Number(e.target.value))}
                      className="w-14 bg-paper-card hairline-border px-1 py-0.5 text-ink font-bold focus:outline-none"
                    />
                    <span>{item.packageUnit}</span>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between">
                    <span className="font-bold text-accent">${itemCost.toFixed(2)}</span>
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-ink-subtle hover:text-accent p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Output Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Total Batch Cost */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold">TOTAL BATCH COST</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              ${totalMealCost.toFixed(2)}
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              Entire {servings}-serving homecooked batch
            </div>
          </div>

          {/* Cost Per Serving */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">COST PER SERVING</div>
            <div className="text-3xl sm:text-4xl font-bold text-accent">
              ${costPerServing.toFixed(2)}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Per individual plate / container
            </div>
          </div>

          {/* Takeout Savings */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">TAKEOUT SAVINGS ({savingsPercentage}%)</div>
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600">
              ${savingsPerBatch.toFixed(2)}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Saved vs ${totalRestaurantCost.toFixed(2)} restaurant bill
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
