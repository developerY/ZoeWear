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
                  className="px-space-xl py-3.5 rounded-full bg-primary-container text-white font-headline-sm text-headline-sm hover:bg-[#2E766B] shadow-sm transition-all flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <span>Explore Fashion Runway</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('drunkwatch')}
                  className="px-space-lg py-3.5 rounded-full bg-white text-[#18587A] font-headline-sm text-headline-sm hover:bg-[#EEF4F7] transition-all flex items-center gap-2 border border-[#18587A]/35 cursor-pointer font-semibold shadow-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">watch</span>
                  <span>DrunkWatch™ Sim</span>
                </button>
                <button
                  onClick={onOpenInnovations}
                  className="px-space-md py-3.5 rounded-full bg-white text-[#0E344D] font-headline-sm text-headline-sm hover:border-[#18587A] hover:text-[#18587A] transition-all flex items-center gap-2 border border-[#D6DCE0] cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">dashboard_customize</span>
                  <span>Matrix Index</span>
                </button>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-sm">
                <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] shadow-xs">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Concealment</span>
                  <div className="font-display text-headline-md text-[#25665D] mt-0.5">100%</div>
                  <span className="font-body-sm text-body-sm text-text-muted">Zero medical look</span>
                </div>
                <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] shadow-xs">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Latency</span>
                  <div className="font-display text-headline-md text-[#0E344D] mt-0.5">&lt; 14ms</div>
                  <span className="font-body-sm text-body-sm text-text-muted">On-device TF Edge</span>
                </div>
                <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] shadow-xs">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">Governance</span>
                  <div className="font-display text-headline-md text-[#18587A] mt-0.5">HIPAA</div>
                  <span className="font-body-sm text-body-sm text-text-muted">Zero-knowledge</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-lg border border-[#D6DCE0] group">
                <img
                  className="w-full h-[540px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  alt="Haute couture luxury model wearing avant-garde black smart blazer with subtle glowing electric cyan circuitry"
                  src={ASSETS.fashionHeroModel}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E344D]/85 via-[#0E344D]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-space-md rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-between border border-[#D6DCE0] shadow-md">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-[#25665D] uppercase tracking-wider font-semibold">
                      AUTUMN/WINTER SHOWCASE
                    </span>
                    <span className="font-headline-sm text-headline-sm text-[#0E344D]">
                      Fluid Kinetic Blazer 01
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('fashion')}
                    className="px-3.5 py-1.5 rounded-full bg-[#3B8E82] text-white text-xs font-semibold hover:bg-[#2E766B] transition-all cursor-pointer"
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
              className="p-space-lg rounded-2xl bg-white border border-[#D6DCE0] hover:border-[#3B8E82] transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#E8F3F1] flex items-center justify-center text-[#3B8E82] border border-[#3B8E82]/25 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">styler</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-[#25665D] font-mono font-semibold">DIMENSION 01</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0E344D] group-hover:text-[#25665D] transition-colors">
                  Fashion &amp; Footwear
                </h3>
                <p className="font-body-sm text-body-sm text-[#36454F] leading-relaxed">
                  The SwiftMonster dual footwear line (Mountain &amp; Beach) with 3D-printed bio-heels, sensory sole grids, and avant-garde runway silhouettes.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-[#E4E8EB] flex items-center justify-between text-xs text-[#25665D] font-semibold">
                <span>View SwiftMonster &amp; Silhouettes</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 2. Tech */}
            <div
              onClick={() => onNavigate('tech')}
              className="p-space-lg rounded-2xl bg-white border border-[#D6DCE0] hover:border-[#18587A] transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#EEF4F7] flex items-center justify-center text-[#18587A] border border-[#18587A]/25 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">memory</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-[#18587A] font-mono font-semibold">DIMENSION 02</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0E344D] group-hover:text-[#18587A] transition-colors">
                  Tech Architecture
                </h3>
                <p className="font-body-sm text-body-sm text-[#36454F] leading-relaxed">
                  Four technological pillars, Wear OS &amp; watchOS cross-platform sensor matrix, simulated real-time terminal logs, and convergence stages.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-[#E4E8EB] flex items-center justify-between text-xs text-[#18587A] font-semibold">
                <span>Inspect Sensor Matrix &amp; Terminal</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 3. Fusion */}
            <div
              onClick={() => onNavigate('fusion')}
              className="p-space-lg rounded-2xl bg-white border border-[#D6DCE0] hover:border-[#3B8E82] transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#E8F3F1] flex items-center justify-center text-[#3B8E82] border border-[#3B8E82]/25 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">vital_signs</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-[#25665D] font-mono font-semibold">DIMENSION 03</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0E344D] group-hover:text-[#25665D] transition-colors">
                  Biomedical Fusion
                </h3>
                <p className="font-body-sm text-body-sm text-[#36454F] leading-relaxed">
                  Transdermal Fabric Matrix, continuous noise filtration wave, TensorFlow clustering, and the &ldquo;Breathe&rdquo; mobile respiratory diagnostics simulator.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-[#E4E8EB] flex items-center justify-between text-xs text-[#25665D] font-semibold">
                <span>Launch &ldquo;Breathe&rdquo; Diagnostic App</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 4. DrunkWatch */}
            <div
              onClick={() => onNavigate('drunkwatch')}
              className="p-space-lg rounded-2xl bg-white border border-[#D6DCE0] hover:border-[#18587A] transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#EEF4F7] flex items-center justify-center text-[#18587A] border border-[#18587A]/25 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">watch</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-[#18587A] font-mono font-semibold">DIMENSION 04</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0E344D] group-hover:text-[#18587A] transition-colors">
                  DrunkWatch™ Guardian
                </h3>
                <p className="font-body-sm text-body-sm text-[#36454F] leading-relaxed">
                  Sub-dermal micro-spectrometry measuring ethanol clearance, 4-hour predictive trajectory curve, and autonomic zero-touch chauffeur protection.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-[#E4E8EB] flex items-center justify-between text-xs text-[#18587A] font-semibold">
                <span>Launch Radial BAC Console</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 5. Teaching & Research */}
            <div
              onClick={() => onNavigate('teaching-and-research')}
              className="p-space-lg rounded-2xl bg-white border border-[#D6DCE0] hover:border-[#0E344D] transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md lg:col-span-2"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#F1F3F4] flex items-center justify-center text-[#0E344D] border border-[#0E344D]/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">school</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-[#0E344D] font-mono font-semibold">DIMENSION 05</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0E344D] group-hover:text-[#18587A] transition-colors">
                  WestCoast Curricula &amp; Research
                </h3>
                <p className="font-body-sm text-body-sm text-[#36454F] leading-relaxed">
                  Interdisciplinary academic programs across 14 laboratories, 48 peer-reviewed publications (IEEE, ACM, Nature), student prototypes, and funded fellowships.
                </p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-[#E4E8EB] flex items-center justify-between text-xs text-[#0E344D] font-semibold">
                <span>View Whitepapers &amp; Fellowship Portal</span>
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
            <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] hover:border-[#3B8E82] transition-all flex flex-col justify-between group shadow-xs">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-[#F1F3F4] relative">
                <img
                  src={FOOTWEAR_COLLECTION.mountain.image}
                  alt="SwiftMonster Mountain"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0E344D]/90 text-[10px] text-white font-mono font-semibold">
                  TERRAIN ADAPTIVE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-[#0E344D]">SwiftMonster Mountain</h4>
                <p className="text-xs text-[#5D6870] mt-1">Sub-dermal gait sensor sole matrix</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#25665D] font-mono font-semibold">$1,850</span>
                  <button
                    onClick={() => onRequestPrototype('SwiftMonster Mountain Footwear')}
                    className="text-xs px-3 py-1 rounded-lg bg-[#F1F3F4] hover:bg-[#3B8E82] hover:text-white transition-colors text-[#0E344D] font-semibold cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>

            {/* Footwear 2 */}
            <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] hover:border-[#18587A] transition-all flex flex-col justify-between group shadow-xs">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-[#F1F3F4] relative">
                <img
                  src={FOOTWEAR_COLLECTION.beach.image}
                  alt="SwiftMonster Beach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0E344D]/90 text-[10px] text-white font-mono font-semibold">
                  PARAMETRIC LATTICE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-[#0E344D]">SwiftMonster Beach</h4>
                <p className="text-xs text-[#5D6870] mt-1">Self-aerating biomimetic lattice</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#18587A] font-mono font-semibold">$1,650</span>
                  <button
                    onClick={() => onRequestPrototype('SwiftMonster Beach Footwear')}
                    className="text-xs px-3 py-1 rounded-lg bg-[#F1F3F4] hover:bg-[#18587A] hover:text-white transition-colors text-[#0E344D] font-semibold cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>

            {/* Garment 1 */}
            <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] hover:border-[#18587A] transition-all flex flex-col justify-between group shadow-xs">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-[#F1F3F4] relative">
                <img
                  src={GARMENT_SILHOUETTES[0].image}
                  alt={GARMENT_SILHOUETTES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0E344D]/90 text-[10px] text-white font-mono font-semibold">
                  COUTURE
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-[#0E344D]">{GARMENT_SILHOUETTES[0].title}</h4>
                <p className="text-xs text-[#5D6870] mt-1">{GARMENT_SILHOUETTES[0].sensor}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#18587A] font-mono font-semibold">Bespoke</span>
                  <button
                    onClick={() => onRequestPrototype(GARMENT_SILHOUETTES[0].title)}
                    className="text-xs px-3 py-1 rounded-lg bg-[#F1F3F4] hover:bg-[#18587A] hover:text-white transition-colors text-[#0E344D] font-semibold cursor-pointer"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>

            {/* Garment 2 */}
            <div className="p-space-md rounded-xl bg-white border border-[#D6DCE0] hover:border-[#3B8E82] transition-all flex flex-col justify-between group shadow-xs">
              <div className="w-full h-44 rounded-lg overflow-hidden bg-[#F1F3F4] relative">
                <img
                  src={GARMENT_SILHOUETTES[1].image}
                  alt={GARMENT_SILHOUETTES[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0E344D]/90 text-[10px] text-white font-mono font-semibold">
                  ALL-WEATHER
                </span>
              </div>
              <div className="pt-3 flex flex-col">
                <h4 className="font-headline-sm text-[#0E344D]">{GARMENT_SILHOUETTES[1].title}</h4>
                <p className="text-xs text-[#5D6870] mt-1">{GARMENT_SILHOUETTES[1].sensor}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#25665D] font-mono font-semibold">Bespoke</span>
                  <button
                    onClick={() => onRequestPrototype(GARMENT_SILHOUETTES[1].title)}
                    className="text-xs px-3 py-1 rounded-lg bg-[#F1F3F4] hover:bg-[#3B8E82] hover:text-white transition-colors text-[#0E344D] font-semibold cursor-pointer"
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
