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
  // Simulator State
  const [bac, setBac] = useState<number>(0.02);
  const [statusText, setStatusText] = useState<string>('OPTIMAL & CLEARED TO DRIVE');
  const [statusColor, setStatusColor] = useState<string>('text-secondary bg-secondary/20 border-secondary/40');
  const [clearanceText, setClearanceText] = useState<string>('Clearance: 18m');
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState<boolean>(false);
  const [impedance, setImpedance] = useState<number>(41.8);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  // Video Theater State
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [activeVideoTab, setActiveVideoTab] = useState<'video' | 'multimodal' | 'specs'>('video');
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0);
  const [videoIframeKey, setVideoIframeKey] = useState<number>(1);

  // Interactive Passcode Behavioral Motor Test State
  const [passcodeDigits, setPasscodeDigits] = useState<string>('');
  const [motorScore, setMotorScore] = useState<{
    score: number;
    dwellTimeMs: number;
    tremorVariance: number;
    verdict: string;
    verdictColor: string;
  } | null>(null);
  const [keyPressHistory, setKeyPressHistory] = useState<number[]>([]);

  // Interactive Gait Telemetry State
  const [gaitActive, setGaitActive] = useState<boolean>(true);
  const [gaitCadence, setGaitCadence] = useState<number>(112);
  const [lateralSway, setLateralSway] = useState<number>(1.4);

  // Circumference calculation for radial gauge: 2 * PI * 68 = ~427.25
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

    // Adjust simulated gait & sway according to BAC
    if (val < 0.04) {
      setLateralSway(1.2);
      setGaitCadence(114);
    } else if (val < 0.08) {
      setLateralSway(3.8);
      setGaitCadence(98);
    } else {
      setLateralSway(8.6);
      setGaitCadence(74);
    }
  };

  const handleQuickCalibrate = () => {
    setIsCalibrating(true);
    setCalibrationSuccess(false);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationSuccess(true);
      setTimeout(() => setCalibrationSuccess(false), 4500);
    }, 1200);
  };

  const handleTestDispatch = () => {
    setDispatchAlert(
      'Encrypted DrunkWatch Concierge Ping Dispatched: Zero-knowledge rideshare chaperone token routed. Vehicle ignition lockout handshake initiated.'
    );
    setTimeout(() => setDispatchAlert(null), 7000);
  };

  // Passcode Motor Test Handlers
  const handlePasscodeTap = (digit: string) => {
    const now = performance.now();
    const updatedHistory = [...keyPressHistory, now];
    setKeyPressHistory(updatedHistory);

    const newCode = (passcodeDigits + digit).slice(-4);
    setPasscodeDigits(newCode);

    if (newCode.length === 4) {
      // Calculate motor metrics
      const intervals: number[] = [];
      for (let i = 1; i < updatedHistory.length; i++) {
        intervals.push(updatedHistory[i] - updatedHistory[i - 1]);
      }
      const avgInterval = intervals.length > 0
        ? intervals.reduce((a, b) => a + b, 0) / intervals.length
        : 180;

      // Adjust motor score based on current simulated BAC and tap timing
      const baseScore = Math.max(20, Math.min(100, Math.round(100 - bac * 600 - (avgInterval > 400 ? 25 : 0))));
      const simulatedDwell = Math.round(140 + bac * 450);
      const simulatedTremor = parseFloat((0.8 + bac * 12.4).toFixed(1));

      let verdict = 'Motor Cadence Normal (Sobriety Verified)';
      let verdictColor = 'text-secondary';

      if (bac >= 0.08 || baseScore < 60) {
        verdict = 'Impaired Motor Velocity — Driving Lockdown Triggered';
        verdictColor = 'text-error';
      } else if (bac >= 0.04 || baseScore < 80) {
        verdict = 'Mild Reaction Lag Detected — Caution Advised';
        verdictColor = 'text-circuit-gold';
      }

      setMotorScore({
        score: baseScore,
        dwellTimeMs: simulatedDwell,
        tremorVariance: simulatedTremor,
        verdict,
        verdictColor,
      });
    }
  };

  const handleResetPasscode = () => {
    setPasscodeDigits('');
    setMotorScore(null);
    setKeyPressHistory([]);
  };

  const handleSeekVideo = (seconds: number) => {
    setVideoTimestamp(seconds);
    setVideoIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col w-full bg-[#0B0F15] text-[#dfe2eb]">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-[#0a0e14] border-b border-white/5 px-4 sm:px-8 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[#bac9cc]">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
          <span className="text-[#00e5ff] font-semibold">ZOEWAVE INNOVATION CORE:</span>
          <span>SMARTWATCH INTOXICATION ASSESSMENT &amp; DRIVING SUITABILITY</span>
        </div>
        <div className="flex items-center gap-4 text-[#849396] font-mono text-[11px]">
          <span>TARGET PLATFORMS:</span>
          <span className="text-[#FFB703] font-bold">WEAR OS &amp; watchOS</span>
          <span className="text-white/20">|</span>
          <span className="text-[#c3f5ff]">iWATCH 4-CORE NEURAL ENGINE</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-10 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-[#10141a] via-[#0B0F15] to-[#0a0e14]">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#FFB703]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
          {/* Breadcrumbs & Live Status */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#849396]">
              <span className="text-[#00e5ff]">ZoeWave</span>
              <span>/</span>
              <span className="text-[#FFB703]">Tech</span>
              <span>/</span>
              <span className="text-[#dfe2eb]">Smartwatch</span>
              <span>/</span>
              <span className="text-white font-semibold">DrunkWatch</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c22] border border-[#00e5ff]/30 text-xs text-[#00e5ff]">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="tracking-wider uppercase font-semibold">Life-Saving Wearable ML Architecture</span>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FFB703] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
                  <span>Intersection of Health, Fashion and Technology</span>
                </div>
                <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
                  DrunkWatch<span className="text-[#00e5ff]">™</span>
                </h1>
                <p className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#4cd6fb] font-light">
                  Intoxication Assessment &amp; Driving Suitability System
                </p>
              </div>

              {/* Authentic ZoeWave Site Core Description Callout */}
              <div className="p-6 rounded-2xl bg-[#181c22]/90 border border-[#00e5ff]/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] shrink-0 border border-[#00e5ff]/30">
                    <span className="material-symbols-outlined text-[28px]">watch</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00e5ff] font-semibold">
                      Official ZoeWave Architecture Brief
                    </span>
                    <blockquote className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#F8FAFC] leading-relaxed italic">
                      “This innovative system leverages your smartwatch to assess your intoxication level and determine your driving suitability. It analyzes your <span className="text-[#00e5ff] font-semibold not-italic">walking patterns</span>, <span className="text-[#FFB703] font-semibold not-italic">writing style</span> (when entering a code), and <span className="text-[#4cd6fb] font-semibold not-italic">bio-sensor data</span> to make this crucial call. This showcases the combined power of the iWatch&apos;s 4-core Neural Engine, accelerometer, and bio-sensors.”
                    </blockquote>
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#bac9cc] font-mono">
                      <span className="flex items-center gap-1 text-[#FFB703]">
                        <span className="material-symbols-outlined text-[14px]">link</span>
                        <a
                          href="https://sites.google.com/view/zoewave/tech/smartwatch/drunkwatch"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          sites.google.com/view/zoewave/tech/smartwatch/drunkwatch
                        </a>
                      </span>
                      <span>•</span>
                      <span>Our first Wearable Products are Smartwatches (Wear OS &amp; watchOS)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#video-theater"
                  className="px-6 py-3.5 rounded-full bg-[#00e5ff] text-[#00363d] font-['Space_Grotesk'] text-sm uppercase tracking-wider font-bold shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:bg-[#c3f5ff] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Watch Concept Video</span>
                </a>

                <a
                  href="#multimodal-triad"
                  className="px-6 py-3.5 rounded-full bg-[#262a31] text-[#F8FAFC] font-['Space_Grotesk'] text-sm uppercase tracking-wider font-semibold border border-white/10 hover:border-[#00e5ff]/50 hover:bg-[#31353c] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#FFB703]">account_tree</span>
                  <span>3 Multimodal Pillars</span>
                </a>

                <a
                  href="#simulator"
                  className="px-6 py-3.5 rounded-full bg-[#181c22] text-[#4cd6fb] font-['Space_Grotesk'] text-sm uppercase tracking-wider font-semibold border border-[#4cd6fb]/30 hover:bg-[#1c2026] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">speed</span>
                  <span>Launch BAC &amp; Driving Sim</span>
                </a>

                <button
                  onClick={handleQuickCalibrate}
                  disabled={isCalibrating}
                  className="px-5 py-3.5 rounded-full bg-[#181c22] text-[#FFB703] font-['Space_Grotesk'] text-sm uppercase tracking-wider font-semibold border border-[#FFB703]/30 hover:bg-[#1c2026] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isCalibrating ? 'animate-spin' : ''}`}>
                    sensors
                  </span>
                  <span>{isCalibrating ? 'Calibrating Sensors...' : 'Sensor Diagnostics'}</span>
                </button>
              </div>

              {calibrationSuccess && (
                <div className="p-3.5 rounded-xl bg-[#181c22] border border-[#00e5ff] text-[#00e5ff] text-sm flex items-center gap-2 animate-fadeIn font-mono">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Accelerometer baseline centered (0.00g). 4-Core Neural Engine weights loaded. Bio-sensor impedance 41.8 kΩ nominal.</span>
                </div>
              )}
            </div>

            {/* Right: Quick Specs Badge Pod */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-[#181c22] border border-white/10 shadow-xl flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-['Space_Grotesk'] text-xs uppercase tracking-widest text-[#FFB703] font-semibold">
                    Core Architecture Specs
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff]">
                    v4.8 ACTIVE
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-[#262a31] text-[#00e5ff]">
                      <span className="material-symbols-outlined text-[20px]">memory</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">iWatch 4-Core Neural Engine</span>
                      <span className="text-xs text-[#849396]">On-device CoreML &amp; TensorFlow Lite Micro inference</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-[#262a31] text-[#FFB703]">
                      <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Gait Telemetry Vector</span>
                      <span className="text-xs text-[#849396]">6-Axis Accelerometer &amp; Gyroscopic trunk sway logging</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-[#262a31] text-[#4cd6fb]">
                      <span className="material-symbols-outlined text-[20px]">pin</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Passcode Writing / Motor Cadence</span>
                      <span className="text-xs text-[#849396]">Micro-tremor, key dwell latency &amp; touch pressure</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-[#262a31] text-emerald-400">
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Multimodal Biosensors</span>
                      <span className="text-xs text-[#849396]">Optical PPG, skin conductance, temp &amp; pulse wave</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#bac9cc]">
                  <span>Driving Lockdown:</span>
                  <span className="text-[#FFB703] font-semibold font-mono">Autonomous API Enabled</span>
                </div>
              </div>

              {/* Hardware visual card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#181c22] border border-white/10 shadow-xl group">
                <img
                  src={ASSETS.drunkWatchHero}
                  alt="ZoeWave DrunkWatch luxury smartwatch prototype"
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-white font-semibold">ZoeWear Bespoke Wristwear</span>
                  <span className="text-[11px] font-mono text-[#00e5ff]">Wear OS // watchOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section
        id="video-theater"
        className={`w-full py-16 px-4 sm:px-8 lg:px-12 bg-[#0a0e14] border-t border-b border-white/10 transition-all duration-500 ${
          theaterMode ? 'bg-black' : ''
        }`}
      >
        <div className={`mx-auto flex flex-col gap-8 ${theaterMode ? 'max-w-7xl' : 'max-w-6xl'}`}>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c22] border border-[#00e5ff]/30 text-xs text-[#00e5ff] w-fit font-mono">
                <span className="material-symbols-outlined text-[16px]">smart_display</span>
                <span>AUTHENTIC ZOEWAVE DEMONSTRATION VIDEO</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                DrunkWatch Concept Video
              </h2>
              <p className="text-[#bac9cc] text-sm sm:text-base max-w-2xl">
                Watch the original concept video for DrunkWatch created by Developer Ylabz (ZoeWave Labs), demonstrating smartwatch-based intoxication detection and driving suitability prevention.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheaterMode(!theaterMode)}
                className="px-4 py-2 rounded-xl bg-[#181c22] text-[#c3f5ff] hover:bg-[#262a31] border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {theaterMode ? 'close_fullscreen' : 'open_in_full'}
                </span>
                <span>{theaterMode ? 'Exit Cinema' : 'Cinema Mode'}</span>
              </button>

              <a
                href="https://www.youtube.com/watch?v=o3ZehHx6BR8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FF0000]/15 text-[#ff6b6b] hover:bg-[#FF0000]/25 border border-[#FF0000]/30 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Open on YouTube</span>
              </a>
            </div>
          </div>

          {/* Embedded YouTube Player Container */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-[#00e5ff]/30 shadow-[0_0_50px_rgba(0,229,255,0.15)]">
            <div className="relative w-full aspect-video">
              <iframe
                key={videoIframeKey}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/o3ZehHx6BR8?autoplay=0&rel=0&modestbranding=1&start=${videoTimestamp}`}
                title="DrunkWatch Concept video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Video Player Information Bar */}
            <div className="p-4 bg-[#10141a] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold">
                    DrunkWatch Concept Video — Developer Ylabz
                  </span>
                  <span className="text-xs text-[#849396] font-mono">
                    Official Showcase from sites.google.com/view/zoewave/tech/smartwatch/drunkwatch
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#849396] font-mono mr-1">Jump to Scene:</span>
                <button
                  onClick={() => handleSeekVideo(0)}
                  className="px-2.5 py-1 rounded bg-[#181c22] hover:bg-[#262a31] text-xs font-mono text-[#c3f5ff] border border-white/5 cursor-pointer"
                >
                  0:00 Intro
                </button>
                <button
                  onClick={() => handleSeekVideo(30)}
                  className="px-2.5 py-1 rounded bg-[#181c22] hover:bg-[#262a31] text-xs font-mono text-[#c3f5ff] border border-white/5 cursor-pointer"
                >
                  0:30 Detection
                </button>
                <button
                  onClick={() => handleSeekVideo(60)}
                  className="px-2.5 py-1 rounded bg-[#181c22] hover:bg-[#262a31] text-xs font-mono text-[#c3f5ff] border border-white/5 cursor-pointer"
                >
                  1:00 Neural
                </button>
              </div>
            </div>
          </div>

          {/* Video Scene Chapters & Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#181c22] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00e5ff] font-semibold">CHAPTER 01</span>
                <span className="text-[11px] font-mono text-[#849396]">The Core Vision</span>
              </div>
              <h3 className="text-base font-semibold text-white">Smartwatch as a Life-Saving Guardian</h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Smartwatches are no longer just notification mirrors—they are life-saving sentinels that proactively prevent fatal DUI accidents before a user ever touches the steering wheel.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#181c22] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FFB703] font-semibold">CHAPTER 02</span>
                <span className="text-[11px] font-mono text-[#849396]">Multimodal Data Triad</span>
              </div>
              <h3 className="text-base font-semibold text-white">Walking, Code Entry &amp; Biosensors</h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Rather than relying solely on a single flawed metric, DrunkWatch aggregates walking gait, typing/writing motor reaction, and optical pulse sensors into a combined confidence index.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#181c22] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#4cd6fb] font-semibold">CHAPTER 03</span>
                <span className="text-[11px] font-mono text-[#849396]">Edge ML Execution</span>
              </div>
              <h3 className="text-base font-semibold text-white">4-Core Neural Engine Intelligence</h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Executed on-device with zero network latency. The user&apos;s privacy is strictly maintained with zero-knowledge biometric processing and autonomous roadside concierge fail-safes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Multimodal Triad Section */}
      <section id="multimodal-triad" className="w-full py-20 px-4 sm:px-8 lg:px-12 bg-[#0B0F15]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFB703] font-semibold">
              <span className="material-symbols-outlined text-[16px]">hub</span>
              <span>TRI-MODAL RECOGNITION ARCHITECTURE</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How DrunkWatch Evaluates Your Driving Suitability
            </h2>
            <p className="text-[#bac9cc] text-base leading-relaxed">
              ZoeWave&apos;s algorithm eliminates false positives by fusing three completely independent behavioral and biometric streams into the iWatch 4-Core Neural Engine.
            </p>
          </div>

          {/* Triad 3 Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Walking Patterns (Gait Analysis) */}
            <div className="p-6 rounded-2xl bg-[#181c22] border border-[#00e5ff]/30 shadow-xl flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">directions_walk</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00e5ff] px-2 py-0.5 rounded bg-[#00e5ff]/10">
                    PILLAR 01
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                    Walking Pattern &amp; Gait Analysis
                  </h3>
                  <span className="text-xs font-mono text-[#00e5ff]">
                    6-Axis Accelerometer &amp; Gyroscope Telemetry
                  </span>
                  <p className="text-sm text-[#bac9cc] leading-relaxed mt-1">
                    Continuous locomotion evaluation captures lateral body sway, step cadence irregularity, and balance deceleration. Intoxicated gait manifests as widened stance width and asymmetric stride time.
                  </p>
                </div>

                {/* Live Gait Waveform Box */}
                <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Stride Cadence:</span>
                    <span className="text-[#00e5ff] font-bold">{gaitCadence} steps/min</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Trunk Sway Angle:</span>
                    <span className={lateralSway > 4.0 ? 'text-[#FFB703] font-bold' : 'text-emerald-400 font-bold'}>
                      ±{lateralSway}° ({lateralSway > 4.0 ? 'Elevated Drift' : 'Stable'})
                    </span>
                  </div>
                  {/* Visual Sway Bar */}
                  <div className="w-full bg-[#181c22] h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        lateralSway > 5.0 ? 'bg-error' : lateralSway > 2.5 ? 'bg-[#FFB703]' : 'bg-[#00e5ff]'
                      }`}
                      style={{ width: `${Math.min(100, (lateralSway / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#849396]">
                <span>Sample Rate: 100Hz</span>
                <span className="text-[#00e5ff] font-semibold">Zero False Stride Rejection</span>
              </div>
            </div>

            {/* 2. Writing Style / Passcode Motor Latency */}
            <div className="p-6 rounded-2xl bg-[#181c22] border border-[#FFB703]/30 shadow-xl flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#FFB703]/15 text-[#FFB703] border border-[#FFB703]/30 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">pin</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FFB703] px-2 py-0.5 rounded bg-[#FFB703]/10">
                    PILLAR 02
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                    Writing &amp; Passcode Dynamics
                  </h3>
                  <span className="text-xs font-mono text-[#FFB703]">
                    Touchscreen Motor Latency &amp; Tremor Analysis
                  </span>
                  <p className="text-sm text-[#bac9cc] leading-relaxed mt-1">
                    Evaluates fine-motor skills when entering a passcode on the watch face. Detects finger tremor frequency (4-8Hz physiological tremor escalation), key dwell duration, and hesitation latency.
                  </p>
                </div>

                {/* Interactive PIN Passcode Behavioral Test Simulator */}
                <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Interactive Motor Test:</span>
                    <button
                      onClick={handleResetPasscode}
                      className="text-[#FFB703] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Passcode Display Pods */}
                  <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`w-9 h-10 rounded-lg flex items-center justify-center font-mono text-base font-bold border transition-all ${
                          passcodeDigits[idx]
                            ? 'bg-[#FFB703]/20 border-[#FFB703] text-white'
                            : 'bg-[#181c22] border-white/10 text-white/20'
                        }`}
                      >
                        {passcodeDigits[idx] || '•'}
                      </div>
                    ))}
                  </div>

                  {/* Micro Number Pad */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                      <button
                        key={digit}
                        onClick={() => handlePasscodeTap(digit)}
                        className="py-1.5 rounded bg-[#181c22] hover:bg-[#262a31] text-xs font-mono text-white border border-white/5 cursor-pointer active:scale-95 transition-all"
                      >
                        {digit}
                      </button>
                    ))}
                  </div>

                  {/* Live Motor Score Readout */}
                  {motorScore && (
                    <div className="pt-2 border-t border-white/10 flex flex-col gap-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#849396]">Dexterity Score:</span>
                        <span className="text-white font-bold">{motorScore.score}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#849396]">Dwell Latency:</span>
                        <span className="text-[#FFB703]">{motorScore.dwellTimeMs}ms</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${motorScore.verdictColor}`}>
                        {motorScore.verdict}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#849396]">
                <span>Tremor Threshold: 4-8Hz</span>
                <span className="text-[#FFB703] font-semibold">Sub-Pixel Touch Pressure</span>
              </div>
            </div>

            {/* 3. Bio-Sensors & Transdermal Metrics */}
            <div className="p-6 rounded-2xl bg-[#181c22] border border-[#4cd6fb]/30 shadow-xl flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#4cd6fb]/15 text-[#4cd6fb] border border-[#4cd6fb]/30 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">biotech</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#4cd6fb] px-2 py-0.5 rounded bg-[#4cd6fb]/10">
                    PILLAR 03
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                    Bio-Sensors &amp; Transdermal Metrics
                  </h3>
                  <span className="text-xs font-mono text-[#4cd6fb]">
                    Multi-Wavelength PPG &amp; Interstitial Analysis
                  </span>
                  <p className="text-sm text-[#bac9cc] leading-relaxed mt-1">
                    Sub-dermal optical sensors detect ethanol molecules within capillary perspiration. Monitors heart rate variability (HRV), peripheral temperature elevation, and skin conductance shifts.
                  </p>
                </div>

                {/* Real-time Biosensor Metrics Pod */}
                <div className="p-4 rounded-xl bg-[#0a0e14] border border-white/5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Heart Rate Pulse:</span>
                    <span className="text-[#4cd6fb] font-bold">{Math.round(68 + bac * 160)} bpm</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Epidermal Temperature:</span>
                    <span className="text-white font-bold">{(34.4 + bac * 2.2).toFixed(1)}°C</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Electrolyte Reserve:</span>
                    <span className="text-emerald-400 font-bold">88.4 mEq/L</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#849396]">Sub-Dermal Impedance:</span>
                    <span className="text-[#00e5ff] font-bold">{impedance.toFixed(1)} kΩ</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#849396]">
                <span>Optical Spectrum: 680-940nm</span>
                <span className="text-[#4cd6fb] font-semibold">Continuous Drift Auto-Correct</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive HUD Simulator & Live Metabolic Telemetry Section */}
      <section className="w-full py-20 px-4 sm:px-8 lg:px-12 bg-[#0a0e14] relative" id="simulator">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#FFB703] font-mono text-xs uppercase tracking-widest font-semibold">
                <span className="material-symbols-outlined text-[16px]">stream</span>
                <span>INTERACTIVE CONSOLE SIMULATOR</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Driving Suitability &amp; BAC Dynamics
              </h2>
              <p className="text-sm text-[#bac9cc] max-w-2xl">
                Test how the DrunkWatch machine learning model evaluates BAC, walking sway, and motor skill scores to determine whether a user is legally and physiologically safe to drive.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#849396] uppercase">Stream State:</span>
              <span className="px-3 py-1 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] text-xs font-mono font-semibold border border-[#00e5ff]/30">
                Live Realtime
              </span>
            </div>
          </div>

          {/* Main Simulator Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Radial Dial & BAC Readout Pod */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#181c22] border border-white/10 shadow-xl flex flex-col items-center justify-between gap-6 relative overflow-hidden">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-mono text-[#849396] tracking-widest uppercase">
                  DRIVING FIT STATUS
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${statusColor}`}>
                  {statusText}
                </span>
              </div>

              {/* Circular Radial Progress Gauge Visual SVG */}
              <div className="relative w-64 h-64 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Background Ring */}
                  <circle
                    className="text-[#262a31]"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  {/* Alert Threshold Arc (0.08% limit) */}
                  <circle
                    className="text-[#FFB703]/30"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="68"
                    stroke="currentColor"
                    strokeDasharray="85 427"
                    strokeDashoffset="-280"
                    strokeWidth="8"
                  />
                  {/* Dynamic Value Arc */}
                  <circle
                    className={`transition-all duration-700 ease-out ${
                      bac >= 0.08 ? 'text-error' : bac >= 0.04 ? 'text-[#FFB703]' : 'text-[#00e5ff]'
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
                  <span className="text-xs font-mono text-[#849396] uppercase tracking-widest">
                    Estimated BAC
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold tracking-tight text-white">
                      {bac.toFixed(2)}
                    </span>
                    <span className="text-sm font-mono text-[#00e5ff] font-semibold">%</span>
                  </div>
                  <span className="mt-1 px-3 py-0.5 rounded-full bg-[#262a31] text-[#c3f5ff] text-xs font-mono uppercase tracking-wide border border-white/5">
                    {clearanceText}
                  </span>
                </div>
              </div>

              {/* Driving Suitability Decision Box */}
              <div
                className={`w-full p-4 rounded-xl border flex items-center gap-3 ${
                  bac >= 0.08
                    ? 'bg-error/15 border-error/40 text-error'
                    : bac >= 0.04
                    ? 'bg-[#FFB703]/15 border-[#FFB703]/40 text-[#FFB703]'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] shrink-0">
                  {bac >= 0.08 ? 'cancel' : bac >= 0.04 ? 'warning' : 'check_circle'}
                </span>
                <div className="flex flex-col text-xs font-mono">
                  <span className="font-bold uppercase">
                    {bac >= 0.08
                      ? 'UNFIT TO DRIVE — VEHICLE LOCKOUT'
                      : bac >= 0.04
                      ? 'CAUTION — METABOLIC IMPAIRMENT'
                      : 'PHYSIOLOGICALLY CLEARED TO DRIVE'}
                  </span>
                  <span className="text-white/80 text-[11px] mt-0.5">
                    {bac >= 0.08
                      ? 'Smartwatch has disabled vehicle key tokens. Concierge rideshare hail armed.'
                      : bac >= 0.04
                      ? 'Elevated sway and motor latency detected. User advised to delay driving.'
                      : 'All 3 multimodal metrics (gait, passcode typing, optical pulse) within safe baseline.'}
                  </span>
                </div>
              </div>

              {/* BAC Fine-tuning slider */}
              <div className="w-full flex flex-col gap-1.5 px-2">
                <div className="flex justify-between text-xs text-[#849396] font-mono">
                  <span>Sober (0.00%)</span>
                  <span className="text-[#00e5ff] font-semibold">{bac.toFixed(3)}% BAC</span>
                  <span>Critical (0.14%)</span>
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
                      applyState(val, 'OPTIMAL & CLEARED TO DRIVE', 'text-secondary bg-secondary/20 border-secondary/40', 'Clearance: 15m', 41.8);
                    } else if (val < 0.08) {
                      applyState(val, 'MODERATE METABOLIC IMPAIRMENT', 'text-[#FFB703] bg-[#FFB703]/20 border-[#FFB703]/40', 'Spike Warning', 36.2);
                    } else {
                      applyState(val, 'CRITICAL LOCKOUT // AUTO CONCIERGE', 'text-error bg-error/20 border-error/40', 'Concierge Active', 29.4);
                    }
                  }}
                  className="w-full accent-[#00e5ff] cursor-pointer h-2 bg-[#262a31] rounded-lg"
                />
              </div>

              {/* Quick Simulation State Buttons */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs font-mono text-[#849396] uppercase tracking-wider text-center">
                  Preset Metabolic Scenarios
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      applyState(0.02, 'OPTIMAL & CLEARED TO DRIVE', 'text-secondary bg-secondary/20 border-secondary/40', 'Clearance: 18m', 41.8)
                    }
                    className={`py-2 px-2 rounded-lg text-xs font-mono uppercase transition-all border cursor-pointer ${
                      bac <= 0.03
                        ? 'bg-secondary/20 text-secondary border-secondary'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c] border-transparent'
                    }`}
                  >
                    Resting (0.02%)
                  </button>
                  <button
                    onClick={() =>
                      applyState(0.05, 'MODERATE METABOLIC IMPAIRMENT', 'text-[#FFB703] bg-[#FFB703]/20 border-[#FFB703]/40', 'Spike Warning', 36.2)
                    }
                    className={`py-2 px-2 rounded-lg text-xs font-mono uppercase transition-all border cursor-pointer ${
                      bac > 0.03 && bac < 0.08
                        ? 'bg-[#FFB703]/20 text-[#FFB703] border-[#FFB703]'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c] border-transparent'
                    }`}
                  >
                    Social (0.05%)
                  </button>
                  <button
                    onClick={() =>
                      applyState(0.09, 'CRITICAL LOCKOUT // AUTO CONCIERGE', 'text-error bg-error/20 border-error/40', 'Concierge Active', 28.5)
                    }
                    className={`py-2 px-2 rounded-lg text-xs font-mono uppercase transition-all border cursor-pointer ${
                      bac >= 0.08
                        ? 'bg-error/30 text-error border-error'
                        : 'bg-[#262a31] text-white hover:bg-[#31353c] border-transparent'
                    }`}
                  >
                    Spike (0.09%)
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry Status Line */}
              <div className="w-full pt-3 flex items-center justify-between text-[#849396] text-xs font-mono border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                  Pulse: {Math.round(68 + bac * 160)} bpm
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                  Skin Temp: {(34.4 + bac * 2.2).toFixed(1)}°C
                </span>
              </div>
            </div>

            {/* Right: Predictive Trajectory Curve & Neural Engine Pipeline */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Metabolic Curve Spark-HUD Card */}
              <div className="p-6 rounded-2xl bg-[#181c22] border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-[#849396] uppercase tracking-wider">
                      Metabolic Absorption &amp; Clearance Curve
                    </span>
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-white">
                      4-Hour Driving Safety Prediction
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#262a31] text-xs font-mono text-[#00e5ff] border border-white/5">
                    <span className="material-symbols-outlined text-[14px]">insights</span>
                    <span>CoreML On-Device v2.1</span>
                  </div>
                </div>

                {/* Inline SVG Chart */}
                <div className="w-full h-44 relative pt-2">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line className="text-white/10" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="30" y2="30" />
                    <line className="text-white/10" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="80" y2="80" />
                    <line className="text-white/10" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="500" y1="130" y2="130" />

                    {/* Legal Limit Line 0.08% */}
                    <line stroke="#FFB703" strokeDasharray="2 4" strokeWidth="1.5" x1="0" x2="500" y1="45" y2="45" />
                    <text className="font-mono text-[9px] uppercase tracking-widest" fill="#FFB703" x="4" y="40">
                      Legal Driving Limit (0.08% BAC Threshold)
                    </text>

                    {/* Fill */}
                    <path
                      d="M 0,140 Q 90,135 140,80 T 260,35 T 360,95 T 500,135 L 500,150 L 0,150 Z"
                      fill="url(#curveGradient)"
                    />
                    {/* Line */}
                    <path
                      d="M 0,140 Q 90,135 140,80 T 260,35 T 360,95 T 500,135"
                      fill="none"
                      stroke="#00e5ff"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />

                    {/* Live Point */}
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

                <div className="flex items-center justify-between text-[#849396] font-mono text-xs pt-1">
                  <span>-3.0 Hrs (Onset)</span>
                  <span>-1.5 Hrs (Peak)</span>
                  <span className="text-[#00e5ff] font-semibold">T-0 (Now: {bac.toFixed(2)}%)</span>
                  <span>+1.0 Hr (Est. Clearance)</span>
                </div>
              </div>

              {/* Edge ML & Autonomous Concierge Relay */}
              <div className="p-6 rounded-2xl bg-[#181c22] border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFB703] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>AUTONOMOUS CONCIERGE &amp; VEHICLE LOCKOUT RELAY</span>
                  </div>
                  <span className="text-xs font-mono text-[#849396]">AES-256 ZERO KNOWLEDGE</span>
                </div>

                <p className="text-xs text-[#bac9cc] leading-relaxed">
                  When intoxication is confirmed by the multimodal classifier, DrunkWatch automatically interfaces with connected vehicle smart-keys via BLE to lock out ignition and dispatches an autonomous ride concierge token to designated family or driver services.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    onClick={handleTestDispatch}
                    className="px-5 py-2.5 rounded-full bg-[#262a31] text-[#FFB703] hover:bg-[#31353c] border border-[#FFB703]/40 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Test Concierge Dispatch Ping</span>
                  </button>

                  <button
                    onClick={() => onRequestPrototype('DrunkWatch Developer Preview Kit')}
                    className="px-5 py-2.5 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] hover:bg-[#00e5ff]/25 border border-[#00e5ff]/40 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">developer_board</span>
                    <span>Request Developer SDK</span>
                  </button>
                </div>

                {dispatchAlert && (
                  <div className="p-3 rounded-xl bg-[#0a0e14] border border-[#FFB703] text-[#FFB703] text-xs font-mono flex items-start gap-2 animate-fadeIn">
                    <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">verified_user</span>
                    <span>{dispatchAlert}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official ZoeWave Resources & Article Citation Strip */}
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-[#10141a] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest font-semibold">
              OFFICIAL RESEARCH ARCHIVE &amp; CITATIONS
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white">
              ZoeWave DrunkWatch Publications &amp; Links
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Google Site Hub */}
            <a
              href="https://sites.google.com/view/zoewave/tech/smartwatch/drunkwatch"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#181c22] border border-white/10 hover:border-[#00e5ff]/50 hover:bg-[#1c2026] transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff]">
                    <span className="material-symbols-outlined text-[20px]">web</span>
                  </span>
                  <span className="material-symbols-outlined text-white/30 group-hover:text-[#00e5ff] transition-colors">
                    arrow_outward
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#00e5ff] transition-colors">
                  ZoeWave Official Google Site Hub
                </h3>
                <p className="text-xs text-[#849396] leading-relaxed">
                  The primary project documentation repository hosted on Google Sites detailing the DrunkWatch concept, hardware ecosystem, and video demonstration.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00e5ff]">sites.google.com/view/zoewave</span>
            </a>

            {/* Medium Article */}
            <a
              href="https://zoewave.medium.com/the-rise-of-the-wrist-revolution-6554ec25e4bd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#181c22] border border-white/10 hover:border-[#FFB703]/50 hover:bg-[#1c2026] transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-[#FFB703]/10 text-[#FFB703]">
                    <span className="material-symbols-outlined text-[20px]">article</span>
                  </span>
                  <span className="material-symbols-outlined text-white/30 group-hover:text-[#FFB703] transition-colors">
                    arrow_outward
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#FFB703] transition-colors">
                  The Rise of the Wrist Revolution
                </h3>
                <p className="text-xs text-[#849396] leading-relaxed">
                  ZoeWave&apos;s keynote essay exploring why smartwatches will become our invaluable everyday life companions and bio-sentries.
                </p>
              </div>
              <span className="text-xs font-mono text-[#FFB703]">zoewave.medium.com</span>
            </a>

            {/* Concept Video */}
            <a
              href="https://www.youtube.com/watch?v=o3ZehHx6BR8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#181c22] border border-white/10 hover:border-[#4cd6fb]/50 hover:bg-[#1c2026] transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-[#4cd6fb]/10 text-[#4cd6fb]">
                    <span className="material-symbols-outlined text-[20px]">video_library</span>
                  </span>
                  <span className="material-symbols-outlined text-white/30 group-hover:text-[#4cd6fb] transition-colors">
                    arrow_outward
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#4cd6fb] transition-colors">
                  DrunkWatch Concept Video
                </h3>
                <p className="text-xs text-[#849396] leading-relaxed">
                  Watch the original concept video by Developer Ylabz demonstrating real-world intoxication detection on smartwatches.
                </p>
              </div>
              <span className="text-xs font-mono text-[#4cd6fb]">youtube.com/watch?v=o3ZehHx6BR8</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
