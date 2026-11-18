/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { NavPage } from '../../types';
import {
  SITE_COMPARISON_DATA,
  KINEMATIC_SCENARIOS,
  PPG_HR_METRICS,
  PPG_DETAIL_COPY,
  PAD_SENSITIVITY_DATA,
  STRIKE_DETAILS,
  NEURO_ML_MODELS,
  LIFESTYLE_DATA,
  LIFESTYLE_COMPARISON_TABLE,
  MANUSCRIPT_SECTIONS,
  ANKLE_WORKS_CITED,
  CitationItem,
} from '../../data/ankleResearchData';

interface AnkleBiometricsScreenProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
}

type ViewMode = 'dashboard' | 'manuscript';
type SectionAnchor = 'overview' | 'kinematics' | 'vascular' | 'biomechanics' | 'lifestyle';
type KinematicScenarioKey = 'all' | 'slow' | 'obstructed' | 'hand';
type BiomechDomain = 'sports' | 'neuro';
type LifestyleKey = 'clinical' | 'athletic' | 'style';
type CitationFilter = 'All' | CitationItem['domain'];

export const AnkleBiometricsScreen: React.FC<AnkleBiometricsScreenProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [activeSite, setActiveSite] = useState<'ankle' | 'wrist'>('ankle');
  const [kinematicKey, setKinematicKey] = useState<KinematicScenarioKey>('all');
  const [ppgDetailTab, setPpgDetailTab] = useState<'anatomy' | 'morphology'>('anatomy');
  const [biomechDomain, setBiomechDomain] = useState<BiomechDomain>('sports');
  const [strikeMode, setStrikeMode] = useState<'ffs' | 'rfs'>('ffs');
  const [lifestyleTab, setLifestyleTab] = useState<LifestyleKey>('clinical');

  // Manuscript & Citations filter state
  const [citationQuery, setCitationQuery] = useState('');
  const [citationDomain, setCitationDomain] = useState<CitationFilter>('All');

  // Hover tooltip states for interactive charts
  const [hoveredKinematicIdx, setHoveredKinematicIdx] = useState<number | null>(null);
  const [hoveredHrIdx, setHoveredHrIdx] = useState<number | null>(null);
  const [hoveredPadIdx, setHoveredPadIdx] = useState<number | null>(null);
  const [hoveredNeuroIdx, setHoveredNeuroIdx] = useState<number | null>(null);

  const currentKinematic = KINEMATIC_SCENARIOS[kinematicKey];
  const currentStrike = STRIKE_DETAILS[strikeMode];
  const currentLifestyle = LIFESTYLE_DATA[lifestyleTab];
  const neuroChartModels = NEURO_ML_MODELS.filter((m) => m.sensitivity !== null && m.specificity !== null);

  const filteredCitations = useMemo(() => {
    const q = citationQuery.trim().toLowerCase();
    return ANKLE_WORKS_CITED.filter((item) => {
      const matchesDomain = citationDomain === 'All' || item.domain === citationDomain;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        String(item.id) === q;
      return matchesDomain && matchesQuery;
    });
  }, [citationQuery, citationDomain]);

  const scrollToSection = (id: SectionAnchor) => {
    setViewMode('dashboard');
    setTimeout(() => {
      const el = document.getElementById(`ankle-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const scrollToManuscriptChapter = (id: string) => {
    setViewMode('manuscript');
    setTimeout(() => {
      const el = document.getElementById(`manuscript-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="flex flex-col w-full bg-[#F7F8F7] text-[#0E344D]">
      {/* Sub-Navigation Sticky Bar */}
      <div className="sticky top-[88px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#D6DCE0] px-4 sm:px-8 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#0E344D] text-white flex items-center justify-center font-['Space_Grotesk'] font-bold text-xs shrink-0">
              AB
            </div>
            <div className="min-w-0">
              <div className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#0E344D] leading-tight truncate">
                Ankle Biometrics &amp; Kinematics
              </div>
              <div className="text-[11px] text-[#5D6870] font-['Plus_Jakarta_Sans'] truncate">
                Physiological, Clinical &amp; Ergonomic Evidence Synthesis · 83 Peer-Reviewed Citations
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2">
            {/* View Mode Segmented Switcher */}
            <div className="inline-flex items-center p-1 rounded-lg bg-[#F1F3F4] border border-[#D6DCE0]">
              <button
                type="button"
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1.5 rounded-md font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'dashboard'
                    ? 'bg-[#25665D] text-white shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                Interactive Synthesis
              </button>
              <button
                type="button"
                onClick={() => setViewMode('manuscript')}
                className={`px-3 py-1.5 rounded-md font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'manuscript'
                    ? 'bg-[#0E344D] text-white shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                Full Manuscript &amp; 83 Citations
              </button>
            </div>

            {viewMode === 'dashboard' && (
              <nav
                aria-label="Report Section Jump Links"
                className="flex items-center gap-1 overflow-x-auto text-xs font-['Space_Grotesk'] font-semibold"
              >
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'kinematics', label: '1. Step & Gait Lab' },
                  { id: 'vascular', label: '2. Vascular & PPG' },
                  { id: 'biomechanics', label: '3. Clinical & Kinetics' },
                  { id: 'lifestyle', label: '4. Ergonomics & Style' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id as SectionAnchor)}
                    className="px-2.5 py-1.5 rounded-lg text-[#36454F] hover:text-[#25665D] hover:bg-[#E8F3F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-10 space-y-12">
        {viewMode === 'dashboard' ? (
          <>
            {/* SECTION 0: OVERVIEW & ANATOMICAL COMPARATOR */}
            <section id="ankle-overview" className="scroll-mt-36 space-y-8">
              <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
                <div className="max-w-4xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-['Space_Grotesk'] font-semibold uppercase tracking-widest text-[#25665D]">
                    <span>Biomedical &amp; Sports Science Synthesis</span>
                    <span aria-hidden="true" className="text-[#D6DCE0]">·</span>
                    <span className="text-[#18587A]">Supramalleolar Placement Study</span>
                    <span aria-hidden="true" className="text-[#D6DCE0]">·</span>
                    <button
                      type="button"
                      onClick={() => setViewMode('manuscript')}
                      className="text-[#18587A] underline hover:text-[#25665D] cursor-pointer normal-case tracking-normal"
                    >
                      Read full monograph (83 sources)
                    </button>
                  </div>

                  <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E344D] tracking-tight leading-tight text-balance">
                    Why the Supramalleolar Ankle Outperforms the Wrist in Wearable Health Monitoring
                  </h1>

                  <p className="font-['Plus_Jakarta_Sans'] text-[#36454F] text-base sm:text-lg leading-relaxed">
                    While consumer wearables defaulted to the wrist out of wristwatch convention, the distal forearm is mechanically decoupled from locomotion and prone to peripheral vasoconstriction. Relocating optical and inertial sensors to the ankle couples measurement directly to the body&apos;s primary locomotor engine and stable deep vasculature—delivering clinical-grade precision while freeing the wrist for occupational safety, athletic gear, and personal style.
                  </p>
                </div>

                {/* 4-Column KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between">
                    <div>
                      <div className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-wider text-[#25665D]">
                        Hand-Task Artifact Error
                      </div>
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-bold font-mono tabular-nums text-[#0E344D]">0.0%</span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-[#9E2A22] bg-[#FDF1F0] border border-[#C23B32]/25 px-2 py-0.5 rounded">
                          vs. &gt;57% Wrist
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#36454F] leading-relaxed">
                      Immune to non-ambulatory hand movements such as typing, washing dishes, or playing cards.
                    </p>
                  </div>

                  <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between">
                    <div>
                      <div className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-wider text-[#25665D]">
                        Active Heart Rate Error
                      </div>
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-bold font-mono tabular-nums text-[#0E344D]">
                          &lt;3.8 <span className="text-sm font-semibold text-[#5D6870]">bpm</span>
                        </span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-[#9E2A22] bg-[#FDF1F0] border border-[#C23B32]/25 px-2 py-0.5 rounded">
                          vs. 5–15+ Wrist
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#36454F] leading-relaxed">
                      Posterior tibial artery targeting resists motion artifacts and cold-induced vasoconstriction.
                    </p>
                  </div>

                  <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between">
                    <div>
                      <div className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-wider text-[#25665D]">
                        PAD Screening Sensitivity
                      </div>
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-bold font-mono tabular-nums text-[#0E344D]">68.1%</span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-[#9E2A22] bg-[#FDF1F0] border border-[#C23B32]/25 px-2 py-0.5 rounded">
                          vs. 19.1% ABI
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#36454F] leading-relaxed">
                      Ankle PPGratio detects below-knee single-artery stenosis even in calcified, non-compressible vessels.
                    </p>
                  </div>

                  <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between">
                    <div>
                      <div className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-wider text-[#25665D]">
                        FoG Pre-Freeze Prediction
                      </div>
                      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-bold font-mono tabular-nums text-[#0E344D]">
                          1.8 <span className="text-sm font-semibold text-[#5D6870]">sec</span>
                        </span>
                        <span className="text-xs font-semibold text-[#25665D] bg-[#E8F3F1] border border-[#3B8E82]/30 px-2 py-0.5 rounded">
                          Ankle Exclusive
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#36454F] leading-relaxed">
                      Detects impending Freezing of Gait in Parkinson&apos;s patients early enough to trigger sensory cues.
                    </p>
                  </div>
                </div>

                {/* Interactive Anatomical Site Comparison */}
                <div className="pt-6 border-t border-[#E4E8EB] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-['Space_Grotesk'] text-sm font-bold text-[#0E344D] uppercase tracking-wide">
                        Interactive Site Comparison: Anatomical &amp; Signal Coupling
                      </h2>
                      <p className="text-xs text-[#5D6870]">
                        Select an anatomical site below to inspect its mechanical, vascular, and practical characteristics.
                      </p>
                    </div>

                    <div className="inline-flex rounded-lg bg-[#F1F3F4] p-1 border border-[#D6DCE0] self-start shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveSite('ankle')}
                        className={`px-4 py-1.5 rounded-md font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeSite === 'ankle'
                            ? 'bg-[#25665D] text-white shadow-xs'
                            : 'text-[#36454F] hover:text-[#0E344D]'
                        }`}
                      >
                        Ankle (Supramalleolar)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSite('wrist')}
                        className={`px-4 py-1.5 rounded-md font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeSite === 'wrist'
                            ? 'bg-[#C23B32] text-white shadow-xs'
                            : 'text-[#36454F] hover:text-[#0E344D]'
                        }`}
                      >
                        Wrist (Distal Forearm)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F1F3F4] rounded-xl p-5 border border-[#D6DCE0]">
                    {SITE_COMPARISON_DATA[activeSite].map((card) => (
                      <div key={card.title} className="bg-white rounded-lg p-4 border border-[#D6DCE0] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0E344D]">
                            {card.title}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                              activeSite === 'ankle'
                                ? 'bg-[#E8F3F1] text-[#25665D]'
                                : 'bg-[#FDF1F0] text-[#9E2A22]'
                            }`}
                          >
                            {card.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#36454F] leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 01: STEP & GAIT ACCURACY LAB */}
            <section id="ankle-kinematics" className="scroll-mt-36 space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                  Section 01 · Locomotor Mechanics
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#0E344D] text-balance">
                  Kinematic Superiority: Step Quantification &amp; Metabolic Accuracy
                </h2>
                <p className="text-[#36454F] text-sm sm:text-base leading-relaxed">
                  Wrist trackers rely on an indirect heuristic: assuming rhythmic arm swing equals lower-body steps. Filter the empirical error rates below to compare how direct coupling to heel-strike and toe-off transients at the ankle eliminates both false positives during sedentary hand tasks and severe undercounting during slow or assisted walking.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E4E8EB]">
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                      Step Count Error Rate (MAPE %) by Sensor Location
                    </h3>
                    <p className="text-xs text-[#5D6870]">
                      Filter by ambulatory or sedentary scenario to compare Wrist, Waist/Hip, and Ankle accuracy.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'All Scenarios' },
                      { id: 'slow', label: 'Ultra-Slow Gait (0.3–0.5 m/s)' },
                      { id: 'obstructed', label: 'Walker / Stroller' },
                      { id: 'hand', label: 'Sedentary Hand Tasks' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => {
                          setKinematicKey(btn.id as KinematicScenarioKey);
                          setHoveredKinematicIdx(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          kinematicKey === btn.id
                            ? 'bg-[#25665D] text-white border-[#25665D]'
                            : 'bg-white text-[#36454F] border-[#D6DCE0] hover:bg-[#F1F3F4]'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Grouped Vertical Bar Chart */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="bg-[#F7F8F7] rounded-xl border border-[#D6DCE0] p-5">
                      <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#5D6870]">
                        <span>Y-AXIS: MEAN ABSOLUTE PERCENTAGE ERROR (MAPE %)</span>
                        <span>LOWER = HIGHER ACCURACY</span>
                      </div>

                      <div className="relative h-64 flex">
                        {/* Y-Axis Scale */}
                        <div className="w-10 flex flex-col justify-between items-end pr-2 text-[11px] font-mono tabular-nums text-[#5D6870] pb-12">
                          <span>80%</span>
                          <span>60%</span>
                          <span>40%</span>
                          <span>20%</span>
                          <span>0%</span>
                        </div>

                        {/* Chart Plot Area */}
                        <div className="flex-1 flex flex-col">
                          <div className="relative flex-1 border-l border-b border-[#CBD5DC] flex items-end justify-around px-2 sm:px-6 gap-4">
                            {/* Grid lines */}
                            {[25, 50, 75, 100].map((pct) => (
                              <div
                                key={pct}
                                className="absolute left-0 right-0 border-t border-dashed border-[#D6DCE0] pointer-events-none"
                                style={{ bottom: `${pct}%` }}
                              />
                            ))}

                            {currentKinematic.labels.map((label, idx) => {
                              const wVal = currentKinematic.wrist[idx];
                              const hVal = currentKinematic.waist[idx];
                              const aVal = currentKinematic.ankle[idx];
                              const isHovered = hoveredKinematicIdx === idx;

                              return (
                                <div
                                  key={label}
                                  onMouseEnter={() => setHoveredKinematicIdx(idx)}
                                  onMouseLeave={() => setHoveredKinematicIdx(null)}
                                  className="relative flex-1 max-w-[160px] h-full flex items-end justify-center gap-1.5 sm:gap-2.5 px-1 cursor-crosshair z-10"
                                >
                                  {/* Hover Tooltip */}
                                  {isHovered && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full z-20 bg-[#0E344D] text-white rounded-lg p-2.5 shadow-lg text-[11px] font-mono tabular-nums whitespace-nowrap pointer-events-none space-y-0.5">
                                      <div className="font-['Space_Grotesk'] font-bold text-[#7EC4B9] mb-1">
                                        {label}
                                      </div>
                                      <div>Wrist MAPE: {wVal.toFixed(1)}%</div>
                                      <div>Waist / Hip MAPE: {hVal.toFixed(1)}%</div>
                                      <div>Ankle MAPE: {aVal.toFixed(1)}%</div>
                                    </div>
                                  )}

                                  {/* Wrist Bar */}
                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-bold text-[#9E2A22] mb-1">
                                      {wVal.toFixed(1)}%
                                    </span>
                                    <div
                                      className="w-full max-w-[30px] rounded-t-md bg-[#C23B32] transition-all duration-300"
                                      style={{ height: `${Math.max((wVal / 80) * 100, 2)}%` }}
                                    />
                                  </div>

                                  {/* Waist / Hip Bar */}
                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-semibold text-[#5D6870] mb-1">
                                      {hVal.toFixed(1)}%
                                    </span>
                                    <div
                                      className="w-full max-w-[30px] rounded-t-md bg-[#8C99A2] transition-all duration-300"
                                      style={{ height: `${Math.max((hVal / 80) * 100, 2)}%` }}
                                    />
                                  </div>

                                  {/* Ankle Bar */}
                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-bold text-[#25665D] mb-1">
                                      {aVal.toFixed(1)}%
                                    </span>
                                    <div
                                      className="w-full max-w-[30px] rounded-t-md bg-[#3B8E82] transition-all duration-300"
                                      style={{ height: `${Math.max((aVal / 80) * 100, 3)}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* X-Axis Labels */}
                          <div className="h-12 flex items-start justify-around px-2 sm:px-6 gap-4 pt-2">
                            {currentKinematic.labels.map((label) => (
                              <div
                                key={label}
                                className="flex-1 max-w-[160px] text-center text-[11px] font-['Space_Grotesk'] font-semibold text-[#36454F] leading-tight"
                              >
                                {label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="pt-3 border-t border-[#E4E8EB] flex flex-wrap items-center justify-center gap-5 text-xs font-['Space_Grotesk']">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-xs bg-[#C23B32]" />
                          <span className="text-[#36454F] font-medium">Wrist Tracker Error (%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-xs bg-[#8C99A2]" />
                          <span className="text-[#36454F] font-medium">Waist / Hip Error (%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-xs bg-[#3B8E82]" />
                          <span className="text-[#0E344D] font-bold">Ankle Tracker Error (%)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-xs text-[#5D6870]">
                      Lower percentage indicates higher step-counting accuracy. Derived from ActiGraph &amp; clinical gait validation studies.
                    </p>
                  </div>

                  {/* Insight + Energy Expenditure Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] space-y-3">
                      <div className="inline-block px-2.5 py-0.5 rounded bg-[#FDF1F0] border border-[#C23B32]/25 text-[#9E2A22] font-['Space_Grotesk'] text-xs font-bold">
                        {currentKinematic.stat}
                      </div>
                      <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#0E344D]">
                        {currentKinematic.title}
                      </h4>
                      <p className="text-xs text-[#36454F] leading-relaxed">{currentKinematic.body}</p>
                    </div>

                    <div className="bg-[#E8F3F1] rounded-xl p-5 border border-[#3B8E82]/35 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                          Energy Expenditure (EE) &amp; METs
                        </span>
                        <span className="font-mono tabular-nums text-xs font-bold text-[#0E344D] bg-white px-2.5 py-0.5 rounded border border-[#3B8E82]/30">
                          r &gt; 0.90 Correlation
                        </span>
                      </div>
                      <p className="text-xs text-[#36454F] leading-relaxed">
                        Because the lower extremities house the majority of active muscle mass, ankle Vector Magnitude (VM) acceleration correlates closely with indirect calorimetry (VO₂). Wrist trackers systematically overestimate Moderate-to-Vigorous Physical Activity (MVPA) during typing or gesticulating while misclassifying hands-in-pocket walking as sedentary.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 02: VASCULAR ANATOMY & OPTICAL PPG */}
            <section id="ankle-vascular" className="scroll-mt-36 space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                  Section 02 · Hemodynamics &amp; Optical Physics
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#0E344D] text-balance">
                  Vascular Anatomy &amp; Photoplethysmography (PPG) Precision
                </h2>
                <p className="text-[#36454F] text-sm sm:text-base leading-relaxed">
                  Optical heart rate and perfusion sensors require stable blood flow and uniform skin contact. Inspect how targeting the posterior tibial artery at the ankle overcomes radial/ulnar vasoconstriction and erratic hand motion—and how ankle PPG unlocks superior clinical screening for Peripheral Arterial Disease (PAD).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card 1: HR MAE */}
                <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 shadow-sm flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                        Heart Rate Mean Absolute Error (MAE in bpm)
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#E8F3F1] text-[#25665D] border border-[#3B8E82]/30">
                        SVD &amp; Adaptive Filtering
                      </span>
                    </div>
                    <p className="text-xs text-[#5D6870]">
                      Comparison of optical heart rate error at rest vs. during walking and active hand movement.
                    </p>
                  </div>

                  {/* HR MAE Chart */}
                  <div className="bg-[#F7F8F7] rounded-xl border border-[#D6DCE0] p-4 space-y-3">
                    <div className="relative h-56 flex">
                      <div className="w-10 flex flex-col justify-between items-end pr-2 text-[11px] font-mono tabular-nums text-[#5D6870] pb-9">
                        <span>16 bpm</span>
                        <span>12</span>
                        <span>8</span>
                        <span>4</span>
                        <span>0</span>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="relative flex-1 border-l border-b border-[#CBD5DC] flex items-end justify-around px-4 gap-6">
                          {[25, 50, 75, 100].map((pct) => (
                            <div
                              key={pct}
                              className="absolute left-0 right-0 border-t border-dashed border-[#D6DCE0] pointer-events-none"
                              style={{ bottom: `${pct}%` }}
                            />
                          ))}

                          {PPG_HR_METRICS.map((item, idx) => (
                            <div
                              key={item.state}
                              onMouseEnter={() => setHoveredHrIdx(idx)}
                              onMouseLeave={() => setHoveredHrIdx(null)}
                              className="relative flex-1 max-w-[160px] h-full flex items-end justify-center gap-3 cursor-crosshair z-10"
                            >
                              {hoveredHrIdx === idx && (
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-20 bg-[#0E344D] text-white rounded-lg p-2.5 shadow-lg text-[11px] space-y-0.5 max-w-[240px]">
                                  <div className="font-['Space_Grotesk'] font-bold text-[#7EC4B9]">{item.state}</div>
                                  <div>Wrist: {item.wristDetail}</div>
                                  <div>Ankle: {item.ankleDetail}</div>
                                </div>
                              )}

                              <div className="flex-1 h-full flex flex-col justify-end items-center">
                                <span className="text-[11px] font-mono tabular-nums font-bold text-[#9E2A22] mb-1">
                                  {item.wristMae.toFixed(1)}
                                </span>
                                <div
                                  className="w-full max-w-[36px] rounded-t-md bg-[#C23B32] transition-all duration-300"
                                  style={{ height: `${(item.wristMae / 16) * 100}%` }}
                                />
                              </div>

                              <div className="flex-1 h-full flex flex-col justify-end items-center">
                                <span className="text-[11px] font-mono tabular-nums font-bold text-[#25665D] mb-1">
                                  {item.ankleMae.toFixed(2)}
                                </span>
                                <div
                                  className="w-full max-w-[36px] rounded-t-md bg-[#3B8E82] transition-all duration-300"
                                  style={{ height: `${(item.ankleMae / 16) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="h-9 flex items-start justify-around px-4 gap-6 pt-2">
                          {PPG_HR_METRICS.map((item) => (
                            <div
                              key={item.state}
                              className="flex-1 max-w-[160px] text-center text-[11px] font-['Space_Grotesk'] font-semibold text-[#36454F]"
                            >
                              {item.state}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E4E8EB] flex items-center justify-center gap-5 text-xs font-['Space_Grotesk']">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#C23B32]" />
                        <span className="text-[#36454F]">Wrist PPG Error (MAE bpm)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#3B8E82]" />
                        <span className="text-[#0E344D] font-bold">Ankle PPG Error (MAE bpm)</span>
                      </div>
                    </div>
                  </div>

                  {/* Vessel Anatomy / PPG Waveform Switcher */}
                  <div className="bg-[#F7F8F7] rounded-xl p-4 border border-[#D6DCE0] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0E344D]">
                        Inspect Vascular &amp; Waveform Advantage:
                      </span>
                      <div className="inline-flex rounded-md bg-white border border-[#D6DCE0] p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => setPpgDetailTab('anatomy')}
                          className={`px-2.5 py-1 rounded font-['Space_Grotesk'] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            ppgDetailTab === 'anatomy'
                              ? 'bg-[#25665D] text-white'
                              : 'text-[#36454F] hover:text-[#0E344D]'
                          }`}
                        >
                          Vessel Anatomy
                        </button>
                        <button
                          type="button"
                          onClick={() => setPpgDetailTab('morphology')}
                          className={`px-2.5 py-1 rounded font-['Space_Grotesk'] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            ppgDetailTab === 'morphology'
                              ? 'bg-[#25665D] text-white'
                              : 'text-[#36454F] hover:text-[#0E344D]'
                          }`}
                        >
                          PPG Waveform
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#36454F] leading-relaxed">
                      <strong className="text-[#0E344D]">{PPG_DETAIL_COPY[ppgDetailTab].title}:</strong>{' '}
                      {PPG_DETAIL_COPY[ppgDetailTab].body}
                    </p>
                  </div>
                </div>

                {/* Card 2: PAD Screening Sensitivity */}
                <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 shadow-sm flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                        Peripheral Arterial Disease (PAD) Diagnostic Sensitivity
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#E8F0F4] text-[#18587A] border border-[#18587A]/25">
                        Clinical Vascular Utility
                      </span>
                    </div>
                    <p className="text-xs text-[#5D6870]">
                      Detection sensitivity for below-knee single-artery stenosis in patients with arterial calcification.
                    </p>
                  </div>

                  {/* Horizontal Bar Chart */}
                  <div className="bg-[#F7F8F7] rounded-xl border border-[#D6DCE0] p-5 space-y-5">
                    <div className="space-y-4">
                      {PAD_SENSITIVITY_DATA.map((bar, idx) => {
                        const barColor =
                          bar.tone === 'seaglass'
                            ? '#25665D'
                            : bar.tone === 'ocean'
                            ? '#18587A'
                            : '#8C99A2';
                        return (
                          <div
                            key={bar.label}
                            onMouseEnter={() => setHoveredPadIdx(idx)}
                            onMouseLeave={() => setHoveredPadIdx(null)}
                            className="space-y-1.5 cursor-crosshair"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-['Space_Grotesk'] font-semibold text-[#0E344D]">
                                {bar.label}
                              </span>
                              <span
                                className="font-mono tabular-nums font-bold"
                                style={{ color: barColor }}
                              >
                                {bar.value.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full h-7 rounded-md bg-[#E4E8EB] overflow-hidden relative">
                              <div
                                className="h-full rounded-r-md transition-all duration-300 flex items-center justify-end pr-2 text-[10px] font-mono text-white font-semibold"
                                style={{ width: `${bar.value}%`, backgroundColor: barColor }}
                              >
                                {bar.value > 25 ? `${bar.value.toFixed(1)}%` : ''}
                              </div>
                            </div>
                            <div
                              className={`text-[11px] transition-colors ${
                                hoveredPadIdx === idx ? 'text-[#0E344D] font-medium' : 'text-[#5D6870]'
                              }`}
                            >
                              {bar.note}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#5D6870] pt-2 border-t border-[#E4E8EB]">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100% Sensitivity</span>
                    </div>
                  </div>

                  {/* Clinical Context Card */}
                  <div className="bg-[#F7F8F7] rounded-xl p-4 border border-[#D6DCE0] space-y-2">
                    <div className="font-['Space_Grotesk'] text-xs font-bold text-[#0E344D]">
                      Why Ankle PPG Outperforms Cuff-Based ABI (68.1% vs. 19.1%)
                    </div>
                    <p className="text-xs text-[#36454F] leading-relaxed">
                      In patients with diabetes or chronic kidney disease, medial arterial calcification renders tibial arteries non-compressible, causing false-negative Ankle-Brachial Index (ABI) cuff readings. Optical{' '}
                      <strong className="text-[#0E344D]">PPGratio</strong> (pulsatile AC to non-pulsatile DC ratio) measures microvascular perfusion directly without arterial compression, while also capturing orthostatic venoarteriolar reflexes (~80 mmHg hydrostatic column).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 03: EXCLUSIVE ANKLE BIOMECHANICS & NEUROLOGICAL DIAGNOSTICS */}
            <section id="ankle-biomechanics" className="scroll-mt-36 space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                  Section 03 · Exclusive Ankle Capabilities
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#0E344D] text-balance">
                  Functions Only an Ankle Tracker Can Perform
                </h2>
                <p className="text-[#36454F] text-sm sm:text-base leading-relaxed">
                  Because the wrist never strikes the ground and does not exhibit lower-limb neurological tremors, a 6-axis Inertial Measurement Unit (IMU) at the ankle unlocks diagnostic and athletic capabilities impossible on the upper body.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-6">
                {/* Domain Subtabs */}
                <div className="flex flex-wrap gap-2 border-b border-[#E4E8EB] pb-4">
                  <button
                    type="button"
                    onClick={() => setBiomechDomain('sports')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-['Space_Grotesk'] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      biomechDomain === 'sports'
                        ? 'bg-[#0E344D] text-white border-[#0E344D]'
                        : 'bg-white text-[#36454F] border-[#D6DCE0] hover:bg-[#F1F3F4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">directions_run</span>
                    <span>Running &amp; Impact Biomechanics</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBiomechDomain('neuro')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-['Space_Grotesk'] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      biomechDomain === 'neuro'
                        ? 'bg-[#0E344D] text-white border-[#0E344D]'
                        : 'bg-white text-[#36454F] border-[#D6DCE0] hover:bg-[#F1F3F4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">neurology</span>
                    <span>Clinical Neurology (Parkinson&apos;s &amp; Stroke)</span>
                  </button>
                </div>

                {biomechDomain === 'sports' ? (
                  <div className="space-y-6">
                    {/* 4 Kinetic Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-[#F7F8F7] border border-[#D6DCE0] space-y-1.5">
                        <div className="font-['Space_Grotesk'] text-[11px] font-bold text-[#25665D] uppercase tracking-wider">
                          Peak Tibial Acceleration
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#0E344D]">
                          &plusmn;16g to &plusmn;32g
                        </div>
                        <p className="text-xs text-[#36454F]">
                          Captures instantaneous vertical impact shockwaves to assess tibial stress fracture &amp; MTSS injury risk.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F7F8F7] border border-[#D6DCE0] space-y-1.5">
                        <div className="font-['Space_Grotesk'] text-[11px] font-bold text-[#25665D] uppercase tracking-wider">
                          Ground Contact Time
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#0E344D]">
                          Millisecond Precision
                        </div>
                        <p className="text-xs text-[#36454F]">
                          Measures exact stance duration and leg spring stiffness outside laboratory force plates.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F7F8F7] border border-[#D6DCE0] space-y-1.5">
                        <div className="font-['Space_Grotesk'] text-[11px] font-bold text-[#25665D] uppercase tracking-wider">
                          Vertical Oscillation
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#0E344D]">
                          ICC &gt; 0.85
                        </div>
                        <p className="text-xs text-[#36454F]">
                          Quantifies wasted vertical mechanical energy per stride, matching optical motion-capture accuracy.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F7F8F7] border border-[#D6DCE0] space-y-1.5">
                        <div className="font-['Space_Grotesk'] text-[11px] font-bold text-[#25665D] uppercase tracking-wider">
                          Joint Angle Prediction
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-[#0E344D]">
                          2.14&deg; RMSE
                        </div>
                        <p className="text-xs text-[#36454F]">
                          Random Forest &amp; CNN models reconstruct ankle dorsiflexion/plantarflexion and sagittal Ground Reaction Forces.
                        </p>
                      </div>
                    </div>

                    {/* Foot-Strike Spectral Analyzer + Edge Signal Pipeline */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-6 bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#0E344D]">
                              Foot-Strike Spectral Analyzer
                            </h4>
                            <div className="inline-flex rounded-md bg-white border border-[#D6DCE0] p-0.5 text-xs">
                              <button
                                type="button"
                                onClick={() => setStrikeMode('ffs')}
                                className={`px-2.5 py-1 rounded font-['Space_Grotesk'] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                  strikeMode === 'ffs'
                                    ? 'bg-[#25665D] text-white'
                                    : 'text-[#36454F] hover:text-[#0E344D]'
                                }`}
                              >
                                Forefoot Strike
                              </button>
                              <button
                                type="button"
                                onClick={() => setStrikeMode('rfs')}
                                className={`px-2.5 py-1 rounded font-['Space_Grotesk'] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                  strikeMode === 'rfs'
                                    ? 'bg-[#18587A] text-white'
                                    : 'text-[#36454F] hover:text-[#0E344D]'
                                }`}
                              >
                                Rearfoot Strike
                              </button>
                            </div>
                          </div>

                          <div className="text-xs font-['Space_Grotesk'] font-semibold text-[#18587A]">
                            {currentStrike.badge}
                          </div>

                          <p className="text-xs text-[#36454F] leading-relaxed">{currentStrike.text}</p>

                          {/* Spectral Power Distribution Meters */}
                          <div className="space-y-2.5 pt-2">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#36454F]">
                                <span>Active Push-Off Band (3–8 Hz)</span>
                                <span className="font-bold text-[#25665D]">{currentStrike.activeBandPct}% PSD</span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-[#E4E8EB] overflow-hidden">
                                <div
                                  className="h-full bg-[#3B8E82] transition-all duration-300"
                                  style={{ width: `${currentStrike.activeBandPct}%` }}
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#36454F]">
                                <span>Impact Transient Band (9–20 Hz)</span>
                                <span
                                  className={`font-bold ${
                                    strikeMode === 'rfs' ? 'text-[#9E2A22]' : 'text-[#18587A]'
                                  }`}
                                >
                                  {currentStrike.impactBandPct}% PSD
                                </span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-[#E4E8EB] overflow-hidden">
                                <div
                                  className="h-full transition-all duration-300"
                                  style={{
                                    width: `${currentStrike.impactBandPct}%`,
                                    backgroundColor: strikeMode === 'rfs' ? '#C23B32' : '#18587A',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E4E8EB] flex items-center justify-between text-xs font-mono tabular-nums text-[#5D6870]">
                          <span>Active Push-Off: 3–8 Hz</span>
                          <span>Impact Transient: 9–20 Hz</span>
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#0E344D]">
                            Edge Signal Processing Architecture
                          </h4>
                          <p className="text-xs text-[#5D6870]">
                            How raw ankle IMU streams become laboratory-grade kinetic waveforms:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-white p-3.5 rounded-lg border border-[#D6DCE0] space-y-1.5">
                            <div className="font-['Space_Grotesk'] text-xs font-bold text-[#25665D]">
                              1. Wavelet Transform
                            </div>
                            <p className="text-[11px] text-[#36454F] leading-relaxed">
                              Discrete Wavelet Transforms (Coiflet, Daubechies, Symlets) isolate non-stationary heel-strike &amp; toe-off transients.
                            </p>
                          </div>

                          <div className="bg-white p-3.5 rounded-lg border border-[#D6DCE0] space-y-1.5">
                            <div className="font-['Space_Grotesk'] text-xs font-bold text-[#18587A]">
                              2. Kalman Filtering
                            </div>
                            <p className="text-[11px] text-[#36454F] leading-relaxed">
                              Extended Kalman Filters (EKF) eliminate gyroscope integration drift to track 3D foot clearance and trajectory.
                            </p>
                          </div>

                          <div className="bg-white p-3.5 rounded-lg border border-[#D6DCE0] space-y-1.5">
                            <div className="font-['Space_Grotesk'] text-xs font-bold text-[#0E344D]">
                              3. Deep Learning GRF
                            </div>
                            <p className="text-[11px] text-[#36454F] leading-relaxed">
                              CNNs and LSTM networks map 3D shank acceleration directly to vertical Ground Reaction Force curves.
                            </p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-[#D6DCE0] flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-['Space_Grotesk'] font-semibold text-[#0E344D]">
                            Sagittal Plane Joint &amp; GRF Fidelity
                          </span>
                          <span className="font-mono tabular-nums text-[#25665D] font-bold">
                            Foot-Contact Timing ±ms · Joint RMSE 2.14°
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* NEUROLOGY PANEL */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-3">
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                          Machine Learning Classification Accuracy on Ankle IMU Data
                        </h3>
                        <p className="text-xs text-[#5D6870]">
                          Sensitivity, Specificity, and Overall Accuracy for Parkinson&apos;s Freezing of Gait (FoG) and exoskeleton control.
                        </p>
                      </div>

                      <div className="bg-[#F7F8F7] rounded-xl border border-[#D6DCE0] p-4 space-y-3">
                        <div className="relative h-60 flex">
                          <div className="w-10 flex flex-col justify-between items-end pr-2 text-[11px] font-mono tabular-nums text-[#5D6870] pb-11">
                            <span>100%</span>
                            <span>75%</span>
                            <span>50%</span>
                            <span>25%</span>
                            <span>0%</span>
                          </div>

                          <div className="flex-1 flex flex-col">
                            <div className="relative flex-1 border-l border-b border-[#CBD5DC] flex items-end justify-around px-2 sm:px-6 gap-4">
                              {[25, 50, 75, 100].map((pct) => (
                                <div
                                  key={pct}
                                  className="absolute left-0 right-0 border-t border-dashed border-[#D6DCE0] pointer-events-none"
                                  style={{ bottom: `${pct}%` }}
                                />
                              ))}

                              {neuroChartModels.map((m, idx) => (
                                <div
                                  key={m.model}
                                  onMouseEnter={() => setHoveredNeuroIdx(idx)}
                                  onMouseLeave={() => setHoveredNeuroIdx(null)}
                                  className="relative flex-1 max-w-[160px] h-full flex items-end justify-center gap-1.5 cursor-crosshair z-10"
                                >
                                  {hoveredNeuroIdx === idx && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-20 bg-[#0E344D] text-white rounded-lg p-2.5 shadow-lg text-[11px] font-mono tabular-nums whitespace-nowrap space-y-0.5">
                                      <div className="font-['Space_Grotesk'] font-bold text-[#7EC4B9]">
                                        {m.shortLabel}
                                      </div>
                                      <div>Sensitivity: {m.sensitivity?.toFixed(2)}%</div>
                                      <div>Specificity: {m.specificity?.toFixed(2)}%</div>
                                      <div>Accuracy: {m.accuracy.toFixed(2)}%</div>
                                    </div>
                                  )}

                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-semibold text-[#25665D] mb-1">
                                      {m.sensitivity?.toFixed(1)}
                                    </span>
                                    <div
                                      className="w-full max-w-[26px] rounded-t-md bg-[#25665D]"
                                      style={{ height: `${m.sensitivity ?? 0}%` }}
                                    />
                                  </div>

                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-semibold text-[#18587A] mb-1">
                                      {m.specificity?.toFixed(1)}
                                    </span>
                                    <div
                                      className="w-full max-w-[26px] rounded-t-md bg-[#3B8E82]"
                                      style={{ height: `${m.specificity ?? 0}%` }}
                                    />
                                  </div>

                                  <div className="flex-1 h-full flex flex-col justify-end items-center">
                                    <span className="text-[10px] font-mono tabular-nums font-bold text-[#0E344D] mb-1">
                                      {m.accuracy.toFixed(1)}
                                    </span>
                                    <div
                                      className="w-full max-w-[26px] rounded-t-md bg-[#0E344D]"
                                      style={{ height: `${m.accuracy}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="h-11 flex items-start justify-around px-2 sm:px-6 gap-4 pt-2">
                              {neuroChartModels.map((m) => (
                                <div
                                  key={m.model}
                                  className="flex-1 max-w-[160px] text-center text-[11px] font-['Space_Grotesk'] font-semibold text-[#36454F] leading-tight"
                                >
                                  {m.shortLabel}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#E4E8EB] flex flex-wrap items-center justify-center gap-5 text-xs font-['Space_Grotesk']">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-xs bg-[#25665D]" />
                            <span className="text-[#36454F]">Sensitivity (%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-xs bg-[#3B8E82]" />
                            <span className="text-[#36454F]">Specificity (%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-xs bg-[#0E344D]" />
                            <span className="text-[#0E344D] font-bold">Overall Accuracy (%)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-[#E8F3F1] rounded-xl p-5 border border-[#3B8E82]/35 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                            Closed-Loop FoG Intervention
                          </span>
                          <span className="font-mono tabular-nums text-xs font-bold text-[#0E344D] bg-white px-2.5 py-0.5 rounded border border-[#3B8E82]/35">
                            -1.8s Lead Time
                          </span>
                        </div>
                        <p className="text-xs text-[#36454F] leading-relaxed">
                          In advanced Parkinson&apos;s Disease, Freezing of Gait manifests as high-frequency lower-limb trembling (<strong className="text-[#0E344D]">3–8 Hz</strong>) compared to normal locomotion (<strong className="text-[#0E344D]">0.5–3 Hz</strong>). Time-series models detect subtle stride-length decay up to <strong className="text-[#0E344D]">1.8 seconds before</strong> an actual freeze occurs—triggering rhythmic haptic or auditory cues at the ankle to bypass basal ganglia deficits and prevent forward falls.
                        </p>
                      </div>

                      <div className="bg-[#F7F8F7] rounded-xl p-5 border border-[#D6DCE0] space-y-2">
                        <h4 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#0E344D]">
                          Bilateral Stroke &amp; Arthroplasty Symmetry
                        </h4>
                        <p className="text-xs text-[#36454F] leading-relaxed">
                          Wrist sensors provide zero insight into inter-limb coordination. Dual ankle accelerometers quantify hemiparetic swing-time deficits, circumduction, and vertical impact asymmetry between paretic and non-paretic limbs to guide neuroplasticity-focused physical therapy (plus SVM/KNN general impairment accuracy at <strong className="font-mono tabular-nums text-[#0E344D]">94.90%</strong>).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 04: ERGONOMICS, COMPLIANCE & SARTORIAL FREEDOM */}
            <section id="ankle-lifestyle" className="scroll-mt-36 space-y-6">
              <div className="max-w-3xl space-y-2">
                <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                  Section 04 · Ergonomics, Compliance &amp; Aesthetics
                </div>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#0E344D] text-balance">
                  The Unobstructed Wrist: Occupational, Athletic &amp; Style Freedom
                </h2>
                <p className="text-[#36454F] text-sm sm:text-base leading-relaxed">
                  Long-term wearable adherence depends on seamless integration into daily life. In hospitals, weight rooms, and formal settings, a wrist tracker is often banned, hazardous, or aesthetically intrusive. Select an environment below to inspect how an unobstructed wrist transforms compliance.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-6">
                {/* Environment Switcher */}
                <div className="flex flex-wrap gap-2">
                  {(['clinical', 'athletic', 'style'] as LifestyleKey[]).map((key) => {
                    const item = LIFESTYLE_DATA[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setLifestyleTab(key)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-['Space_Grotesk'] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          lifestyleTab === key
                            ? 'bg-[#25665D] text-white'
                            : 'bg-[#F1F3F4] text-[#36454F] hover:bg-[#E4E8EB]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Split Wrist Limitation vs Ankle Resolution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  <div className="bg-[#FDF1F0] rounded-xl p-5 border border-[#C23B32]/25 space-y-3">
                    <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#9E2A22]">
                      Wrist Limitation
                    </div>
                    <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                      {currentLifestyle.problemTitle}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#36454F] leading-relaxed">
                      {currentLifestyle.problemPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[16px] text-[#C23B32] shrink-0 mt-0.5">
                            close
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#E8F3F1] rounded-xl p-5 border border-[#3B8E82]/30 space-y-3">
                    <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                      Ankle Resolution
                    </div>
                    <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D]">
                      {currentLifestyle.solutionTitle}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#36454F] leading-relaxed">
                      {currentLifestyle.solutionPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[16px] text-[#25665D] shrink-0 mt-0.5">
                            check
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Summary Comparison Table */}
                <div className="pt-4 border-t border-[#E4E8EB] overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#D6DCE0] text-[#5D6870] font-['Space_Grotesk'] uppercase text-[11px] tracking-wider">
                        <th className="py-3 pr-4 font-semibold">Evaluation Dimension</th>
                        <th className="py-3 px-4 font-semibold text-[#9E2A22]">Wrist-Worn Tracker</th>
                        <th className="py-3 pl-4 font-semibold text-[#25665D]">Ankle-Worn Tracker</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E8EB] text-[#36454F]">
                      {LIFESTYLE_COMPARISON_TABLE.map((row) => (
                        <tr key={row.dimension}>
                          <td className="py-3 pr-4 font-semibold text-[#0E344D]">{row.dimension}</td>
                          <td className="py-3 px-4">{row.wrist}</td>
                          <td className="py-3 pl-4 font-medium text-[#25665D]">{row.ankle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* FULL SCIENTIFIC MANUSCRIPT & 83 WORKS CITED MODE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Chapter TOC */}
            <aside className="lg:col-span-4 lg:sticky lg:top-40 bg-white rounded-2xl border border-[#D6DCE0] p-5 shadow-sm space-y-4">
              <div>
                <div className="font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-widest text-[#18587A]">
                  Monograph Directory
                </div>
                <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0E344D] mt-1">
                  Full Scientific Paper &amp; Sources
                </h2>
              </div>

              <div className="space-y-1">
                {MANUSCRIPT_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToManuscriptChapter(sec.id)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F1F3F4] transition-colors flex items-start gap-2.5 cursor-pointer"
                  >
                    <span className="font-mono tabular-nums text-xs font-bold text-[#25665D] shrink-0 pt-0.5">
                      {sec.number}.
                    </span>
                    <span className="text-xs font-['Space_Grotesk'] font-semibold text-[#0E344D] leading-snug">
                      {sec.title}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => scrollToManuscriptChapter('works-cited')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#E8F3F1] hover:bg-[#DCECE9] transition-colors flex items-start gap-2.5 cursor-pointer"
                >
                  <span className="font-mono tabular-nums text-xs font-bold text-[#25665D] shrink-0 pt-0.5">
                    [83]
                  </span>
                  <span className="text-xs font-['Space_Grotesk'] font-bold text-[#25665D] leading-snug">
                    Works Cited Archive (1–83)
                  </span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#E4E8EB]">
                <button
                  type="button"
                  onClick={() => setViewMode('dashboard')}
                  className="w-full py-2 px-4 rounded-lg bg-[#25665D] text-white font-['Space_Grotesk'] text-xs font-semibold hover:bg-[#2E766B] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                  <span>Return to Interactive Charts</span>
                </button>
              </div>
            </aside>

            {/* Right Manuscript Body & Works Cited */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5D6870] font-['Space_Grotesk']">
                  <span className="text-[#25665D] font-bold">Full Peer-Reviewed Evidence Analysis</span>
                  <span aria-hidden="true">·</span>
                  <span>4 Quantitative Tables</span>
                  <span aria-hidden="true">·</span>
                  <span>83 Linked PubMed / PMC / ResearchGate Citations</span>
                </div>
                <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#0E344D] leading-tight">
                  The Biomechanical and Physiological Superiority of Ankle-Worn Wearable Devices: A Comprehensive Analysis of Functionality, Accuracy, and Practicality
                </h1>
              </div>

              {MANUSCRIPT_SECTIONS.map((sec) => (
                <article
                  key={sec.id}
                  id={`manuscript-${sec.id}`}
                  className="scroll-mt-36 bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="space-y-1.5 pb-4 border-b border-[#E4E8EB]">
                    <div className="font-mono tabular-nums text-xs font-bold text-[#25665D]">
                      Section {sec.number}
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0E344D]">
                      {sec.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5D6870]">{sec.subtitle}</p>
                  </div>

                  <div className="space-y-6">
                    {sec.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        {sub.heading && (
                          <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-[#18587A]">
                            {sub.heading}
                          </h3>
                        )}
                        {sub.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="font-['Plus_Jakarta_Sans'] text-[15px] text-[#36454F] leading-relaxed max-w-prose"
                          >
                            {p}
                          </p>
                        ))}
                        {sub.bullets && (
                          <ul className="space-y-2.5 bg-[#F7F8F7] rounded-xl p-4 border border-[#D6DCE0]">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-sm text-[#36454F] leading-relaxed">
                                <strong className="text-[#0E344D]">{b.label}:</strong> {b.text}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {sec.table && (
                    <div className="pt-4 border-t border-[#E4E8EB] space-y-3">
                      <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#18587A]">
                        {sec.table.caption}
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-[#D6DCE0]">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                          <thead className="bg-[#F1F3F4] border-b border-[#D6DCE0]">
                            <tr>
                              {sec.table.headers.map((h) => (
                                <th
                                  key={h}
                                  className="py-3 px-4 font-['Space_Grotesk'] font-semibold text-[#0E344D] whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E4E8EB] bg-white font-['Plus_Jakarta_Sans']">
                            {sec.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#F7F8F7]">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2.5 px-4 ${
                                      cIdx === 0
                                        ? 'font-semibold text-[#0E344D]'
                                        : 'text-[#36454F] tabular-nums'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {/* WORKS CITED ARCHIVE (1-83) */}
              <section
                id="manuscript-works-cited"
                className="scroll-mt-36 bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E4E8EB]">
                  <div>
                    <div className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#25665D]">
                      Complete Primary Literature Index
                    </div>
                    <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0E344D]">
                      Works Cited ({filteredCitations.length} of {ANKLE_WORKS_CITED.length})
                    </h2>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <span className="material-symbols-outlined text-[18px] text-[#5D6870] absolute left-3 top-1/2 -translate-y-1/2">
                      search
                    </span>
                    <input
                      type="text"
                      value={citationQuery}
                      onChange={(e) => setCitationQuery(e.target.value)}
                      placeholder="Filter citations or ID..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F7F8F7] border border-[#D6DCE0] text-xs text-[#0E344D] placeholder:text-[#7D8890] focus:outline-none focus:border-[#3B8E82]"
                    />
                  </div>
                </div>

                {/* Domain Filter Buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      'All',
                      'Vascular & PPG',
                      'Step & Metabolic Kinematics',
                      'Biomechanics & ML',
                      'Neurology & Rehab',
                      'Clinical Hygiene & Ergonomics',
                    ] as CitationFilter[]
                  ).map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setCitationDomain(domain)}
                      className={`px-3 py-1.5 rounded-lg font-['Space_Grotesk'] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        citationDomain === domain
                          ? 'bg-[#0E344D] text-white'
                          : 'bg-[#F1F3F4] text-[#36454F] hover:bg-[#E4E8EB]'
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-[#E4E8EB] border border-[#D6DCE0] rounded-xl overflow-hidden">
                  {filteredCitations.map((cite) => (
                    <a
                      key={cite.id}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-3.5 bg-white hover:bg-[#F7F8F7] transition-colors group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="font-mono tabular-nums text-xs font-bold text-[#25665D] w-7 shrink-0 pt-0.5">
                          [{cite.id}]
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-[#0E344D] group-hover:text-[#18587A] transition-colors">
                            {cite.title}
                          </div>
                          <div className="text-[11px] text-[#5D6870] mt-0.5 truncate">
                            {cite.domain} · {cite.url}
                          </div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-[#5D6870] group-hover:text-[#25665D] shrink-0">
                        open_in_new
                      </span>
                    </a>
                  ))}
                  {filteredCitations.length === 0 && (
                    <div className="p-6 text-center text-xs text-[#5D6870]">
                      No citations matched &ldquo;{citationQuery}&rdquo;.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Bottom ZoeWear Integration Cross-Link Strip */}
        <section className="bg-white rounded-2xl border border-[#D6DCE0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-widest text-[#18587A]">
              ZoeWear Research &amp; Footwear Integration
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#0E344D]">
              Translating Supramalleolar Biomechanics into Phygital Footwear
            </h3>
            <p className="text-xs sm:text-sm text-[#36454F] leading-relaxed">
              This clinical synthesis directly informs ZoeWear&apos;s SwiftMonster™ lower-limb architecture—coupling tibial IMU gait telemetry with transdermal textile craftsmanship.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('fashion', 'swiftmonster')}
              className="px-4 py-2 rounded-lg bg-[#25665D] text-white font-['Space_Grotesk'] text-xs font-semibold hover:bg-[#2E766B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore SwiftMonster™
            </button>
            <button
              type="button"
              onClick={() => onNavigate('teaching-and-research')}
              className="px-4 py-2 rounded-lg bg-[#F1F3F4] text-[#0E344D] border border-[#D6DCE0] font-['Space_Grotesk'] text-xs font-semibold hover:bg-[#E4E8EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              WestCoast Research Portal
            </button>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'dashboard' ? 'manuscript' : 'dashboard')}
              className="px-4 py-2 rounded-lg bg-white text-[#18587A] border border-[#D6DCE0] font-['Space_Grotesk'] text-xs font-semibold hover:bg-[#F7F8F7] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {viewMode === 'dashboard' ? 'Read Full Manuscript' : 'Open Interactive Charts'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
