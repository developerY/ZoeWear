/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavPage } from '../../types';

interface MuseCharmScreenProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
}

type TabType = 'main' | 'sam' | 'arch';

type FsmMode = 'VITAL_FLOW' | 'CONCERN_STRESS' | 'DEPLETED_NEGLECT' | 'DROWSY_RECOVERY' | 'HYPER_FOCUS';

interface TelemetryState {
  semgUv: number;
  sedentaryMins: number;
  steps: number;
  sleepHrs: number;
  hrBpm: number;
  mealHoursAgo: number;
}

interface StateVector {
  Happiness: number;
  Energy: number;
  Nourishment: number;
  Rest: number;
  Activity: number;
  Engagement: number;
  Growth: number;
  Relationship: number;
}

interface CausalLogItem {
  id: string;
  ts: string;
  msg: string;
  level: 'info' | 'warn' | 'crit';
}

interface SamSample {
  title: string;
  masks: {
    label: string;
    confidence: string;
    delta: string;
    color: string;
  }[];
  apply: () => void;
}

export const MuseCharmScreen: React.FC<MuseCharmScreenProps> = ({ onNavigate }) => {
  // Navigation / View Tabs
  const [activeTab, setActiveTab] = useState<TabType>('main');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Toast State
  const [toast, setToast] = useState<{ title: string; message: string; visible: boolean }>({
    title: '',
    message: '',
    visible: false,
  });
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((title: string, message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ title, message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  // Telemetry
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    semgUv: 42,
    sedentaryMins: 45,
    steps: 7840,
    sleepHrs: 7.6,
    hrBpm: 68,
    mealHoursAgo: 2.0,
  });

  // 8-Stat State Machine Vector
  const [vector, setVector] = useState<StateVector>({
    Happiness: 86,
    Energy: 84,
    Nourishment: 82,
    Rest: 88,
    Activity: 79,
    Engagement: 85,
    Growth: 81,
    Relationship: 90,
  });

  const [fsmMode, setFsmMode] = useState<FsmMode>('VITAL_FLOW');
  const [causalLogs, setCausalLogs] = useState<CausalLogItem[]>([]);

  // Coach & Progression
  const [coachFocus, setCoachFocus] = useState<string>('holistic');
  const [coachStreak, setCoachStreak] = useState<number>(3);
  const [coachXp, setCoachXp] = useState<number>(65);

  // Guided breathing session timer
  const [isGuidedActive, setIsGuidedActive] = useState<boolean>(false);
  const [guidedRemaining, setGuidedRemaining] = useState<number>(6);
  const [guidedStepLabel, setGuidedStepLabel] = useState<string>(
    '1/3 · Inhale deeply... drop your shoulders & unclench wrist'
  );
  const guidedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Wonder Insight Text & Dialogue
  const [creatureDialogue, setCreatureDialogue] = useState<string>(
    '"Your wrist tension is super calm and that 7.6-hour sleep gave us a huge vitality boost! Ready to tackle today\'s sprint together?"'
  );
  const [wonderText, setWonderText] = useState<string>(
    'Longitudinal correlation: Your 7.6h sleep window and low resting wrist sEMG (42 µV) sustained a +14% Relationship & Growth trajectory over the past 14 days.'
  );

  // Chat Form input
  const [chatMessage, setChatMessage] = useState<string>('');

  // SAM 3.1 Lab State
  const [samScene, setSamScene] = useState<'salmon_bowl' | 'espresso_overload' | 'ergonomic_walk'>(
    'salmon_bowl'
  );

  // Meta Model API Inspection
  const [metaApiKey, setMetaApiKey] = useState<string>('');
  const [metaModel, setMetaModel] = useState<string>('muse-spark-1.3');

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBioChime = useCallback((type: 'positive' | 'alert' | 'neutral') => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'positive') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.14);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.29);
      } else if (type === 'alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(310, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.22);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.start(now);
        osc.stop(now + 0.27);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.21);
      }
    } catch {
      // Audio playback blocked before user gesture
    }
  }, [audioEnabled]);

  const appendLog = useCallback((msg: string, level: 'info' | 'warn' | 'crit' = 'info') => {
    const ts = new Date().toLocaleTimeString([], { hour12: false });
    setCausalLogs((prev) => [{ id: Math.random().toString(36).substring(2, 9), ts, msg, level }, ...prev.slice(0, 17)]);
  }, []);

  // FSM Evaluation function
  const evaluateLifeEngine = useCallback((currentTelemetry: TelemetryState, triggerSource?: string) => {
    const t = currentTelemetry;
    const clamp = (v: number) => Math.max(8, Math.min(100, Math.round(v)));

    // Deterministic mappings from Body telemetry -> 8 Life Engine dimensions
    const restScore = clamp((t.sleepHrs / 8.0) * 92 - Math.max(0, (t.hrBpm - 80) * 0.35));
    const nourishScore = clamp(100 - Math.max(0, (t.mealHoursAgo - 1.5) * 11.5));
    const activityScore = clamp((t.steps / 9000) * 75 + Math.max(0, 30 - t.sedentaryMins / 10));
    const stressPenalty = t.semgUv > 95 && t.sedentaryMins > 60 ? (t.semgUv - 95) * 0.55 : 0;
    const energyScore = clamp(restScore * 0.45 + nourishScore * 0.35 + activityScore * 0.2 - stressPenalty * 0.5);
    const happinessScore = clamp(energyScore * 0.4 + activityScore * 0.3 + nourishScore * 0.3 - stressPenalty * 0.7);
    const engagementScore = clamp(72 + (t.semgUv > 30 && t.semgUv <= 95 ? 18 : -10) - (t.sedentaryMins > 180 ? 18 : 0));
    const growthScore = clamp((energyScore + activityScore + restScore) / 3);
    const relationshipScore = clamp(78 + (happinessScore - 50) * 0.3);

    const newVector: StateVector = {
      Happiness: happinessScore,
      Energy: energyScore,
      Nourishment: nourishScore,
      Rest: restScore,
      Activity: activityScore,
      Engagement: engagementScore,
      Growth: growthScore,
      Relationship: relationshipScore,
    };
    setVector(newVector);

    let nextMode: FsmMode = 'VITAL_FLOW';
    let logLevel: 'info' | 'warn' | 'crit' = 'info';
    let reason = 'All physiological thresholds nominal.';

    if (t.semgUv >= 105 && t.sedentaryMins >= 60) {
      nextMode = 'CONCERN_STRESS';
      logLevel = 'crit';
      reason = `Sustained wrist sEMG (${t.semgUv} µV RMS) while stationary (${t.sedentaryMins}m) -> Isometric stress detected.`;
    } else if (t.sedentaryMins >= 180 && t.mealHoursAgo >= 5.0) {
      nextMode = 'DEPLETED_NEGLECT';
      logLevel = 'crit';
      reason = `${t.sedentaryMins}m sedentary + ${t.mealHoursAgo}h fasting -> Activity & Nourishment below critical threshold.`;
    } else if (t.sleepHrs < 5.5 || restScore < 50) {
      nextMode = 'DROWSY_RECOVERY';
      logLevel = 'warn';
      reason = `Sleep debt (${t.sleepHrs}h) reduced Rest (${restScore}%) -> Entering low-stimulation recovery posture.`;
    } else if (t.semgUv >= 75 && t.semgUv < 105 && t.sedentaryMins < 90) {
      nextMode = 'HYPER_FOCUS';
      logLevel = 'info';
      reason = `Active MUAP recruitment (${t.semgUv} µV RMS) with balanced vitals -> Co-focus companion mode.`;
    }

    setFsmMode((prevMode) => {
      const modeChanged = nextMode !== prevMode;
      if (triggerSource) {
        appendLog(`${triggerSource}: FSM -> ${nextMode}. ${reason}`, logLevel);
        if (modeChanged) {
          playBioChime(logLevel === 'crit' ? 'alert' : 'positive');
        }
      }
      return nextMode;
    });

    // Update dialogue & Wonder insights dynamically
    if (nextMode === 'CONCERN_STRESS') {
      setCreatureDialogue(
        `"I'm feeling high isometric muscle activation (${t.semgUv} µV RMS) in your wrist while you've been stationary for ${t.sedentaryMins} minutes. Drop your shoulders and take three slow breaths with my pulse."`
      );
      setWonderText(
        `Muse Wonder 1M-Context Alert: Afternoon sEMG spikes above 100 µV correlate with a 28% drop in deep sleep when unaddressed. Delegating a 3-minute decompression micro-break.`
      );
    } else if (nextMode === 'DEPLETED_NEGLECT') {
      setCreatureDialogue(
        `"We've been locked at the desk for ${t.sedentaryMins} minutes and haven't eaten in ${t.mealHoursAgo} hours—my core light is dimming! Let's take a 5-minute walk and scan a meal with SAM 3.1."`
      );
      setWonderText(
        `Muse Wonder 1M-Context Synthesis: Crossing the 300-minute sedentary threshold alongside skipped meals triggered a deterministic -38 Nourishment/Activity shift.`
      );
    } else if (nextMode === 'DROWSY_RECOVERY') {
      setCreatureDialogue(
        `"With only ${t.sleepHrs} hours of sleep in Google Health last night, our Rest reserve is down to ${restScore}%. Let's pace your cognitive load today and wind down early tonight."`
      );
      setWonderText(
        `Muse Wonder 1M-Context Synthesis: Cumulative sleep debt detected via Android Health Connect sync. Adjusting daily step target to prioritize parasympathetic recovery.`
      );
    } else if (nextMode === 'HYPER_FOCUS') {
      setCreatureDialogue(
        `"Your sEMG motor recruitment (${t.semgUv} µV) and heart rate (${t.hrBpm} BPM) are locked in a clean flow state. I'm holding notifications back while we build!"`
      );
      setWonderText(
        `Muse Wonder 1M-Context Synthesis: Peak productive cadence detected. Current metabolic and neuromuscular balance supports 45 more minutes of deep work.`
      );
    } else {
      setCreatureDialogue(
        `"Your wrist tension is super calm (${t.semgUv} µV RMS) and ${t.steps.toLocaleString()} steps plus ${t.sleepHrs}h sleep have all 8 Life Engine stats glowing!"`
      );
      setWonderText(
        `Muse Wonder 1M-Context Synthesis: Your ${t.sleepHrs}h sleep window and low resting wrist sEMG (${t.semgUv} µV) sustained a +14% Relationship & Growth trajectory over 14 days.`
      );
    }
  }, [appendLog, playBioChime]);

  // Initial boot log
  useEffect(() => {
    appendLog('Initial System Boot (Body -> Life Engine -> Creature)', 'info');
  }, [appendLog]);

  // Telemetry change handler
  const handleTelemetryChange = (key: keyof TelemetryState, val: number, label: string) => {
    setTelemetry((prev) => {
      const next = { ...prev, [key]: val };
      evaluateLifeEngine(next, label);
      return next;
    });
  };

  // Preset Applicator
  const applyPreset = (presetName: 'thriving' | 'sedentary' | 'semg_stress' | 'sleep_debt') => {
    const presets = {
      thriving: {
        semgUv: 42,
        sedentaryMins: 35,
        steps: 9200,
        sleepHrs: 7.9,
        hrBpm: 66,
        mealHoursAgo: 1.5,
        msg: 'Scenario 1: Optimal Flow & Recovery',
      },
      sedentary: {
        semgUv: 64,
        sedentaryMins: 300,
        steps: 1400,
        sleepHrs: 6.8,
        hrBpm: 78,
        mealHoursAgo: 6.5,
        msg: 'Scenario 2: 300-Min Sedentary + Skipped Meal',
      },
      semg_stress: {
        semgUv: 142,
        sedentaryMins: 110,
        steps: 4100,
        sleepHrs: 6.4,
        hrBpm: 104,
        mealHoursAgo: 3.5,
        msg: 'Scenario 3: Stationary Wrist sEMG Stress Spike',
      },
      sleep_debt: {
        semgUv: 55,
        sedentaryMins: 80,
        steps: 3200,
        sleepHrs: 3.8,
        hrBpm: 84,
        mealHoursAgo: 2.5,
        msg: 'Scenario 4: Deep Sleep Debt (3.8h)',
      },
    };
    const p = presets[presetName];
    const newTelem: TelemetryState = {
      semgUv: p.semgUv,
      sedentaryMins: p.sedentaryMins,
      steps: p.steps,
      sleepHrs: p.sleepHrs,
      hrBpm: p.hrBpm,
      mealHoursAgo: p.mealHoursAgo,
    };
    setTelemetry(newTelem);
    evaluateLifeEngine(newTelem, p.msg);
    showToast('Scenario Loaded', p.msg);
  };

  // sEMG Canvas Oscilloscope
  const semgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = semgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth || 320;
        canvas.height = canvas.parentElement.clientHeight || 96;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (activeTab === 'main') {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Center line
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // Waveform
        const amp = Math.min(h * 0.44, (telemetry.semgUv / 180) * (h * 0.44));
        ctx.strokeStyle = telemetry.semgUv > 100 ? '#fb7185' : '#22d3ee';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const burst = Math.sin(x * 0.04 + phaseRef.current) * Math.cos(x * 0.19 - phaseRef.current * 1.7);
          const highFreq = Math.sin(x * 0.45 + phaseRef.current * 3.1) * 0.45;
          const y = h / 2 + (burst + highFreq) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phaseRef.current += 0.16 + telemetry.semgUv / 600;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [telemetry.semgUv, activeTab]);

  // SAM 3.1 Canvas Rendering
  const samCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const samSamples: Record<'salmon_bowl' | 'espresso_overload' | 'ergonomic_walk', SamSample> = {
    salmon_bowl: {
      title: 'Scene: Wild Salmon, Quinoa & Avocado Bowl',
      masks: [
        { label: 'mask_01: Wild Salmon Fillet (185g)', confidence: '98.4%', delta: '+24 Nourishment, +12 Energy', color: '#34d399' },
        { label: 'mask_02: Steamed Quinoa & Greens', confidence: '96.1%', delta: '+14 Activity Fuel', color: '#22d3ee' },
        { label: 'mask_03: Sliced Avocado (Healthy Lipids)', confidence: '95.8%', delta: '+8 Growth & Recovery', color: '#a78bfa' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = { ...prev, mealHoursAgo: 0.5 };
          evaluateLifeEngine(next, 'SAM 3.1 Meal Segmentation (Balanced Salmon Bowl)');
          return next;
        });
      },
    },
    espresso_overload: {
      title: 'Scene: Late-Night Triple Espresso & Desk Keyboard',
      masks: [
        { label: 'mask_01: Triple Espresso Cup (240mg Caffeine)', confidence: '97.9%', delta: '+18 Short-Term Energy, -16 Rest', color: '#fbbf24' },
        { label: 'mask_02: Wrist Isometric Keyboard Posture', confidence: '94.2%', delta: '+35 µV sEMG Tension Warning', color: '#fb7185' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = { ...prev, semgUv: 118, hrBpm: 96 };
          evaluateLifeEngine(next, 'SAM 3.1 Desk & Caffeine Segmentation');
          return next;
        });
      },
    },
    ergonomic_walk: {
      title: 'Scene: Outdoor Park Trail & Hydration Bottle',
      masks: [
        { label: 'mask_01: Shaded Walking Trail Path', confidence: '99.1%', delta: 'Resets Sedentary Window to 0m', color: '#34d399' },
        { label: 'mask_02: 750ml Electrolyte Bottle', confidence: '96.7%', delta: '+15 Nourishment & Vitality', color: '#38bdf8' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = {
            ...prev,
            sedentaryMins: 0,
            steps: Math.min(15000, prev.steps + 2400),
            semgUv: 38,
          };
          evaluateLifeEngine(next, 'SAM 3.1 Outdoor Recovery Walk Scan');
          return next;
        });
      },
    },
  };

  const drawSamScene = useCallback(() => {
    const canvas = samCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.parentElement) {
      canvas.width = canvas.parentElement.clientWidth || 500;
      canvas.height = canvas.parentElement.clientHeight || 256;
    }
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    const sample = samSamples[samScene];
    const boxes = [
      { x: w * 0.12, y: h * 0.18, bw: w * 0.34, bh: h * 0.58 },
      { x: w * 0.52, y: h * 0.22, bw: w * 0.36, bh: h * 0.52 },
      { x: w * 0.32, y: h * 0.55, bw: w * 0.3, bh: h * 0.32 },
    ];

    sample.masks.forEach((m, idx) => {
      const b = boxes[idx % boxes.length];
      ctx.fillStyle = m.color + '28';
      ctx.strokeStyle = m.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      // roundRect fallback
      if (ctx.roundRect) {
        ctx.roundRect(b.x, b.y, b.bw, b.bh, 12);
      } else {
        ctx.rect(b.x, b.y, b.bw, b.bh);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(b.x + 6, b.y + 6, Math.min(b.bw - 12, 230), 22);
      ctx.fillStyle = m.color;
      ctx.font = '600 11px JetBrains Mono, monospace';
      ctx.fillText(`${m.label.split(':')[0]} (${m.confidence})`, b.x + 12, b.y + 21);
    });
  }, [samScene]);

  useEffect(() => {
    if (activeTab === 'sam') {
      drawSamScene();
      window.addEventListener('resize', drawSamScene);
      return () => window.removeEventListener('resize', drawSamScene);
    }
  }, [activeTab, samScene, drawSamScene]);

  // Tactile Petting / Totem Comfort Handler
  const handleCreatureTouch = () => {
    playBioChime('positive');
    setVector((prev) => ({
      ...prev,
      Relationship: Math.min(100, prev.Relationship + 4),
      Happiness: Math.min(100, prev.Happiness + 3),
    }));
    appendLog('User tactile tap on Muse Charm -> +4 Relationship, +3 Happiness.', 'info');
    showToast('Haptic Totem Resonance', 'Sent tactile comfort pulse to your Muse Charm companion!');
  };

  // Coaching Win Award
  const rewardCoachingWin = (actionName: string) => {
    setCoachStreak((prev) => prev + 1);
    setCoachXp((prev) => prev + 20);
    playBioChime('positive');
    evaluateLifeEngine(telemetry, `Coach Action Completed (${actionName})`);
    showToast('Health Coaching Win! (+20 XP)', `${actionName} improved your biomarkers and strengthened your Muse!`);
  };

  // Start Guided Breathing Session
  const startGuidedBreathing = () => {
    if (guidedTimerRef.current) {
      clearInterval(guidedTimerRef.current);
      guidedTimerRef.current = null;
    }

    setIsGuidedActive(true);
    let remaining = 6;
    setGuidedRemaining(6);
    setGuidedStepLabel('1/3 · Inhale deeply... drop your shoulders & unclench wrist');
    playBioChime('neutral');

    guidedTimerRef.current = setInterval(() => {
      remaining -= 1;
      setGuidedRemaining(remaining);

      if (remaining > 4) {
        setGuidedStepLabel('1/3 · Inhale deeply... drop your shoulders & unclench wrist');
      } else if (remaining > 2) {
        setGuidedStepLabel('2/3 · Hold gently... feeling Muse Charm haptics slow down');
        // Progressively ease sEMG and HR
        setTelemetry((prev) => ({
          ...prev,
          semgUv: Math.max(36, Math.round(prev.semgUv * 0.72)),
          hrBpm: Math.max(64, Math.round(prev.hrBpm * 0.92)),
        }));
      } else if (remaining > 0) {
        setGuidedStepLabel('3/3 · Exhale slowly... restoring parasympathetic balance');
      } else {
        clearInterval(guidedTimerRef.current!);
        guidedTimerRef.current = null;
        setIsGuidedActive(false);

        setTelemetry((prev) => {
          const next = {
            ...prev,
            semgUv: 38,
            hrBpm: 65,
            sleepHrs: fsmMode === 'DROWSY_RECOVERY' ? 8.0 : prev.sleepHrs,
            sedentaryMins: fsmMode === 'DEPLETED_NEGLECT' ? 10 : prev.sedentaryMins,
            mealHoursAgo: fsmMode === 'DEPLETED_NEGLECT' ? 1.0 : prev.mealHoursAgo,
          };
          evaluateLifeEngine(next, 'Coach Action Completed (Guided Bio-Coherence & Recovery Reset)');
          return next;
        });

        rewardCoachingWin('Guided Bio-Coherence & Recovery Reset');
      }
    }, 800);
  };

  // Chat Submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const text = chatMessage.trim();
    setChatMessage('');
    playBioChime('neutral');

    const lower = text.toLowerCase();
    if (lower.includes('walk') || lower.includes('lunch') || lower.includes('ate')) {
      const nextTelem = { ...telemetry, sedentaryMins: 10, mealHoursAgo: 0.5 };
      setTelemetry(nextTelem);
      evaluateLifeEngine(nextTelem, `Voice/Chat Check-in ("${text.slice(0, 32)}...")`);
    } else if (lower.includes('tense') || lower.includes('stress') || lower.includes('tired')) {
      const nextTelem = { ...telemetry, semgUv: 125 };
      setTelemetry(nextTelem);
      evaluateLifeEngine(nextTelem, `Voice/Chat Stress Report ("${text.slice(0, 32)}...")`);
    } else {
      appendLog(`muse-spark-1.3 dialogue response generated for: "${text.slice(0, 36)}"`, 'info');
      setCreatureDialogue(
        `"Hearing you loud and clear! Right now our Life Engine sits in ${fsmMode} with ${vector.Energy}% Energy and ${vector.Rest}% Rest—let's keep our rhythm steady."`
      );
    }
  };

  // SVG Totem styling based on mode
  const getCreatureVisuals = () => {
    switch (fsmMode) {
      case 'CONCERN_STRESS':
        return {
          stop1: '#fb7185',
          stop2: '#e11d48',
          mouthPath: 'M88 118 Q100 108 112 118',
          eyeRy: 12,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-rose-500/25 blur-2xl pointer-events-none',
          directive: `anim: empathetic_grounding_breath (${telemetry.hrBpm} BPM -> 60 BPM guide)`,
          proteus: 'Proteus Alert: Somatic Tension Mirror',
          stateBadgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'DEPLETED_NEGLECT':
        return {
          stop1: '#fbbf24',
          stop2: '#b45309',
          mouthPath: 'M88 117 Q100 110 112 117',
          eyeRy: 6,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl pointer-events-none',
          directive: 'anim: sluggish_posture_dim_aura (Nourishment + Activity Low)',
          proteus: 'Proteus Mirror: Energy Depletion',
          stateBadgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'DROWSY_RECOVERY':
        return {
          stop1: '#c084fc',
          stop2: '#6d28d9',
          mouthPath: 'M92 114 Q100 116 108 114',
          eyeRy: 4,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-purple-500/20 blur-2xl pointer-events-none',
          directive: 'anim: cozy_hibernation_float (Low Rest Conservation)',
          proteus: 'Proteus Mirror: Circadian Recovery',
          stateBadgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        };
      case 'HYPER_FOCUS':
        return {
          stop1: '#38bdf8',
          stop2: '#2563eb',
          mouthPath: 'M88 112 Q100 120 112 112',
          eyeRy: 11,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-blue-500/25 blur-2xl pointer-events-none',
          directive: 'anim: synchronized_focus_orbit (sEMG Flow State)',
          proteus: 'Proteus Mirror: Cognitive Flow',
          stateBadgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        };
      default:
        return {
          stop1: '#67e8f9',
          stop2: '#0891b2',
          mouthPath: 'M86 110 Q100 124 114 110',
          eyeRy: 11,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none',
          directive: `anim: gentle_levitation_pulse (${telemetry.hrBpm} BPM sync)`,
          proteus: 'Proteus Resonance: High Vitality',
          stateBadgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
    }
  };

  const visuals = getCreatureVisuals();

  // Outbound JSON Payload
  const outboundJsonPayload = JSON.stringify(
    {
      model: metaModel,
      enclave: 'muse-secure-vm://systemd-nspawn/user-enclave-01',
      body_telemetry_summary: {
        source: 'google_health_web_bridge + meta_neural_band_dat',
        semg_rms_uv: telemetry.semgUv,
        sedentary_window_mins: telemetry.sedentaryMins,
        daily_steps: telemetry.steps,
        sleep_duration_hrs: telemetry.sleepHrs,
        heart_rate_bpm: telemetry.hrBpm,
        hours_since_meal: telemetry.mealHoursAgo,
      },
      life_engine_fsm: {
        deterministic_state: fsmMode,
        state_vector_8d: vector,
      },
      manifestation_target: {
        device: 'muse_charm_web_totem',
        voice_model: 'muse-voice-transcribe-1.0',
        vision_grounding: 'sam-3.1',
      },
    },
    null,
    2
  );

  return (
    <div className="w-full bg-[#090d16] text-[#f1f5f9] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Top Banner Ribbon for Meta AI Hackathon & Medium Publication */}
      <section className="w-full bg-gradient-to-r from-slate-950 via-[#0d1627] to-slate-950 border-b border-cyan-500/30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('tech')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-['Space_Grotesk'] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Tech</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs uppercase font-['Space_Grotesk'] tracking-widest text-cyan-300 font-bold">
                Meta AI Global Hackathon Submission
              </span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs text-slate-300 font-medium">
              ZoeWave Project: Bio-Responsive Digital Companion
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="https://dev.meta.ai/events/global-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-['Space_Grotesk'] font-semibold transition cursor-pointer"
            >
              <span>Meta AI Hackathon Event</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <a
              href="https://zoewave.medium.com/bio-responsive-digital-companion-1c1b36f2788c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-['Space_Grotesk'] font-semibold transition cursor-pointer"
            >
              <span>Medium Whitepaper</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Internal Navigation Sub-Bar & Audio Control */}
      <nav className="sticky top-24 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-['Space_Grotesk']">
                  ZoeWave Muse Companion
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Meta AI Hackathon MVP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tripartite Architecture: <span className="text-slate-200 font-medium">Body (Telemetry) → Life Engine (FSM) → Creature (Meta Muse AI)</span>
              </p>
            </div>
          </div>

          {/* Mode Tabs & Audio Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('main')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'main'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Live Companion Cockpit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sam')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'sam'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SAM 3.1 Meal &amp; Posture Lab
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('arch')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'arch'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Meta API &amp; Google Health Bridge
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextAudio = !audioEnabled;
                setAudioEnabled(nextAudio);
                if (nextAudio) playBioChime('neutral');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
              title="Toggle Bio-Haptic Audio Synthesis"
            >
              <span className={`w-2 h-2 rounded-full ${audioEnabled ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              <span>{audioEnabled ? 'Chimes On' : 'Chimes Muted'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Toast Notification Banner */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-slate-900/95 border border-cyan-500/40 px-4 py-3 shadow-2xl backdrop-blur-md animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <span className="mt-1 w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
            <div>
              <p className="text-xs font-semibold text-cyan-300">{toast.title}</p>
              <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: LIVE COMPANION COCKPIT */}
      {activeTab === 'main' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
          {/* Judge Time-Travel Bar */}
          <section className="mb-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-400 font-['Space_Grotesk']">
                    Judge Time-Travel &amp; Telemetry Scenarios
                  </span>
                  <span className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                    Google Health + sEMG Stream: ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any physiological scenario below or adjust the telemetry sliders to test deterministic Life Engine transitions and Meta Model API responses.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset('thriving')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                >
                  1. Optimal Flow &amp; Recovery
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('sedentary')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition cursor-pointer"
                >
                  2. 300-Min Sedentary + Skipped Meal
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('semg_stress')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition cursor-pointer"
                >
                  3. Stationary Wrist sEMG Stress Spike
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('sleep_debt')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition cursor-pointer"
                >
                  4. Deep Sleep Debt (3.8h)
                </button>
              </div>
            </div>
          </section>

          {/* Tripartite 3-Column Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LAYER 1: THE BODY */}
            <section className="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-['Space_Grotesk']">
                      Layer 1 · The Body
                    </span>
                    <h2 className="text-sm font-bold text-white mt-0.5">Biosignal &amp; Google Health Telemetry</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTelemetry((prev) => {
                        const next = { ...prev, steps: Math.min(15000, prev.steps + 650) };
                        evaluateLifeEngine(next, 'Google Health / Fitbit Web API Delta Pull (+650 steps)');
                        return next;
                      });
                      showToast('Google Health Web Bridge', 'Pulled latest step & HR delta via OAuth 2.0 Web Bridge.');
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Sync Health API</span>
                  </button>
                </div>

                {/* Live sEMG Oscilloscope Canvas */}
                <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800/90 p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-300">Neural Band sEMG (5–250 Hz RMS)</span>
                    <span className="font-mono text-cyan-400 font-semibold">
                      {telemetry.semgUv} µV RMS · {telemetry.semgUv > 100 ? 'High Tension' : telemetry.semgUv > 65 ? 'Active Recruitment' : 'Relaxed'}
                    </span>
                  </div>
                  <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-950">
                    <canvas ref={semgCanvasRef} className="w-full h-full block" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      MUAP Classifier:{' '}
                      <strong className="text-slate-200">
                        {telemetry.semgUv > 100 ? 'Sustained Wrist Clench' : telemetry.semgUv > 65 ? 'Rapid Typing / Pinch' : 'Resting Wrist'}
                      </strong>
                    </span>
                    <span>
                      SNR Filter: <strong className="text-emerald-400">CNN+SVM 92.4%</strong>
                    </span>
                  </div>
                </div>

                {/* 6 Reactive Telemetry Sliders */}
                <div className="mt-4 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Wrist sEMG Muscle Activation (µV RMS)</label>
                      <span className="font-mono text-cyan-300 font-semibold">{telemetry.semgUv} µV</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="180"
                      value={telemetry.semgUv}
                      onChange={(e) => handleTelemetryChange('semgUv', Number(e.target.value), 'Wrist sEMG Adjusted')}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Continuous Sedentary Window (mins)</label>
                      <span className="font-mono text-amber-300 font-semibold">{telemetry.sedentaryMins} min</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={telemetry.sedentaryMins}
                      onChange={(e) => handleTelemetryChange('sedentaryMins', Number(e.target.value), 'Sedentary Timer Adjusted')}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Google Health Daily Steps</label>
                      <span className="font-mono text-emerald-300 font-semibold">{telemetry.steps.toLocaleString()} steps</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="15000"
                      step="100"
                      value={telemetry.steps}
                      onChange={(e) => handleTelemetryChange('steps', Number(e.target.value), 'Google Health Steps Updated')}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Last Night Sleep Duration (hrs)</label>
                      <span className="font-mono text-indigo-300 font-semibold">{telemetry.sleepHrs.toFixed(1)} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="10.0"
                      step="0.1"
                      value={telemetry.sleepHrs}
                      onChange={(e) => handleTelemetryChange('sleepHrs', parseFloat(e.target.value), 'Sleep Stage Sync Updated')}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Optical Heart Rate &amp; SpO2</label>
                      <span className="font-mono text-rose-300 font-semibold">{telemetry.hrBpm} BPM · 98% SpO2</span>
                    </div>
                    <input
                      type="range"
                      min="52"
                      max="145"
                      value={telemetry.hrBpm}
                      onChange={(e) => handleTelemetryChange('hrBpm', Number(e.target.value), 'Optical Heart Rate Updated')}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-slate-300 font-medium">Hours Since Last Nourishment</label>
                      <span className="font-mono text-teal-300 font-semibold">{telemetry.mealHoursAgo.toFixed(1)} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="12.0"
                      step="0.5"
                      value={telemetry.mealHoursAgo}
                      onChange={(e) => handleTelemetryChange('mealHoursAgo', parseFloat(e.target.value), 'Fasting Window Updated')}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Web Bluetooth + SAM Link Footer */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const nav = navigator as unknown as { bluetooth?: { requestDevice: (opt: { acceptAllDevices: boolean }) => Promise<unknown> } };
                    if (nav.bluetooth) {
                      try {
                        await nav.bluetooth.requestDevice({ acceptAllDevices: true });
                      } catch {
                        // fallback
                      }
                    }
                    handleTelemetryChange('hrBpm', 71, 'Web Bluetooth GATT Heart Rate + sEMG Stream Paired');
                    showToast('Web Bluetooth Stream Active', 'Streaming live GATT Heart Rate (71 BPM) & sEMG packets.');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                >
                  Pair Web Bluetooth HR/IMU
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('sam');
                    showToast('SAM 3.1 Vision Lab', 'Select a meal or posture snapshot to segment and push to the Life Engine.');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition cursor-pointer"
                >
                  + Log SAM 3.1 Meal Scan
                </button>
              </div>
            </section>

            {/* LAYER 2: THE LIFE ENGINE (Deterministic 8-Variable FSM) */}
            <section className="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-['Space_Grotesk']">
                      Layer 2 · The Life Engine
                    </span>
                    <h2 className="text-sm font-bold text-white mt-0.5">Deterministic 8-Stat State Machine</h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${visuals.stateBadgeClass}`}>
                    STATE: {fsmMode}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Prevents LLM hallucination by evaluating raw physiological telemetry against strict decay and growth thresholds before invoking{' '}
                  <code className="text-cyan-300 font-mono">muse-spark-1.3</code>.
                </p>

                {/* 8-Dimensional State Vector Progress Bars */}
                <div className="mt-3.5 space-y-2.5">
                  {(
                    [
                      { key: 'Happiness', gradient: 'from-emerald-400 to-teal-500' },
                      { key: 'Energy', gradient: 'from-cyan-400 to-blue-500' },
                      { key: 'Nourishment', gradient: 'from-teal-400 to-emerald-500' },
                      { key: 'Rest', gradient: 'from-indigo-400 to-purple-500' },
                      { key: 'Activity', gradient: 'from-amber-400 to-orange-500' },
                      { key: 'Engagement', gradient: 'from-sky-400 to-indigo-500' },
                      { key: 'Growth', gradient: 'from-fuchsia-400 to-purple-500' },
                      { key: 'Relationship', gradient: 'from-rose-400 to-pink-500' },
                    ] as const
                  ).map(({ key, gradient }) => {
                    const val = vector[key];
                    const isLow = val < 48;
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">{key}</span>
                          <span className={`font-mono ${isLow ? 'text-rose-400 font-bold' : 'text-slate-200 font-semibold'}`}>
                            {val}/100
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-300`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Causal Event Log Container */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-300 font-['Space_Grotesk']">
                      Deterministic Causal Event Log
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">systemd-nspawn Enclave</span>
                  </div>
                  <div className="h-36 overflow-y-auto rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-1.5 text-xs font-mono">
                    {causalLogs.map((item) => {
                      const color =
                        item.level === 'warn'
                          ? 'text-amber-300'
                          : item.level === 'crit'
                          ? 'text-rose-400'
                          : 'text-cyan-300';
                      return (
                        <div key={item.id} className="flex items-start gap-2 border-b border-slate-900 pb-1">
                          <span className="text-slate-500 shrink-0">[{item.ts}]</span>
                          <span className={color}>{item.msg}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Muse Wonder 1M-Context Synthesis */}
              <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 font-['Space_Grotesk']">
                    Muse Wonder 1.0 · 1M Context Memory
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playBioChime('positive');
                      const avg = Math.round(Object.values(vector).reduce((a, b) => a + b, 0) / 8);
                      setWonderText(
                        `Muse Wonder 1.0 (1M Context Run Complete): Evaluated 14-day sEMG + Google Health window. Composite vitality score is ${avg}/100. Sub-agent scheduled a 4-minute wrist mobility & breathing cue for 3:30 PM.`
                      );
                      showToast('Muse Wonder 1.0 Synthesis', `1M-token longitudinal analysis complete (Composite: ${avg}/100).`);
                    }}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 transition cursor-pointer"
                  >
                    Synthesize 30d Trend
                  </button>
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{wonderText}</p>
              </div>
            </section>

            {/* LAYER 3: THE CREATURE (Muse Charm Digital Totem & Meta AI Persona) */}
            <section className="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-['Space_Grotesk']">
                      Layer 3 · The Creature
                    </span>
                    <h2 className="text-sm font-bold text-white mt-0.5">Muse Charm Totem &amp; Generative Persona</h2>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      coachXp >= 100
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {coachXp >= 100 ? 'Stage 4 · Ascendant Guardian' : 'Stage 3 · Lumina Kin'}
                  </span>
                </div>

                {/* Physical Muse Charm Interactive Totem Display */}
                <div className="mt-3 relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-center overflow-hidden min-h-[250px]">
                  {/* Ambient Bio-Aura Ring */}
                  <div className={visuals.auraClass}></div>

                  {/* Top Totem Status */}
                  <div className="relative z-10 w-full flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      MUSE CHARM OS v2.4
                    </span>
                    <span className="text-cyan-300 font-medium">{visuals.proteus}</span>
                  </div>

                  {/* Interactive SVG Bio-Responsive Creature */}
                  <div
                    onClick={handleCreatureTouch}
                    className="relative z-10 cursor-pointer creature-float my-2 select-none group"
                    title="Tap to send haptic comfort pulse to your companion"
                  >
                    <svg className="w-36 h-36 transition-transform group-hover:scale-105" viewBox="0 0 200 200" fill="none">
                      {/* Outer Energy Halo */}
                      <circle cx="100" cy="100" r="78" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
                      {/* Creature Ears / Antennae */}
                      <path d="M62 58 C45 25, 30 45, 52 74" fill="#06b6d4" opacity="0.85" />
                      <path d="M138 58 C155 25, 170 45, 148 74" fill="#06b6d4" opacity="0.85" />
                      {/* Core Body */}
                      <path
                        d="M100 38 C142 38, 164 68, 160 112 C156 150, 132 168, 100 168 C68 168, 44 150, 40 112 C36 68, 58 38, 100 38 Z"
                        fill="url(#creatureGradDynamic)"
                        stroke="#67e8f9"
                        strokeWidth="3"
                      />
                      {/* Bioluminescent Core Heart */}
                      <circle cx="100" cy="128" r="14" fill="#a5f3fc" opacity="0.45" />
                      {/* Eyes */}
                      <ellipse cx="78" cy="92" rx="9" ry={visuals.eyeRy} fill="#0f172a" />
                      <ellipse cx="122" cy="92" rx="9" ry={visuals.eyeRy} fill="#0f172a" />
                      {/* Eye Highlights */}
                      <circle cx="75" cy="88" r="3.5" fill="#ffffff" />
                      <circle cx="119" cy="88" r="3.5" fill="#ffffff" />
                      {/* Expressive Mouth */}
                      <path d={visuals.mouthPath} stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
                      {/* Cheeks */}
                      <ellipse cx="63" cy="104" rx="7" ry="4" fill="#f472b6" opacity="0.6" />
                      <ellipse cx="137" cy="104" rx="7" ry="4" fill="#f472b6" opacity="0.6" />
                      <defs>
                        <radialGradient id="creatureGradDynamic" cx="50%" cy="35%" r="65%">
                          <stop offset="0%" stopColor={visuals.stop1} />
                          <stop offset="60%" stopColor={visuals.stop2} />
                          <stop offset="100%" stopColor="#1e1b4b" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Directive Pill */}
                  <div className="relative z-10 mt-1 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-cyan-300">
                      {visuals.directive}
                    </span>
                  </div>
                </div>

                {/* Muse Spark 1.3 Persona Dialogue */}
                <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800 p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-cyan-400 font-['Space_Grotesk']">
                      muse-spark-1.3 · Empathetic Health Coach
                    </span>
                    <span className="font-mono text-emerald-400">
                      Streak: {coachStreak} Wins · {coachXp} XP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                    {creatureDialogue}
                  </p>
                </div>

                {/* Active Health Coaching Prescription Card */}
                <div className="mt-3 rounded-xl bg-gradient-to-br from-emerald-950/50 via-slate-950 to-cyan-950/40 border border-emerald-500/30 p-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 font-['Space_Grotesk']">
                        Muse Active Health Coach
                      </span>
                    </div>
                    <select
                      value={coachFocus}
                      onChange={(e) => {
                        setCoachFocus(e.target.value);
                        appendLog(`Coaching Focus switched to: ${e.target.value.toUpperCase()}`, 'info');
                        showToast('Muse Coach Focus Updated', `Tailoring interventions for ${e.target.value}.`);
                      }}
                      className="rounded-md bg-slate-900 border border-slate-700 px-2 py-0.5 text-[11px] text-cyan-300 font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="holistic">Focus: Whole-Body Vitality</option>
                      <option value="stress">Focus: Stress &amp; sEMG Relief</option>
                      <option value="metabolic">Focus: Nutrition &amp; Movement</option>
                      <option value="sleep">Focus: Deep Sleep Recovery</option>
                    </select>
                  </div>

                  <div className="text-xs text-slate-200 font-medium leading-snug">
                    {fsmMode === 'CONCERN_STRESS'
                      ? `[Somatic Stress Coach] Your wrist sEMG is spiking at ${telemetry.semgUv} µV while stationary (${telemetry.sedentaryMins}m). Let's do a 15-second guided somatic breathing reset right now to drop your heart rate (${telemetry.hrBpm} BPM) and unclench your forearm motor units.`
                      : fsmMode === 'DEPLETED_NEGLECT'
                      ? `[Metabolic & Fuel Coach] You've been stationary for ${telemetry.sedentaryMins} minutes and haven't refueled in ${telemetry.mealHoursAgo} hours. Stand up for a 5-minute walk and log a high-protein meal to restore your companion's core light.`
                      : fsmMode === 'DROWSY_RECOVERY'
                      ? `[Circadian Recovery Coach] With ${telemetry.sleepHrs}h sleep last night, your Rest score is ${vector.Rest}%. Avoid late caffeine, take a gentle 15s vagal breathing reset, and lock in an 8.0h recovery sleep target tonight.`
                      : fsmMode === 'HYPER_FOCUS'
                      ? `[Deep Flow Coach] You're in high-output cognitive flow (${telemetry.semgUv} µV sEMG). Coach tip: do a micro-posture check and sip water every 25 minutes so hyper-focus doesn't turn into afternoon burnout.`
                      : `[Whole-Body Vitality Coach] Your biomarkers are balanced (${telemetry.steps.toLocaleString()} steps, ${telemetry.semgUv} µV resting sEMG). Complete a quick 15s coherence breath or 5-min walk to evolve your Muse to Stage 4!`}
                  </div>

                  <p className="text-[11px] text-emerald-400 font-mono mt-1">
                    {fsmMode === 'CONCERN_STRESS'
                      ? 'Coaching Target: Drop sEMG < 50 µV · +22 Energy · +25 Happiness'
                      : fsmMode === 'DEPLETED_NEGLECT'
                      ? 'Coaching Target: Reset Sedentary Window to 0m · +32 Nourishment · +28 Activity'
                      : fsmMode === 'DROWSY_RECOVERY'
                      ? 'Coaching Target: +30 Rest Reserve · +18 Energy · Circadian Alignment'
                      : fsmMode === 'HYPER_FOCUS'
                      ? 'Coaching Target: Sustain Flow Without Burnout · +15 Growth XP'
                      : 'Coaching Target: +15 Growth XP toward Stage 4 Ascendant Guardian'}
                  </p>

                  {/* Guided Session Progress Bar */}
                  {isGuidedActive && (
                    <div className="mt-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/40 p-2.5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-cyan-300">{guidedStepLabel}</span>
                        <span className="font-mono text-emerald-300">{guidedRemaining}s</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                          style={{ width: `${Math.round(((6 - guidedRemaining) / 6) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Actionable Micro-Intervention Buttons */}
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={startGuidedBreathing}
                      className="col-span-2 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {fsmMode === 'CONCERN_STRESS'
                          ? 'Start 15s Guided Somatic Breathing & Wrist Unclench'
                          : fsmMode === 'DEPLETED_NEGLECT'
                          ? 'Execute 5-Min Walk + Refuel Coaching Protocol'
                          : fsmMode === 'DROWSY_RECOVERY'
                          ? 'Commit to 8.0h Recovery Sleep & Down-Regulation Protocol'
                          : fsmMode === 'HYPER_FOCUS'
                          ? 'Run 15s Micro-Posture & Hydration Check'
                          : 'Start 15s Bio-Coherence Breathing Session'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTelemetry((prev) => {
                          const next = {
                            ...prev,
                            sedentaryMins: 0,
                            steps: Math.min(15000, prev.steps + 600),
                            semgUv: Math.min(60, prev.semgUv),
                          };
                          evaluateLifeEngine(next, 'Coach Action Completed (5-Min Movement Break)');
                          return next;
                        });
                        rewardCoachingWin('5-Min Movement Break (+600 Steps, 0m Sedentary)');
                      }}
                      className="py-1.5 px-2.5 rounded-lg text-[11px] font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition cursor-pointer"
                    >
                      Complete 5m Walk (+600 steps)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTelemetry((prev) => {
                          const next = { ...prev, mealHoursAgo: 0.5 };
                          evaluateLifeEngine(next, 'Coach Action Completed (Balanced Meal & Hydration Logged)');
                          return next;
                        });
                        rewardCoachingWin('Balanced Meal & Hydration Logged');
                      }}
                      className="py-1.5 px-2.5 rounded-lg text-[11px] font-semibold bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition cursor-pointer"
                    >
                      Log Balanced Meal &amp; Water
                    </button>
                  </div>
                </div>
              </div>

              {/* Voice & Chat Check-In */}
              <div className="pt-2 border-t border-slate-800">
                <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const voiceSamples = [
                        'I just finished a 25-minute walk outside and grabbed lunch!',
                        'My wrists feel pretty tense from coding all afternoon.',
                        'How are my energy and recovery stats looking today?',
                      ];
                      const sample = voiceSamples[Math.floor(Math.random() * voiceSamples.length)];
                      setChatMessage(sample);
                      showToast('muse-voice-transcribe-1.0', `Transcribed: "${sample}"`);
                    }}
                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 shrink-0 transition flex items-center gap-1 text-xs font-medium cursor-pointer"
                    title="Simulate muse-voice-transcribe-1.0 Voice Check-in"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                    </svg>
                    <span>Voice</span>
                  </button>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Talk to your Muse Charm companion..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* VIEW 2: SAM 3.1 MEAL & POSTURE VISUAL GROUNDING LAB */}
      {activeTab === 'sam' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Space_Grotesk']">
                  Meta Model API · SAM 3.1 + Muse Image
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">Zero-Friction Visual Grounding for the Life Engine</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instead of manual calorie or workout logging, <code className="text-cyan-300 font-mono">SAM 3.1</code> outlines food portions and desk ergonomics from a quick snapshot and feeds deterministic deltas directly into the Life Engine FSM.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSamScene('salmon_bowl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'salmon_bowl'
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  Scan Balanced Salmon Bowl
                </button>
                <button
                  type="button"
                  onClick={() => setSamScene('espresso_overload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'espresso_overload'
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  Scan Late-Night Triple Espresso
                </button>
                <button
                  type="button"
                  onClick={() => setSamScene('ergonomic_walk')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'ergonomic_walk'
                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  Scan Outdoor Trail Walk
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
              <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">{samSamples[samScene].title}</span>
                  <span className="font-mono text-cyan-400">
                    Model: sam-3.1-vision · {samSamples[samScene].masks.length} Masks Detected
                  </span>
                </div>
                <div className="relative w-full h-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                  <canvas ref={samCanvasRef} className="w-full h-full block" />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-slate-950 border border-slate-800 p-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                    SAM 3.1 Segmentation Telemetry
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Text-prompted object masks converted into deterministic Life Engine state shifts:
                  </p>
                  <div className="mt-3 space-y-2.5 text-xs">
                    {samSamples[samScene].masks.map((m, idx) => (
                      <div key={idx} className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{m.label}</span>
                          <span className="font-mono text-cyan-300">{m.confidence}</span>
                        </div>
                        <div className="text-emerald-400 font-mono mt-1">FSM Impact: {m.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      samSamples[samScene].apply();
                      setActiveTab('main');
                      showToast('SAM 3.1 Telemetry Applied', `${samSamples[samScene].title} pushed into the Life Engine FSM.`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    Push SAM 3.1 Telemetry into Life Engine FSM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: META API & GOOGLE HEALTH WEB BRIDGE */}
      {activeTab === 'arch' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: How Google Health Web Integration Works in 2026 */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-['Space_Grotesk']">
                  2026 Web Health Architecture
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">
                  How to Bridge Google Health &amp; Wearables in a Web App
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Because Google deprecated the legacy Google Fit REST API in 2026 in favor of on-device <strong className="text-white">Android Health Connect</strong>, our winning architecture employs a <strong className="text-cyan-300">3-Path Web Telemetry Bridge</strong>:
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                  <div className="font-semibold text-cyan-300">Path A · Google Fitbit Web API (OAuth 2.0 PKCE) + Open Wearables Bridge</div>
                  <p className="text-slate-400 mt-1">
                    Android Health Connect syncs bi-directionally with the Fitbit app on Android. Your web app authenticates directly against Google's Fitbit Web REST API (or an Open Wearables / Terra webhook) to pull sleep stages, heart rate, and daily steps in the browser.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                  <div className="font-semibold text-purple-300">Path B · Native Browser Hardware APIs (Web Bluetooth + DeviceMotion)</div>
                  <p className="text-slate-400 mt-1">
                    Uses <code className="text-purple-200">navigator.bluetooth</code> to stream real-time heart rate and sEMG/IMU packets from BLE wearables, paired with standard <code className="text-purple-200">DeviceMotionEvent</code> and <code className="text-purple-200">DeviceOrientationEvent</code> browser APIs specified in the ZoeWave paper.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                  <div className="font-semibold text-amber-300">Path C · Deterministic Judge Time-Travel Simulator</div>
                  <p className="text-slate-400 mt-1">
                    Lets hackathon judges simulate 300-minute sedentary windows, 5–250 Hz wrist sEMG stress spikes, and SAM 3.1 meal scans in one click without needing to log into a personal health account.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Live Meta Model API Configuration & Payload Inspector */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-['Space_Grotesk']">
                  Meta Model API Live Inspector
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">Muse Spark 1.3 &amp; Muse Wonder Payload</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Optionally enter your <code className="text-cyan-300 font-mono">$150 Meta Model API</code> key during the hackathon to switch from deterministic local persona synthesis to live cloud inference.
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Meta Model API Key (Optional)</label>
                    <input
                      type="password"
                      value={metaApiKey}
                      onChange={(e) => setMetaApiKey(e.target.value)}
                      placeholder="meta_sk_live_..."
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Active Orchestration Model</label>
                    <select
                      value={metaModel}
                      onChange={(e) => setMetaModel(e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="muse-spark-1.3">muse-spark-1.3 (Low-Latency Persona)</option>
                      <option value="muse-wonder-1.0">muse-wonder-1.0 (1M Context Agent)</option>
                      <option value="muse-spark-open">muse-spark-open (Baseten / Modal)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">
                      Live Outbound JSON Payload (Muse Secure VM → Meta Model API)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const ta = document.createElement('textarea');
                        ta.value = outboundJsonPayload;
                        document.body.appendChild(ta);
                        ta.select();
                        document.execCommand('copy');
                        document.body.removeChild(ta);
                        showToast('Copied to Clipboard', 'Meta Model API JSON payload copied.');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="h-48 overflow-auto rounded-xl bg-slate-950 border border-slate-800 p-3 text-[11px] text-emerald-300 font-mono leading-relaxed">
                    {outboundJsonPayload}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
