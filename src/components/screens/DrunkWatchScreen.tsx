/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/mockData';
import { NavPage } from '../../types';

interface DrunkWatchScreenProps {
  onNavigate: (page: NavPage) => void;
  onOpenDiagnostics: () => void;
  onRequestPrototype: (modelName: string) => void;
}

export const DrunkWatchScreen: React.FC<DrunkWatchScreenProps> = ({
  onNavigate,
  onOpenDiagnostics,
  onRequestPrototype,
}) => {
  const [bac, setBac] = useState<number>(0.02);
  const [statusText, setStatusText] = useState<string>('OPTIMAL & CLEARED');
  const [statusColor, setStatusColor] = useState<string>('text-secondary bg-secondary/20');
  const [clearanceText, setClearanceText] = useState<string>('Clearance: 18m');
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState<boolean>(false);
  const [impedance, setImpedance] = useState<number>(41.8);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  // SVG Gauge calculations
  // Circumference ~ 2 * PI * 68 = 427.25
  const circumference = 427.25;
  const maxBac = 0.12;
  const progressOffset = Math.max(0, circumference - (bac / maxBac) * circumference);

  const applyState = (
    val: number,
    status: string,
    colorClasses: string,
    clearance: string,
    targetImpedance: number
  ) => {
    setBac(val);
    setStatusText(status);
    setStatusColor(colorClasses);
    setClearanceText(clearance);
    setImpedance(targetImpedance);
  };

  const handleQuickCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationSuccess(false);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationSuccess(true);
      setTimeout(() => setCalibrationSuccess(false), 4000);
    }, 1200);
  };

  const handleTestDispatch = () => {
    setDispatchAlert(
      'Encrypted Concierge Dispatch Ping Transmitted: Black Car Chaperone stand-by token routed via zero-knowledge relay.'
    );
    setTimeout(() => setDispatchAlert(null), 6000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Immersive Sub-Header Cinematic Hero */}
      <section className="relative w-full -mt-28 pt-36 pb-20 px-margin overflow-hidden bg-surface-obsidian">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-circuit-gold/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl relative z-10">
          {/* Breadcrumb & Top Indicator Pill */}
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
              <span className="text-primary-container">Telemetry</span>
              <span>/</span>
              <span className="text-circuit-gold">Biosensing Core</span>
              <span>/</span>
              <span className="text-text-primary">DrunkWatch™ OS v4.8</span>
            </div>
            <div className="flex items-center gap-space-sm px-space-md py-1 rounded-full bg-surface-container-high border border-border-luminous/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                Micro-Spectrometry Sensor Matrix Active
              </span>
            </div>
          </div>

          {/* Hero Asymmetric Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Editorial & Technical Headline Block */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-circuit-gold font-semibold">
                  Autonomous Metabolic Biometric Guardian
                </span>
                <h1 className="font-display text-display text-text-primary uppercase tracking-tight">
                  DrunkWatch<span className="text-primary-container">™</span>
                </h1>
                <p className="font-headline-sm text-headline-sm text-secondary font-light">
                  Transdermal Micro-Spectrometry & Human Sovereignty Core.
                </p>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A breakthrough cyber-couture module engineered for Wear OS, watchOS, and bespoke woven cuffs. DrunkWatch™ continuously samples epidermal interstitial sweat glands to measure ethanol clearance, cellular hydration, and autonomic safety vectors in real-time.
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-space-md pt-space-xs">
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col border border-subtle">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Calibration Rate
                  </span>
                  <span className="font-headline-md text-headline-md text-primary-container font-semibold">
                    99.8%
                  </span>
                  <span className="font-body-sm text-body-sm text-text-muted">
                    WestCoast Clinical Grade
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col border border-subtle">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Sampling Cycle
                  </span>
                  <span className="font-headline-md text-headline-md text-circuit-gold font-semibold">
                    120ms
                  </span>
                  <span className="font-body-sm text-body-sm text-text-muted">
                    Sub-Dermal Optical LED
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col border border-subtle">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Safety Net
                  </span>
                  <span className="font-headline-md text-headline-md text-secondary font-semibold">
                    Autonomous
                  </span>
                  <span className="font-body-sm text-body-sm text-text-muted">
                    Encrypted Dispatch Concierge
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                <a
                  className="px-space-xl py-3 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider font-semibold shadow-md hover:bg-primary transition-all flex items-center gap-space-xs cursor-pointer"
                  href="#simulator"
                >
                  <span className="material-symbols-outlined text-[18px]">show_chart</span>
                  Launch Telemetry Sim
                </a>
                <button
                  onClick={handleQuickCalibrate}
                  disabled={isCalibrating}
                  className="px-space-lg py-3 rounded-full bg-surface-container-high text-primary font-label-lg text-label-lg uppercase tracking-wider shadow-sm hover:bg-surface-bright transition-all flex items-center gap-space-xs border border-border-luminous/40 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isCalibrating ? 'animate-spin' : ''}`}>
                    sensors
                  </span>
                  <span>{isCalibrating ? 'Scanning Interstitial Sweat...' : 'Run Sensor Diagnostics'}</span>
                </button>
                <button
                  onClick={() => onRequestPrototype('DrunkWatch™ Bespoke Cuff v4.8')}
                  className="px-space-md py-3 rounded-full bg-circuit-gold/15 text-circuit-gold font-label-lg text-label-lg uppercase tracking-wider hover:bg-circuit-gold/25 transition-all flex items-center gap-1 border border-circuit-gold/40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                  <span>Reserve Cuff Edition</span>
                </button>
              </div>

              {calibrationSuccess && (
                <div className="p-3 rounded-xl bg-surface-container-high border border-primary-container text-primary font-body-sm text-body-sm flex items-center gap-2 animate-fadeIn">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Optical multi-wavelength array recalibrated to baseline 680nm. Sub-dermal impedance nominal (41.8 kΩ).</span>
                </div>
              )}
            </div>

            {/* Hero Photo & Visual Artifact */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-2xl border border-border-luminous/40">
                <img
                  className="w-full h-[520px] object-cover object-center transition-transform duration-700 hover:scale-105"
                  alt="Futuristic haute couture luxury smartwatch cuff crafted from matte black titanium and conductive cybernetic woven fibers"
                  src={ASSETS.drunkWatchHero}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/30 to-transparent" />

                {/* Floating Holographic Badge */}
                <div className="absolute top-space-md right-space-md px-space-md py-1.5 rounded-full bg-surface-slate/85 backdrop-blur-md shadow-md flex items-center gap-space-xs text-text-primary font-label-sm text-label-sm border border-border-luminous/40">
                  <span className="material-symbols-outlined text-primary-container text-[16px]">verified</span>
                  <span>ISO 13485 CERTIFIED</span>
                </div>

                {/* Bottom Floating Live Overlay */}
                <div className="absolute bottom-space-md left-space-md right-space-md p-space-md rounded-xl bg-surface-slate/90 backdrop-blur-xl shadow-lg flex items-center justify-between border border-subtle">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-[20px]">water_drop</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase">
                        Electrolyte Reserve
                      </span>
                      <span className="font-headline-sm text-headline-sm text-text-primary">
                        88.4 mEq/L
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="font-label-sm text-label-sm text-circuit-gold uppercase">Buffer State</span>
                    <span className="font-label-lg text-label-lg text-text-primary font-semibold">STABLE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive HUD Simulator & Live Metabolic Telemetry Section */}
      <section className="w-full py-24 px-margin bg-surface-container-lowest relative" id="simulator">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-circuit-gold font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-[16px]">stream</span>
                <span>Interactive Console Simulator</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-text-primary">
                Sub-Dermal Neural Interface & BAC Dynamics
              </h2>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Stream State:</span>
              <span className="px-space-sm py-0.5 rounded-full bg-primary-container/20 text-primary-container font-label-sm text-label-sm uppercase font-semibold border border-primary-container/30">
                Live Realtime
              </span>
            </div>
          </div>

          {/* Main Simulator Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left: Radial Dial & BAC Readout Pod */}
            <div className="lg:col-span-5 p-space-xl rounded-2xl bg-surface-container-low shadow-xl flex flex-col items-center justify-between gap-space-lg relative overflow-hidden border border-subtle">
              <div className="w-full flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-muted tracking-widest uppercase">
                  HUD GAUGING CLUSTER
                </span>
                <span className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase font-semibold border border-current ${statusColor}`}>
                  {statusText}
                </span>
              </div>

              {/* Circular Radial Progress Gauge Visual SVG */}
              <div className="relative w-72 h-72 flex items-center justify-center my-space-xs">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Background Ring */}
                  <circle
                    className="text-surface-bright"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  {/* Alert Threshold Arc (0.08% limit) */}
                  <circle
                    className="text-circuit-gold/30"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="68"
                    stroke="currentColor"
                    strokeDasharray="85 427"
                    strokeDashoffset="-280"
                    strokeWidth="8"
                  />
                  {/* Dynamic Luminous Cyan Value Arc */}
                  <circle
                    className={`transition-all duration-700 ease-out ${
                      bac >= 0.08 ? 'text-error' : bac >= 0.05 ? 'text-circuit-gold' : 'text-primary-container'
                    }`}
                    cx="80"
                    cy="80"
                    fill="none"
                    r="68"
                    stroke="currentColor"
                    strokeDasharray="427"
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                </svg>

                {/* Dial Interior Readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-widest">
                    Estimated BAC
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-text-primary font-bold tracking-tight">
                      {bac.toFixed(2)}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary-container font-semibold">%</span>
                  </div>
                  <span className="mt-1 px-space-sm py-0.5 rounded-full bg-surface-bright text-primary font-label-sm text-label-sm uppercase tracking-wide border border-subtle">
                    {clearanceText}
                  </span>
                </div>
              </div>

              {/* BAC Fine-tuning slider */}
              <div className="w-full flex flex-col gap-1 px-2">
                <div className="flex justify-between text-xs text-text-muted font-mono">
                  <span>Fine Adjust: 0.00%</span>
                  <span className="text-primary-container font-semibold">{bac.toFixed(3)}% BAC</span>
                  <span>0.14%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.14"
                  step="0.005"
                  value={bac}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val < 0.04) {
                      applyState(val, 'OPTIMAL & CLEARED', 'text-secondary bg-secondary/20', 'Clearance: 15m', 41.8);
                    } else if (val < 0.08) {
                      applyState(val, 'MODERATE METABOLIC', 'text-circuit-gold bg-circuit-gold/20', 'Spike Warning', 36.2);
                    } else {
                      applyState(val, 'HIGH BAC CRITICAL', 'text-error bg-error-container/40', 'Concierge Active', 29.4);
                    }
                  }}
                  className="w-full accent-primary-container cursor-pointer h-2 bg-surface-bright rounded-lg"
                />
              </div>

              {/* Quick Simulation State Buttons */}
              <div className="w-full flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">
                  Simulate Metabolic State
                </span>
                <div className="grid grid-cols-3 gap-space-xs">
                  <button
                    onClick={() =>
                      applyState(0.02, 'OPTIMAL & CLEARED', 'text-secondary bg-secondary/20', 'Clearance: 18m', 41.8)
                    }
                    className={`py-2 px-space-xs rounded-lg font-label-sm text-label-sm uppercase transition-all border ${
                      bac <= 0.03
                        ? 'bg-secondary/20 text-secondary border-secondary'
                        : 'bg-surface-container-high text-text-primary hover:bg-surface-bright border-transparent'
                    }`}
                  >
                    Resting (0.02%)
                  </button>
                  <button
                    onClick={() =>
                      applyState(0.05, 'MODERATE METABOLIC', 'text-circuit-gold bg-circuit-gold/20', 'Spike Warning', 36.2)
                    }
                    className={`py-2 px-space-xs rounded-lg font-label-sm text-label-sm uppercase transition-all border ${
                      bac > 0.03 && bac < 0.08
                        ? 'bg-circuit-gold/20 text-circuit-gold border-circuit-gold'
                        : 'bg-surface-container-high text-text-primary hover:bg-surface-bright border-transparent'
                    }`}
                  >
                    Social (0.05%)
                  </button>
                  <button
                    onClick={() =>
                      applyState(0.09, 'HIGH BAC CRITICAL', 'text-error bg-error-container/40', 'Concierge Active', 28.5)
                    }
                    className={`py-2 px-space-xs rounded-lg font-label-sm text-label-sm uppercase transition-all border ${
                      bac >= 0.08
                        ? 'bg-error-container/50 text-error border-error'
                        : 'bg-surface-container-high text-text-primary hover:bg-surface-bright border-transparent'
                    }`}
                  >
                    Spike (0.09%)
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry Status Line */}
              <div className="w-full pt-space-sm flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-subtle">
                <span className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                  Pulse Rate: {Math.round(68 + bac * 160)} bpm
                </span>
                <span className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-circuit-gold" />
                  Skin Temp: {(34.4 + bac * 2.2).toFixed(1)}°C
                </span>
              </div>
            </div>

            {/* Right: Historical Metabolic Curve Graph & Live Console */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              {/* Metabolic Curve Spark-HUD Card */}
              <div className="p-space-xl rounded-2xl bg-surface-container-low shadow-xl flex flex-col gap-space-md border border-subtle">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider">
                      Metabolic Absorption & Clearance Curve
                    </span>
                    <span className="font-headline-sm text-headline-sm text-text-primary">
                      4-Hour Predictive Trajectory
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-bright font-label-sm text-label-sm text-primary border border-subtle">
                    <span className="material-symbols-outlined text-[14px]">insights</span>
                    <span>ML Predictor v2.1</span>
                  </div>
                </div>

                {/* Inline SVG Metabolic Curve Chart */}
                <div className="w-full h-48 relative pt-2">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Horizontal Guide Lines */}
                    <line className="text-surface-bright" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="30" y2="30" />
                    <line className="text-surface-bright" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="80" y2="80" />
                    <line className="text-surface-bright" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="130" y2="130" />

                    {/* Threshold Critical Line (0.08% BAC level) */}
                    <line stroke="#FFB703" strokeDasharray="2 4" strokeWidth="1.5" x1="0" x2="500" y1="45" y2="45" />
                    <text className="font-label-sm text-[9px] uppercase tracking-widest" fill="#FFB703" x="4" y="40">
                      Legal Limit (0.08% BAC)
                    </text>

                    {/* Gradient Fill Under Curve */}
                    <path
                      d="M 0,140 Q 90,135 140,80 T 260,35 T 360,95 T 500,135 L 500,150 L 0,150 Z"
                      fill="url(#curveGradient)"
                    />
                    {/* Main Trend Line */}
                    <path
                      d="M 0,140 Q 90,135 140,80 T 260,35 T 360,95 T 500,135"
                      fill="none"
                      stroke="#00e5ff"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />

                    {/* Dynamic Simulated Node according to current BAC */}
                    {(() => {
                      const dynamicX = 360;
                      const dynamicY = Math.max(25, 140 - (bac / 0.10) * 110);
                      return (
                        <g>
                          <circle className="animate-ping" cx={dynamicX} cy={dynamicY} fill="#c3f5ff" r="6" stroke="#00e5ff" strokeWidth="3" />
                          <circle cx={dynamicX} cy={dynamicY} fill="#00e5ff" r="4" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Curve Timeline Labels */}
                <div className="flex items-center justify-between text-text-muted font-label-sm text-label-sm pt-space-xs">
                  <span>-3.0 Hrs (Onset)</span>
                  <span>-2.0 Hrs</span>
                  <span>-1.0 Hr (Peak: 0.076%)</span>
                  <span className="text-primary-container font-semibold">T-0 (Now: {bac.toFixed(2)}%)</span>
                  <span>+1.0 Hr (Estimated Clearance)</span>
                </div>
              </div>

              {/* Calibration Test Console & Hardware Diagnostics */}
              <div className="p-space-lg rounded-2xl bg-surface-container-low shadow-xl grid grid-cols-1 md:grid-cols-2 gap-space-md border border-subtle">
                {/* Sensor Impedance Card */}
                <div className="p-space-md rounded-xl bg-surface-container-high flex flex-col gap-space-xs border border-subtle">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase text-text-muted">
                      Sub-Dermal Impedance
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {impedance.toFixed(1)} kΩ
                    </span>
                  </div>
                  <div className="w-full bg-surface-bright h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-container h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (impedance / 50) * 100)}%` }}
                    />
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Optimal epidermal moisture contact.
                  </span>
                </div>

                {/* Optical Transmittance Card */}
                <div className="p-space-md rounded-xl bg-surface-container-high flex flex-col gap-space-xs border border-subtle">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase text-text-muted">
                      Spectrometry Accuracy
                    </span>
                    <span className="font-label-sm text-label-sm text-circuit-gold font-semibold">
                      99.8% Calibrated
                    </span>
                  </div>
                  <div className="w-full bg-surface-bright h-2 rounded-full overflow-hidden">
                    <div className="bg-circuit-gold h-full rounded-full" style={{ width: '98%' }} />
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Continuous optical drift compensation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technological Capabilities (4 Architectural Pillars) */}
      <section className="w-full py-24 px-margin bg-surface-obsidian" id="pillars">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-[0.2em] font-semibold">
              Pioneering Bio-Spectroscopy
            </span>
            <h2 className="font-headline-lg text-headline-lg text-text-primary">
              Four Pillars of Non-Invasive Metabolic Defense
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Moving beyond rudimentary accelerometers to clinical-grade biochemical sensing embedded within high-fashion silicon and woven wristwear.
            </p>
          </div>

          {/* Bento Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 1 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg group border border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform border border-primary-container/20">
                  <span className="material-symbols-outlined text-[28px]">biotech</span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Transdermal Micro-Spectrometry
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Optical multi-wavelength emitter analyzes ethanol molecules within sweat vapor at ppm precision without prick tests or invasive probes.
                  </p>
                </div>
              </div>
              <div className="pt-space-sm flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-subtle">
                <span>Accuracy: ±0.003%</span>
                <span className="text-primary-container font-semibold">680nm - 940nm</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg group border border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform border border-secondary/20">
                  <span className="material-symbols-outlined text-[28px]">water_drop</span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Hydration & Electrolyte Buffer
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Continuous galvanic sweat conductivity monitors sodium and potassium shifts to forecast morning fatigue and cellular dehydration early.
                  </p>
                </div>
              </div>
              <div className="pt-space-sm flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-subtle">
                <span>Cellular Osmolarity</span>
                <span className="text-secondary font-semibold">Osmotic Tracking</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg group border border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-circuit-gold/10 flex items-center justify-center text-circuit-gold group-hover:scale-105 transition-transform border border-circuit-gold/20">
                  <span className="material-symbols-outlined text-[28px]">vibration</span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Proactive Haptic Interventions
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Subtle micro-frequency pulses warn the user of fast metabolic rate shifts, prompting water intake before judgment or balance are compromised.
                  </p>
                </div>
              </div>
              <div className="pt-space-sm flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-subtle">
                <span>Taptic Engine</span>
                <span className="text-circuit-gold font-semibold">Custom Resonance</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between gap-space-lg group border border-subtle">
              <div className="flex flex-col gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-container group-hover:scale-105 transition-transform border border-tertiary-container/20">
                  <span className="material-symbols-outlined text-[28px]">local_taxi</span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Encrypted Safety Concierge
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    One-touch or autonomic trip orchestration. Dispatches premium rideshare tokens directly to your trusted circle with zero plain-text GPS exposure.
                  </p>
                </div>
              </div>
              <div className="pt-space-sm flex items-center justify-between text-text-muted font-label-sm text-label-sm border-t border-subtle">
                <span>Zero-Knowledge Tokens</span>
                <span className="text-tertiary-container font-semibold">AES-256 Vault</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle & Autonomous Safety Network Demonstration */}
      <section className="w-full py-24 px-margin bg-surface-container-lowest" id="chaperone">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Visual Lifestyle Narrative */}
          <div className="lg:col-span-6 relative">
            <div className="w-full h-[460px] rounded-2xl overflow-hidden shadow-2xl relative border border-subtle">
              <img
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                alt="Editorial night-time photograph in a luxury lounge bar showing an individual holding a cocktail glass with a high-fashion biometric DrunkWatch bracelet"
                src={ASSETS.drunkWatchLifestyle}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface-obsidian via-transparent to-surface-obsidian/40" />

              {/* Callout Pin on Cuff */}
              <div className="absolute bottom-6 left-6 p-space-md rounded-xl bg-surface-slate/90 backdrop-blur-md shadow-lg flex items-center gap-space-md max-w-xs border border-circuit-gold/30">
                <div className="w-8 h-8 rounded-full bg-circuit-gold flex items-center justify-center text-on-tertiary-fixed font-bold">
                  <span className="material-symbols-outlined text-[18px]">shield</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-circuit-gold uppercase">Guardian Trigger</span>
                  <span className="font-body-sm text-body-sm text-text-primary font-medium">
                    Autonomous Ride Hail Armed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Dispatch Protocol Mechanics */}
          <div className="lg:col-span-6 flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-[0.2em] font-semibold">
                Autonomic Protection Network
              </span>
              <h2 className="font-headline-lg text-headline-lg text-text-primary">
                Sovereignty When Discretion Matters Most
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                DrunkWatch™ operates silently on your wrist, providing calm assurance in bustling metropolitan evenings, private galas, and late-night travels.
              </p>
            </div>

            {/* Protocol Steps */}
            <div className="flex flex-col gap-space-md">
              <div className="flex gap-space-md items-start">
                <span className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm font-semibold shrink-0 border border-primary/30">
                  01
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Predictive Spike Telemetry
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Detects dynamic escalation before cognitive delay occurs, providing quiet haptic cues.
                  </p>
                </div>
              </div>

              <div className="flex gap-space-md items-start">
                <span className="w-7 h-7 rounded-full bg-surface-container-high text-circuit-gold flex items-center justify-center font-label-sm text-label-sm font-semibold shrink-0 border border-circuit-gold/30">
                  02
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Zero-Touch Chaperone Mode
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    If blood alcohol threshold exceeds customized limits, an encrypted concierge vehicle summons to your current location.
                  </p>
                </div>
              </div>

              <div className="flex gap-space-md items-start">
                <span className="w-7 h-7 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-label-sm text-label-sm font-semibold shrink-0 border border-secondary/30">
                  03
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-text-primary font-medium">
                    Encrypted Ring Notification
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Designated family or security detail receives a tamper-proof check-in ping confirming your safe transit route.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-space-xs">
              <button
                onClick={handleTestDispatch}
                className="px-space-xl py-3 rounded-full bg-surface-container-high text-circuit-gold font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:bg-surface-bright transition-all flex items-center gap-space-xs border border-circuit-gold/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Test Concierge Dispatch Ping</span>
              </button>
            </div>

            {dispatchAlert && (
              <div className="p-3.5 rounded-xl bg-surface-slate border border-circuit-gold text-circuit-gold font-body-sm text-body-sm flex items-start gap-2 animate-fadeIn">
                <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">verified</span>
                <span>{dispatchAlert}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Standards, Clinical Validation & Compliance Matrix */}
      <section className="w-full py-20 px-margin bg-surface-obsidian" id="compliance">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="p-space-xl rounded-2xl bg-surface-container-low shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-xl border border-subtle">
            <div className="flex flex-col gap-space-xs max-w-xl">
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest font-semibold">
                Scientific Rigor & Medical Sovereignty
              </span>
              <h3 className="font-headline-md text-headline-md text-text-primary">
                WestCoast Computational Bio-Lab Validated
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Cross-referenced with GC-MS (Gas Chromatography-Mass Spectrometry) blood draw tests across 1,400 clinical trials. Designed under strict HIPAA-compliant zero-knowledge architecture.
              </p>
            </div>

            {/* Compliance Badges Badging Grid */}
            <div className="grid grid-cols-2 gap-space-md shrink-0 w-full md:w-auto">
              <div className="p-space-md rounded-xl bg-surface-container-high flex items-center gap-space-sm border border-subtle">
                <span className="material-symbols-outlined text-primary-container text-[24px]">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-primary font-semibold">HIPAA Telemetry</span>
                  <span className="font-body-sm text-body-sm text-text-muted">End-to-End Encrypted</span>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-high flex items-center gap-space-sm border border-subtle">
                <span className="material-symbols-outlined text-circuit-gold text-[24px]">workspace_premium</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-primary font-semibold">ISO 13485:2016</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Medical Device Standard</span>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-high flex items-center gap-space-sm border border-subtle">
                <span className="material-symbols-outlined text-secondary text-[24px]">memory</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-primary font-semibold">Wear OS / watchOS</span>
                  <span className="font-body-sm text-body-sm text-text-muted">Native Micro-App</span>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-high flex items-center gap-space-sm border border-subtle">
                <span className="material-symbols-outlined text-tertiary text-[24px]">lock_reset</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-primary font-semibold">Self-Sovereign</span>
                  <span className="font-body-sm text-body-sm text-text-muted">On-Device Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
