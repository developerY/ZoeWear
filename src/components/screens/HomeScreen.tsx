/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ASSETS, GARMENT_SILHOUETTES, FOOTWEAR_COLLECTION } from '../../data/mockData';
import { NavPage } from '../../types';

interface HomeScreenProps {
  onNavigate: (page: NavPage) => void;
  onRequestPrototype: (modelName: string) => void;
  onOpenInnovations: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onRequestPrototype,
  onOpenInnovations,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Editorial Grand Hero */}
      <section className="relative w-full -mt-28 pt-36 pb-24 px-margin overflow-hidden bg-surface-obsidian">
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/3 w-[700px] h-[550px] bg-primary-container/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-circuit-gold/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl relative z-10">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
              <span className="text-primary-container">ZoeWear</span>
              <span>/</span>
              <span className="text-circuit-gold">Cyber-Couture Flagship</span>
              <span>/</span>
              <span className="text-text-primary">Autumn/Winter 2025</span>
            </div>
            <div className="flex items-center gap-space-sm px-space-md py-1 rounded-full bg-surface-container-high border border-border-luminous/40">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                Phygital Telemetry Mesh Active
              </span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-circuit-gold font-semibold">
                  Editorial Manifesto // Zoe [Greek: Life]
                </span>
                <h1 className="font-display text-display text-text-primary tracking-tight">
                  Technology is the <span className="text-primary-container">New Black</span>.
                </h1>
                <p className="font-headline-sm text-headline-sm text-secondary font-light">
                  Awaken the Soul of the Shoe & the Garment.
                </p>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                ZoeWear bridges high-fashion haute couture with non-invasive biomedical intelligence. From conductive silk weaves and 3D-sculpted ergonomic footwear to the DrunkWatch™ metabolic guardian and "Breathe" thoracic diagnostics, we engineer sartorial sovereignty.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  onClick={() => onNavigate('fashion')}
                  className="px-space-xl py-3.5 rounded-full bg-primary-container text-surface-obsidian font-headline-sm text-headline-sm hover:shadow-[0_0_24px_rgba(0,229,255,0.45)] transition-all flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <span>Explore Fashion Runway</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('drunkwatch')}
                  className="px-space-lg py-3.5 rounded-full bg-surface-container-high text-circuit-gold font-headline-sm text-headline-sm hover:bg-surface-bright transition-all flex items-center gap-2 border border-circuit-gold/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">watch</span>
                  <span>DrunkWatch™ Sim</span>
                </button>
                <button
                  onClick={onOpenInnovations}
                  className="px-space-md py-3.5 rounded-full bg-surface-container-high text-text-primary font-headline-sm text-headline-sm hover:text-primary transition-all flex items-center gap-2 border border-subtle cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">dashboard_customize</span>
                  <span>Matrix Index</span>
                </button>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Concealment</span>
                  <div className="font-display text-headline-md text-primary-container mt-0.5">100%</div>
                  <span className="font-body-sm text-body-sm text-text-muted">Zero medical look</span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Latency</span>
                  <div className="font-display text-headline-md text-circuit-gold mt-0.5">&lt; 14ms</div>
                  <span className="font-body-sm text-body-sm text-text-muted">On-device TF Edge</span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Governance</span>
                  <div className="font-display text-headline-md text-secondary mt-0.5">HIPAA</div>
                  <span className="font-body-sm text-body-sm text-text-muted">Zero-knowledge</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-2xl border border-border-luminous/30 group">
                <img
                  className="w-full h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  alt="Haute couture luxury model wearing avant-garde black smart blazer with subtle glowing electric cyan circuitry"
                  src={ASSETS.fashionHeroModel}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-space-md rounded-xl bg-surface-slate/85 backdrop-blur-md flex items-center justify-between border border-border-luminous/30">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-wider">
                      AUTUMN/WINTER SHOWCASE
                    </span>
                    <span className="font-headline-sm text-headline-sm text-text-primary">
                      Fluid Kinetic Blazer 01
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('fashion')}
                    className="px-3 py-1.5 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold hover:shadow-lg transition-all"
                  >
                    View Runway
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Pillars Exploration Hub */}
      <section className="w-full py-20 px-margin bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-[0.2em] font-semibold">
                Modular Architecture
              </span>
              <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                Five Dimensions of ZoeWear
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Each discipline operates independently yet converges into a holistic, life-protecting ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {/* 1. Fashion */}
            <div
              onClick={() => onNavigate('fashion')}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-subtle hover:border-primary-container/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container border border-primary-container/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">styler</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-mono">DIMENSION 01</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-primary transition-colors">
                  Fashion & Footwear
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  The SwiftMonster dual footwear line (Mountain & Beach) with 3D-printed bio-heels, sensory sole grids, and avant-garde runway silhouettes.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-subtle flex items-center justify-between text-xs text-primary font-semibold">
                <span>View SwiftMonster & Silhouettes</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 2. Tech */}
            <div
              onClick={() => onNavigate('tech')}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-subtle hover:border-secondary/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">memory</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-mono">DIMENSION 02</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-secondary transition-colors">
                  Tech Architecture
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Four technological pillars, Wear OS & watchOS cross-platform sensor matrix, simulated real-time terminal logs, and convergence stages.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-subtle flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Inspect Sensor Matrix & Terminal</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 3. Fusion */}
            <div
              onClick={() => onNavigate('fusion')}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-subtle hover:border-circuit-gold/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-circuit-gold/10 flex items-center justify-center text-circuit-gold border border-circuit-gold/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">vital_signs</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-circuit-gold font-mono">DIMENSION 03</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-circuit-gold transition-colors">
                  Biomedical Fusion
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Transdermal Fabric Matrix, continuous noise filtration wave, TensorFlow clustering, and the "Breathe" mobile respiratory diagnostics simulator.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-subtle flex items-center justify-between text-xs text-circuit-gold font-semibold">
                <span>Launch "Breathe" Diagnostic App</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 4. DrunkWatch */}
            <div
              onClick={() => onNavigate('drunkwatch')}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-subtle hover:border-primary-container/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container border border-primary-container/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">watch</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-mono">DIMENSION 04</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-primary transition-colors">
                  DrunkWatch™ Guardian
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Sub-dermal micro-spectrometry measuring ethanol clearance, 4-hour predictive trajectory curve, and autonomic zero-touch chauffeur protection.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-subtle flex items-center justify-between text-xs text-primary font-semibold">
                <span>Launch Radial BAC Console</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 5. Teaching & Research */}
            <div
              onClick={() => onNavigate('teaching-and-research')}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-subtle hover:border-circuit-gold/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl lg:col-span-2"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-circuit-gold/10 flex items-center justify-center text-circuit-gold border border-circuit-gold/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">school</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-circuit-gold font-mono">DIMENSION 05</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-circuit-gold transition-colors">
                  WestCoast Curricula & Research
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Interdisciplinary academic programs across 14 laboratories, 48 peer-reviewed publications (IEEE, ACM, Nature), student prototypes, and funded fellowships.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-subtle flex items-center justify-between text-xs text-circuit-gold font-semibold">
                <span>View Whitepapers & Fellowship Portal</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Footwear & Silhouettes Showcase Bar */}
      <section className="w-full py-20 px-margin bg-surface-obsidian">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold">
                Spotlight Showcase
              </span>
              <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                SwiftMonster™ Footwear & Phygital Silhouettes
              </h2>
            </div>
            <button
              onClick={() => onNavigate('fashion')}
              className="text-xs uppercase tracking-wider text-primary hover:text-text-primary transition-colors flex items-center gap-1 font-semibold"
            >
              <span>View Full Lookbook</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Footwear 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle hover:border-border-luminous/40 transition-all flex flex-col justify-between group">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-surface-container relative">
                <img
                  src={FOOTWEAR_COLLECTION.mountain.image}
                  alt="SwiftMonster Mountain"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-obsidian/80 text-[10px] text-circuit-gold font-mono">
                  TERRAIN ADAPTIVE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-text-primary">SwiftMonster Mountain</h4>
                <p className="text-xs text-text-muted mt-1">Sub-dermal gait sensor sole matrix</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-primary font-mono">$1,850</span>
                  <button
                    onClick={() => onRequestPrototype('SwiftMonster Mountain Footwear')}
                    className="text-xs px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-obsidian transition-colors text-text-primary"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>

            {/* Footwear 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle hover:border-border-luminous/40 transition-all flex flex-col justify-between group">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-surface-container relative">
                <img
                  src={FOOTWEAR_COLLECTION.beach.image}
                  alt="SwiftMonster Beach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-obsidian/80 text-[10px] text-primary font-mono">
                  PARAMETRIC LATTICE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-text-primary">SwiftMonster Beach</h4>
                <p className="text-xs text-text-muted mt-1">Self-aerating biomimetic lattice</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-primary font-mono">$1,650</span>
                  <button
                    onClick={() => onRequestPrototype('SwiftMonster Beach Footwear')}
                    className="text-xs px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-obsidian transition-colors text-text-primary"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>

            {/* Garment 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle hover:border-border-luminous/40 transition-all flex flex-col justify-between group">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-surface-container relative">
                <img
                  src={GARMENT_SILHOUETTES[0].image}
                  alt={GARMENT_SILHOUETTES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-obsidian/80 text-[10px] text-circuit-gold font-mono">
                  COUTURE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-text-primary">{GARMENT_SILHOUETTES[0].title}</h4>
                <p className="text-xs text-text-muted mt-1">{GARMENT_SILHOUETTES[0].sensor}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-circuit-gold font-mono">Bespoke</span>
                  <button
                    onClick={() => onRequestPrototype(GARMENT_SILHOUETTES[0].title)}
                    className="text-xs px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-obsidian transition-colors text-text-primary"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>

            {/* Garment 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-subtle hover:border-border-luminous/40 transition-all flex flex-col justify-between group">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-surface-container relative">
                <img
                  src={GARMENT_SILHOUETTES[1].image}
                  alt={GARMENT_SILHOUETTES[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-obsidian/80 text-[10px] text-secondary font-mono">
                  ALL-WEATHER
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-text-primary">{GARMENT_SILHOUETTES[1].title}</h4>
                <p className="text-xs text-text-muted mt-1">{GARMENT_SILHOUETTES[1].sensor}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-secondary font-mono">Bespoke</span>
                  <button
                    onClick={() => onRequestPrototype(GARMENT_SILHOUETTES[1].title)}
                    className="text-xs px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-obsidian transition-colors text-text-primary"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
