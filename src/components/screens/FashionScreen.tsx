import React, { useState } from 'react';
import { FOOTWEAR_MODELS, GARMENTS, IMAGES } from '../../data/mockData';
import { GarmentSilhouette, FootwearModel } from '../../types';

interface FashionScreenProps {
  onReserveFootwear: (footwear: FootwearModel) => void;
  onViewGarment: (garment: GarmentSilhouette) => void;
  onNavigateToTeaching: () => void;
}

export const FashionScreen: React.FC<FashionScreenProps> = ({
  onReserveFootwear,
  onViewGarment,
  onNavigateToTeaching,
}) => {
  const [activeShoeTab, setActiveShoeTab] = useState<'mountain' | 'beach'>('mountain');
  const [eleganceVal, setEleganceVal] = useState<number>(92);
  const [camoVal, setCamoVal] = useState<number>(88);
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState<number>(1);

  // Live Wearer Acceptance Calculation
  const avgVal = (eleganceVal + camoVal) / 2;
  const projectedHours = ((avgVal / 100) * 23.5).toFixed(1);
  const dataFidelity = (80 + avgVal * 0.198).toFixed(1);
  const comfortIndex = avgVal > 85 ? 'High-Haute' : avgVal > 65 ? 'Elevated Atelier' : 'Moderate Clinical';

  const currentFootwear = FOOTWEAR_MODELS[activeShoeTab];

  return (
    <div className="flex flex-col w-full">
      {/* Top Manifesto Marquee Banner */}
      <div className="w-full bg-[#0a0e14] overflow-hidden py-3 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-10 whitespace-nowrap text-[#bac9cc] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest animate-[marquee_25s_linear_infinite]">
          <div className="flex items-center gap-2 text-[#00e5ff]">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
            <span>HAUTE ERGONOMICS // VOLUME IX</span>
          </div>
          <span className="text-[#FFB703]">THE R/EVOLUTION OF FASHION IN THE DIGITAL AGE</span>
          <span>•</span>
          <span className="text-[#F8FAFC]">MAGIC OF TECH + BEAUTY OF FASHION + WELLNESS OF HEALTHCARE</span>
          <span>•</span>
          <span className="text-[#4cd6fb]">CONTINUOUS TRANSDERMAL BIO-MAPPING</span>
          <span>•</span>
          <span className="text-[#00e5ff]">SWIFTMONSTER PROTOTYPES SYNCHRONIZED</span>
          <span>•</span>
          <span className="text-[#bac9cc]">AWAKEN THE SOUL OF THE SHOE & GARMENT</span>
        </div>
      </div>

      {/* Editorial Split Header & Humanizing Tech Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Big Typographic Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#262a31] text-[#00e5ff] font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-semibold">
                Editorial Dossier
              </span>
              <span className="text-[#94A3B8] font-['Space_Grotesk'] text-[11px] uppercase tracking-wider">
                Doc 04.FASH // Humanizing Systems
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-display text-[#F8FAFC] tracking-tight leading-tight">
              Humanizing Technology Through{' '}
              <span className="text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                Haute Cyber-Couture
              </span>
              .
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-body-lg text-[#94A3B8] leading-relaxed">
              Even the most advanced biometric telemetry platform fails if it feels alien to the human form. By merging color, fluid architecture, and conductive weaves, we turn cold silicon hardware into evocative luxury garments that people are excited to inhabit.
            </p>

            {/* Triad Concept Card */}
            <div className="p-6 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.08)] shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#00e5ff] font-semibold">
                    01 / The Magic
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#F8FAFC]">
                    Autonomous Tech
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-normal">
                    Micro-neural filaments and bio-galvanic transdermal arrays woven into natural silks.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#FFB703] font-semibold">
                    02 / The Beauty
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#F8FAFC]">
                    Haute Silhouettes
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-normal">
                    Parisian draping rules, kinetic tailoring, and memory fabrics that flatter organic movement.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#4cd6fb] font-semibold">
                    03 / The Wellness
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#F8FAFC]">
                    Preventive Health
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-normal">
                    Continuous adherence yields unbroken diagnostics, delivering life-saving clinical intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#swiftmonster"
                className="px-6 py-3 rounded-full bg-[#00e5ff] text-[#00363d] font-['Space_Grotesk'] text-[13px] uppercase tracking-wider font-semibold hover:bg-[#00daf3] transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore SwiftMonster Shoes</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
              <a
                href="#lookbook"
                className="px-6 py-3 rounded-full bg-[#262a31] text-[#F8FAFC] font-['Space_Grotesk'] text-[13px] uppercase tracking-wider font-semibold hover:bg-[#353940] transition-all border border-[rgba(255,255,255,0.08)] cursor-pointer"
              >
                Cyber-Couture Lookbook
              </a>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Editorial Mosaic */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.08)] group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="High-fashion model wearing an obsidian-black structural cyber-couture coat with illuminated electric cyan fiber optic traces"
                src={IMAGES.fashionHero}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-[#0B0F15]/30 to-transparent"></div>

              {/* Corner Telemetry Overlay */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0a0e14]/85 backdrop-blur-md text-[#FFB703] font-['Space_Grotesk'] text-[11px] font-semibold flex items-center gap-1.5 border border-[#FFB703]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] animate-pulse"></span>
                <span>GAIT SENSING: ACTIVE</span>
              </div>

              {/* Bottom Glass Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[rgba(18,24,36,0.92)] backdrop-blur-xl border border-[rgba(0,229,255,0.3)] shadow-lg flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#00e5ff] tracking-widest uppercase font-semibold">
                    Philosophy Principle
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                    DeSign & Function
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#94A3B8] uppercase">
                    Adherence Ratio
                  </span>
                  <span className="font-['Space_Grotesk'] text-[20px] text-[#4cd6fb] block font-bold">
                    +94.6%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Cluster Below Hero */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#94A3B8] font-semibold">
                  Color & Shape Matrix
                </span>
                <div className="flex items-center gap-2 my-2.5">
                  {[
                    { color: '#0B0F15', ring: true, label: 'Obsidian' },
                    { color: '#00e5ff', ring: false, label: 'Electric Cyan' },
                    { color: '#FFB703', ring: false, label: 'Circuit Gold' },
                    { color: '#353940', ring: false, label: 'Slate Bright' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPaletteIndex(idx)}
                      title={item.label}
                      style={{ backgroundColor: item.color }}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                        selectedPaletteIndex === idx
                          ? 'ring-2 ring-[#00e5ff] scale-110'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    ></button>
                  ))}
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc]">
                  Emotionally receptive paletting to reduce tech wear fatigue.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#94A3B8] font-semibold">
                  Bio-Feedback Loop
                </span>
                <span className="font-['Space_Grotesk'] text-[20px] text-[#00e5ff] font-bold mt-1">
                  Continuous 24/7
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc]">
                  Seamless drape delivers continuous transdermal contact.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Telemetry Strip / Live Biosignal Mock */}
      <section className="w-full bg-[#181c22] border-y border-[rgba(255,255,255,0.08)] py-4 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#262a31] border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <span className="material-symbols-outlined text-2xl">vital_signs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#94A3B8] uppercase tracking-widest font-semibold">
                Biometric Garment Network
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-medium">
                Dynamic Micro-Filament Compliance
              </span>
            </div>
          </div>

          {/* Inline Biosignal Graph */}
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#00e5ff] uppercase font-semibold">
                Heart-Rate Variability (HRV)
              </span>
              <div className="w-48 h-8 flex items-center">
                <svg className="w-full h-full text-[#00e5ff]" fill="none" viewBox="0 0 180 32">
                  <path
                    d="M0,16 L30,16 L38,4 L44,28 L50,16 L65,16 L72,9 L78,22 L84,16 L120,16 L128,2 L136,30 L144,16 L180,16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#FFB703] uppercase font-semibold">
                Skin Conductance
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#FFB703] font-bold">
                0.42 μS <span className="text-[11px] text-[#94A3B8] font-normal">NOMINAL</span>
              </span>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#4cd6fb] uppercase font-semibold">
                Mesh Temp
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#4cd6fb] font-bold">
                36.7°C
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footwear Focus: SwiftMonster Series Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 w-full" id="swiftmonster">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-[#FFB703] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-base">footprint</span>
              <span>Footwear Architecture Showcase</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC] tracking-tight">
              The SwiftMonster Series: Awaken the Soul of the Shoe
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#94A3B8]">
              Reimagining gait telemetry from the sole upward. Integrated bio-kinetic nodes harvest kinetic dissipation, adjust active thermal parameters, and safeguard skeletal posture across extreme geographic extremes.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-[#262a31] p-1.5 rounded-full self-start md:self-auto border border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => setActiveShoeTab('mountain')}
              className={`px-4 py-1.5 rounded-full font-['Space_Grotesk'] text-[11px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                activeShoeTab === 'mountain'
                  ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'text-[#bac9cc] hover:text-[#F8FAFC]'
              }`}
            >
              SwiftMonster Mountain
            </button>
            <button
              onClick={() => setActiveShoeTab('beach')}
              className={`px-4 py-1.5 rounded-full font-['Space_Grotesk'] text-[11px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                activeShoeTab === 'beach'
                  ? 'bg-[#4cd6fb] text-[#003642] shadow-[0_0_15px_rgba(76,214,251,0.4)]'
                  : 'text-[#bac9cc] hover:text-[#F8FAFC]'
              }`}
            >
              SwiftMonster Beach
            </button>
          </div>
        </div>

        {/* Dynamic Spec Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Sneaker Imagery */}
          <div className="lg:col-span-7 relative h-[480px] rounded-2xl overflow-hidden bg-[#0a0e14] shadow-2xl border border-[rgba(255,255,255,0.08)] group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={currentFootwear.name}
              src={currentFootwear.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F15]/80 via-transparent to-transparent"></div>

            {/* Floating Sensor Badge */}
            <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-[rgba(18,24,36,0.92)] backdrop-blur-md border border-[rgba(0,229,255,0.3)] flex flex-col gap-1 max-w-xs shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] text-[#00e5ff] uppercase tracking-wider font-semibold">
                  {currentFootwear.badgeTitle}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
              </div>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                {currentFootwear.headline}
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc]">
                {currentFootwear.badgeDescription}
              </p>
            </div>
          </div>

          {/* Sneaker Specs List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#c3f5ff] uppercase tracking-widest font-semibold">
                {currentFootwear.tag}
              </span>
              <h3 className="font-['Space_Grotesk'] text-headline-md text-[#F8FAFC]">
                {currentFootwear.name}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#94A3B8]">
                {currentFootwear.description}
              </p>
            </div>

            <div className="space-y-3">
              {currentFootwear.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex items-start gap-4 hover:border-[#00e5ff]/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-[#262a31] ${feat.colorClass} shrink-0`}>
                    <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[16px] text-[#F8FAFC] font-semibold">
                      {feat.title}
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-['Space_Grotesk'] text-[24px] text-[#FFB703] font-bold">
                {currentFootwear.price}
              </span>
              <button
                onClick={() => onReserveFootwear(currentFootwear)}
                className="px-6 py-3 rounded-full bg-[#00e5ff] text-[#00363d] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-bold hover:bg-[#00daf3] transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer"
              >
                Reserve Prototype
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cyber-Couture Lookbook Gallery */}
      <section className="w-full bg-[#0a0e14] py-16 border-t border-[rgba(255,255,255,0.08)]" id="lookbook">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#00e5ff] uppercase tracking-widest font-semibold">
                Autumn / Winter Ready-to-Wear
              </span>
              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC] tracking-tight">
                Cyber-Couture Silhouettes
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#94A3B8] max-w-xl">
                Where sensory intelligence vanishes into opulent tailoring. Garments that drape like bespoke silks while continuously reporting cardiovascular baseline dynamics.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#94A3B8] font-['Space_Grotesk'] text-[11px] font-semibold">
              <span className="text-[#00e5ff]">04 SILHOUETTES</span>
              <span>/</span>
              <span>SERIES 2025</span>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GARMENTS.map((garment) => (
              <div
                key={garment.id}
                onClick={() => onViewGarment(garment)}
                className="group relative rounded-2xl bg-[#1c2026] overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-xl flex flex-col hover:border-[rgba(0,229,255,0.5)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#10141a]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={garment.title}
                    src={garment.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2026] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0B0F15]/80 backdrop-blur-md text-[#00e5ff] font-['Space_Grotesk'] text-[10px] tracking-wider uppercase font-semibold border border-[#00e5ff]/20">
                    {garment.tag}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold group-hover:text-[#00e5ff] transition-colors">
                      {garment.title}
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-normal">
                      {garment.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.08)]">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#FFB703] font-semibold">
                      {garment.metric}
                    </span>
                    <span className="material-symbols-outlined text-[#00e5ff] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Telemetry Customizer & Engagement Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 w-full" id="calculator">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#181c22] border border-[rgba(255,255,255,0.08)] relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-1.5 text-[#00e5ff] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Wearer Acceptance Calculator</span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC]">
                Fashion Drives Long-Term Adherence.
              </h2>

              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#94A3B8] leading-relaxed">
                Medical wearables see a 42% abandonment rate within 90 days due to social friction and clunky silicon aesthetics. Experience how ZoeWear’s cyber-couture integration keeps wearers engaged for months on end.
              </p>

              {/* Interactive Sliders */}
              <div className="space-y-5 pt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-['Space_Grotesk'] text-[11px]">
                    <span className="text-[#bac9cc] uppercase font-semibold">Fabric Elegance & Drape Index</span>
                    <span className="text-[#00e5ff] font-bold text-[13px]">{eleganceVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={eleganceVal}
                    onChange={(e) => setEleganceVal(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#262a31] rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-['Space_Grotesk'] text-[11px]">
                    <span className="text-[#bac9cc] uppercase font-semibold">Hardware Camouflage & Weightlessness</span>
                    <span className="text-[#FFB703] font-bold text-[13px]">{camoVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={camoVal}
                    onChange={(e) => setCamoVal(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#262a31] rounded-lg appearance-none cursor-pointer accent-[#FFB703]"
                  />
                </div>
              </div>
            </div>

            {/* Resulting Calculation Display */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="p-8 rounded-2xl bg-[#0B0F15] border border-[rgba(0,229,255,0.2)] shadow-inner flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#94A3B8] uppercase tracking-widest font-semibold">
                    Projected Daily Continuous Wear
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-ping"></span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-[56px] text-[#00e5ff] font-bold leading-none">
                    {projectedHours}
                  </span>
                  <span className="font-['Space_Grotesk'] text-[20px] text-[#94A3B8]">hrs / day</span>
                </div>

                <div className="w-full bg-[#262a31] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00e5ff] to-[#4cd6fb] h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                    style={{ width: `${Math.min(100, avgVal)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#1c2026] border border-[rgba(255,255,255,0.06)] flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#94A3B8] uppercase">
                      Health Data Fidelity
                    </span>
                    <span className="font-['Space_Grotesk'] text-[20px] text-[#FFB703] font-bold">
                      {dataFidelity}%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1c2026] border border-[rgba(255,255,255,0.06)] flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#94A3B8] uppercase">
                      Social Comfort Index
                    </span>
                    <span className="font-['Space_Grotesk'] text-[20px] text-[#4cd6fb] font-bold">
                      {comfortIndex}
                    </span>
                  </div>
                </div>

                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] italic border-t border-[rgba(255,255,255,0.08)] pt-4">
                  "Continuous transdermal telemetry without social compromise turns health diagnostics from an anxiety-inducing reminder into an empowering fashion signature."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curricular & Academic Footnote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-12 w-full">
        <div className="p-6 rounded-2xl bg-[#0a0e14] border border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3.5 rounded-full bg-[#262a31] text-[#FFB703] shrink-0 border border-[#FFB703]/30">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#FFB703] uppercase tracking-widest font-semibold">
                Academic Curricula & Research
              </span>
              <span className="font-['Space_Grotesk'] text-[20px] text-[#F8FAFC] font-semibold">
                Building the Future of Phygital Fashion
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] max-w-xl mt-0.5">
                ZoeWear’s West Coast university research initiatives combine computational design, generative neural models, and sustainable e-textiles to train the next wave of cyber-couturiers.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToTeaching}
            className="px-6 py-2.5 rounded-full bg-[#262a31] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#00363d] transition-all font-['Space_Grotesk'] text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap border border-[rgba(0,229,255,0.35)] cursor-pointer"
          >
            Explore Academic Courses
          </button>
        </div>
      </section>
    </div>
  );
};
