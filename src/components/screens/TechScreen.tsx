import React, { useState } from 'react';
import { IMAGES, KEYNOTE_DECKS } from '../../data/mockData';

interface TechScreenProps {
  onNavigateToDrunkwatch: () => void;
  onNavigateToTeaching: () => void;
  onOpenKeynote: (deck: (typeof KEYNOTE_DECKS)[0]) => void;
}

export const TechScreen: React.FC<TechScreenProps> = ({
  onNavigateToDrunkwatch,
  onNavigateToTeaching,
  onOpenKeynote,
}) => {
  const [activePillar, setActivePillar] = useState<'ai' | 'blockchain' | '3d' | 'wearable'>('ai');
  const [terminalCommands, setTerminalCommands] = useState<string[]>([
    '> init WatchSensoryMesh(target_os: [WEAR_OS, WATCH_OS]);',
    '> [OK] Biosensor stream attached at /dev/transdermal0',
    '> Status: Autonomous Health Loop Listening...',
  ]);
  const [customCmd, setCustomCmd] = useState('');

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCmd.trim()) return;
    const cmd = customCmd.trim();
    let response = `> Executing "${cmd}"... OK. Telemetry stream synchronized.`;
    if (cmd.toLowerCase().includes('status')) {
      response = '> Status: All 1,024 crypto-nodes reporting 0.00% packet loss. Latency: 1.18ms.';
    } else if (cmd.toLowerCase().includes('drunkwatch') || cmd.toLowerCase().includes('bac')) {
      response = '> DrunkWatch Sub-Dermal daemon: Optical wavelength calibrated (680nm-940nm). Interstitial buffer stable.';
    } else if (cmd.toLowerCase().includes('help')) {
      response = '> Available commands: status, drunkwatch, ping, calibrate, clear';
    } else if (cmd.toLowerCase().includes('clear')) {
      setTerminalCommands(['> Terminal cleared. Telemetry daemon running.']);
      setCustomCmd('');
      return;
    }

    setTerminalCommands((prev) => [...prev, `> ${cmd}`, response]);
    setCustomCmd('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Circuit Grid Ribbon */}
      <div className="w-full bg-[#0a0e14] px-4 sm:px-8 lg:px-12 py-3 border-b border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-['Space_Grotesk'] text-[11px] text-[#bac9cc] tracking-widest uppercase font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
          <span className="text-[#F8FAFC]">CORE SPEC: ARCHITECTURE v4.8</span>
          <span className="text-[#3b494c]">/</span>
          <span className="text-[#FFB703]">HARDWARE & DISTRIBUTED SYSTEM MESH</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] font-['Space_Grotesk']">
          <div className="flex items-center gap-2 text-[#bac9cc]">
            <span className="text-[#849396]">LATENCY:</span>
            <span className="text-[#c3f5ff] font-mono tracking-wider font-bold">1.2ms</span>
          </div>
          <div className="flex items-center gap-2 text-[#bac9cc]">
            <span className="text-[#849396]">CRYPTO-NODES:</span>
            <span className="text-[#4cd6fb] font-mono tracking-wider font-bold">1,024 ACTIVE</span>
          </div>
          <div className="flex items-center gap-2 text-[#bac9cc] hidden md:flex">
            <span className="text-[#849396]">DUAL OS:</span>
            <span className="text-[#FFB703] font-mono tracking-wider font-bold">WEAR OS // watchOS</span>
          </div>
        </div>
      </div>

      {/* Hero Telemetry Matrix Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-12 py-12 overflow-hidden bg-[#181c22]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typographic Architecture */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a31] w-fit border border-[#00e5ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#00e5ff] font-semibold">
                PHYGITAL MATRIX • AUTONOMOUS WEAR
              </span>
            </div>

            <div className="flex flex-col">
              <p className="font-['Space_Grotesk'] text-[14px] uppercase tracking-widest text-[#FFB703] font-semibold">
                PARADIGM SHIFT // COUTURE TRANSCENDENCE
              </p>
              <h1 className="font-['Space_Grotesk'] text-display text-[#F8FAFC] tracking-tight mt-1">
                Tech is the{' '}
                <span className="text-[#00e5ff] underline decoration-[#00e5ff]/40 underline-offset-8">
                  New Black
                </span>
              </h1>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-body-lg text-[#bac9cc] max-w-2xl leading-relaxed">
              The irreversible convergence of Artificial Intelligence, sovereign blockchain ledgers, parametric 3D additive synthesis, and transdermal biosensors. We do not wear machines; we inhabit living cybernetic skins tailored to personal sovereignty.
            </p>

            {/* Dynamic Stat Pods */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="p-4 bg-[#31353c]/80 backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] text-[#849396] uppercase tracking-wider font-semibold">
                  AI Biosignal Loop
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-['Space_Grotesk'] text-[28px] text-[#c3f5ff] font-bold">99.8</span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] font-semibold">% ACC</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc] mt-1">
                  Predictive drift inference
                </span>
              </div>

              <div className="p-4 bg-[#31353c]/80 backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
                <span className="font-['Space_Grotesk'] text-[11px] text-[#849396] uppercase tracking-wider font-semibold">
                  Fabric Lattice
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-['Space_Grotesk'] text-[28px] text-[#4cd6fb] font-bold">0.0</span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] font-semibold">WASTE</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc] mt-1">
                  Parametric zero-purge SLS
                </span>
              </div>

              <div className="p-4 bg-[#31353c]/80 backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.06)] flex flex-col justify-between col-span-2 sm:col-span-1">
                <span className="font-['Space_Grotesk'] text-[11px] text-[#849396] uppercase tracking-wider font-semibold">
                  Provenance
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-['Space_Grotesk'] text-[28px] text-[#FFB703] font-bold">100</span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] font-semibold">% IMMUTABLE</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc] mt-1">
                  On-chain digital twin
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00e5ff] text-[#00363d] font-['Space_Grotesk'] text-[13px] tracking-wider font-bold shadow-[0_0_24px_rgba(0,229,255,0.45)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>EXPLORE 4 PILLARS</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
              <a
                href="#smartwatch"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#31353c] text-[#c3f5ff] font-['Space_Grotesk'] text-[13px] tracking-wider font-semibold hover:bg-[#353940] transition-all border border-[rgba(255,255,255,0.08)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">watch</span>
                <span>WRIST TELEMETRY LAB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Sensory Array Interactive Display */}
          <div className="lg:col-span-5 relative flex flex-col gap-4">
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-[#121824] shadow-2xl border border-[rgba(255,255,255,0.08)] group">
              <img
                className="w-full h-full object-cover object-center mix-blend-luminosity opacity-85 group-hover:mix-blend-normal transition-all duration-700"
                alt="Futuristic luxury wearable smart fashion garment interwoven with luminous neon cyan conductive threads"
                src={IMAGES.techModel}
              />

              {/* Luminous Circuit Overlay Vector */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#00e5ff]/30">
                <line stroke="currentColor" strokeDasharray="4 6" strokeWidth="1.5" x1="20%" x2="80%" y1="10%" y2="10%"></line>
                <line stroke="currentColor" strokeDasharray="2 4" strokeWidth="1.5" x1="80%" x2="80%" y1="10%" y2="70%"></line>
                <circle cx="80%" cy="70%" fill="#00e5ff" r="5"></circle>
                <circle cx="20%" cy="10%" fill="#FFB703" r="4"></circle>
                <line stroke="currentColor" strokeWidth="1" x1="15%" x2="70%" y1="90%" y2="90%"></line>
              </svg>

              {/* Telemetry Live HUD Overlay Tag */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0B0F15]/90 backdrop-blur-md shadow-lg flex flex-col gap-1 max-w-[210px] border border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#FFB703] font-semibold">LAYER 01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
                </div>
                <p className="font-['Space_Grotesk'] text-[11px] text-[#F8FAFC] tracking-wider uppercase font-semibold">
                  SYNTACTIC FIBER ARRAY
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc]">
                  Real-time dermal galvanic feedback.
                </p>
              </div>

              {/* Live Biometric Waveform Box */}
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0a0e14]/90 backdrop-blur-lg border border-[rgba(0,229,255,0.3)] shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">vital_signs</span>
                  <div>
                    <p className="font-['Space_Grotesk'] text-[11px] text-[#F8FAFC] uppercase tracking-wider font-semibold">
                      BIO-DIAGNOSTIC WAVEFORM
                    </p>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#849396]">
                      Realtime In-silico Pulse Stream
                    </p>
                  </div>
                </div>

                <svg className="w-32 h-8 text-[#00e5ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 120 30">
                  <path d="M0 15 H30 L38 5 L45 25 L52 10 L58 18 L64 15 H120" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pillars Matrix Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#0B0F15]" id="pillars">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#FFB703] font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-semibold mb-1">
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                <span>QUAD-VECTOR FOUNDATION</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC]">
                The 4 Technological Pillars
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#bac9cc] max-w-xl mt-2">
                Where luxury silhouettes dissolve into high-performance computation. Explore how our stack redefines wearable value.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#262a31] border border-[rgba(255,255,255,0.08)] flex-wrap">
              {[
                { id: 'ai', label: 'AI Predictive' },
                { id: 'blockchain', label: 'Blockchain' },
                { id: '3d', label: '3D Lattice' },
                { id: 'wearable', label: 'Dermal Tech' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePillar(tab.id as any)}
                  className={`px-4 py-1.5 rounded-full font-['Space_Grotesk'] text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activePillar === tab.id
                      ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'text-[#bac9cc] hover:text-[#F8FAFC]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: AI */}
            <div
              onClick={() => setActivePillar('ai')}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group shadow-lg cursor-pointer ${
                activePillar === 'ai'
                  ? 'bg-[#262a31] border-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.25)] scale-[1.02]'
                  : 'bg-[#181c22] border-[rgba(255,255,255,0.08)] hover:bg-[#1c2026]'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#262a31] text-[#00e5ff] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">neurology</span>
                  </span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#c3f5ff] tracking-widest font-mono font-bold">
                    PIL.01
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold mt-1">
                  Artificial Intelligence
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-relaxed">
                  Real-time biomarker predictive algorithms continuously evaluate metabolic strain, posture kinematics, and ambient climate. Autonomous adaptation shifts breathability and micro-insulation before the wearer perceives discomfort.
                </p>
              </div>

              <div className="pt-6 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] mt-4">
                <div className="flex justify-between items-center font-['Space_Grotesk'] text-[11px]">
                  <span className="text-[#849396] uppercase">Neural Core Throttle</span>
                  <span className="text-[#00e5ff] font-mono font-bold">1.8 TFLOPS</span>
                </div>
                <div className="w-full bg-[#31353c] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                  Dynamic Garment Customization Active
                </span>
              </div>
            </div>

            {/* Pillar 2: Blockchain */}
            <div
              onClick={() => setActivePillar('blockchain')}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group shadow-lg cursor-pointer ${
                activePillar === 'blockchain'
                  ? 'bg-[#262a31] border-[#FFB703] shadow-[0_0_24px_rgba(255,183,3,0.25)] scale-[1.02]'
                  : 'bg-[#181c22] border-[rgba(255,255,255,0.08)] hover:bg-[#1c2026]'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#262a31] text-[#FFB703] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">token</span>
                  </span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#FFB703] tracking-widest font-mono font-bold">
                    PIL.02
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold mt-1">
                  Blockchain Provenance
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-relaxed">
                  Every ZoeWear silhouette is anchored to a sovereign decentralized cryptographic ledger. Track the entire lifecycle from organic conductive yarn harvesting and additive fabrication to secondary luxury transfers and phygital avatars.
                </p>
              </div>

              <div className="pt-6 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] mt-4">
                <div className="flex justify-between items-center font-['Space_Grotesk'] text-[11px]">
                  <span className="text-[#849396] uppercase">ERC-721 Twin Minting</span>
                  <span className="text-[#FFB703] font-mono font-bold">100% VERIFIED</span>
                </div>
                <div className="w-full bg-[#31353c] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#FFB703] h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
                  Anti-Counterfeit NFC Seal Encrypted
                </span>
              </div>
            </div>

            {/* Pillar 3: 3D Additive */}
            <div
              onClick={() => setActivePillar('3d')}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group shadow-lg cursor-pointer ${
                activePillar === '3d'
                  ? 'bg-[#262a31] border-[#4cd6fb] shadow-[0_0_24px_rgba(76,214,251,0.25)] scale-[1.02]'
                  : 'bg-[#181c22] border-[rgba(255,255,255,0.08)] hover:bg-[#1c2026]'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#262a31] text-[#4cd6fb] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
                  </span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#4cd6fb] tracking-widest font-mono font-bold">
                    PIL.03
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold mt-1">
                  3D Additive Synthesis
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-relaxed">
                  Revolutionary parametric zero-waste additive manufacturing generates hyper-flexible lattices that mirror the human musculoskeletal structure. Custom plantar and spinal cushioning crafted with 100% recyclable plant-based bio-polymers.
                </p>
              </div>

              <div className="pt-6 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] mt-4">
                <div className="flex justify-between items-center font-['Space_Grotesk'] text-[11px]">
                  <span className="text-[#849396] uppercase">Lattice Density Modulus</span>
                  <span className="text-[#4cd6fb] font-mono font-bold">0.42 g/cm³</span>
                </div>
                <div className="w-full bg-[#31353c] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#4cd6fb] h-full rounded-full" style={{ width: '76%' }}></div>
                </div>
                <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd6fb]"></span>
                  Zero Material Subtractive Waste
                </span>
              </div>
            </div>

            {/* Pillar 4: Wearable Tech */}
            <div
              onClick={() => setActivePillar('wearable')}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group shadow-lg cursor-pointer ${
                activePillar === 'wearable'
                  ? 'bg-[#262a31] border-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.25)] scale-[1.02]'
                  : 'bg-[#181c22] border-[rgba(255,255,255,0.08)] hover:bg-[#1c2026]'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-xl bg-[#262a31] text-[#00e5ff] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">sensors</span>
                  </span>
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#c3f5ff] tracking-widest font-mono font-bold">
                    PIL.04
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold mt-1">
                  Transdermal Biosensors
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] leading-relaxed">
                  Ultra-lightweight microchips and silver nanowire circuitry woven seamlessly into the warp and weft of evening capes and running suites. Continuous transdermal alcohol, hydration, and cardiovascular analysis without uncomfortable silicone probes.
                </p>
              </div>

              <div className="pt-6 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] mt-4">
                <div className="flex justify-between items-center font-['Space_Grotesk'] text-[11px]">
                  <span className="text-[#849396] uppercase">Conductive Wire Gauge</span>
                  <span className="text-[#00e5ff] font-mono font-bold">12 µm</span>
                </div>
                <div className="w-full bg-[#31353c] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="font-['Space_Grotesk'] text-[11px] text-[#bac9cc] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                  Skin Impedance Auto-Calibrated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Wear OS & watchOS Sensory Architecture */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#0a0e14] border-t border-[rgba(255,255,255,0.08)]" id="smartwatch">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 cols: Smartwatch Specs */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#c3f5ff] font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-semibold">
                <span className="material-symbols-outlined text-[16px]">watch_screentime</span>
                <span>INITIAL WEARABLE ECOSYSTEM // DUAL ENGINE</span>
              </div>

              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC]">
                Wear OS & watchOS Cross-Platform Matrix
              </h2>

              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#bac9cc] leading-relaxed">
                Our genesis wearable platform anchors directly to both Wear OS and Apple watchOS. By standardizing high-frequency raw biosignal pipelines across platforms, ZoeWear transforms the consumer smartwatch from a passive notification pod into an active clinical-grade bio-sentinel.
              </p>

              {/* Core Feature Bullets */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#262a31] text-[#00e5ff] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[16px] text-[#F8FAFC] font-semibold leading-snug">
                      Continuous Biosignal Multiplexing
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] mt-0.5">
                      Synchronizes ECG, continuous EDA, transdermal ethanol diagnostics, and peripheral temperature at 100Hz with near-zero battery drain.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#262a31] text-[#FFB703] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">security</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[16px] text-[#F8FAFC] font-semibold leading-snug">
                      Autonomous Edge Guardian: DrunkWatch™
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] mt-0.5">
                      Sub-ppm transdermal vapor sensors paired with local ML classifiers to alert wearers before cognitive degradation occurs.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181c22] border border-[rgba(255,255,255,0.06)] flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#262a31] text-[#4cd6fb] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">hub</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-[16px] text-[#F8FAFC] font-semibold leading-snug">
                      Fabric Haptic Tether
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] mt-0.5">
                      Low-energy Bluetooth mesh bridges wrist actions directly into jacket collar thermal actuators and responsive shoe soling.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Literary Artifact & Terminal */}
            <div className="lg:col-span-6 relative flex flex-col justify-center" id="terminal">
              <div className="relative w-full rounded-2xl bg-[#262a31] border border-[rgba(255,255,255,0.1)] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB703] animate-pulse"></span>
                    <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#FFB703] font-semibold">
                      LITERARY TELEMETRY SPOTLIGHT
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#849396]">DOC // 03.WRIST</span>
                </div>

                {/* Stanzas from source */}
                <div className="flex flex-col gap-4 z-10 pl-2">
                  <p className="font-['Space_Grotesk'] text-[20px] text-[#F8FAFC] tracking-wide italic leading-relaxed">
                    “Tiny screen on wrist glows,<br />
                    Whispers health secrets untold,<br />
                    World shifts in wrist’s hold.”
                  </p>
                  <div className="w-12 h-0.5 bg-[#FFB703]/50"></div>
                  <p className="font-['Space_Grotesk'] text-[20px] text-[#00e5ff] tracking-wide italic leading-relaxed">
                    “Smart bracelet’s gentle light,<br />
                    Guides steps, health in its delight,<br />
                    Future on your arm’s sight.”
                  </p>
                </div>

                {/* Device Visual Card Embedded */}
                <div className="z-10 p-4 rounded-xl bg-[#0B0F15] border border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#31353c] shrink-0 overflow-hidden relative shadow-inner">
                    <img
                      className="w-full h-full object-cover"
                      alt="ZoeWear watchOS face"
                      src={IMAGES.watchCloseUp}
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="font-['Space_Grotesk'] text-[13px] font-bold text-[#c3f5ff] uppercase">
                        ZoeWear WatchOS Core v3
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#c3f5ff]/20 text-[#c3f5ff] font-mono font-bold">
                        RELEASED
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#bac9cc]">
                      Compatible with Apple Watch Ultra, Pixel Watch 3, and Galaxy Watch 7 Series.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 text-[11px] font-['Space_Grotesk'] text-[#FFB703] font-semibold">
                      <span>99.4% Uptime</span>
                      <span>•</span>
                      <span>Transdermal Ready</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Terminal Code Feed */}
                <div className="z-10 rounded-xl bg-[#0a0e14] border border-[rgba(0,229,255,0.2)] p-4 font-mono text-[11px] text-[#3b494c] flex flex-col gap-1.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)] text-[#849396]">
                    <span>ZOEWEAR KERNEL // VIRTUAL CONSOLE</span>
                    <span className="text-[#00e5ff]">PORT 9042</span>
                  </div>
                  <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                    {terminalCommands.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.startsWith('> Status:')
                            ? 'text-[#FFB703]'
                            : line.startsWith('> [OK]')
                            ? 'text-[#4cd6fb]'
                            : line.startsWith('> init')
                            ? 'text-[#00e5ff]'
                            : 'text-[#dfe2eb]'
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleRunCommand} className="flex items-center gap-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="text-[#00e5ff]">&gt;</span>
                    <input
                      type="text"
                      value={customCmd}
                      onChange={(e) => setCustomCmd(e.target.value)}
                      placeholder="Type command (e.g. status, drunkwatch, help)..."
                      className="bg-transparent text-[#F8FAFC] focus:outline-none w-full text-[11px]"
                    />
                    <button type="submit" className="text-[#00e5ff] text-[10px] uppercase font-bold hover:underline cursor-pointer">
                      RUN
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Convergence Architecture: 4 Stages */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#181c22]" id="convergence">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#00e5ff] font-semibold">
                SYSTEM TELEMETRY ENGINE
              </span>
              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC] mt-1">
                Convergence Architecture
              </h2>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-body-sm text-[#bac9cc] max-w-md">
              How our quad-pillar stack translates physical kinetic biological data into immutable luxury asset histories in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#262a31] border border-[rgba(255,255,255,0.08)] flex flex-col gap-3 relative overflow-hidden">
              <span className="font-['Space_Grotesk'] text-[44px] text-[#31353c]/80 absolute right-4 top-2 font-bold select-none">
                01
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#c3f5ff] font-semibold">
                STAGE 1: CAPTURE
              </span>
              <h4 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                Micro-Sensory Weave
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc]">
                Conductive polymers register body heat, perspiration ethanol levels, and biomechanical posture pressure points at millisecond cadence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#262a31] border border-[rgba(255,255,255,0.08)] flex flex-col gap-3 relative overflow-hidden">
              <span className="font-['Space_Grotesk'] text-[44px] text-[#31353c]/80 absolute right-4 top-2 font-bold select-none">
                02
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#4cd6fb] font-semibold">
                STAGE 2: INFERENCE
              </span>
              <h4 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                Edge AI Processing
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc]">
                Local neural networks parse sensory input directly on the smartwatch or embedded collar MCU, preserving raw biometric privacy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#262a31] border border-[rgba(255,255,255,0.08)] flex flex-col gap-3 relative overflow-hidden">
              <span className="font-['Space_Grotesk'] text-[44px] text-[#31353c]/80 absolute right-4 top-2 font-bold select-none">
                03
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#FFB703] font-semibold">
                STAGE 3: ADAPTATION
              </span>
              <h4 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                3D Kinetic Feedback
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc]">
                Shape-memory polymers and parametric lattice soles dynamically adjust stiffness and ventilation zones to support physiological needs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#262a31] border border-[rgba(255,255,255,0.08)] flex flex-col gap-3 relative overflow-hidden">
              <span className="font-['Space_Grotesk'] text-[44px] text-[#31353c]/80 absolute right-4 top-2 font-bold select-none">
                04
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#00e5ff] font-semibold">
                STAGE 4: CONSENSUS
              </span>
              <h4 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold">
                Ledger Passports
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc]">
                Zero-knowledge proofs commit garment wellness histories and authentic provenance signatures to decentralized smart contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Lab Disclosures: Keynotes & Presentations */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#0B0F15]" id="keynotes">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#FFB703] font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-semibold mb-1">
                <span className="material-symbols-outlined text-[16px]">co_present</span>
                <span>PUBLIC LAB DISCLOSURES</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-headline-lg text-[#F8FAFC]">
                Keynotes & Tech Presentations
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-body-md text-[#bac9cc] max-w-2xl mt-1">
                Direct slides, keynotes, and technical demonstrations showcased across premier engineering and fashion-tech symposiums.
              </p>
            </div>

            <span className="font-['Space_Grotesk'] text-[11px] text-[#849396] uppercase tracking-wider font-semibold">
              ARCHIVE REF: GOOGLE SLIDES ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KEYNOTE_DECKS.map((deck) => (
              <div
                key={deck.id}
                className="p-6 rounded-2xl bg-[#181c22] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,229,255,0.4)] transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#31353c]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={deck.title}
                      src={deck.imageUrl}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0F15]/90 backdrop-blur-md border border-[rgba(255,255,255,0.1)]">
                      <span className="font-['Space_Grotesk'] text-[11px] text-[#00e5ff] font-mono font-bold">
                        {deck.conference}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-[#0B0F15]/80 text-[#FFB703]">
                      <span className="material-symbols-outlined text-[18px]">slideshow</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-['Space_Grotesk'] text-[11px] text-[#849396] uppercase tracking-widest font-semibold">
                      {deck.event}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-[18px] text-[#F8FAFC] font-semibold group-hover:text-[#00e5ff] transition-colors">
                      {deck.title}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#bac9cc] mt-1 line-clamp-3">
                      {deck.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] mt-4">
                  <span className="font-['Space_Grotesk'] text-[11px] text-[#3b494c] font-mono font-semibold">
                    {deck.hash}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenKeynote(deck)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262a31] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-[#00363d] transition-all font-['Space_Grotesk'] text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      <span>Preview Deck</span>
                    </button>
                    <a
                      href={deck.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#262a31] text-[#bac9cc] hover:text-[#F8FAFC] transition-colors"
                      title="Open Presentation in Google Slides"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & SDK Access Strip */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-12 bg-[#0a0e14]">
        <div className="max-w-7xl mx-auto p-8 sm:p-10 rounded-2xl bg-[#0B0F15] border border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#c3f5ff] font-['Space_Grotesk'] text-[11px] uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping"></span>
              <span>RESEARCH & SDK ACCESS</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-[24px] text-[#F8FAFC] font-semibold">
              Build for the ZoeWear Transdermal Mesh
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-body-sm text-[#bac9cc] max-w-xl">
              Access our open bio-telemetry SDK, Wear OS companion daemon, and on-chain ERC-721 Phygital Passport smart contracts. Join academic research cohorts worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToTeaching}
              className="px-6 py-3 rounded-full bg-[#00e5ff] text-[#00363d] font-['Space_Grotesk'] text-[13px] tracking-wider font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 transition-all cursor-pointer"
            >
              DEVELOPER DOCS
            </button>
            <button
              onClick={onNavigateToDrunkwatch}
              className="px-6 py-3 rounded-full bg-[#262a31] text-[#F8FAFC] font-['Space_Grotesk'] text-[13px] tracking-wider font-semibold hover:bg-[#353940] transition-all border border-[rgba(255,255,255,0.08)] cursor-pointer"
            >
              DRUNKWATCH™ SPEC
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
