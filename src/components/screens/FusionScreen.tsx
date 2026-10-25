/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/mockData';
import { NavPage } from '../../types';

interface FusionScreenProps {
  onNavigate: (page: NavPage) => void;
  onRequestBeta: () => void;
  onOpenSpecs: () => void;
  onJoinCohort: () => void;
}

export const FusionScreen: React.FC<FusionScreenProps> = ({
  onNavigate,
  onRequestBeta,
  onOpenSpecs,
  onJoinCohort,
}) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [capacitanceLiters, setCapacitanceLiters] = useState<number>(4.8);
  const [respirationRate, setRespirationRate] = useState<number>(14);
  const [waveOffset, setWaveOffset] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [packetsPerSec, setPacketsPerSec] = useState<number>(12.4);

  // Animate biosignal wave
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 60);
      setPacketsPerSec((prev) => +(12.4 + (Math.sin(Date.now() / 1000) * 0.4)).toFixed(1));
    }, 100);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Derived sympathetic tone from capacitance & respiration
  const sympatheticTonePercent = Math.min(
    95,
    Math.max(12, Math.round(18 + (respirationRate - 14) * 4 + (5.0 - capacitanceLiters) * 8))
  );

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow Field */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[450px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[350px] bg-circuit-gold/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Page Header / Section Identity */}
        <section className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg">
          <div className="flex flex-col gap-space-sm max-w-4xl">
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-surface-container-high/90 text-primary-container border border-border-luminous/40">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest">
                Section // 04. Biomedical Fusion
              </span>
              <span className="text-text-muted">|</span>
              <span className="font-label-sm text-label-sm text-text-muted uppercase">
                TF-Server Telemetry Pipeline v2.4
              </span>
            </div>
            <h1 className="font-display text-display text-text-primary tracking-tight">
              The Fusion of Technology & Fashion:{' '}
              <span className="text-primary-container">Revolutionizing Wellness</span> in Healthcare
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl pt-space-xs">
              ZoeWear is an early-stage cyber-couture startup engineering non-invasive transdermal
              diagnostics directly into luxury garments. By streaming continuous micro-electrolytes
              and respiratory bio-signals into TensorFlow inference matrices, we awaken the soul of
              the shoe and garment to preempt chronic physiological decline.
            </p>
          </div>

          {/* Live Telemetry Status Ticker Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mt-space-xl pt-space-md">
            <div className="flex flex-col p-space-md bg-surface-container-lowest/80 rounded-xl border border-subtle">
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                Inference Ingestion
              </span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display text-headline-md text-text-primary">
                  {packetsPerSec}k
                </span>
                <span className="font-label-sm text-label-sm text-primary">packets/sec</span>
              </div>
              <span className="font-body-sm text-body-sm text-primary-container/80 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" /> Zero Packet Loss (TLS 1.3)
              </span>
            </div>

            <div className="flex flex-col p-space-md bg-surface-container-lowest/80 rounded-xl border border-subtle">
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                Transdermal Flux
              </span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display text-headline-md text-circuit-gold">99.2%</span>
                <span className="font-label-sm text-label-sm text-circuit-gold">fidelity</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Sweat Metabolite Micro-Array
              </span>
            </div>

            <div className="flex flex-col p-space-md bg-surface-container-lowest/80 rounded-xl border border-subtle">
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                Neural Clustering
              </span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display text-headline-md text-text-primary">&lt; 14ms</span>
                <span className="font-label-sm text-label-sm text-text-muted">latency</span>
              </div>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                TensorFlow Baseline Filtering
              </span>
            </div>

            <div className="flex flex-col p-space-md bg-surface-container-lowest/80 rounded-xl border border-subtle">
              <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                Core Philosophy
              </span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display text-headline-md text-primary">Zoe</span>
                <span className="font-label-sm text-label-sm text-text-muted">[Greek: Life]</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Wearable for Life
              </span>
            </div>
          </div>
        </section>

        {/* Asymmetric Editorial Showcase: Garment Fusion & Transdermal Macro-Sensory */}
        <section className="max-w-7xl mx-auto px-margin py-space-xl" id="fabric-matrix">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            {/* Left: Computational Silk & Sensory Conductive Garment (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-surface-slate/70 backdrop-blur-xl rounded-xl p-space-lg relative overflow-hidden border border-subtle">
              <div className="relative z-10 flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary-container font-label-sm text-label-sm uppercase tracking-widest border border-border-luminous/30">
                    Transdermal Fabric Matrix
                  </span>
                  <span className="font-label-sm text-label-sm text-circuit-gold tracking-widest uppercase">
                    [ CLINICAL GRADE COUTURE ]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md items-center">
                  <div>
                    <h2 className="font-display text-headline-md text-text-primary leading-tight">
                      Awakening the Soul of the Shoe & Silhouette
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                      Traditionally, fashion has centered exclusively on visual personal expression. ZoeWear expands the fabric to integrate non-invasive biometric telemetry that mitigates the sedentary hazards of modern urban lifestyles.
                    </p>
                    <div className="mt-space-md flex flex-wrap gap-space-xs">
                      <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-subtle">
                        Skin Temp (0.01°C)
                      </span>
                      <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-subtle">
                        Micro-Electrolytes
                      </span>
                      <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-subtle">
                        Sweat Metabolites
                      </span>
                    </div>
                  </div>

                  {/* High-end garment & sensor macro photo */}
                  <div className="w-full h-72 rounded-lg overflow-hidden relative bg-surface-container-lowest border border-subtle">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      alt="Avant-garde luxury black garment woven with illuminated cyan threads and gold circuitry"
                      src={ASSETS.conductiveSilk}
                    />
                    <div className="absolute bottom-2 left-2 right-2 p-space-xs rounded bg-surface-obsidian/85 backdrop-blur-md flex items-center justify-between font-label-sm text-label-sm border border-border-luminous/30">
                      <span className="text-primary-container">CONDUCTIVE THREAD NO. 889</span>
                      <span className="text-circuit-gold">98.8% CONDUCTANCE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Micro Visualizer */}
              <div className="mt-space-lg pt-space-md bg-surface-container-lowest/60 rounded-lg p-space-md border border-subtle">
                <div className="flex items-center justify-between pb-2">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">
                    Continuous Noise Filtration Cycle
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSimulating(!isSimulating)}
                      className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-primary hover:text-text-primary transition-colors"
                    >
                      {isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}
                    </button>
                    <span className="font-label-sm text-label-sm text-primary">
                      Cluster Signal: 48.2 Hz (Normalized)
                    </span>
                  </div>
                </div>

                {/* Inline SVG Sparkline / Noise Cancellation Visualizer */}
                <svg
                  className="w-full h-12 text-primary"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 600 50"
                >
                  <path
                    d={`M 0 25 Q ${30 + (waveOffset % 20)} 10, 60 25 T 120 25 T 180 5 T 240 45 T 300 25 T 360 20 T 420 30 T 480 25 T 540 25 T 600 25`}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M 0 25 Q 40 40, 80 25 T 160 25 T 240 25 T 320 25 T 400 25 T 480 25 T 600 25"
                    stroke="rgba(255, 183, 3, 0.45)"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Right: TensorFlow Ingestion Engine (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-slate/70 backdrop-blur-xl rounded-xl p-space-lg relative border border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-circuit-gold font-label-sm text-label-sm uppercase tracking-widest border border-circuit-gold/30">
                    Inference Architecture
                  </span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> TF-Serving Online
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-text-primary">
                    Autonomous Deep Neural Clustering
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    Raw transdermal streams are routed across secure edge bridges directly to centralized TensorFlow inference nodes. The pipeline continuously isolates motion artifacts, filtering mechanical garment noise from authentic systemic anomalies.
                  </p>
                </div>

                {/* In-Depth Pipeline Node Cards (Interactive) */}
                <div className="space-y-space-xs mt-space-xs">
                  <div
                    onClick={() => setActiveStage(1)}
                    className={`p-space-sm rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      activeStage === 1
                        ? 'bg-surface-container border border-primary-container shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                        : 'bg-surface-container-lowest/90 hover:bg-surface-container/60 border border-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary">hub</span>
                      <div>
                        <div className="font-label-sm text-label-sm text-text-primary uppercase tracking-wide">
                          Transdermal Ingestion
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Electrolytes & Epidermal Heat
                        </div>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      Stage 01
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveStage(2)}
                    className={`p-space-sm rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      activeStage === 2
                        ? 'bg-surface-container border border-secondary shadow-[0_0_12px_rgba(76,214,251,0.2)]'
                        : 'bg-surface-container-lowest/90 hover:bg-surface-container/60 border border-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary">model_training</span>
                      <div>
                        <div className="font-label-sm text-label-sm text-text-primary uppercase tracking-wide">
                          TensorFlow Baseline Compare
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          k-Means Unsupervised Anomaly Mesh
                        </div>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      Stage 02
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveStage(3)}
                    className={`p-space-sm rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                      activeStage === 3
                        ? 'bg-surface-container border border-circuit-gold shadow-[0_0_12px_rgba(255,183,3,0.2)]'
                        : 'bg-surface-container-lowest/90 hover:bg-surface-container/60 border border-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-circuit-gold">verified_user</span>
                      <div>
                        <div className="font-label-sm text-label-sm text-text-primary uppercase tracking-wide">
                          Clinical Risk Classification
                        </div>
                        <div className="font-body-sm text-body-sm text-text-muted">
                          Disease Baseline Corroboration
                        </div>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-circuit-gold font-semibold">
                      Stage 03
                    </span>
                  </div>
                </div>

                {/* Stage Detail Popover */}
                <div className="p-space-sm rounded-lg bg-surface-container-lowest/90 border border-subtle text-xs text-on-surface-variant">
                  {activeStage === 1 && (
                    <p>
                      <strong className="text-primary">Stage 1:</strong> Interstitial sensors sample epidermal sodium, potassium, and thermal dissipation at 200Hz. Noise is clipped via on-cuff analog low-pass filters.
                    </p>
                  )}
                  {activeStage === 2 && (
                    <p>
                      <strong className="text-secondary">Stage 2:</strong> TensorFlow Serving compares real-time vector embeddings with 14-day rolling normative baselines. Accelerometer signals cancel false positive spikes.
                    </p>
                  )}
                  {activeStage === 3 && (
                    <p>
                      <strong className="text-circuit-gold">Stage 3:</strong> Classified alerts route to clinician portals or trigger local haptic alerts if autonomic risk vectors exceed 95% confidence thresholds.
                    </p>
                  )}
                </div>
              </div>

              {/* Neural Network Visual Ring Indicator */}
              <div className="mt-space-lg p-space-md rounded-lg bg-surface-container-high/60 flex items-center justify-between border border-subtle">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase">
                    Early Detection Confidence
                  </span>
                  <span className="font-display text-headline-sm text-text-primary">97.64%</span>
                </div>
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-lowest"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-primary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="97, 100"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="absolute font-label-sm text-label-sm text-primary font-bold">TF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase: "Breathe" Mobile Health App & Diagnostics */}
        <section className="max-w-7xl mx-auto px-margin py-space-xl" id="breathe-app">
          <div className="bg-surface-container-low/70 rounded-2xl p-space-lg lg:p-space-xl relative overflow-hidden border border-subtle shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              {/* App Narrative & Highlights (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col gap-space-md">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-circuit-gold self-start border border-circuit-gold/30">
                  <span className="material-symbols-outlined text-[16px]">air</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                    Flagship Diagnostic Release
                  </span>
                </div>
                <h2 className="font-display text-headline-lg text-text-primary">
                  Introducing <span className="text-primary-container">"Breathe"</span>: Real-Time Respiratory Diagnostics
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Our inaugural mobile application interfaces directly with ZoeWear biometric threads embedded along the thoracic cage. "Breathe" decodes pulmonary dynamics, autonomous stress thresholds, and functional lung capacity with medical accuracy wrapped in high-fashion UI.
                </p>

                {/* Feature Pills / Technical Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col gap-1 border border-subtle">
                    <div className="flex items-center gap-2 text-primary-container">
                      <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        Stress Indexing
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Dynamic parasympathetic tone evaluated from thoracic micro-expansions.
                    </p>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col gap-1 border border-subtle">
                    <div className="flex items-center gap-2 text-circuit-gold">
                      <span className="material-symbols-outlined text-[20px]">vital_signs</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        Lung Capacity
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Continuous volumetric estimation compared to personal baseline profiles.
                    </p>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col gap-1 border border-subtle">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">sync_saved_locally</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        Telehealth Sync
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Zero-friction clinical export formatted for standard HL7 & FHIR registries.
                    </p>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col gap-1 border border-subtle">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">noise_control_off</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        Noise Filtration
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Adaptive motion decoupling eliminates running and walking garment jitter.
                    </p>
                  </div>
                </div>

                {/* Download / Demo Triggers */}
                <div className="flex items-center gap-space-md pt-space-sm flex-wrap">
                  <button
                    onClick={onRequestBeta}
                    className="px-space-lg py-3 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-lg tracking-wide shadow-lg hover:shadow-[0_0_24px_rgba(0,229,255,0.45)] transition-all flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <span>Request Clinical Beta</span>
                    <span className="material-symbols-outlined text-[18px]">east</span>
                  </button>
                  <button
                    onClick={onOpenSpecs}
                    className="px-space-md py-3 rounded-full bg-surface-container-high text-text-primary font-headline-sm text-label-lg hover:bg-surface-bright transition-all flex items-center gap-2 border border-border-luminous/40 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                    <span>API & FHIR Specs</span>
                  </button>
                </div>
              </div>

              {/* App Mockup UI Card (6 Cols) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-sm rounded-[2.5rem] bg-surface-obsidian p-space-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-border-luminous/40 relative">
                  {/* Glass Inner Screen */}
                  <div className="rounded-[2.2rem] bg-surface-container-lowest p-space-md flex flex-col gap-space-md relative overflow-hidden border border-subtle">
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-text-muted font-label-sm text-label-sm">
                      <span>09:41</span>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">wifi</span>
                        <span className="material-symbols-outlined text-[14px]">battery_full</span>
                      </div>
                    </div>

                    {/* Active App Profile */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                          <span className="material-symbols-outlined text-[18px]">air</span>
                        </div>
                        <div>
                          <div className="font-display text-label-lg text-text-primary leading-tight">
                            Breathe Pro
                          </div>
                          <div className="font-label-sm text-label-sm text-primary">
                            Live Bio-Feed Synced
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-circuit-gold font-label-sm text-label-sm border border-circuit-gold/30">
                        TF Active
                      </span>
                    </div>

                    {/* Lung Capacity Visual Dial */}
                    <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col items-center justify-center relative border border-subtle">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            fill="none"
                            r="42"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="8"
                          />
                          <circle
                            className="text-primary-container transition-all duration-300"
                            cx="50"
                            cy="50"
                            fill="none"
                            r="42"
                            stroke="currentColor"
                            strokeDasharray="264"
                            strokeDashoffset={264 - (capacitanceLiters / 6.0) * 264}
                            strokeLinecap="round"
                            strokeWidth="8"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="font-label-sm text-label-sm text-text-muted uppercase">
                            Capacitance
                          </span>
                          <span className="font-display text-headline-lg text-text-primary leading-none mt-1">
                            {capacitanceLiters.toFixed(1)}
                            <span className="font-body-sm text-body-sm text-primary">L</span>
                          </span>
                          <span className="font-label-sm text-label-sm text-circuit-gold mt-1">
                            {capacitanceLiters >= 4.5 ? 'Optimal Range' : 'Moderate Inhale'}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Controls Inside Mockup */}
                      <div className="w-full mt-3 px-2">
                        <div className="flex justify-between text-[11px] text-text-muted mb-1 font-mono">
                          <span>Simulate Inhalation:</span>
                          <span className="text-primary-container">{capacitanceLiters} L</span>
                        </div>
                        <input
                          type="range"
                          min="2.5"
                          max="5.8"
                          step="0.1"
                          value={capacitanceLiters}
                          onChange={(e) => setCapacitanceLiters(parseFloat(e.target.value))}
                          className="w-full accent-primary-container cursor-pointer h-1.5 bg-surface-bright rounded-lg"
                        />
                      </div>

                      <div className="w-full grid grid-cols-2 gap-space-xs mt-space-sm pt-space-xs text-center border-t border-subtle">
                        <div>
                          <div className="font-label-sm text-label-sm text-text-muted">
                            Respiration Rate
                          </div>
                          <div className="font-display text-headline-sm text-text-primary">
                            {respirationRate}{' '}
                            <span className="font-label-sm text-label-sm text-text-muted">rpm</span>
                          </div>
                          <div className="flex justify-center gap-1 mt-1">
                            <button
                              onClick={() => setRespirationRate((r) => Math.max(8, r - 1))}
                              className="w-5 h-5 rounded bg-surface-container text-xs text-text-muted hover:text-primary"
                            >
                              -
                            </button>
                            <button
                              onClick={() => setRespirationRate((r) => Math.min(28, r + 1))}
                              className="w-5 h-5 rounded bg-surface-container text-xs text-text-muted hover:text-primary"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="font-label-sm text-label-sm text-text-muted">
                            Sympathetic Tone
                          </div>
                          <div
                            className={`font-display text-headline-sm ${
                              sympatheticTonePercent < 30
                                ? 'text-secondary'
                                : sympatheticTonePercent < 60
                                ? 'text-circuit-gold'
                                : 'text-error'
                            }`}
                          >
                            {sympatheticTonePercent < 30 ? 'Low' : sympatheticTonePercent < 60 ? 'Norm' : 'High'} ({sympatheticTonePercent}%)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Real-time Pulmo-wave graph */}
                    <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-1 border border-subtle">
                      <div className="flex items-center justify-between text-label-sm font-label-sm">
                        <span className="text-text-muted">Thoracic Micrometer Wave</span>
                        <span className="text-primary-container">0.08 mm dyn</span>
                      </div>
                      <svg
                        className="w-full h-10 text-primary-container"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 300 40"
                      >
                        <path
                          d={`M 0 20 Q ${20 + (waveOffset % 10)} 0, 40 20 T 80 20 T 120 5 T 160 35 T 200 20 T 240 20 T 280 10 T 300 20`}
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>

                    {/* Automated Telehealth Dispatch */}
                    <div className="p-space-sm rounded-xl bg-surface-container-high/90 flex items-center justify-between border border-subtle">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-circuit-gold text-[18px]">
                          cloud_sync
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Physician Portal Auto-Sync
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-circuit-gold animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interdisciplinary Curriculum: Unifying Fashion, Pathology, and Machine Learning */}
        <section className="max-w-7xl mx-auto px-margin py-space-xl" id="curriculum">
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-circuit-gold">
              Academic Framework // WestCoast Program
            </span>
            <h2 className="font-display text-headline-lg text-text-primary max-w-2xl">
              Teaching Fashion, Clinical Pathology, and ML as an Integrated Discipline
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
              Recognizing the significance of aesthetics in wearable adoption, ZoeWear champions a cross-functional academic paradigm. Technology must perform with clinical-grade accuracy without compromising the sartorial authority of luxury apparel.
            </p>
          </div>

          {/* Curriculum Triad Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Pillar 01: Haute Fashion Design */}
            <div
              onClick={() => onNavigate('teaching-and-research')}
              className="p-space-lg rounded-xl bg-surface-slate/80 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-all border border-subtle cursor-pointer"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">styler</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider">
                  Discipline 01
                </span>
                <h3 className="font-display text-headline-sm text-text-primary">
                  Haute Fashion & Phygital Drapery
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Curricula in anatomical tailoring, conductive thread integration, 3D additive printing, and cybernetic silhouettes that maintain drape and washability.
                </p>
              </div>
              <div className="pt-space-md mt-space-md bg-surface-container-lowest/40 rounded p-space-sm flex items-center justify-between font-label-sm text-label-sm text-text-muted border border-subtle">
                <span>Module Focus:</span>
                <span className="text-text-primary font-medium">Smart Garment Weaving</span>
              </div>
            </div>

            {/* Pillar 02: Clinical Pathology */}
            <div
              onClick={() => onNavigate('teaching-and-research')}
              className="p-space-lg rounded-xl bg-surface-slate/80 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-all border border-subtle cursor-pointer"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-circuit-gold group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">biotech</span>
                </div>
                <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-wider">
                  Discipline 02
                </span>
                <h3 className="font-display text-headline-sm text-text-primary">
                  Clinical Pathology & Transdermal Markers
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Biological baseline modeling, sweat analyte kinetics, micro-electrolyte profiling, and disease signature identification under physiological strain.
                </p>
              </div>
              <div className="pt-space-md mt-space-md bg-surface-container-lowest/40 rounded p-space-sm flex items-center justify-between font-label-sm text-label-sm text-text-muted border border-subtle">
                <span>Module Focus:</span>
                <span className="text-circuit-gold font-medium">Non-Invasive Diagnostic Lab</span>
              </div>
            </div>

            {/* Pillar 03: Machine Learning & TensorFlow */}
            <div
              onClick={() => onNavigate('teaching-and-research')}
              className="p-space-lg rounded-xl bg-surface-slate/80 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container-high transition-all border border-subtle cursor-pointer"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">neurology</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                  Discipline 03
                </span>
                <h3 className="font-display text-headline-sm text-text-primary">
                  Machine Learning & Real-Time Clustering
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  TensorFlow server deployment, motion artifact noise cancellation algorithms, real-time clustering, and continuous anomaly detection arrays.
                </p>
              </div>
              <div className="pt-space-md mt-space-md bg-surface-container-lowest/40 rounded p-space-sm flex items-center justify-between font-label-sm text-label-sm text-text-muted border border-subtle">
                <span>Module Focus:</span>
                <span className="text-secondary font-medium">Predictive Telemetry Math</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lab & Clinical Research Photo Mosaic */}
        <section className="max-w-7xl mx-auto px-margin py-space-xl" id="cleanroom">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
            <div className="md:col-span-5 h-80 rounded-xl overflow-hidden relative bg-surface-container-lowest border border-subtle">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Modern high-tech bio-engineering cleanroom laboratory with researchers testing smart textile fiber garments"
                src={ASSETS.cleanroomLab}
              />
              <div className="absolute bottom-3 left-3 p-space-xs rounded bg-surface-obsidian/85 backdrop-blur-md font-label-sm text-label-sm text-primary border border-border-luminous/40">
                WestCoast Bio-Sensory Cleanroom // Station 4
              </div>
            </div>
            <div className="md:col-span-7 p-space-xl rounded-xl bg-surface-container-low flex flex-col justify-between border border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-xs text-circuit-gold font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Empirical Validation & Peer Research</span>
                </div>
                <h3 className="font-display text-headline-md text-text-primary">
                  Closing the Feedback Loop on Sedentary Lifestyle Risks
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  "With the environment evolving faster than our biological capacity to adapt, wearable fashion technology provides the real-time cognitive counterweight required in modern society."
                </p>
              </div>
              <div className="flex items-center gap-space-md pt-space-md mt-space-md border-t border-subtle">
                <div className="flex items-center gap-space-sm">
                  <span className="font-display text-headline-md text-primary-container">100%</span>
                  <span className="font-body-sm text-body-sm text-text-muted max-w-[140px]">
                    Non-invasive transdermal collection
                  </span>
                </div>
                <div className="w-px h-10 bg-surface-container-highest" />
                <div className="flex items-center gap-space-sm">
                  <span className="font-display text-headline-md text-circuit-gold">24/7</span>
                  <span className="font-body-sm text-body-sm text-text-muted max-w-[140px]">
                    Continuous automated anomaly triage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Mission Callout & Resource Hub */}
        <section className="max-w-7xl mx-auto px-margin py-space-xl">
          <div className="p-space-xl rounded-2xl bg-gradient-to-br from-surface-slate via-surface-container-lowest to-surface-slate relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-lg border border-border-luminous/30 shadow-2xl">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest">
                Collaborative Initiative
              </span>
              <h2 className="font-display text-headline-md text-text-primary">
                Partner with ZoeWear Clinical Research Labs
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Explore interdisciplinary research opportunities, access TensorFlow baseline clustering whitepapers, or request integration documentation for healthcare networks.
              </p>
            </div>
            <div className="flex items-center gap-space-sm flex-shrink-0 flex-wrap">
              <button
                onClick={onJoinCohort}
                className="px-space-lg py-3 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-lg tracking-wide hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-all cursor-pointer font-semibold"
              >
                Join Research Cohort
              </button>
              <button
                onClick={() => onNavigate('teaching-and-research')}
                className="px-space-md py-3 rounded-full bg-surface-container-high text-on-surface font-headline-sm text-label-lg hover:text-primary transition-colors border border-subtle cursor-pointer"
              >
                Download DoT15 Slides
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
