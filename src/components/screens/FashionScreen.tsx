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
    <div className="flex flex-col w-full bg-[#F5F6F8] text-[#0E344D]">
      {/* Top Manifesto Marquee Banner */}
      <div className="w-full bg-[#F1F3F4] overflow-hidden py-3 border-b border-[#D6DCE0]">
        <div className="flex items-center gap-10 whitespace-nowrap text-[#36454F] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest animate-[marquee_25s_linear_infinite] font-semibold">
          <div className="flex items-center gap-2 text-[#0E344D]">
            <span className="w-2 h-2 rounded-full bg-[#18587A] animate-ping"></span>
            <span>HAUTE ERGONOMICS // VOLUME IX</span>
          </div>
          <span className="text-[#0E344D]">THE R/EVOLUTION OF FASHION IN THE DIGITAL AGE</span>
          <span>•</span>
          <span className="text-[#36454F]">MAGIC OF TECH + BEAUTY OF FASHION + WELLNESS OF HEALTHCARE</span>
          <span>•</span>
          <span className="text-[#18587A]">CONTINUOUS TRANSDERMAL BIO-MAPPING</span>
          <span>•</span>
          <span className="text-[#0E344D]">SWIFTMONSTER PROTOTYPES SYNCHRONIZED</span>
          <span>•</span>
          <span className="text-[#36454F]">AWAKEN THE SOUL OF THE SHOE &amp; GARMENT</span>
        </div>
      </div>

      {/* Editorial Split Header & Humanizing Tech Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Big Typographic Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#18587A]/30 text-[#0E344D] font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-semibold">
                Editorial Dossier
              </span>
              <span className="text-[#5D6870] font-['Space_Grotesk'] text-[11px] uppercase tracking-wider font-medium">
                Doc 04.FASH // Humanizing Systems
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-display text-[#0E344D] tracking-tight leading-tight">
              Humanizing Technology Through{' '}
              <span className="bg-gradient-to-r from-[#0E344D] via-[#0284C7] to-[#2563EB] bg-clip-text text-transparent">
                Haute Cyber-Couture
              </span>
              .
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-body-lg text-[#36454F] leading-relaxed">
              Even the most advanced biometric telemetry platform fails if it feels alien to the human form. By merging color, fluid architecture, and conductive weaves, we turn cold silicon hardware into evocative luxury garments that people are excited to inhabit.
            </p>

            {/* Triad Concept Card */}
            <div className="p-6 rounded-xl bg-white border border-[#D6DCE0] shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#0284C7] font-semibold">
                    01 / The Magic
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#0E344D]">
                    Autonomous Tech
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] leading-normal">
                    Micro-neural filaments and bio-galvanic transdermal arrays woven into natural silks.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#18587A] font-semibold">
                    02 / The Beauty
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#0E344D]">
                    Haute Silhouettes
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] leading-normal">
                    Parisian draping rules, kinetic tailoring, and memory fabrics that flatter organic movement.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#1D4ED8] font-semibold">
                    03 / The Wellness
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] font-semibold text-[#0E344D]">
                    Preventive Health
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] leading-normal">
                    Continuous adherence yields unbroken diagnostics, delivering life-saving clinical intelligence.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#swiftmonster"
                className="px-6 py-3 rounded-full bg-[#18587A] text-white font-['Space_Grotesk'] text-[13px] uppercase tracking-wider font-semibold hover:bg-[#124460] transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Explore SwiftMonster Shoes</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
              <a
                href="#lookbook"
                className="px-6 py-3 rounded-full bg-white text-[#0E344D] font-['Space_Grotesk'] text-[13px] uppercase tracking-wider font-semibold hover:bg-[#F1F3F4] transition-all border border-[#D6DCE0] shadow-xs cursor-pointer"
              >
                Cyber-Couture Lookbook
              </a>
            </div>
          </div>

          {/* Right Column: Visual Telemetry Editorial Mosaic */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden shadow-lg border border-[#D6DCE0] group bg-white">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="High-fashion model wearing an obsidian-black structural cyber-couture coat with illuminated electric cyan fiber optic traces"
                src={IMAGES.fashionHero}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E344D]/75 via-[#0E344D]/15 to-transparent"></div>

              {/* Corner Telemetry Overlay */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E344D] font-['Space_Grotesk'] text-[11px] font-semibold flex items-center gap-1.5 border border-[#18587A]/30 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18587A] animate-pulse"></span>
                <span>GAIT SENSING: ACTIVE</span>
              </div>

              {/* Bottom Glass Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-xl border border-[#D6DCE0] shadow-md flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#0E344D] tracking-widest uppercase font-semibold">
                    Philosophy Principle
                  </span>
                  <span className="font-['Space_Grotesk'] text-[18px] text-[#0E344D] font-semibold">
                    DeSign &amp; Function
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#5D6870] uppercase">
                    Adherence Ratio
                  </span>
                  <span className="font-['Space_Grotesk'] text-[20px] text-[#18587A] block font-bold">
                    +94.6%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Cluster Below Hero */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#D6DCE0] shadow-xs flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#5D6870] font-semibold">
                  Slate &amp; Ocean Matrix
                </span>
                <div className="flex items-center gap-2 my-2.5">
                  {[
                    { color: '#0E344D', label: 'Deep Ocean Blue' },
                    { color: '#18587A', label: 'Ocean Steel' },
                    { color: '#0284C7', label: 'Sky Azure' },
                    { color: '#2563EB', label: 'Cobalt Blue' },
                    { color: '#38BDF8', label: 'Glacier Ice' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPaletteIndex(idx)}
                      title={item.label}
                      style={{ backgroundColor: item.color }}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer border border-[#D6DCE0] shadow-xs ${
                        selectedPaletteIndex === idx
                          ? 'ring-2 ring-[#0E344D] scale-110'
                          : 'opacity-90 hover:opacity-100'
                      }`}
                    ></button>
                  ))}
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#36454F]">
                  Emotionally receptive paletting to reduce tech wear fatigue.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D6DCE0] shadow-xs flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#5D6870] font-semibold">
                  Bio-Feedback Loop
                </span>
                <span className="font-['Space_Grotesk'] text-[20px] text-[#0E344D] font-bold mt-1">
                  Continuous 24/7
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#36454F]">
                  Seamless drape delivers continuous transdermal contact.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Telemetry Strip / Live Biosignal Mock */}
      <section className="w-full bg-white border-y border-[#D6DCE0] py-4 my-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8EEF3] border border-[#18587A]/30 flex items-center justify-center text-[#18587A]">
              <span className="material-symbols-outlined text-2xl">vital_signs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#5D6870] uppercase tracking-widest font-semibold">
                Biometric Garment Network
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#0E344D] font-semibold">
                Dynamic Micro-Filament Compliance
              </span>
            </div>
          </div>

          {/* Inline Biosignal Graph */}
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#0E344D] uppercase font-semibold">
                Heart-Rate Variability (HRV)
              </span>
              <div className="w-48 h-8 flex items-center">
                <svg className="w-full h-full text-[#0284C7]" fill="none" viewBox="0 0 180 32">
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
              <span className="font-['Space_Grotesk'] text-[11px] text-[#0E344D] uppercase font-semibold">
                Skin Conductance
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#0E344D] font-bold">
                0.42 μS <span className="text-[11px] text-[#5D6870] font-normal">NOMINAL</span>
              </span>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#18587A] uppercase font-semibold">
                Mesh Temp
              </span>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#18587A] font-bold">
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
            <div className="flex items-center gap-1.5 text-[#0E344D] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-base">footprint</span>
              <span>Footwear Architecture Showcase</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#0E344D] tracking-tight">
              The SwiftMonster Series: Awaken the Soul of the Shoe
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#36454F]">
              Reimagining gait telemetry from the sole upward. Integrated bio-kinetic nodes harvest kinetic dissipation, adjust active thermal parameters, and safeguard skeletal posture across extreme geographic extremes.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-full self-start md:self-auto border border-[#D6DCE0] shadow-xs">
            <button
              onClick={() => setActiveShoeTab('mountain')}
              className={`px-4 py-1.5 rounded-full font-['Space_Grotesk'] text-[11px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                activeShoeTab === 'mountain'
                  ? 'bg-[#18587A] text-white shadow-xs'
                  : 'text-[#36454F] hover:text-[#0E344D]'
              }`}
            >
              SwiftMonster Mountain
            </button>
            <button
              onClick={() => setActiveShoeTab('beach')}
              className={`px-4 py-1.5 rounded-full font-['Space_Grotesk'] text-[11px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                activeShoeTab === 'beach'
                  ? 'bg-[#18587A] text-white shadow-xs'
                  : 'text-[#36454F] hover:text-[#0E344D]'
              }`}
            >
              SwiftMonster Beach
            </button>
          </div>
        </div>

        {/* Dynamic Spec Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Sneaker Imagery */}
          <div className="lg:col-span-7 relative h-[480px] rounded-2xl overflow-hidden bg-white shadow-lg border border-[#D6DCE0] group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={currentFootwear.name}
              src={currentFootwear.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E344D]/50 via-transparent to-transparent"></div>

            {/* Floating Sensor Badge */}
            <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#D6DCE0] flex flex-col gap-1 max-w-xs shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] text-[#0E344D] uppercase tracking-wider font-semibold">
                  {currentFootwear.badgeTitle}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#18587A] animate-ping"></span>
              </div>
              <span className="font-['Space_Grotesk'] text-[18px] text-[#0E344D] font-semibold">
                {currentFootwear.headline}
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#36454F]">
                {currentFootwear.badgeDescription}
              </p>
            </div>
          </div>

          {/* Sneaker Specs List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#18587A] uppercase tracking-widest font-semibold">
                {currentFootwear.tag}
              </span>
              <h3 className="font-['Space_Grotesk'] text-headline-md text-[#0E344D]">
                {currentFootwear.name}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#36454F]">
                {currentFootwear.description}
              </p>
            </div>

            <div className="space-y-3">
              {currentFootwear.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#D6DCE0] flex items-start gap-4 hover:border-[#18587A] transition-colors shadow-xs"
                >
                  <div className={`p-2 rounded-lg bg-[#F1F3F4] ${feat.colorClass} shrink-0`}>
                    <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[16px] text-[#0E344D] font-semibold">
                      {feat.title}
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-['Space_Grotesk'] text-[24px] text-[#0E344D] font-bold">
                {currentFootwear.price}
              </span>
              <button
                onClick={() => onReserveFootwear(currentFootwear)}
                className="px-6 py-3 rounded-full bg-[#18587A] text-white font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-bold hover:bg-[#124460] transition-all shadow-sm cursor-pointer"
              >
                Reserve Prototype
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cyber-Couture Lookbook Gallery */}
      <section className="w-full bg-[#F1F3F4] py-16 border-t border-[#D6DCE0]" id="lookbook">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#0E344D] uppercase tracking-widest font-semibold">
                Autumn / Winter Ready-to-Wear
              </span>
              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#0E344D] tracking-tight">
                Cyber-Couture Silhouettes
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#36454F] max-w-xl">
                Where sensory intelligence vanishes into opulent tailoring. Garments that drape like bespoke silks while continuously reporting cardiovascular baseline dynamics.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#5D6870] font-['Space_Grotesk'] text-[11px] font-semibold">
              <span className="text-[#0E344D]">04 SILHOUETTES</span>
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
                className="group relative rounded-2xl bg-white overflow-hidden border border-[#D6DCE0] shadow-sm flex flex-col hover:border-[#18587A] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-80 w-full overflow-hidden bg-[#F1F3F4]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={garment.title}
                    src={garment.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E344D]/40 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E344D] font-['Space_Grotesk'] text-[10px] tracking-wider uppercase font-semibold border border-[#D6DCE0] shadow-xs">
                    {garment.tag}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-['Space_Grotesk'] text-[18px] text-[#0E344D] font-semibold group-hover:text-[#0E344D] transition-colors">
                      {garment.title}
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] leading-normal">
                      {garment.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E4E8EB]">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#18587A] font-semibold">
                      {garment.metric}
                    </span>
                    <span className="material-symbols-outlined text-[#18587A] group-hover:translate-x-1 transition-transform">
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
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#D6DCE0] relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-1.5 text-[#0E344D] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-base text-[#18587A]">tune</span>
                <span>Wearer Acceptance Calculator</span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#0E344D]">
                Fashion Drives Long-Term Adherence.
              </h2>

              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#36454F] leading-relaxed">
                Medical wearables see a 42% abandonment rate within 90 days due to social friction and clunky silicon aesthetics. Experience how ZoeWear’s cyber-couture integration keeps wearers engaged for months on end.
              </p>

              {/* Interactive Sliders */}
              <div className="space-y-5 pt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-['Space_Grotesk'] text-[11px]">
                    <span className="text-[#36454F] uppercase font-semibold">Fabric Elegance &amp; Drape Index</span>
                    <span className="text-[#0E344D] font-bold text-[13px]">{eleganceVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={eleganceVal}
                    onChange={(e) => setEleganceVal(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#E4E8EB] rounded-lg appearance-none cursor-pointer accent-[#18587A]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-['Space_Grotesk'] text-[11px]">
                    <span className="text-[#36454F] uppercase font-semibold">Hardware Camouflage &amp; Weightlessness</span>
                    <span className="text-[#18587A] font-bold text-[13px]">{camoVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={camoVal}
                    onChange={(e) => setCamoVal(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#E4E8EB] rounded-lg appearance-none cursor-pointer accent-[#18587A]"
                  />
                </div>
              </div>
            </div>

            {/* Resulting Calculation Display */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="p-8 rounded-2xl bg-[#F4F6F6] border border-[#D6DCE0] shadow-inner flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#5D6870] uppercase tracking-widest font-semibold">
                    Projected Daily Continuous Wear
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-ping"></span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-[56px] text-[#0284C7] font-bold leading-none">
                    {projectedHours}
                  </span>
                  <span className="font-['Space_Grotesk'] text-[20px] text-[#5D6870]">hrs / day</span>
                </div>

                <div className="w-full bg-[#E4E8EB] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0E344D] via-[#0284C7] to-[#38BDF8] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, avgVal)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-[#D6DCE0] flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#5D6870] uppercase">
                      Health Data Fidelity
                    </span>
                    <span className="font-['Space_Grotesk'] text-[20px] text-[#0284C7] font-bold">
                      {dataFidelity}%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#D6DCE0] flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#5D6870] uppercase">
                      Social Comfort Index
                    </span>
                    <span className="font-['Space_Grotesk'] text-[20px] text-[#1D4ED8] font-bold">
                      {comfortIndex}
                    </span>
                  </div>
                </div>

                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] italic border-t border-[#D6DCE0] pt-4">
                  &ldquo;Continuous transdermal telemetry without social compromise turns health diagnostics from an anxiety-inducing reminder into an empowering fashion signature.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curricular & Academic Footnote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-12 w-full">
        <div className="p-6 rounded-2xl bg-white border border-[#D6DCE0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3.5 rounded-full bg-[#EEF4F7] text-[#18587A] shrink-0 border border-[#18587A]/30">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[11px] text-[#18587A] uppercase tracking-widest font-semibold">
                Academic Curricula &amp; Research
              </span>
              <span className="font-['Space_Grotesk'] text-[20px] text-[#0E344D] font-semibold">
                Building the Future of Phygital Fashion
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#36454F] max-w-xl mt-0.5">
                ZoeWear’s West Coast university research initiatives combine computational design, generative neural models, and sustainable e-textiles to train the next wave of cyber-couturiers.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToTeaching}
            className="px-6 py-2.5 rounded-full bg-[#0E344D] text-white hover:bg-[#18587A] transition-all font-['Space_Grotesk'] text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer shadow-xs"
          >
            Explore Academic Courses
          </button>
        </div>
      </section>
    </div>
  );
};
