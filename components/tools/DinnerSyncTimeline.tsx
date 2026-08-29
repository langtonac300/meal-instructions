'use client';

import React, { useState } from 'react';
import { Clock, Plus, Trash2, CheckCircle2, Play, RefreshCw, Zap } from 'lucide-react';

interface DishItem {
  id: string;
  name: string;
  appliance: string;
  cookMinutes: number;
  restMinutes: number;
}

const PRESET_MEALS = [
  {
    name: 'Air Fryer Salmon & Sheet Pan Roast',
    dishes: [
      { id: '1', name: 'Sheet Pan Roasted Veggies', appliance: 'Oven (425°F)', cookMinutes: 25, restMinutes: 0 },
      { id: '2', name: 'Jasmine Rice (Stovetop)', appliance: 'Saucepan', cookMinutes: 16, restMinutes: 5 },
      { id: '3', name: 'Garlic Herb Salmon', appliance: 'Air Fryer (390°F)', cookMinutes: 9, restMinutes: 2 },
    ],
  },
  {
    name: 'Smash Burgers & Crispy Fries',
    dishes: [
      { id: '1', name: 'Air Fryer Frozen Fries', appliance: 'Air Fryer (400°F)', cookMinutes: 18, restMinutes: 0 },
      { id: '2', name: 'Double Smash Patties', appliance: 'Cast Iron Skillet', cookMinutes: 6, restMinutes: 2 },
      { id: '3', name: 'Brioche Buns Toast', appliance: 'Toaster / Pan', cookMinutes: 2, restMinutes: 0 },
    ],
  },
  {
    name: 'Steak Night with Baked Potatoes',
    dishes: [
      { id: '1', name: 'Baked Russet Potatoes', appliance: 'Oven (400°F)', cookMinutes: 45, restMinutes: 5 },
      { id: '2', name: 'Thick Cut Ribeye', appliance: 'Cast Iron (Sear)', cookMinutes: 10, restMinutes: 6 },
      { id: '3', name: 'Garlic Butter Asparagus', appliance: 'Skillet', cookMinutes: 6, restMinutes: 0 },
    ],
  },
];

export default function DinnerSyncTimeline() {
  const [targetTime, setTargetTime] = useState<string>('18:30'); // 6:30 PM default
  const [dishes, setDishes] = useState<DishItem[]>(PRESET_MEALS[0].dishes);
  const [customName, setCustomName] = useState('');
  const [customAppliance, setCustomAppliance] = useState('Air Fryer');
  const [customCookTime, setCustomCookTime] = useState(15);
  const [customRestTime, setCustomRestTime] = useState(0);

  const handleLoadPreset = (preset: typeof PRESET_MEALS[0]) => {
    setDishes(preset.dishes);
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const newDish: DishItem = {
      id: Date.now().toString(),
      name: customName.trim(),
      appliance: customAppliance,
      cookMinutes: Number(customCookTime) || 10,
      restMinutes: Number(customRestTime) || 0,
    };
    setDishes([...dishes, newDish]);
    setCustomName('');
  };

  const handleRemoveDish = (id: string) => {
    setDishes(dishes.filter((d) => d.id !== id));
  };

  // Convert targetTime (HH:MM) to Date object for today
  const getTargetDate = () => {
    const [hours, minutes] = targetTime.split(':').map(Number);
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const targetDate = getTargetDate();

  // Calculate start times for each dish
  const schedule = dishes.map((dish) => {
    const totalMinutes = dish.cookMinutes + dish.restMinutes;
    const startDate = new Date(targetDate.getTime() - totalMinutes * 60 * 1000);
    const cookDoneDate = new Date(targetDate.getTime() - dish.restMinutes * 60 * 1000);

    return {
      ...dish,
      totalMinutes,
      startDate,
      cookDoneDate,
      startTimeStr: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cookDoneTimeStr: cookDoneDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const earliestStart = schedule.length > 0 ? schedule[0].startDate : targetDate;
  const totalPrepSpanMinutes = schedule.length > 0
    ? Math.round((targetDate.getTime() - earliestStart.getTime()) / (60 * 1000))
    : 0;

  return (
    <div className="space-y-8 font-sans">
      
      {/* Target Time & Quick Presets Header */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">REVERSE-ENGINEERED MULTI-DISH TIMELINE</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              Synchronized Dinner Orchestrator
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-paper p-2 hairline-border font-mono text-xs">
            <Clock className="w-4 h-4 text-accent" />
            <label className="font-bold text-ink uppercase">TARGET SERVE TIME:</label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="bg-paper-card hairline-border px-2 py-1 font-mono text-xs font-bold text-ink focus:outline-none focus:border-ink cursor-pointer"
            />
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="space-y-2">
          <div className="micro-label text-ink-muted">LOAD BATTLE-TESTED PRESET COMBOS:</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_MEALS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleLoadPreset(preset)}
                className="px-3 py-1.5 bg-paper hairline-border hover:border-ink font-mono text-xs uppercase text-ink transition-colors cursor-pointer"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Synchronized Timeline Cues */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center hairline-b pb-4">
          <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ink">
            EXECUTION SEQUENCE // {totalPrepSpanMinutes} MINUTE TOTAL SPAN
          </h3>
          <span className="font-mono text-xs text-accent font-bold">
            FINISH: {targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="space-y-3">
          {schedule.map((item, idx) => (
            <div
              key={item.id}
              className="bg-paper hairline-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="font-mono text-sm font-bold text-accent px-2.5 py-1 bg-paper-card hairline-border flex-shrink-0">
                  {item.startTimeStr}
                </span>
                <div>
                  <div className="font-bold text-sm text-ink uppercase font-sans flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] font-mono font-normal px-2 py-0.5 bg-paper-200 text-ink-muted">
                      {item.appliance}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-ink-muted mt-0.5">
                    Cook: {item.cookMinutes}m {item.restMinutes > 0 ? `+ Rest: ${item.restMinutes}m` : ''} • Ready at {targetTime}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemoveDish(item.id)}
                className="self-end sm:self-auto text-ink-subtle hover:text-accent transition-colors p-1 cursor-pointer"
                title="Remove dish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Sync Summary Banner */}
        <div className="bg-paper hairline-border p-4 flex items-center justify-between font-mono text-xs border-l-4 border-l-accent">
          <div className="flex items-center gap-2 text-ink">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span><strong>First Action:</strong> Fire up <strong>{schedule[0]?.name}</strong> at <strong>{schedule[0]?.startTimeStr}</strong>. Everything will finish hot at <strong>{targetTime}</strong>.</span>
          </div>
        </div>
      </div>

      {/* Add Custom Dish Accordion */}
      <form onSubmit={handleAddDish} className="bg-paper hairline-border p-5 space-y-4 font-mono text-xs">
        <div className="font-bold uppercase tracking-wider text-ink text-[11px] flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-accent" />
          ADD CUSTOM DISH TO SYNC
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Dish Name (e.g. Garlic Bread)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="bg-paper-card hairline-border p-2 text-ink text-xs focus:outline-none focus:border-ink font-mono"
            required
          />
          <input
            type="text"
            placeholder="Appliance (e.g. Oven 400°F)"
            value={customAppliance}
            onChange={(e) => setCustomAppliance(e.target.value)}
            className="bg-paper-card hairline-border p-2 text-ink text-xs focus:outline-none focus:border-ink font-mono"
          />
          <div className="flex items-center gap-1">
            <span className="text-ink-muted">Cook:</span>
            <input
              type="number"
              min="1"
              max="180"
              value={customCookTime}
              onChange={(e) => setCustomCookTime(Number(e.target.value))}
              className="bg-paper-card hairline-border p-2 w-16 text-ink text-xs focus:outline-none focus:border-ink font-mono text-center"
            />
            <span className="text-ink-muted">min</span>
          </div>
          <button
            type="submit"
            className="bg-ink text-paper font-bold uppercase tracking-wider py-2 px-4 hover:bg-black transition-colors cursor-pointer"
          >
            + ADD DISH
          </button>
        </div>
      </form>

    </div>
  );
}
