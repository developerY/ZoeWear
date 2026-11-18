/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavPage } from '../../types';

interface MuseCharmScreenProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
}

type TabType = 'main' | 'mind_emotion' | 'wealth' | 'sam' | 'arch';

type FsmMode = 'VITAL_FLOW' | 'CONCERN_STRESS' | 'DEPLETED_NEGLECT' | 'DROWSY_RECOVERY' | 'HYPER_FOCUS';

type CoachPersona = 'sage' | 'stoic' | 'pragmatist' | 'biohacker';

export type GrowthStage = 'sprout' | 'growing' | 'thriving';

export interface MetaActionContract {
  category: 'movement' | 'hydration' | 'budget' | 'breathing' | 'rest' | 'reflection';
  title: string;
}

export interface MetaResponseContract {
  mood: 'gentle' | 'encouraging' | 'celebratory' | 'calm' | 'attentive';
  growth_stage: GrowthStage;
  suggested_action: MetaActionContract;
  message: string;
  reasons: string[];
}

interface TelemetryState {
  semgUv: number;
  sedentaryMins: number;
  steps: number;
  sleepHrs: number;
  hrBpm: number;
  mealHoursAgo: number;
}

interface EmotionState {
  valence: number; // -5 (deep anxiety/distress) to +5 (radiant peace/joy)
  arousal: number; // 1 (lethargic/hypo-aroused) to 10 (sympathetic panic/fight-or-flight)
  currentMoodTag: string;
  somaticAnxiety: number; // 0 - 100%
  burnoutRisk: number; // 0 - 100%
}

interface FinancialState {
  dailyBudget: number; // e.g. $120.00
  spentToday: number; // e.g. $42.50
  monthlyBurn: number; // e.g. $3,200/mo
  runwayMonths: number; // e.g. 6.4 months
  vaultSavings: number; // saved via impulse cooldowns
  impulseInterlockActive: boolean;
  cooldownRemaining: number;
}

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'fuel' | 'impulse' | 'growth' | 'comfort' | 'essential';
  ts: string;
  semgUv: number;
  hrBpm: number;
  valence: number;
  stressTag: string;
}

interface JournalEntry {
  id: string;
  ts: string;
  moodTag: string;
  valence: number;
  text: string;
  coachReframe: string;
  persona: CoachPersona;
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

  // Coach Persona
  const [coachPersona, setCoachPersona] = useState<CoachPersona>('stoic');

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

  // Audio Context Ref & Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBioChime = useCallback(
    (type: 'positive' | 'alert' | 'neutral' | 'coin') => {
      if (!audioEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.24);
          gain.gain.setValueAtTime(0.09, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'coin') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(987.77, now);
          osc.frequency.setValueAtTime(1318.51, now + 0.08);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
          osc.start(now);
          osc.stop(now + 0.25);
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
        // Audio playback safely ignored if browser blocked
      }
    },
    [audioEnabled]
  );

  // 1. Physical Biosignal Telemetry
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    semgUv: 42,
    sedentaryMins: 45,
    steps: 7840,
    sleepHrs: 7.6,
    hrBpm: 68,
    mealHoursAgo: 2.0,
  });

  // 2. Emotional & Mental Wellness State
  const [emotion, setEmotion] = useState<EmotionState>({
    valence: 2.5, // slightly positive
    arousal: 4, // calm focus
    currentMoodTag: 'Focused & Grounded',
    somaticAnxiety: 22,
    burnoutRisk: 18,
  });

  // 3. Wealth & Financial Coaching State
  const [financial, setFinancial] = useState<FinancialState>({
    dailyBudget: 120.0,
    spentToday: 42.5,
    monthlyBurn: 3200,
    runwayMonths: 6.4,
    vaultSavings: 150.0,
    impulseInterlockActive: false,
    cooldownRemaining: 0,
  });

  // Financial Ledger
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: 'exp-1',
      title: 'Morning Matcha & High-Protein Fuel',
      amount: 14.5,
      category: 'fuel',
      ts: '08:42 AM',
      semgUv: 38,
      hrBpm: 66,
      valence: 3.2,
      stressTag: 'Intentional Fuel',
    },
    {
      id: 'exp-2',
      title: 'Substack Deep Tech Research Pass',
      amount: 28.0,
      category: 'growth',
      ts: '11:15 AM',
      semgUv: 44,
      hrBpm: 70,
      valence: 2.8,
      stressTag: 'Growth Investment',
    },
  ]);

  // Emotional Journal History
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'j-1',
      ts: '10:30 AM',
      moodTag: 'Laser Focused',
      valence: 3.0,
      text: 'Deep work sprint on the Meta AI architecture. Flow is high, resting wrist feels relaxed.',
      coachReframe:
        'Marcus Aurelius notes: "Concentrate every minute like a Roman on doing what\'s in front of you with precise and genuine gravity." Flow state protected.',
      persona: 'stoic',
    },
  ]);

  // Emotional Check-In Form State
  const [journalInput, setJournalInput] = useState('');
  const [selectedMoodTag, setSelectedMoodTag] = useState('Laser Focused');

  // Custom Expense Simulator State
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCat, setNewExpCat] = useState<'fuel' | 'impulse' | 'growth' | 'comfort' | 'essential'>('impulse');

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
  const [coachStreak, setCoachStreak] = useState<number>(4);
  const [coachXp, setCoachXp] = useState<number>(85);

  // Meta Hackathon: Growth Stages & 3-Act Cinematic Experience
  const [growthStage, setGrowthStage] = useState<GrowthStage>('growing');
  const [cinematicAct, setCinematicAct] = useState<1 | 2 | 3 | null>(null);
  const [isAutoPlayingActs, setIsAutoPlayingActs] = useState<boolean>(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Structured Meta Model API Contract
  const [metaContract, setMetaContract] = useState<MetaResponseContract>({
    mood: 'encouraging',
    growth_stage: 'growing',
    suggested_action: { category: 'movement', title: 'Take a 10-minute walk' },
    message: 'A little movement can be a good reset.',
    reasons: ['movement_goal_incomplete', 'user_selected_gentle_coaching'],
  });

  // Daily Quests State
  const [quests, setQuests] = useState([
    { id: 'q1', title: 'Maintain wrist sEMG < 50 µV during deep work', xp: 20, completed: true },
    { id: 'q2', title: 'Keep daily spend under $120 discretionary cap', xp: 25, completed: false },
    { id: 'q3', title: 'Log 1 emotional check-in with Stoic/Sage reframe', xp: 15, completed: true },
    { id: 'q4', title: 'Complete 15s Somatic Bio-Coherence breath', xp: 15, completed: false },
    { id: 'q5', title: 'Take 5-min walk when sedentary reaches 60m', xp: 20, completed: false },
  ]);

  // Guided breathing session timer
  const [isGuidedActive, setIsGuidedActive] = useState<boolean>(false);
  const [guidedRemaining, setGuidedRemaining] = useState<number>(6);
  const [guidedStepLabel, setGuidedStepLabel] = useState<string>(
    '1/3 · Inhale deeply... drop your shoulders & unclench wrist'
  );
  const guidedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Impulse Cooldown Timer
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Wonder Insight Text & Dialogue
  const [creatureDialogue, setCreatureDialogue] = useState<string>(
    '"I am monitoring your somatic tone, emotional valence, and financial burn rate in real time. All 4 life pillars are in harmony!"'
  );
  const [wonderText, setWonderText] = useState<string>(
    'Muse Wonder 1.0 (1M-Context Synthesis): Low resting wrist sEMG (42 µV) and $77.50 budget remaining kept cortisol low and emotional valence at +2.5. Recommended: Maintain steady momentum.'
  );

  // Chat Form input
  const [chatMessage, setChatMessage] = useState<string>('');

  // SAM 3.1 Lab State
  const [samScene, setSamScene] = useState<'salmon_bowl' | 'espresso_overload' | 'ergonomic_walk' | 'shopping_cart'>(
    'salmon_bowl'
  );

  // Meta Model API Inspection
  const [metaApiKey, setMetaApiKey] = useState<string>('');
  const [metaModel, setMetaModel] = useState<string>('muse-spark-1.3');

  const appendLog = useCallback((msg: string, level: 'info' | 'warn' | 'crit' = 'info') => {
    const ts = new Date().toLocaleTimeString([], { hour12: false });
    setCausalLogs((prev) => [{ id: Math.random().toString(36).substring(2, 9), ts, msg, level }, ...prev.slice(0, 19)]);
  }, []);

  // Deterministic FSM & Life Engine Evaluator
  const evaluateLifeEngine = useCallback(
    (currentTelemetry: TelemetryState, currentEmotion: EmotionState, currentFinancial: FinancialState, triggerSource?: string) => {
      const t = currentTelemetry;
      const em = currentEmotion;
      const fin = currentFinancial;
      const clamp = (v: number) => Math.max(8, Math.min(100, Math.round(v)));

      // Deterministic mappings from Body + Emotion + Wealth -> 8 Life Engine dimensions
      const restScore = clamp((t.sleepHrs / 8.0) * 92 - Math.max(0, (t.hrBpm - 80) * 0.35));
      const nourishScore = clamp(100 - Math.max(0, (t.mealHoursAgo - 1.5) * 11.5));
      const activityScore = clamp((t.steps / 9000) * 75 + Math.max(0, 30 - t.sedentaryMins / 10));

      // Stress penalties derived from sEMG + Financial Overrun + Negative Valence
      const sEmgPenalty = t.semgUv > 85 ? (t.semgUv - 85) * 0.5 : 0;
      const budgetRatio = fin.spentToday / Math.max(1, fin.dailyBudget);
      const financialPenalty = budgetRatio > 1.0 ? Math.min(30, (budgetRatio - 1.0) * 45) : 0;
      const emotionalBonus = em.valence * 4.5; // -22.5 to +22.5

      const energyScore = clamp(restScore * 0.4 + nourishScore * 0.3 + activityScore * 0.3 - sEmgPenalty * 0.4);
      const happinessScore = clamp(
        50 + emotionalBonus + (100 - financialPenalty * 2) * 0.25 - sEmgPenalty * 0.35
      );
      const engagementScore = clamp(
        70 + (t.semgUv > 25 && t.semgUv <= 85 ? 18 : -12) - (t.sedentaryMins > 180 ? 15 : 0) + (em.arousal >= 4 && em.arousal <= 7 ? 12 : -10)
      );
      const growthScore = clamp((energyScore + activityScore + restScore + (100 - financialPenalty)) / 4);
      const relationshipScore = clamp(75 + em.valence * 3.5);

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

      // Recompute Somatic Anxiety & Burnout Risk
      const somaticAnxiety = clamp(
        (t.semgUv / 180) * 45 + Math.max(0, (t.hrBpm - 70) * 0.6) + Math.max(0, -em.valence * 5)
      );
      const burnoutRisk = clamp(
        Math.max(0, (8.0 - t.sleepHrs) * 9) + (t.sedentaryMins / 360) * 35 + financialPenalty * 0.8
      );
      setEmotion((prev) => ({
        ...prev,
        somaticAnxiety,
        burnoutRisk,
      }));

      // Check Impulse Guard Trigger: High sEMG or high HR during shopping / budget strain
      const shouldTriggerImpulseGuard =
        (t.semgUv >= 75 || t.hrBpm >= 92 || somaticAnxiety > 55) && budgetRatio > 0.65;

      if (shouldTriggerImpulseGuard && !fin.impulseInterlockActive) {
        setFinancial((prev) => ({
          ...prev,
          impulseInterlockActive: true,
          cooldownRemaining: 60,
        }));
        appendLog(
          `⚠️ Impulse Guard Engaged! High somatic arousal (${t.semgUv} µV, ${t.hrBpm} BPM) detected with budget at ${(budgetRatio * 100).toFixed(0)}%.`,
          'warn'
        );
        playBioChime('alert');
      }

      let nextMode: FsmMode = 'VITAL_FLOW';
      let logLevel: 'info' | 'warn' | 'crit' = 'info';
      let reason = 'Whole-life metrics nominal across Body, Mind & Wealth.';

      if (t.semgUv >= 105 && t.sedentaryMins >= 60) {
        nextMode = 'CONCERN_STRESS';
        logLevel = 'crit';
        reason = `Sustained wrist sEMG (${t.semgUv} µV RMS) while stationary (${t.sedentaryMins}m) -> Isometric tension detected.`;
      } else if (t.sedentaryMins >= 180 && t.mealHoursAgo >= 5.0) {
        nextMode = 'DEPLETED_NEGLECT';
        logLevel = 'crit';
        reason = `${t.sedentaryMins}m stationary + ${t.mealHoursAgo}h fasting -> Physical vitality below critical threshold.`;
      } else if (t.sleepHrs < 5.5 || restScore < 50 || em.valence <= -3.0) {
        nextMode = 'DROWSY_RECOVERY';
        logLevel = 'warn';
        reason = `Sleep debt (${t.sleepHrs}h) or low emotional valence (${em.valence.toFixed(1)}) -> Prioritizing restorative pause.`;
      } else if (t.semgUv >= 65 && t.semgUv < 105 && t.sedentaryMins < 90 && em.valence >= 1.0) {
        nextMode = 'HYPER_FOCUS';
        logLevel = 'info';
        reason = `Clean motor recruitment (${t.semgUv} µV RMS) with positive valence -> Deep flow state active.`;
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

      // Update dialogue & Wonder insights dynamically based on Coach Persona & Mode
      updateCoachGuidance(nextMode, t, em, fin);
    },
    [appendLog, playBioChime]
  );

  // Coach Dialogue Generator
  const updateCoachGuidance = (
    mode: FsmMode,
    t: TelemetryState,
    em: EmotionState,
    fin: FinancialState
  ) => {
    const budgetLeft = Math.max(0, fin.dailyBudget - fin.spentToday);

    if (coachPersona === 'stoic') {
      if (mode === 'CONCERN_STRESS') {
        setCreatureDialogue(
          `"Epictetus reminds us: 'It is not events that upset us, but our judgment about them.' Your wrist sEMG is ${t.semgUv} µV. Unclench your forearm; this current pressure is an external event that cannot breach your inner citadel."`
        );
      } else if (mode === 'DEPLETED_NEGLECT') {
        setCreatureDialogue(
          `"You have traded 300 minutes of stillness for toil, neglecting bodily fuel. The body is the vehicle of reason; nourish it with clean water and food so your wisdom remains sharp."`
        );
      } else if (fin.impulseInterlockActive) {
        setCreatureDialogue(
          `"Seneca observed that we suffer more often in imagination than in reality. This urge to spend is merely dopamine seeking comfort. Wait out the 60s cooldown; true wealth is wanting nothing superfluous."`
        );
      } else {
        setCreatureDialogue(
          `"Vitals are steady (${t.semgUv} µV sEMG, $${budgetLeft.toFixed(2)} daily budget intact). You possess everything needed for a virtuous, productive day. Act with deliberate focus."`
        );
      }
    } else if (coachPersona === 'sage') {
      if (mode === 'CONCERN_STRESS') {
        setCreatureDialogue(
          `"I feel the tightness in your wrists and shoulders (${t.semgUv} µV RMS). You have carried so much today. Place one hand over your heart, take three deep exhales with my pulse, and let the tension dissolve."`
        );
      } else if (fin.impulseInterlockActive) {
        setCreatureDialogue(
          `"I notice a wave of emotional restlessness seeking an outlet through retail shopping. Be gentle with yourself. Let's take a 60-second breathing pause and check what you truly hunger for: rest, connection, or peace?"`
        );
      } else {
        setCreatureDialogue(
          `"Your heart rhythm (${t.hrBpm} BPM) and energy field are radiating balance. You've honored your body with ${t.steps.toLocaleString()} steps and kept your budget safe. I'm proud of our harmony!"`
        );
      }
    } else if (coachPersona === 'pragmatist') {
      if (mode === 'CONCERN_STRESS') {
        setCreatureDialogue(
          `"High muscular friction detected: ${t.semgUv} µV. High tension equals low code output. Protocol: 15-second wrist flexor release, sip 300ml water, and return to task."`
        );
      } else if (fin.impulseInterlockActive) {
        setCreatureDialogue(
          `"Impulse Interlock triggered. Today's burn is $${fin.spentToday.toFixed(2)} / $${fin.dailyBudget.toFixed(2)}. Unclench wrist <45 µV to unlock or bank $50 in vault. No emotional capital wasted."`
        );
      } else {
        setCreatureDialogue(
          `"Metrics green: ${fin.runwayMonths}mo runway, ${t.steps} steps, nominal sEMG. Let's knock out our daily micro-commitments and keep the streak alive."`
        );
      }
    } else {
      // biohacker
      if (mode === 'CONCERN_STRESS') {
        setCreatureDialogue(
          `"Autonomic tone shift: Sympathetic dominance observed via sEMG (${t.semgUv} µV) and HR (${t.hrBpm} BPM). Engage physiological sigh: two quick nasal inhales, one long slow oral exhale."`
        );
      } else if (fin.impulseInterlockActive) {
        setCreatureDialogue(
          `"Dopaminergic salience spike detected! Cortisol has hijacked prefrontal inhibitory circuits. Interlock locked for 60s to allow autonomic down-regulation."`
        );
      } else {
        setCreatureDialogue(
          `"Parasympathetic-sympathetic balance optimal. 7.6h sleep stage latency nominal. Metabolic fuel at ${(100 - t.mealHoursAgo * 10).toFixed(0)}%. Ready for peak cognitive output."`
        );
      }
    }

    setWonderText(
      `Muse Wonder 1.0 (1M Context Cross-Domain Synthesis): Tripartite analysis of Body (${t.semgUv} µV sEMG, ${t.sleepHrs}h sleep), Mind (Valence: ${em.valence.toFixed(1)}), and Wealth ($${fin.spentToday.toFixed(2)} spent / $${budgetLeft.toFixed(2)} remaining). Composite Life Score is calculated at ${Math.round(
        (85 + em.valence * 3 - (fin.spentToday > fin.dailyBudget ? 20 : 0))
      )}/100.`
    );
  };

  // Initial boot log
  useEffect(() => {
    appendLog('Muse Personal Life Coach: Holistic System Boot (Body + Mind + Wealth)', 'info');
  }, [appendLog]);

  // Telemetry change handler
  const handleTelemetryChange = (key: keyof TelemetryState, val: number, label: string) => {
    setTelemetry((prev) => {
      const next = { ...prev, [key]: val };
      evaluateLifeEngine(next, emotion, financial, label);
      return next;
    });
  };

  // Emotion change handler
  const handleEmotionChange = (key: keyof EmotionState, val: any, label: string) => {
    setEmotion((prev) => {
      const next = { ...prev, [key]: val };
      evaluateLifeEngine(telemetry, next, financial, label);
      return next;
    });
  };

  // Preset Applicator
  const applyPreset = (presetName: 'optimal_flow' | 'sedentary_impulse' | 'semg_stress' | 'sleep_debt') => {
    const presets = {
      optimal_flow: {
        semgUv: 38,
        sedentaryMins: 35,
        steps: 8900,
        sleepHrs: 7.9,
        hrBpm: 66,
        mealHoursAgo: 1.5,
        valence: 3.5,
        arousal: 5,
        mood: 'Harmonious Flow',
        spent: 34.0,
        interlock: false,
        msg: 'Scenario 1: Optimal Flow & Holistic Balance',
      },
      sedentary_impulse: {
        semgUv: 82,
        sedentaryMins: 290,
        steps: 1800,
        sleepHrs: 6.2,
        hrBpm: 94,
        mealHoursAgo: 5.5,
        valence: -2.0,
        arousal: 8,
        mood: 'Restless & Craving Retail Therapy',
        spent: 115.0,
        interlock: true,
        msg: 'Scenario 2: Sedentary Fatigue & Impulse Urge Interlock',
      },
      semg_stress: {
        semgUv: 142,
        sedentaryMins: 120,
        steps: 4200,
        sleepHrs: 6.4,
        hrBpm: 104,
        mealHoursAgo: 3.5,
        valence: -3.5,
        arousal: 9,
        mood: 'High Isometric Tension & Overwhelm',
        spent: 60.0,
        interlock: true,
        msg: 'Scenario 3: Stationary Wrist sEMG Somatic Spike',
      },
      sleep_debt: {
        semgUv: 52,
        sedentaryMins: 90,
        steps: 2900,
        sleepHrs: 3.9,
        hrBpm: 82,
        mealHoursAgo: 2.5,
        valence: -2.8,
        arousal: 3,
        mood: 'Exhausted & Drowsy Depletion',
        spent: 75.0,
        interlock: false,
        msg: 'Scenario 4: Severe Sleep Debt (3.9h) & Mood Slump',
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
    const newEmo: EmotionState = {
      ...emotion,
      valence: p.valence,
      arousal: p.arousal,
      currentMoodTag: p.mood,
    };
    const newFin: FinancialState = {
      ...financial,
      spentToday: p.spent,
      impulseInterlockActive: p.interlock,
      cooldownRemaining: p.interlock ? 60 : 0,
    };
    setTelemetry(newTelem);
    setEmotion(newEmo);
    setFinancial(newFin);
    evaluateLifeEngine(newTelem, newEmo, newFin, p.msg);
    showToast('Life Scenario Loaded', p.msg);
    playBioChime(p.interlock ? 'alert' : 'positive');
  };

  // 3-Act Cinematic Demo Walkthrough (Meta Hackathon Idea Flow)
  const triggerCinematicAct = useCallback(
    (act: 1 | 2 | 3) => {
      setCinematicAct(act);
      if (act === 1) {
        // Act 1: Morning (Muse is tired, dim glow, gentle ramp)
        const t: TelemetryState = {
          semgUv: 74,
          sedentaryMins: 20,
          steps: 450,
          sleepHrs: 5.5,
          hrBpm: 82,
          mealHoursAgo: 0.5,
        };
        const em: EmotionState = {
          valence: -1.5,
          arousal: 5,
          currentMoodTag: 'Groggy & Somatically Strained',
          somaticAnxiety: 48,
          burnoutRisk: 38,
        };
        const fin: FinancialState = {
          ...financial,
          spentToday: 0,
          vaultSavings: 0,
          impulseInterlockActive: false,
          cooldownRemaining: 0,
        };
        setTelemetry(t);
        setEmotion(em);
        setFinancial(fin);
        setGrowthStage('sprout');
        setCoachXp(25);
        setMetaContract({
          mood: 'gentle',
          growth_stage: 'sprout',
          suggested_action: { category: 'movement', title: 'Take a 10-minute morning walk' },
          message:
            "Good morning. Rest was light (5.5 hrs), so we'll keep today gentle. How about 10 minutes outside and a clear spending limit?",
          reasons: ['sleep_debt_recovery', 'prevent_sedentary_buildup', 'progress_over_perfection'],
        });
        setCreatureDialogue(
          `"Good morning. Rest was light (5.5 hrs), so we'll keep today gentle. How about 10 minutes outside and a clear spending limit?"`
        );
        evaluateLifeEngine(t, em, fin, 'Cinematic Act 1: Morning · Gentle Reset');
        playBioChime('neutral');
        showToast('Act 1: Morning', 'Muse wakes gently in Sprout stage. No punishment—only compassionate micro-steps.');
      } else if (act === 2) {
        // Act 2: Afternoon (Small wins: walk, hydration, resisted purchase -> brightens)
        const t: TelemetryState = {
          semgUv: 38,
          sedentaryMins: 45,
          steps: 4800,
          sleepHrs: 5.5,
          hrBpm: 68,
          mealHoursAgo: 2.0,
        };
        const em: EmotionState = {
          valence: 2.5,
          arousal: 4,
          currentMoodTag: 'Lively & Grounded Win',
          somaticAnxiety: 22,
          burnoutRisk: 20,
        };
        const fin: FinancialState = {
          ...financial,
          spentToday: 35,
          vaultSavings: 50,
          impulseInterlockActive: false,
          cooldownRemaining: 0,
        };
        setTelemetry(t);
        setEmotion(em);
        setFinancial(fin);
        setGrowthStage('growing');
        setCoachXp(65);
        setMetaContract({
          mood: 'encouraging',
          growth_stage: 'growing',
          suggested_action: { category: 'hydration', title: 'Hydrate & celebrate impulse win' },
          message:
            'Look at that! Walk logged and you resisted an impulse checkout—$50 safely stashed into your vault. Muscle tension dropped to 38 µV.',
          reasons: ['impulse_resistance_success', 'micro_walk_completed', 'somatic_tension_down'],
        });
        setCreatureDialogue(
          `"Look at that! Walk logged and you resisted an impulse checkout—$50 safely stashed into your vault. Muscle tension dropped to 38 µV."`
        );
        evaluateLifeEngine(t, em, fin, 'Cinematic Act 2: Afternoon · Small Wins & Impulse Interlock Saved');
        playBioChime('coin');
        showToast('Act 2: Afternoon', 'Small wins celebrated! $50 diverted to Vault; companion perks up to Lively Growth.');
      } else {
        // Act 3: Evening (Muse thrives: goal met, growth stage unlocked, reflective wrap-up)
        const t: TelemetryState = {
          semgUv: 32,
          sedentaryMins: 25,
          steps: 8900,
          sleepHrs: 7.8,
          hrBpm: 62,
          mealHoursAgo: 1.5,
        };
        const em: EmotionState = {
          valence: 4.2,
          arousal: 3,
          currentMoodTag: 'Serene, Accomplished & Centered',
          somaticAnxiety: 10,
          burnoutRisk: 8,
        };
        const fin: FinancialState = {
          ...financial,
          spentToday: 52,
          vaultSavings: 50,
          impulseInterlockActive: false,
          cooldownRemaining: 0,
        };
        setTelemetry(t);
        setEmotion(em);
        setFinancial(fin);
        setGrowthStage('thriving');
        setCoachXp(95);
        setCoachStreak((prev) => Math.max(5, prev + 1));
        setMetaContract({
          mood: 'celebratory',
          growth_stage: 'thriving',
          suggested_action: { category: 'reflection', title: 'Log evening gratitude & set sleep boundary' },
          message:
            'A truly balanced day. Movement completed, budget preserved with $50 in your vault, and somatic calm sustained. Your companion is thriving!',
          reasons: ['all_pillars_in_harmony', 'growth_stage_unlocked', 'vault_savings_solid'],
        });
        setCreatureDialogue(
          `"A truly balanced day. Movement completed, budget preserved with $50 in your vault, and somatic calm sustained. Your companion is thriving!"`
        );
        evaluateLifeEngine(t, em, fin, 'Cinematic Act 3: Evening · Muse Thrives (Radiant Sovereign)');
        playBioChime('positive');
        showToast('Act 3: Evening', 'Stage 3 Radiant Sovereign unlocked! All 4 pillars celebrated.');
      }
    },
    [evaluateLifeEngine, financial, playBioChime, showToast]
  );

  const executeSuggestedAction = () => {
    if (cinematicAct === 1 || metaContract.growth_stage === 'sprout') {
      showToast('Action Completed!', 'Logged 10-minute walk (+1,500 steps) & unclenched forearm.');
      triggerCinematicAct(2);
    } else if (cinematicAct === 2 || metaContract.growth_stage === 'growing') {
      showToast('Action Completed!', 'Drank tall glass of water & diverted impulse savings to Vault.');
      triggerCinematicAct(3);
    } else {
      showToast('Reflection Completed!', 'Evening gratitude logged. Sleep boundary set for 10:30 PM.');
      playBioChime('coin');
    }
  };

  const toggleAutoPlayDemo = () => {
    if (isAutoPlayingActs) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      setIsAutoPlayingActs(false);
      setAutoPlayProgress(0);
      showToast('Story Paused', 'Cinematic walkthrough paused.');
      return;
    }

    setIsAutoPlayingActs(true);
    triggerCinematicAct(1);
    let step = 1;
    let timerTick = 0;
    const tickIntervalMs = 200;
    const durationPerStepMs = 5000;
    const totalTicks = durationPerStepMs / tickIntervalMs;

    autoPlayTimerRef.current = setInterval(() => {
      timerTick += 1;
      setAutoPlayProgress(Math.round((timerTick / totalTicks) * 100));

      if (timerTick >= totalTicks) {
        timerTick = 0;
        step += 1;
        if (step === 2) {
          triggerCinematicAct(2);
        } else if (step === 3) {
          triggerCinematicAct(3);
        } else {
          clearInterval(autoPlayTimerRef.current!);
          setIsAutoPlayingActs(false);
          setAutoPlayProgress(100);
          showToast('Cinematic Tour Complete', 'Judges have seen the full transformation from Sprout to Radiant Sovereign!');
          playBioChime('positive');
        }
      }
    }, tickIntervalMs);
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

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
      if (activeTab === 'main' || activeTab === 'mind_emotion') {
        const w = canvas.width;
        const h = canvas.height;
        // Crisp clinical light canvas grid
        ctx.fillStyle = '#F5F6F8';
        ctx.fillRect(0, 0, w, h);

        // Center baseline
        ctx.strokeStyle = 'rgba(14, 52, 77, 0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // Waveform
        const amp = Math.min(h * 0.44, (telemetry.semgUv / 180) * (h * 0.44));
        ctx.strokeStyle = telemetry.semgUv > 90 ? '#C23B32' : '#18587A';
        ctx.lineWidth = 2;
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

  const samSamples: Record<'salmon_bowl' | 'espresso_overload' | 'ergonomic_walk' | 'shopping_cart', SamSample> = {
    salmon_bowl: {
      title: 'Scene: Wild Salmon, Quinoa & Avocado Bowl',
      masks: [
        { label: 'mask_01: Wild Salmon Fillet (185g)', confidence: '98.4%', delta: '+24 Nourishment, +12 Energy', color: '#18587A' },
        { label: 'mask_02: Steamed Quinoa & Greens', confidence: '96.1%', delta: '+14 Activity Fuel', color: '#18587A' },
        { label: 'mask_03: Sliced Avocado (Healthy Lipids)', confidence: '95.8%', delta: '+8 Growth & Recovery', color: '#0E344D' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = { ...prev, mealHoursAgo: 0.5 };
          evaluateLifeEngine(next, emotion, financial, 'SAM 3.1 Meal Segmentation (Balanced Salmon Bowl)');
          return next;
        });
      },
    },
    espresso_overload: {
      title: 'Scene: Late-Night Triple Espresso & Desk Keyboard',
      masks: [
        { label: 'mask_01: Triple Espresso Cup (240mg Caffeine)', confidence: '97.9%', delta: '+18 Short-Term Energy, -16 Rest', color: '#18587A' },
        { label: 'mask_02: Wrist Isometric Keyboard Posture', confidence: '94.2%', delta: '+35 µV sEMG Tension Warning', color: '#C23B32' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = { ...prev, semgUv: 118, hrBpm: 96 };
          evaluateLifeEngine(next, emotion, financial, 'SAM 3.1 Desk & Caffeine Segmentation');
          return next;
        });
      },
    },
    ergonomic_walk: {
      title: 'Scene: Outdoor Park Trail & Hydration Bottle',
      masks: [
        { label: 'mask_01: Shaded Walking Trail Path', confidence: '99.1%', delta: 'Resets Sedentary Window to 0m', color: '#18587A' },
        { label: 'mask_02: 750ml Electrolyte Bottle', confidence: '96.7%', delta: '+15 Nourishment & Vitality', color: '#18587A' },
      ],
      apply: () => {
        setTelemetry((prev) => {
          const next = {
            ...prev,
            sedentaryMins: 0,
            steps: Math.min(15000, prev.steps + 2400),
            semgUv: 38,
          };
          evaluateLifeEngine(next, emotion, financial, 'SAM 3.1 Outdoor Recovery Walk Scan');
          return next;
        });
      },
    },
    shopping_cart: {
      title: 'Scene: Online Checkout Screen & High-Arousal Pulse',
      masks: [
        { label: 'mask_01: 1-Click Fast Checkout Cart ($89.00)', confidence: '98.8%', delta: 'Impulse Spending Hazard detected', color: '#C23B32' },
        { label: 'mask_02: Somatic Forearm Tension Pattern', confidence: '96.3%', delta: 'Engages 60s Bio-Interlock Guard', color: '#0E344D' },
      ],
      apply: () => {
        setFinancial((prev) => ({
          ...prev,
          impulseInterlockActive: true,
          cooldownRemaining: 60,
        }));
        appendLog('SAM 3.1 Visual Retail Grounding: Impulse Checkout Flagged -> Interlock Engaged', 'warn');
        playBioChime('alert');
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

    ctx.fillStyle = '#F5F6F8';
    ctx.fillRect(0, 0, w, h);

    // Subtle scientific coordinate grid
    ctx.strokeStyle = 'rgba(14, 52, 77, 0.08)';
    ctx.lineWidth = 1;
    for (let gx = 24; gx < w; gx += 32) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.stroke();
    }
    for (let gy = 24; gy < h; gy += 32) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    const sample = samSamples[samScene];
    const boxes = [
      { x: w * 0.12, y: h * 0.18, bw: w * 0.34, bh: h * 0.58 },
      { x: w * 0.52, y: h * 0.22, bw: w * 0.36, bh: h * 0.52 },
      { x: w * 0.32, y: h * 0.55, bw: w * 0.3, bh: h * 0.32 },
    ];

    sample.masks.forEach((m, idx) => {
      const b = boxes[idx % boxes.length];
      ctx.fillStyle = m.color + '20';
      ctx.strokeStyle = m.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.bw, b.bh, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0E344D';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(m.label, b.x + 8, b.y + 18);
    });
  }, [samScene]);

  useEffect(() => {
    if (activeTab === 'sam') {
      drawSamScene();
    }
  }, [activeTab, samScene, drawSamScene]);

  // Touch on Companion Totem
  const handleCreatureTouch = () => {
    playBioChime('positive');
    appendLog('User initiated physical touch on Muse Charm Totem -> Haptic feedback sent', 'info');
    rewardCoachingWin('Somatic Touch Comfort');
    showToast('Muse Charm Touched', 'Haptic comfort pulses returned through BLE wear band.');
  };

  // Reward Coaching Win (XP & Streak)
  const rewardCoachingWin = (actionLabel: string) => {
    setCoachXp((prev) => {
      const nextXp = prev + 15;
      if (nextXp >= 100) {
        showToast('Level Up!', 'Your Muse evolved to Stage 4: Sovereign Life Guardian!');
        playBioChime('coin');
      } else {
        showToast('Coaching Win!', `+15 Life XP for: ${actionLabel}`);
        playBioChime('positive');
      }
      return nextXp;
    });
    setCoachStreak((prev) => prev + 1);
  };

  // Impulse Cooldown Timer Effect
  useEffect(() => {
    if (financial.impulseInterlockActive && financial.cooldownRemaining > 0) {
      cooldownTimerRef.current = setInterval(() => {
        setFinancial((prev) => {
          if (prev.cooldownRemaining <= 1) {
            clearInterval(cooldownTimerRef.current!);
            return {
              ...prev,
              impulseInterlockActive: false,
              cooldownRemaining: 0,
            };
          }
          return { ...prev, cooldownRemaining: prev.cooldownRemaining - 1 };
        });
      }, 1000);
    }
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [financial.impulseInterlockActive, financial.cooldownRemaining]);

  // Guided Somatic Breathing Protocol
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
          semgUv: Math.max(34, Math.round(prev.semgUv * 0.7)),
          hrBpm: Math.max(62, Math.round(prev.hrBpm * 0.9)),
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
            semgUv: 36,
            hrBpm: 64,
            sleepHrs: fsmMode === 'DROWSY_RECOVERY' ? 8.0 : prev.sleepHrs,
            sedentaryMins: fsmMode === 'DEPLETED_NEGLECT' ? 10 : prev.sedentaryMins,
            mealHoursAgo: fsmMode === 'DEPLETED_NEGLECT' ? 1.0 : prev.mealHoursAgo,
          };
          const nextEmotion = {
            ...emotion,
            valence: Math.min(5.0, emotion.valence + 1.5),
            arousal: Math.max(3, emotion.arousal - 2),
            currentMoodTag: 'Centred & Grounded',
          };
          evaluateLifeEngine(next, nextEmotion, financial, 'Guided Bio-Coherence & Somatic Reset Completed');
          return next;
        });

        rewardCoachingWin('Guided Bio-Coherence Protocol');
      }
    }, 850);
  };

  // Handle Impulse Interlock Bank Action
  const handleBankImpulseSavings = (amount: number = 50) => {
    setFinancial((prev) => ({
      ...prev,
      impulseInterlockActive: false,
      cooldownRemaining: 0,
      vaultSavings: prev.vaultSavings + amount,
    }));
    setTelemetry((prev) => ({
      ...prev,
      semgUv: Math.max(36, prev.semgUv - 25),
      hrBpm: Math.max(65, prev.hrBpm - 8),
    }));
    playBioChime('coin');
    rewardCoachingWin(`Impulse Guard Win: Stashed $${amount} into Vault`);
    appendLog(`Impulse spending suppressed: $${amount} redirected to Emergency Vault Reserve.`, 'info');
  };

  // Add Expense Simulator
  const handleAddExpense = (title: string, amt: number, cat: ExpenseItem['category']) => {
    const isStressSpend = telemetry.semgUv > 75 || emotion.valence < 0;
    const stressTag = isStressSpend ? '⚠️ Biometric Stress Spike' : 'Mindful Expenditure';
    const newExp: ExpenseItem = {
      id: 'exp-' + Math.random().toString(36).substring(2, 7),
      title,
      amount: amt,
      category: cat,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      semgUv: telemetry.semgUv,
      hrBpm: telemetry.hrBpm,
      valence: emotion.valence,
      stressTag,
    };

    const nextFin: FinancialState = {
      ...financial,
      spentToday: financial.spentToday + amt,
    };

    setExpenses((prev) => [newExp, ...prev]);
    setFinancial(nextFin);
    evaluateLifeEngine(telemetry, emotion, nextFin, `Logged Expense: ${title} ($${amt.toFixed(2)})`);

    if (isStressSpend) {
      playBioChime('alert');
      showToast('Stress Spend Logged', `Recorded $${amt.toFixed(2)} under elevated somatic tension (${telemetry.semgUv} µV).`);
    } else {
      playBioChime('neutral');
      showToast('Expense Recorded', `$${amt.toFixed(2)} added to daily discretionary tracker.`);
    }
  };

  // Submit Journal Entry with AI Reframe
  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;

    const note = journalInput.trim();
    let reframe = '';

    if (coachPersona === 'stoic') {
      reframe = `Stoic Reframe: "You have power over your mind - not outside events. Realize this, and you will find strength." You can choose your response to this moment.`;
    } else if (coachPersona === 'sage') {
      reframe = `Empathetic Sage: "Honor what you are feeling without judgment. Breathe into this space; you are exactly where you need to be to grow."`;
    } else if (coachPersona === 'pragmatist') {
      reframe = `Pragmatic Directive: "Acknowledge the friction, break the next step down to 5 minutes, and take immediate decisive action."`;
    } else {
      reframe = `Biohacker Calibration: "This affective state reflects neurochemical signaling. Hydrate, take two physiological sighs, and reset the autonomic baseline."`;
    }

    const newEntry: JournalEntry = {
      id: 'j-' + Math.random().toString(36).substring(2, 7),
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moodTag: selectedMoodTag,
      valence: emotion.valence,
      text: note,
      coachReframe: reframe,
      persona: coachPersona,
    };

    setJournalEntries((prev) => [newEntry, ...prev]);
    setJournalInput('');
    rewardCoachingWin('Daily Emotional Journal & Reframing');
    playBioChime('positive');
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
      evaluateLifeEngine(nextTelem, emotion, financial, `Voice/Chat Check-in ("${text.slice(0, 32)}...")`);
    } else if (lower.includes('buy') || lower.includes('shop') || lower.includes('spend')) {
      showToast('Financial Coach Alert', 'Checking budget and somatic tone before confirming purchase intent.');
      if (telemetry.semgUv > 70) {
        setFinancial((prev) => ({ ...prev, impulseInterlockActive: true, cooldownRemaining: 60 }));
        playBioChime('alert');
      }
    } else if (lower.includes('tense') || lower.includes('stress') || lower.includes('tired')) {
      const nextTelem = { ...telemetry, semgUv: 125 };
      const nextEmo = { ...emotion, valence: Math.max(-5, emotion.valence - 1.5) };
      setTelemetry(nextTelem);
      setEmotion(nextEmo);
      evaluateLifeEngine(nextTelem, nextEmo, financial, `Voice/Chat Stress Report ("${text.slice(0, 32)}...")`);
    } else {
      appendLog(`muse-spark-1.3 dialogue response generated for: "${text.slice(0, 36)}"`, 'info');
      setCreatureDialogue(
        `"Listening to you closely. Your Life Engine is running in ${fsmMode} with ${vector.Energy}% Energy and $${Math.max(
          0,
          financial.dailyBudget - financial.spentToday
        ).toFixed(2)} budget intact. Let us stay centered."`
      );
    }
  };

  // SVG Totem styling based on mode
  const getCreatureVisuals = () => {
    switch (fsmMode) {
      case 'CONCERN_STRESS':
        return {
          stop1: '#D46A63',
          stop2: '#C23B32',
          mouthPath: 'M88 118 Q100 108 112 118',
          eyeRy: 12,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-[#C23B32]/15 blur-2xl pointer-events-none',
          directive: `anim: somatic_calming_breath (${telemetry.hrBpm} BPM -> 60 BPM)`,
          proteus: 'Proteus: Somatic Tension Mirror',
          stateBadgeClass: 'bg-[#FDF1F0] text-[#9E2A22] border-[#D4584E]/40',
        };
      case 'DEPLETED_NEGLECT':
        return {
          stop1: '#98A2A8',
          stop2: '#5D6870',
          mouthPath: 'M88 117 Q100 110 112 117',
          eyeRy: 6,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-[#5D6870]/18 blur-2xl pointer-events-none',
          directive: 'anim: sluggish_posture_dim_aura (Physical Fuel Low)',
          proteus: 'Proteus: Energy Depletion',
          stateBadgeClass: 'bg-[#F1F3F4] text-[#36454F] border-[#C6CED4]',
        };
      case 'DROWSY_RECOVERY':
        return {
          stop1: '#4E84A1',
          stop2: '#18587A',
          mouthPath: 'M92 114 Q100 116 108 114',
          eyeRy: 4,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-[#18587A]/16 blur-2xl pointer-events-none',
          directive: 'anim: cozy_hibernation_float (Rest Conservation)',
          proteus: 'Proteus: Circadian Recovery',
          stateBadgeClass: 'bg-[#E8F0F4] text-[#18587A] border-[#18587A]/40',
        };
      case 'HYPER_FOCUS':
        return {
          stop1: '#54A69A',
          stop2: '#18587A',
          mouthPath: 'M88 112 Q100 120 112 112',
          eyeRy: 11,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-[#18587A]/20 blur-2xl pointer-events-none',
          directive: 'anim: synchronized_flow_orbit (sEMG + Mind Balance)',
          proteus: 'Proteus: High Cognitive Flow',
          stateBadgeClass: 'bg-[#E8F0F4] text-[#0E344D] border-[#18587A]/40',
        };
      default:
        return {
          stop1: '#64B2A6',
          stop2: '#18587A',
          mouthPath: 'M86 110 Q100 124 114 110',
          eyeRy: 11,
          auraClass: 'aura-ring absolute w-44 h-44 rounded-full bg-[#18587A]/20 blur-2xl pointer-events-none',
          directive: `anim: gentle_levitation_pulse (${telemetry.hrBpm} BPM sync)`,
          proteus: 'Proteus: Whole-Life Vitality',
          stateBadgeClass: 'bg-[#E8EEF3] text-[#0E344D] border-[#18587A]/40',
        };
    }
  };

  const visuals = getCreatureVisuals();

  // Composite Holistic Score Calculation (0 - 100)
  const bodyScore = Math.round(
    Math.min(100, Math.max(10, (telemetry.sleepHrs / 8) * 40 + (telemetry.steps / 9000) * 35 + (180 - telemetry.semgUv) * 0.15))
  );
  const emotionScore = Math.round(Math.min(100, Math.max(10, 50 + emotion.valence * 7 - emotion.somaticAnxiety * 0.2)));
  const budgetRatio = financial.spentToday / Math.max(1, financial.dailyBudget);
  const wealthScore = Math.round(
    Math.min(100, Math.max(10, (1 - Math.min(1, budgetRatio)) * 60 + (financial.vaultSavings > 0 ? 25 : 10) + 15))
  );
  const growthScore = Math.min(100, Math.round(coachXp));
  const compositeLifeScore = Math.round((bodyScore + emotionScore + wealthScore + growthScore) / 4);

  // Idea Doc Principle: Separate Health and Wealth Dual Gauges
  const wellnessScore = Math.round(Math.min(100, Math.max(10, bodyScore * 0.55 + emotionScore * 0.45)));
  const financialProgressScore = wealthScore;

  // Outbound JSON Payload
  const outboundJsonPayload = JSON.stringify(
    {
      model: metaModel,
      enclave: 'muse-secure-vm://systemd-nspawn/user-enclave-01',
      life_coach_persona: coachPersona,
      holistic_composite_score: compositeLifeScore,
      pillars: {
        body: {
          semg_rms_uv: telemetry.semgUv,
          sedentary_window_mins: telemetry.sedentaryMins,
          daily_steps: telemetry.steps,
          sleep_duration_hrs: telemetry.sleepHrs,
          heart_rate_bpm: telemetry.hrBpm,
          hours_since_meal: telemetry.mealHoursAgo,
        },
        mind_and_emotion: {
          affective_valence: emotion.valence,
          affective_arousal: emotion.arousal,
          current_mood_tag: emotion.currentMoodTag,
          somatic_anxiety_index: emotion.somaticAnxiety,
          burnout_probability_pct: emotion.burnoutRisk,
        },
        wealth_and_financial: {
          daily_discretionary_budget_usd: financial.dailyBudget,
          spent_today_usd: financial.spentToday,
          remaining_budget_usd: Math.max(0, financial.dailyBudget - financial.spentToday),
          vault_savings_usd: financial.vaultSavings,
          monthly_runway_months: financial.runwayMonths,
          impulse_interlock_status: financial.impulseInterlockActive ? 'ENGAGED' : 'NOMINAL',
        },
      },
      life_engine_fsm: {
        deterministic_state: fsmMode,
        state_vector_8d: vector,
      },
      manifestation_target: {
        device: 'muse_charm_totem_v2',
        voice_model: 'muse-voice-transcribe-1.0',
        vision_grounding: 'sam-3.1',
      },
    },
    null,
    2
  );

  // Inbound Structured Response Contract (Idea Doc Specification)
  const structuredMetaResponseJson = JSON.stringify(
    {
      mood: metaContract.mood,
      growth_stage: growthStage,
      suggested_action: metaContract.suggested_action,
      message: metaContract.message,
      reasons: metaContract.reasons,
    },
    null,
    2
  );

  return (
    <div className="w-full bg-[#F5F6F8] text-[#0E344D] min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner Ribbon for Meta AI Hackathon & Medium Publication */}
      <section className="w-full bg-gradient-to-r from-[#ECEFF2] via-white to-[#E8EEF3] border-b border-[#D6DCE0] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('tech')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D6DCE0] text-xs font-['Space_Grotesk'] font-semibold text-[#0E344D] hover:text-[#0E344D] hover:border-[#18587A]/50 shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Tech</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#18587A]"></span>
              <span className="text-xs uppercase font-['Space_Grotesk'] tracking-widest text-[#0E344D] font-bold">
                Meta AI Global Hackathon Submission
              </span>
            </div>
            <span className="text-[#C6CED4] hidden sm:inline">|</span>
            <span className="text-xs text-[#36454F] font-medium">
              ZoeWave Project: Bio-Responsive Personal Life Coach
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="https://dev.meta.ai/events/global-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F0F4] hover:bg-[#DCE7EE] border border-[#18587A]/30 text-[#18587A] text-xs font-['Space_Grotesk'] font-semibold transition cursor-pointer"
            >
              <span>Meta AI Hackathon Event</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <a
              href="https://zoewave.medium.com/bio-responsive-digital-companion-1c1b36f2788c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F1F3F4] hover:bg-[#E4E8EB] border border-[#D6DCE0] text-[#0E344D] text-xs font-['Space_Grotesk'] font-semibold transition cursor-pointer"
            >
              <span>Medium Whitepaper</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Internal Navigation Sub-Bar & Coach Persona Switcher */}
      <nav className="sticky top-24 z-30 border-b border-[#D6DCE0] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0E344D] via-[#0284C7] to-[#2563EB] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[20px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#0E344D] font-['Space_Grotesk']">
                  Muse Charm · Personal Life Coach
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#FFF3E6] text-[#C26D2D] border border-[#FDBA74]">
                  Meta AI Hackathon
                </span>
              </div>
              <p className="text-xs text-[#5D6870]">
                4-Pillar Life Architecture: <span className="text-[#0284C7] font-semibold">Body (sEMG)</span> · <span className="text-[#1D4ED8] font-semibold">Emotion</span> · <span className="text-[#0369A1] font-semibold">Wealth (Impulse Guard)</span> · <span className="text-[#18587A] font-semibold">Purpose</span>
              </p>
            </div>
          </div>

          {/* Mode Tabs & Audio Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-lg bg-[#F1F3F4] p-1 border border-[#D6DCE0] flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('main')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'main'
                    ? 'bg-white text-[#0284C7] border border-[#0284C7]/45 shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">vital_signs</span>
                <span>Coach Cockpit</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mind_emotion')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'mind_emotion'
                    ? 'bg-white text-[#1D4ED8] border border-[#1D4ED8]/45 shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">mood</span>
                <span>Emotion &amp; Mind</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wealth')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'wealth'
                    ? 'bg-white text-[#0369A1] border border-[#0369A1]/45 shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">account_balance_wallet</span>
                <span>Wealth &amp; Impulse Guard</span>
                {financial.impulseInterlockActive && (
                  <span className="w-2 h-2 rounded-full bg-[#C23B32] animate-ping"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sam')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'sam'
                    ? 'bg-white text-[#18587A] border border-[#18587A]/45 shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">center_focus_strong</span>
                <span>SAM 3.1 Lab</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('arch')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'arch'
                    ? 'bg-white text-[#0E344D] border border-[#0E344D]/40 shadow-xs'
                    : 'text-[#36454F] hover:text-[#0E344D]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">hub</span>
                <span>Meta API &amp; Web Bridge</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextAudio = !audioEnabled;
                setAudioEnabled(nextAudio);
                if (nextAudio) playBioChime('neutral');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#F1F3F4] text-[#0E344D] border border-[#D6DCE0] flex items-center gap-1.5 transition cursor-pointer"
              title="Toggle Bio-Haptic Audio Synthesis"
            >
              <span className={`w-2 h-2 rounded-full ${audioEnabled ? 'bg-[#4ADE80]' : 'bg-[#98A2A8]'}`}></span>
              <span>{audioEnabled ? 'Chimes On' : 'Chimes Muted'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Impulse Guard Interlock Sticky Alarm Banner */}
      {financial.impulseInterlockActive && (
        <div className="w-full bg-gradient-to-r from-[#FDF1F0] via-white to-[#F1F3F4] border-b border-[#D4584E]/45 px-4 py-2.5 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-full bg-[#C23B32]/10 text-[#9E2A22] border border-[#D4584E]/40">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </span>
              <div>
                <p className="text-xs font-bold text-[#9E2A22] uppercase tracking-wider font-['Space_Grotesk']">
                  Impulse Guard Interlock Active · Retail Shopping Cooldown
                </p>
                <p className="text-[11px] text-[#36454F]">
                  Elevated somatic tension ({telemetry.semgUv} µV sEMG, {telemetry.hrBpm} BPM HR) detected during purchase intent. Prefrontal brake engaged ({financial.cooldownRemaining}s remaining).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBankImpulseSavings(50)}
                className="px-3 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Auto-Save $50 to Vault &amp; Unlock
              </button>
              <button
                type="button"
                onClick={startGuidedBreathing}
                className="px-3 py-1.5 rounded-lg bg-[#FDF1F0] hover:bg-[#FAE5E3] text-[#9E2A22] text-xs font-semibold border border-[#D4584E]/40 transition cursor-pointer"
              >
                15s Breathing Cooldown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-white/95 border border-[#0284C7]/50 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-start gap-2.5">
            <span className="mt-1 w-2 h-2 rounded-full bg-[#0284C7] shrink-0"></span>
            <div>
              <p className="text-xs font-bold text-[#0E344D]">{toast.title}</p>
              <p className="text-xs text-[#36454F] mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: LIVE COMPANION COCKPIT (HOLISTIC LIFE COACH) */}
      {activeTab === 'main' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow space-y-6">
          {/* Holistic Life Alignment Header Card */}
          <section className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                {/* Composite Score Square */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E0F2FE] via-[#DBEAFE] to-[#E8F0F4] border border-[#0284C7]/40 flex flex-col items-center justify-center shadow-xs shrink-0">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#0284C7] font-bold">ALIGNMENT</span>
                  <span className="text-2xl font-black font-['Space_Grotesk'] text-[#0E344D] tabular-nums">{compositeLifeScore}</span>
                  <span className="text-[10px] text-[#5D6870] font-mono">/100</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] font-['Space_Grotesk']">
                      Personal Life Coach Engine
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded-md bg-[#EAF7EE] text-[#2E7D5B] border border-[#86EFAC]/70 font-mono font-semibold">
                      Level {Math.floor(coachXp / 100) + 1} · {coachStreak} Day Streak
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0E344D] mt-1 font-['Space_Grotesk']">
                    Whole-Person Harmonizer: Body, Mind &amp; Wealth
                  </h2>
                  <p className="text-xs text-[#36454F] mt-1 max-w-2xl leading-relaxed">
                    Muse Charm monitors neuromuscular strain (<code className="text-[#0E344D] font-mono font-semibold">{telemetry.semgUv} µV</code>), emotional valence (<code className="text-[#18587A] font-mono font-semibold">{emotion.valence > 0 ? '+' : ''}{emotion.valence.toFixed(1)}</code>), and daily financial velocity (<code className="text-[#0E344D] font-mono font-semibold">${financial.spentToday.toFixed(0)} / ${financial.dailyBudget}</code>) to provide holistic grounding interventions.
                  </p>
                </div>
              </div>

              {/* 4 Pillars Mini-Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
                <div className="p-2.5 rounded-xl bg-[#F3F6F6] border border-[#18587A]/30 flex flex-col">
                  <span className="text-[10px] text-[#5D6870] uppercase font-mono flex items-center justify-between">
                    <span>Body</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18587A]"></span>
                  </span>
                  <span className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk'] mt-0.5 tabular-nums">{bodyScore}%</span>
                  <span className="text-[10px] text-[#5D6870] font-mono">{telemetry.semgUv} µV · {telemetry.sleepHrs}h</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EFF4F7] border border-[#18587A]/30 flex flex-col">
                  <span className="text-[10px] text-[#5D6870] uppercase font-mono flex items-center justify-between">
                    <span>Emotion</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18587A]"></span>
                  </span>
                  <span className="text-sm font-bold text-[#18587A] font-['Space_Grotesk'] mt-0.5 tabular-nums">{emotionScore}%</span>
                  <span className="text-[10px] text-[#5D6870] font-mono">{emotion.valence > 0 ? '+' : ''}{emotion.valence.toFixed(1)} Val</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F1F3F4] border border-[#0E344D]/20 flex flex-col">
                  <span className="text-[10px] text-[#5D6870] uppercase font-mono flex items-center justify-between">
                    <span>Wealth</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E344D]"></span>
                  </span>
                  <span className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk'] mt-0.5 tabular-nums">{wealthScore}%</span>
                  <span className="text-[10px] text-[#5D6870] font-mono">${(financial.dailyBudget - financial.spentToday).toFixed(0)} left</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#E8EEF3] border border-[#18587A]/35 flex flex-col">
                  <span className="text-[10px] text-[#5D6870] uppercase font-mono flex items-center justify-between">
                    <span>Growth</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E344D]"></span>
                  </span>
                  <span className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk'] mt-0.5 tabular-nums">{coachXp} XP</span>
                  <span className="text-[10px] text-[#5D6870] font-mono">Stage: {growthStage}</span>
                </div>
              </div>
            </div>

            {/* Persona Selector Row */}
            <div className="mt-4 pt-3 border-t border-[#E4E8EB] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#36454F] font-medium">Active Life Coach Persona:</span>
                <div className="inline-flex rounded-lg bg-[#F1F3F4] p-1 border border-[#D6DCE0] flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setCoachPersona('stoic');
                      playBioChime('neutral');
                      showToast('Persona: Mindful Stoic', 'Focusing on internal agency, emotional temperance & rational action.');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                      coachPersona === 'stoic'
                        ? 'bg-[#0E344D] text-white shadow-xs'
                        : 'text-[#36454F] hover:text-[#0E344D]'
                    }`}
                  >
                    Mindful Stoic
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCoachPersona('sage');
                      playBioChime('neutral');
                      showToast('Persona: Empathetic Sage', 'Focusing on somatic warmth, self-compassion & breathing.');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                      coachPersona === 'sage'
                        ? 'bg-[#0E344D] text-white shadow-xs'
                        : 'text-[#36454F] hover:text-[#0E344D]'
                    }`}
                  >
                    Empathetic Sage
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCoachPersona('pragmatist');
                      playBioChime('neutral');
                      showToast('Persona: Direct Pragmatist', 'Focusing on ruthless execution, budget discipline & action.');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                      coachPersona === 'pragmatist'
                        ? 'bg-[#18587A] text-white shadow-xs'
                        : 'text-[#36454F] hover:text-[#0E344D]'
                    }`}
                  >
                    Direct Pragmatist
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCoachPersona('biohacker');
                      playBioChime('neutral');
                      showToast('Persona: Biohacker', 'Focusing on autonomic pacing, HRV & metabolic fuel optimization.');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                      coachPersona === 'biohacker'
                        ? 'bg-[#18587A] text-white shadow-xs'
                        : 'text-[#36454F] hover:text-[#0E344D]'
                    }`}
                  >
                    Biohacker Optimizer
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-[#5D6870] font-mono">SCENARIOS:</span>
                <button
                  type="button"
                  onClick={() => applyPreset('optimal_flow')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#E8EEF3] hover:bg-[#DCE5EC] text-[#0E344D] border border-[#18587A]/40 transition cursor-pointer"
                >
                  1. Optimal Flow
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('sedentary_impulse')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#F1F3F4] hover:bg-[#E4E8EB] text-[#0E344D] border border-[#D6DCE0] transition cursor-pointer"
                >
                  2. Sedentary Impulse
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('semg_stress')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#FDF1F0] hover:bg-[#FAE5E3] text-[#9E2A22] border border-[#D4584E]/40 transition cursor-pointer"
                >
                  3. sEMG Clench
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('sleep_debt')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#E8F0F4] hover:bg-[#DCE7EE] text-[#18587A] border border-[#18587A]/40 transition cursor-pointer"
                >
                  4. Sleep Debt
                </button>
              </div>
            </div>
          </section>

          {/* 3-ACT CINEMATIC HACKATHON TOUR CARD */}
          <section className="rounded-2xl bg-gradient-to-br from-[#F1F7F6] via-white to-[#EFF4F7] border border-[#18587A]/40 p-5 shadow-sm relative overflow-hidden">
            {/* Top tag & Auto-Play button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#D6DCE0] pb-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-[#E8EEF3] text-[#0E344D] border border-[#18587A]/30">
                  <span className="material-symbols-outlined text-[20px]">movie</span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-['Space_Grotesk'] tracking-widest text-[#18587A] font-bold">
                      Meta AI Hackathon Presentation Flow
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded-md bg-[#E8EEF3] text-[#0E344D] border border-[#18587A]/30 font-mono font-semibold">
                      Judges Demo Mode
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">
                    &ldquo;Your Life, Growing With You&rdquo; · 3-Act Cinematic Story Tour
                  </h3>
                </div>
              </div>

              {/* Auto Play story button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAutoPlayDemo}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                    isAutoPlayingActs
                      ? 'bg-[#18587A] text-white'
                      : 'bg-gradient-to-r from-[#0E344D] to-[#18587A] hover:from-[#0A283D] hover:to-[#11425C] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isAutoPlayingActs ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isAutoPlayingActs ? `Story Playing (${autoPlayProgress}%)` : 'Auto-Play 3-Act Tour'}</span>
                </button>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {/* Act 1 */}
              <button
                type="button"
                onClick={() => triggerCinematicAct(1)}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  cinematicAct === 1
                    ? 'bg-[#F1F3F4] border-[#0E344D] shadow-xs ring-1 ring-[#0E344D]/30'
                    : 'bg-white border-[#D6DCE0] hover:border-[#18587A]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase font-['Space_Grotesk'] text-[#0E344D]">
                      Act 1 · Morning
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E4E8EB] text-[#0E344D] font-semibold">
                      🌱 Sprout
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0E344D] mt-1">Gentle Awakening (Light Sleep)</h4>
                  <p className="text-xs text-[#36454F] mt-1">
                    5.5h sleep, morning cortisol clench (74 µV). Muse offers gentle reset without punishment.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-[#5D6870] font-semibold">
                  Focus: Controllable micro-action
                </div>
              </button>

              {/* Act 2 */}
              <button
                type="button"
                onClick={() => triggerCinematicAct(2)}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  cinematicAct === 2
                    ? 'bg-[#E8EEF3] border-[#18587A] shadow-xs ring-1 ring-[#18587A]/50'
                    : 'bg-white border-[#D6DCE0] hover:border-[#18587A]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase font-['Space_Grotesk'] text-[#0E344D]">
                      Act 2 · Afternoon
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#DCE5EC] text-[#0E344D] font-semibold">
                      🌿 Growing
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0E344D] mt-1">Small Wins &amp; Impulse Diverted</h4>
                  <p className="text-xs text-[#36454F] mt-1">
                    10m walk logged, $50 impulse stopped &amp; saved into Vault. Tension drops to 38 µV.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-[#0E344D] font-semibold">
                  Focus: Impulse Guard + Hydration
                </div>
              </button>

              {/* Act 3 */}
              <button
                type="button"
                onClick={() => triggerCinematicAct(3)}
                className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  cinematicAct === 3
                    ? 'bg-[#E8F0F4] border-[#18587A] shadow-xs ring-1 ring-[#18587A]/50'
                    : 'bg-white border-[#D6DCE0] hover:border-[#18587A]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase font-['Space_Grotesk'] text-[#18587A]">
                      Act 3 · Evening
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#DCE7EE] text-[#18587A] font-semibold">
                      ✨ Thriving
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0E344D] mt-1">Radiant Sovereign (Harmony)</h4>
                  <p className="text-xs text-[#36454F] mt-1">
                    8,900 steps, $52 daily spend (within limit), reflection done. Radiant stage unlocked!
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-[#18587A] font-semibold">
                  Focus: Whole-life alignment
                </div>
              </button>
            </div>

            {/* Live Story Narrative & Interactive Next Action Card */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#D6DCE0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#18587A]"></span>
                  <span className="text-xs font-bold text-[#0E344D] uppercase tracking-wider font-['Space_Grotesk']">
                    Meta Model API Guidance · {metaContract.mood.toUpperCase()}
                  </span>
                  <span className="text-[#C6CED4] text-xs">|</span>
                  <span className="text-xs text-[#5D6870] font-mono">Stage: {growthStage.toUpperCase()}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#0E344D] font-medium leading-relaxed">
                  &ldquo;{metaContract.message}&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] text-[#5D6870] font-mono">REASONS:</span>
                  {metaContract.reasons.map((r, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#F1F3F4] border border-[#D6DCE0] text-[#36454F] font-mono">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={executeSuggestedAction}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#18587A] hover:bg-[#124460] text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>Execute Suggested Action: {metaContract.suggested_action.title}</span>
                </button>
              </div>
            </div>
          </section>

          {/* DUAL-GAUGE WHOLE-PERSON BALANCE: HEALTH SIGNALS VS. FINANCIAL DISCIPLINE */}
          <section className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E4E8EB] pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0E344D] font-['Space_Grotesk']">
                    Idea Doc Specification · Dual-Dial Architecture
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F1F3F4] text-[#36454F] border border-[#D6DCE0]">
                    Synthetic Data Prototype
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">
                  Separating Health &amp; Wealth: Independent Multi-Dimensional Gauges
                </h3>
              </div>
              <p className="text-[11px] text-[#5D6870] max-w-md">
                <strong className="text-[#0E344D]">Hackathon Core Philosophy:</strong> Avoid a single lumped score that conflates health with wealth. Stressful physical days receive somatic compassion without financial penalty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Dial 1: Health & Somatic Signals */}
              <div className="rounded-xl bg-[#F3F6F6] border border-[#18587A]/30 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18587A] uppercase tracking-wider font-['Space_Grotesk'] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#18587A]">ecg_heart</span>
                      <span>Physical &amp; Emotional Wellness Signal</span>
                    </span>
                    <span className="text-lg font-black text-[#0E344D] font-['Space_Grotesk'] tabular-nums">{wellnessScore}/100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white overflow-hidden border border-[#D6DCE0] mt-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#18587A] to-[#18587A] transition-all duration-300"
                      style={{ width: `${wellnessScore}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">Sleep Sync</span>
                      <span className="font-bold text-[#0E344D] tabular-nums">{telemetry.sleepHrs} hrs</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">sEMG Calm</span>
                      <span className="font-bold text-[#0E344D] tabular-nums">{telemetry.semgUv} µV</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">Movement</span>
                      <span className="font-bold text-[#0E344D] tabular-nums">{telemetry.steps.toLocaleString()} steps</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#5D6870] mt-3 pt-2 border-t border-[#E4E8EB]">
                  Focuses strictly on restorative sleep, autonomic sEMG balance, and daily kinetic movement.
                </p>
              </div>

              {/* Dial 2: Financial Discipline & Awareness */}
              <div className="rounded-xl bg-[#EEF4F7] border border-[#18587A]/30 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18587A] uppercase tracking-wider font-['Space_Grotesk'] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#18587A]">savings</span>
                      <span>Financial Awareness &amp; Goal Progress</span>
                    </span>
                    <span className="text-lg font-black text-[#0E344D] font-['Space_Grotesk'] tabular-nums">{financialProgressScore}/100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white overflow-hidden border border-[#D6DCE0] mt-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#18587A] to-[#18587A] transition-all duration-300"
                      style={{ width: `${financialProgressScore}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">Daily Cap</span>
                      <span className="font-bold text-[#0E344D] tabular-nums">${financial.dailyBudget}</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">Spent Today</span>
                      <span className={`font-bold tabular-nums ${financial.spentToday > financial.dailyBudget ? 'text-[#9E2A22]' : 'text-[#18587A]'}`}>
                        ${financial.spentToday.toFixed(0)}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-white border border-[#D6DCE0]">
                      <span className="text-[10px] text-[#5D6870] block font-mono">Vault Stash</span>
                      <span className="font-bold text-[#0E344D] tabular-nums">${financial.vaultSavings.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#5D6870] mt-3 pt-2 border-t border-[#D6DCE0]">
                  Focuses strictly on mindful budget pacing, impulse restraint, and accumulated emergency reserves.
                </p>
              </div>
            </div>
          </section>

          {/* Tripartite Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LAYER 1: THE BODY */}
            <section className="lg:col-span-4 rounded-2xl bg-white border border-[#D6DCE0] p-4 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#E4E8EB] pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E344D] font-['Space_Grotesk']">
                      Layer 1 · The Body
                    </span>
                    <h3 className="text-sm font-bold text-[#0E344D] mt-0.5">Biosignals &amp; Wearable Telemetry</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTelemetry((prev) => {
                        const next = { ...prev, steps: Math.min(15000, prev.steps + 650) };
                        evaluateLifeEngine(next, emotion, financial, 'Google Health Sync (+650 steps)');
                        return next;
                      });
                      showToast('Google Health Synced', 'Updated steps and optical HR via Android Health Connect bridge.');
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#E8F0F4] hover:bg-[#DCE7EE] text-[#18587A] border border-[#18587A]/30 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                    <span>Sync Health</span>
                  </button>
                </div>

                {/* Live sEMG Oscilloscope Canvas */}
                <div className="mt-3 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#0E344D]">Neural Band sEMG (5–250 Hz RMS)</span>
                    <span className={`font-mono font-semibold ${telemetry.semgUv > 90 ? 'text-[#9E2A22]' : 'text-[#0E344D]'}`}>
                      {telemetry.semgUv} µV RMS · {telemetry.semgUv > 90 ? 'Isometric Clench' : telemetry.semgUv > 55 ? 'Active Typing' : 'Relaxed Baseline'}
                    </span>
                  </div>
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-[#F5F6F8] border border-[#E4E8EB]">
                    <canvas ref={semgCanvasRef} className="w-full h-full block" />
                  </div>
                </div>

                {/* Telemetry Sliders */}
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-[#36454F] font-medium">Wrist sEMG Muscle Activation</label>
                      <span className="font-mono text-[#0E344D] font-semibold tabular-nums">{telemetry.semgUv} µV</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="180"
                      value={telemetry.semgUv}
                      onChange={(e) => handleTelemetryChange('semgUv', Number(e.target.value), 'Wrist sEMG Adjusted')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-[#36454F] font-medium">Continuous Sedentary Window</label>
                      <span className="font-mono text-[#18587A] font-semibold tabular-nums">{telemetry.sedentaryMins} min</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={telemetry.sedentaryMins}
                      onChange={(e) => handleTelemetryChange('sedentaryMins', Number(e.target.value), 'Sedentary Timer Adjusted')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-[#36454F] font-medium">Daily Google Health Steps</label>
                      <span className="font-mono text-[#0E344D] font-semibold tabular-nums">{telemetry.steps.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="15000"
                      step="100"
                      value={telemetry.steps}
                      onChange={(e) => handleTelemetryChange('steps', Number(e.target.value), 'Steps Updated')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-[#36454F] font-medium">Sleep Duration</label>
                      <span className="font-mono text-[#18587A] font-semibold tabular-nums">{telemetry.sleepHrs.toFixed(1)} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="10.0"
                      step="0.1"
                      value={telemetry.sleepHrs}
                      onChange={(e) => handleTelemetryChange('sleepHrs', parseFloat(e.target.value), 'Sleep Stage Updated')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label className="text-[#36454F] font-medium">Heart Rate</label>
                      <span className={`font-mono font-semibold tabular-nums ${telemetry.hrBpm > 100 ? 'text-[#9E2A22]' : 'text-[#0E344D]'}`}>{telemetry.hrBpm} BPM</span>
                    </div>
                    <input
                      type="range"
                      min="52"
                      max="145"
                      value={telemetry.hrBpm}
                      onChange={(e) => handleTelemetryChange('hrBpm', Number(e.target.value), 'Heart Rate Updated')}
                      className="w-full accent-[#0E344D] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Bluetooth & SAM Fast Action Footer */}
              <div className="pt-3 border-t border-[#E4E8EB] flex items-center justify-between gap-2">
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
                    handleTelemetryChange('hrBpm', 70, 'Web Bluetooth BLE Sensor Paired');
                    showToast('BLE Paired', 'Live GATT optical HR (70 BPM) and sEMG streaming.');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F1F3F4] hover:bg-[#E4E8EB] text-[#0E344D] border border-[#D6DCE0] transition cursor-pointer"
                >
                  Pair Web BLE
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('sam');
                    showToast('SAM 3.1 Lab', 'Segmenting nutritional or desk posture scans.');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E8EEF3] hover:bg-[#DCE5EC] text-[#0E344D] border border-[#18587A]/30 transition cursor-pointer"
                >
                  SAM 3.1 Vision Scan
                </button>
              </div>
            </section>

            {/* LAYER 2: THE LIFE ENGINE (Deterministic FSM + Causal Logs) */}
            <section className="lg:col-span-4 rounded-2xl bg-white border border-[#D6DCE0] p-4 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#E4E8EB] pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                      Layer 2 · The Life Engine
                    </span>
                    <h3 className="text-sm font-bold text-[#0E344D] mt-0.5">8-Stat Deterministic State Machine</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${visuals.stateBadgeClass}`}>
                    {fsmMode}
                  </span>
                </div>

                {/* 8-Dimensional State Vector */}
                <div className="mt-3.5 space-y-2">
                  {(
                    [
                      { key: 'Happiness', gradient: 'from-[#18587A] to-[#18587A]' },
                      { key: 'Energy', gradient: 'from-[#18587A] to-[#0E344D]' },
                      { key: 'Nourishment', gradient: 'from-[#18587A] to-[#18587A]' },
                      { key: 'Rest', gradient: 'from-[#18587A] to-[#0E344D]' },
                      { key: 'Activity', gradient: 'from-[#18587A] to-[#0E344D]' },
                      { key: 'Engagement', gradient: 'from-[#18587A] to-[#18587A]' },
                      { key: 'Growth', gradient: 'from-[#0E344D] to-[#18587A]' },
                      { key: 'Relationship', gradient: 'from-[#0E344D] to-[#18587A]' },
                    ] as const
                  ).map(({ key, gradient }) => {
                    const val = vector[key];
                    const isLow = val < 48;
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#36454F] font-medium">{key}</span>
                          <span className={`font-mono tabular-nums ${isLow ? 'text-[#9E2A22] font-bold' : 'text-[#0E344D] font-semibold'}`}>
                            {val}/100
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#F1F3F4] overflow-hidden border border-[#D6DCE0]">
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
                    <span className="text-xs font-semibold text-[#0E344D] font-['Space_Grotesk']">
                      Deterministic Event Log
                    </span>
                    <span className="text-[11px] text-[#5D6870] font-mono">systemd-nspawn Enclave</span>
                  </div>
                  <div className="h-28 overflow-y-auto rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-2.5 space-y-1.5 text-xs font-mono">
                    {causalLogs.map((item) => {
                      const color =
                        item.level === 'warn'
                          ? 'text-[#18587A]'
                          : item.level === 'crit'
                          ? 'text-[#9E2A22]'
                          : 'text-[#0E344D]';
                      return (
                        <div key={item.id} className="flex items-start gap-2 border-b border-[#E4E8EB] pb-1">
                          <span className="text-[#5D6870] shrink-0">[{item.ts}]</span>
                          <span className={color}>{item.msg}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Muse Wonder 1M-Context Synthesis */}
              <div className="rounded-xl bg-[#E8F0F4]/70 border border-[#18587A]/30 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                    Muse Wonder 1.0 · 1M Context Synthesis
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playBioChime('positive');
                      setWonderText(
                        `Muse Wonder 1.0 (Synthesized 30-Day Longitudinal Horizon): Biomarkers, emotional journal trends, and financial velocity converge into an overall 84% life alignment score. Micro-habit compliance is +18% higher when resting wrist sEMG is kept below 45 µV.`
                      );
                      showToast('Wonder 1M Run', 'Synthesized 30-day longitudinal correlation matrix.');
                    }}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white hover:bg-[#DCE7EE] text-[#18587A] border border-[#18587A]/30 transition cursor-pointer"
                  >
                    Run 30d Synthesis
                  </button>
                </div>
                <p className="text-xs text-[#0E344D] mt-1.5 leading-relaxed">{wonderText}</p>
              </div>
            </section>

            {/* LAYER 3: THE CREATURE & ACTIVE LIFE COACH */}
            <section className="lg:col-span-4 rounded-2xl bg-white border border-[#D6DCE0] p-4 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#E4E8EB] pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E344D] font-['Space_Grotesk']">
                      Layer 3 · Digital Totem &amp; Coach
                    </span>
                    <h3 className="text-sm font-bold text-[#0E344D] mt-0.5">Muse Charm Life Companion</h3>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[#E8F0F4] text-[#0E344D] border border-[#18587A]/30 font-mono">
                    {coachPersona.toUpperCase()} COACH
                  </span>
                </div>

                {/* Growth Stage Selector & Totem Display */}
                <div className="mt-3 relative rounded-2xl bg-gradient-to-b from-[#EEF6F5] via-white to-[#EEF4F7] border border-[#D6DCE0] p-4 flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
                  <div className={visuals.auraClass}></div>

                  <div className="relative z-10 w-full flex items-center justify-between text-[11px] text-[#5D6870] mb-1.5 flex-wrap gap-1">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#18587A]"></span>
                      <span className="text-[#0E344D] font-semibold">MUSE OS v2.4</span>
                    </div>

                    {/* Growth Stage Manual Selector */}
                    <div className="inline-flex rounded-md bg-white p-0.5 border border-[#D6DCE0] text-[10px] font-mono shadow-2xs">
                      <button
                        type="button"
                        onClick={() => {
                          setGrowthStage('sprout');
                          playBioChime('neutral');
                        }}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                          growthStage === 'sprout' ? 'bg-[#F1F3F4] text-[#0E344D] font-bold' : 'text-[#5D6870]'
                        }`}
                      >
                        🌱 Sprout
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setGrowthStage('growing');
                          playBioChime('positive');
                        }}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                          growthStage === 'growing' ? 'bg-[#E8EEF3] text-[#0E344D] font-bold' : 'text-[#5D6870]'
                        }`}
                      >
                        🌿 Growing
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setGrowthStage('thriving');
                          playBioChime('coin');
                        }}
                        className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                          growthStage === 'thriving' ? 'bg-[#E8F0F4] text-[#18587A] font-bold' : 'text-[#5D6870]'
                        }`}
                      >
                        ✨ Thriving
                      </button>
                    </div>
                  </div>

                  {/* Interactive SVG Companion */}
                  <div
                    onClick={handleCreatureTouch}
                    className="relative z-10 cursor-pointer creature-float my-2 select-none group"
                    title="Tap to exchange bio-haptic pulse with your companion"
                  >
                    <svg className="w-36 h-36 transition-transform group-hover:scale-105" viewBox="0 0 200 200" fill="none">
                      <circle cx="100" cy="100" r="76" stroke="#18587A" strokeWidth="2" strokeDasharray="6 6" opacity="0.45" />
                      
                      {/* Growth Stage 3: Crown Halo & Star Particles */}
                      {growthStage === 'thriving' && (
                        <g>
                          <ellipse cx="100" cy="24" rx="34" ry="8" fill="none" stroke="#18587A" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.9" />
                          <polygon points="100,10 103,18 112,19 105,25 107,33 100,28 93,33 95,25 88,19 97,18" fill="#18587A" stroke="#0E344D" strokeWidth="1" />
                          <circle cx="56" cy="38" r="3" fill="#18587A" />
                          <circle cx="144" cy="38" r="3" fill="#18587A" />
                          <circle cx="100" cy="100" r="84" stroke="#18587A" strokeWidth="1.5" opacity="0.55" strokeDasharray="3 3" />
                        </g>
                      )}

                      {/* Growth Stage 2: Twin Leafy Antenna Sprouts */}
                      {growthStage === 'growing' && (
                        <g>
                          <path d="M96 38 C84 18, 68 22, 72 14 C84 17, 94 26, 98 38 Z" fill="#18587A" stroke="#0E344D" strokeWidth="1.2" />
                          <path d="M104 38 C116 18, 132 22, 128 14 C116 17, 106 26, 102 38 Z" fill="#18587A" stroke="#0E344D" strokeWidth="1.2" />
                        </g>
                      )}

                      {/* Growth Stage 1: Gentle Single Leaf Sprout Bud */}
                      {growthStage === 'sprout' && (
                        <g>
                          <path d="M100 38 C94 22, 105 14, 107 12 C103 22, 108 30, 101 38 Z" fill="#18587A" stroke="#0E344D" strokeWidth="1.5" />
                          <circle cx="106" cy="12" r="2.5" fill="#18587A" />
                        </g>
                      )}

                      <path d="M62 58 C45 25, 30 45, 52 74" fill="#18587A" opacity="0.88" />
                      <path d="M138 58 C155 25, 170 45, 148 74" fill="#18587A" opacity="0.88" />
                      <path
                        d="M100 38 C142 38, 164 68, 160 112 C156 150, 132 168, 100 168 C68 168, 44 150, 40 112 C36 68, 58 38, 100 38 Z"
                        fill="url(#creatureGradDynamicCockpit)"
                        stroke={growthStage === 'thriving' ? '#0E344D' : '#18587A'}
                        strokeWidth="3"
                      />
                      <circle cx="100" cy="128" r="14" fill="#FFFFFF" opacity="0.55" />
                      <ellipse cx="78" cy="92" rx="9" ry={visuals.eyeRy} fill="#0E344D" />
                      <ellipse cx="122" cy="92" rx="9" ry={visuals.eyeRy} fill="#0E344D" />
                      <circle cx="75" cy="88" r="3.5" fill="#FFFFFF" />
                      <circle cx="119" cy="88" r="3.5" fill="#FFFFFF" />
                      
                      {/* Starlight pupil glint in Thriving stage */}
                      {growthStage === 'thriving' && (
                        <>
                          <circle cx="80" cy="94" r="1.8" fill="#8EB4CB" />
                          <circle cx="124" cy="94" r="1.8" fill="#8EB4CB" />
                        </>
                      )}

                      <path d={visuals.mouthPath} stroke="#0E344D" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <ellipse cx="63" cy="104" rx="7" ry="4" fill="#4E84A1" opacity="0.45" />
                      <ellipse cx="137" cy="104" rx="7" ry="4" fill="#4E84A1" opacity="0.45" />
                      <defs>
                        <radialGradient id="creatureGradDynamicCockpit" cx="50%" cy="35%" r="65%">
                          <stop offset="0%" stopColor={growthStage === 'thriving' ? '#8EB4CB' : visuals.stop1} />
                          <stop offset="65%" stopColor={visuals.stop2} />
                          <stop offset="100%" stopColor="#0E344D" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  <span className="relative z-10 px-2.5 py-0.5 rounded-md bg-white/95 border border-[#D6DCE0] text-[11px] font-mono text-[#0E344D] font-semibold shadow-2xs">
                    Growth: {growthStage.toUpperCase()} · {visuals.directive}
                  </span>
                </div>

                {/* Coach Dialogue Bubble */}
                <div className="mt-3 rounded-xl bg-[#F3F6F6] border border-[#D6DCE0] p-3">
                  <div className="flex items-center justify-between text-[11px] text-[#5D6870] mb-1">
                    <span className="font-semibold text-[#18587A] font-['Space_Grotesk']">
                      muse-spark-1.3 · {coachPersona === 'stoic' ? 'Stoic Mentor' : coachPersona === 'sage' ? 'Empathetic Sage' : coachPersona === 'pragmatist' ? 'Direct Strategist' : 'Biohacker Engine'}
                    </span>
                    <span className="font-mono text-[#18587A] font-semibold">
                      Streak: {coachStreak} Wins · {coachXp} XP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0E344D] leading-relaxed font-medium">
                    {creatureDialogue}
                  </p>
                </div>

                {/* Breathing Guidance Session */}
                {isGuidedActive && (
                  <div className="mt-2.5 rounded-lg bg-[#E8EEF3] border border-[#18587A]/50 p-2.5 shadow-xs">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#0E344D]">{guidedStepLabel}</span>
                      <span className="font-mono text-[#0E344D] font-bold">{guidedRemaining}s</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#18587A] to-[#18587A] transition-all duration-300"
                        style={{ width: `${Math.round(((6 - guidedRemaining) / 6) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Quick Life Coaching Interventions */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={startGuidedBreathing}
                    className="col-span-2 py-2 px-3 rounded-lg text-xs font-bold bg-[#18587A] hover:bg-[#124460] text-white transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">air</span>
                    <span>15s Guided Somatic Bio-Coherence Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTelemetry((prev) => {
                        const next = {
                          ...prev,
                          sedentaryMins: 0,
                          steps: Math.min(15000, prev.steps + 600),
                          semgUv: Math.min(48, prev.semgUv),
                        };
                        evaluateLifeEngine(next, emotion, financial, '5-Min Movement Break (+600 steps)');
                        return next;
                      });
                      rewardCoachingWin('5-Min Movement Walk');
                    }}
                    className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#E8F0F4] hover:bg-[#DCE7EE] text-[#18587A] border border-[#18587A]/30 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">directions_walk</span>
                    <span>5m Walk (+600 steps)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('wealth');
                      showToast('Impulse Guard Lab', 'Review budget runway, impulse interlock, and log expenses.');
                    }}
                    className="py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-[#F1F3F4] hover:bg-[#E4E8EB] text-[#0E344D] border border-[#D6DCE0] transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">savings</span>
                    <span>Impulse Guard ($50 Vault)</span>
                  </button>
                </div>
              </div>

              {/* Voice / Text Check-in */}
              <div className="pt-2 border-t border-[#E4E8EB]">
                <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const voiceSamples = [
                        'I feel tense from staring at screens all morning.',
                        'I almost bought a $90 jacket online, can you help me cool off?',
                        'How are my holistic life alignment stats today?',
                        'I just took a 20-minute walk outside and drank 500ml water.',
                      ];
                      const s = voiceSamples[Math.floor(Math.random() * voiceSamples.length)];
                      setChatMessage(s);
                      showToast('Voice Transcribed', `"${s}"`);
                    }}
                    className="px-2.5 py-2 rounded-xl bg-[#F1F3F4] hover:bg-[#E4E8EB] text-[#18587A] border border-[#D6DCE0] shrink-0 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                    title="Simulate muse-voice-transcribe-1.0"
                  >
                    <span className="material-symbols-outlined text-[15px]">mic</span>
                    <span>Voice</span>
                  </button>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Talk to your Life Coach..."
                    className="w-full rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] px-3 py-2 text-xs text-[#0E344D] placeholder-[#7D8890] focus:outline-none focus:border-[#18587A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-[#0E344D] hover:bg-[#18587A] text-white font-bold text-xs shrink-0 transition cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            </section>
          </div>

          {/* Daily Quests & Micro-Habits Card */}
          <section className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E4E8EB] pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                  Daily Life Mastery Quests
                </span>
                <h3 className="text-base font-bold text-[#0E344D] mt-0.5">Micro-Habits for Whole-Person Sovereignty</h3>
              </div>
              <span className="text-xs text-[#5D6870] font-mono tabular-nums">
                {quests.filter((q) => q.completed).length} / {quests.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {quests.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    const nextQuests = quests.map((item) =>
                      item.id === q.id ? { ...item, completed: !item.completed } : item
                    );
                    setQuests(nextQuests);
                    if (!q.completed) {
                      rewardCoachingWin(q.title);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    q.completed
                      ? 'bg-[#E8EEF3] border-[#18587A] text-[#0E344D]'
                      : 'bg-[#F5F6F8] border-[#D6DCE0] text-[#36454F] hover:border-[#18587A]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                        q.completed ? 'bg-[#18587A] text-white' : 'border border-[#CBD5DC] bg-white'
                      }`}
                    >
                      {q.completed ? '✓' : ''}
                    </span>
                    <span className="text-xs font-medium">{q.title}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#0E344D] shrink-0">+{q.xp} XP</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: EMOTION & MENTAL WELLNESS */}
      {activeTab === 'mind_emotion' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow space-y-6">
          <div className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E4E8EB] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                  Pillar 2 · Emotional &amp; Mental Sovereignty
                </span>
                <h2 className="text-lg font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">Affective Valence, Arousal &amp; Stoic Reframing</h2>
                <p className="text-xs text-[#36454F] mt-1 max-w-2xl leading-relaxed">
                  Real-time cognitive and somatic emotion tracking using Russell&apos;s 2D Circumplex Model. High physiological arousal combined with negative valence triggers sympathetic anxiety interlocks and cognitive reframing prompts.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#EEF4F7] border border-[#18587A]/30 text-center">
                  <span className="text-[10px] text-[#5D6870] font-mono uppercase block">Somatic Anxiety</span>
                  <span className={`text-lg font-bold font-['Space_Grotesk'] tabular-nums ${emotion.somaticAnxiety > 50 ? 'text-[#9E2A22]' : 'text-[#18587A]'}`}>
                    {emotion.somaticAnxiety}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#E8EEF3] border border-[#18587A]/35 text-center">
                  <span className="text-[10px] text-[#5D6870] font-mono uppercase block">Burnout Risk</span>
                  <span className={`text-lg font-bold font-['Space_Grotesk'] tabular-nums ${emotion.burnoutRisk > 50 ? 'text-[#9E2A22]' : 'text-[#0E344D]'}`}>
                    {emotion.burnoutRisk}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
              {/* 2D Affective Circumplex Matrix */}
              <div className="lg:col-span-6 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#0E344D] mb-2">
                    <span className="font-bold font-['Space_Grotesk']">2D Affective Circumplex Map</span>
                    <span className="font-mono text-[#18587A] font-semibold">
                      Valence: {emotion.valence > 0 ? `+${emotion.valence.toFixed(1)}` : emotion.valence.toFixed(1)} · Arousal: {emotion.arousal}/10
                    </span>
                  </div>

                  {/* 2D Matrix Box */}
                  <div className="relative w-full h-56 rounded-xl bg-white border border-[#D6DCE0] overflow-hidden flex items-center justify-center p-4">
                    {/* Crosshairs */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-[#D6DCE0] pointer-events-none"></div>
                    <div className="absolute inset-y-0 left-1/2 w-px bg-[#D6DCE0] pointer-events-none"></div>

                    {/* Quadrant Labels */}
                    <span className="absolute top-2 left-3 text-[10px] font-mono font-semibold text-[#9E2A22]">
                      HIGH AROUSAL · NEGATIVE (Stress/Panic)
                    </span>
                    <span className="absolute top-2 right-3 text-[10px] font-mono font-semibold text-[#18587A]">
                      HIGH AROUSAL · POSITIVE (Flow/Exuberance)
                    </span>
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono font-semibold text-[#5D6870]">
                      LOW AROUSAL · NEGATIVE (Burnout/Lethargy)
                    </span>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono font-semibold text-[#0E344D]">
                      LOW AROUSAL · POSITIVE (Peace/Rest)
                    </span>

                    {/* User's Plotted State Dot */}
                    <div
                      className="absolute w-5 h-5 rounded-full bg-[#18587A] border-2 border-white shadow-md transition-all duration-300 flex items-center justify-center"
                      style={{
                        left: `${Math.max(8, Math.min(92, 50 + (emotion.valence / 5.0) * 42))}%`,
                        top: `${Math.max(8, Math.min(92, 100 - (emotion.arousal / 10.0) * 88))}%`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </div>
                  </div>
                </div>

                {/* Affective Sliders */}
                <div className="mt-4 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#36454F] font-medium">Emotional Valence (Despair ⇄ Radiant Peace)</span>
                      <span className={`font-mono font-bold ${emotion.valence < 0 ? 'text-[#9E2A22]' : 'text-[#18587A]'}`}>
                        {emotion.valence > 0 ? `+${emotion.valence.toFixed(1)}` : emotion.valence.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-5.0"
                      max="5.0"
                      step="0.5"
                      value={emotion.valence}
                      onChange={(e) => handleEmotionChange('valence', parseFloat(e.target.value), 'Valence Slider')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#36454F] font-medium">Physiological Arousal (Lethargic ⇄ Fight-or-Flight)</span>
                      <span className="font-mono text-[#0E344D] font-bold">{emotion.arousal} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={emotion.arousal}
                      onChange={(e) => handleEmotionChange('arousal', Number(e.target.value), 'Arousal Slider')}
                      className="w-full accent-[#18587A] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Emotional Journal & Stoic Reframe Form */}
              <div className="lg:col-span-6 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk'] flex items-center justify-between">
                    <span>Active Emotional Journal &amp; Reframe</span>
                    <span className="text-xs text-[#5D6870] font-mono">Persona: {coachPersona.toUpperCase()}</span>
                  </h3>

                  {/* Mood Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {[
                      'Laser Focused',
                      'Grateful & Calm',
                      'Overwhelmed',
                      'Financially Anxious',
                      'Restless',
                      'Deep Peace',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedMoodTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          selectedMoodTag === tag
                            ? 'bg-[#18587A] text-white border border-[#18587A]'
                            : 'bg-white text-[#36454F] border border-[#D6DCE0] hover:text-[#0E344D]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Reflection Form */}
                  <form onSubmit={handleJournalSubmit} className="mt-3 space-y-2.5">
                    <textarea
                      rows={3}
                      value={journalInput}
                      onChange={(e) => setJournalInput(e.target.value)}
                      placeholder="Write what is weighing on your mind or body right now..."
                      className="w-full rounded-xl bg-white border border-[#D6DCE0] p-3 text-xs text-[#0E344D] placeholder-[#7D8890] focus:outline-none focus:border-[#18587A]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-[#0E344D] hover:bg-[#18587A] text-white font-bold text-xs transition shadow-xs cursor-pointer"
                    >
                      Log Reflection &amp; Generate Coaching Reframe (+15 XP)
                    </button>
                  </form>
                </div>

                {/* Journal History */}
                <div className="mt-4 pt-3 border-t border-[#E4E8EB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D6870] block mb-2">
                    Recent Life Coach Reframings
                  </span>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {journalEntries.map((entry) => (
                      <div key={entry.id} className="rounded-lg bg-white border border-[#D6DCE0] p-2.5 text-xs">
                        <div className="flex items-center justify-between text-[#5D6870] text-[11px] mb-1">
                          <span className="font-semibold text-[#18587A]">{entry.moodTag}</span>
                          <span className="font-mono">[{entry.ts}]</span>
                        </div>
                        <p className="text-[#0E344D] italic">&ldquo;{entry.text}&rdquo;</p>
                        <div className="mt-1.5 p-2 rounded bg-[#EEF4F7] border border-[#18587A]/25 text-[#0E344D] text-[11px] font-medium">
                          {entry.coachReframe}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: WEALTH & FINANCIAL LIFE COACH */}
      {activeTab === 'wealth' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow space-y-6">
          <div className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E4E8EB] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                  Pillar 3 · Wealth &amp; Financial Wellness
                </span>
                <h2 className="text-lg font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">Impulse Spending Interlock &amp; Real-Time Ledger</h2>
                <p className="text-xs text-[#36454F] mt-1 max-w-2xl leading-relaxed">
                  Financial stress triggers somatic tension (sEMG spikes), and somatic tension causes compensatory retail urges. Muse Charm provides an on-wrist bio-financial brake, locking impulse purchases during high cortisol windows.
                </p>
              </div>

              {/* Financial Vital Stats */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-3 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] text-center">
                  <span className="text-[10px] text-[#5D6870] font-mono uppercase block">Daily Discretionary</span>
                  <span className="text-lg font-bold font-['Space_Grotesk'] text-[#0E344D] tabular-nums">
                    ${(financial.dailyBudget - financial.spentToday).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#5D6870] font-mono block">of ${financial.dailyBudget} cap</span>
                </div>

                <div className="p-3 rounded-xl bg-[#E8EEF3] border border-[#18587A]/40 text-center">
                  <span className="text-[10px] text-[#0E344D] font-mono uppercase block">Vault Savings</span>
                  <span className="text-lg font-bold font-['Space_Grotesk'] text-[#0E344D] tabular-nums">
                    ${financial.vaultSavings.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#5D6870] font-mono block">saved via cooldowns</span>
                </div>

                <div className="p-3 rounded-xl bg-[#E8F0F4] border border-[#18587A]/30 text-center">
                  <span className="text-[10px] text-[#18587A] font-mono uppercase block">Runway</span>
                  <span className="text-lg font-bold font-['Space_Grotesk'] text-[#18587A] tabular-nums">
                    {financial.runwayMonths} mo
                  </span>
                  <span className="text-[10px] text-[#5D6870] font-mono block">at current burn</span>
                </div>
              </div>
            </div>

            {/* Impulse Guard Interlock Showcase Box */}
            <div className="mt-5 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${
                      financial.impulseInterlockActive
                        ? 'bg-[#FDF1F0] text-[#9E2A22] border-[#D4584E]/40'
                        : 'bg-[#E8EEF3] text-[#0E344D] border-[#18587A]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {financial.impulseInterlockActive ? 'lock' : 'verified_user'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk']">
                      Bio-Responsive Impulse Guard:{' '}
                      <span className={financial.impulseInterlockActive ? 'text-[#9E2A22]' : 'text-[#0E344D]'}>
                        {financial.impulseInterlockActive ? 'ARMED & INTERLOCKED' : 'MONITORING STANDBY'}
                      </span>
                    </h3>
                    <p className="text-xs text-[#36454F]">
                      When wrist sEMG &gt; 75 µV or HR &gt; 90 BPM spikes during shopping, payment APIs are locked for 60 seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nextInterlock = !financial.impulseInterlockActive;
                      setFinancial((prev) => ({
                        ...prev,
                        impulseInterlockActive: nextInterlock,
                        cooldownRemaining: nextInterlock ? 60 : 0,
                      }));
                      playBioChime(nextInterlock ? 'alert' : 'positive');
                      showToast(
                        nextInterlock ? 'Impulse Guard Armed' : 'Impulse Guard Released',
                        nextInterlock
                          ? 'Simulated retail checkout spike detected.'
                          : 'Manual override: unlocked.'
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                      financial.impulseInterlockActive
                        ? 'bg-[#FDF1F0] text-[#9E2A22] border-[#D4584E]/40'
                        : 'bg-[#F1F3F4] text-[#0E344D] border-[#D6DCE0] hover:bg-[#E4E8EB]'
                    }`}
                  >
                    {financial.impulseInterlockActive ? 'Release Interlock' : 'Simulate Impulse Urge'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBankImpulseSavings(50)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18587A] hover:bg-[#124460] text-white transition cursor-pointer"
                  >
                    Auto-Save $50 to Vault
                  </button>
                </div>
              </div>
            </div>

            {/* Grid: Expense Simulator & Live Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
              {/* Quick Expense Logger */}
              <div className="lg:col-span-5 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk']">
                    Biometric Expense Logger
                  </h3>
                  <p className="text-xs text-[#5D6870] mt-0.5">
                    Every transaction is stamped with your instantaneous sEMG tension and valence.
                  </p>
                </div>

                {/* 1-Click Pre-sets */}
                <div>
                  <span className="text-[11px] font-semibold text-[#5D6870] block mb-1.5">
                    1-Click Simulated Expenses:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddExpense('Impulse Sneaker Flash Sale', 85.0, 'impulse')}
                      className="p-2.5 rounded-lg bg-[#FDF1F0] hover:bg-[#FAE5E3] border border-[#D4584E]/35 text-[#9E2A22] text-left text-xs transition cursor-pointer"
                    >
                      <div className="font-bold">$85.00 Sneaker Sale</div>
                      <div className="text-[10px] text-[#9E2A22]">High Impulse Hazard</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddExpense('Late-Night DoorDash Delivery', 24.5, 'comfort')}
                      className="p-2.5 rounded-lg bg-[#F1F3F4] hover:bg-[#E4E8EB] border border-[#D6DCE0] text-[#0E344D] text-left text-xs transition cursor-pointer"
                    >
                      <div className="font-bold">$24.50 DoorDash</div>
                      <div className="text-[10px] text-[#5D6870]">Emotional Fatigue Spend</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddExpense('Organic Greens & Salmon', 32.0, 'fuel')}
                      className="p-2.5 rounded-lg bg-[#E8EEF3] hover:bg-[#DCE5EC] border border-[#18587A]/40 text-[#0E344D] text-left text-xs transition cursor-pointer"
                    >
                      <div className="font-bold">$32.00 Organic Fuel</div>
                      <div className="text-[10px] text-[#0E344D]">Mindful Nutrition</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddExpense('Stoic Philosophy Hardcover', 22.0, 'growth')}
                      className="p-2.5 rounded-lg bg-[#E8F0F4] hover:bg-[#DCE7EE] border border-[#18587A]/35 text-[#0E344D] text-left text-xs transition cursor-pointer"
                    >
                      <div className="font-bold">$22.00 Stoic Book</div>
                      <div className="text-[10px] text-[#18587A]">Growth Investment</div>
                    </button>
                  </div>
                </div>

                {/* Custom Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newExpTitle.trim() || !newExpAmount) return;
                    handleAddExpense(newExpTitle.trim(), parseFloat(newExpAmount), newExpCat);
                    setNewExpTitle('');
                    setNewExpAmount('');
                  }}
                  className="space-y-2 pt-2 border-t border-[#E4E8EB]"
                >
                  <div>
                    <label className="text-[11px] text-[#5D6870] font-medium block mb-1">Expense Name</label>
                    <input
                      type="text"
                      value={newExpTitle}
                      onChange={(e) => setNewExpTitle(e.target.value)}
                      placeholder="e.g. Ergonomic Desk Arm"
                      className="w-full rounded-lg bg-white border border-[#D6DCE0] px-3 py-1.5 text-xs text-[#0E344D] placeholder-[#7D8890] focus:outline-none focus:border-[#18587A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-[#5D6870] font-medium block mb-1">Amount ($ USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newExpAmount}
                        onChange={(e) => setNewExpAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-lg bg-white border border-[#D6DCE0] px-3 py-1.5 text-xs text-[#0E344D] placeholder-[#7D8890] focus:outline-none focus:border-[#18587A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#5D6870] font-medium block mb-1">Category</label>
                      <select
                        value={newExpCat}
                        onChange={(e) => setNewExpCat(e.target.value as any)}
                        className="w-full rounded-lg bg-white border border-[#D6DCE0] px-2 py-1.5 text-xs text-[#0E344D] focus:outline-none focus:border-[#18587A] cursor-pointer"
                      >
                        <option value="impulse">Impulse</option>
                        <option value="fuel">Fuel / Food</option>
                        <option value="growth">Growth</option>
                        <option value="comfort">Comfort</option>
                        <option value="essential">Essential</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#0E344D] hover:bg-[#18587A] text-white font-bold text-xs transition cursor-pointer"
                  >
                    Log Expense with Biometric Tag
                  </button>
                </form>
              </div>

              {/* Live Ledger with Biometric Stamp */}
              <div className="lg:col-span-7 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E4E8EB] pb-2 mb-3">
                    <h3 className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk']">
                      Biometrically Stamped Transaction Ledger
                    </h3>
                    <span className="text-xs text-[#18587A] font-mono font-semibold tabular-nums">
                      Spent Today: ${financial.spentToday.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {expenses.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-2.5 rounded-lg bg-white border border-[#D6DCE0] flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#0E344D]">{exp.title}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                                exp.category === 'impulse'
                                  ? 'bg-[#FDF1F0] text-[#9E2A22]'
                                  : exp.category === 'fuel'
                                  ? 'bg-[#E8EEF3] text-[#0E344D]'
                                  : 'bg-[#E8F0F4] text-[#18587A]'
                              }`}
                            >
                              {exp.category.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5D6870] mt-0.5 flex items-center gap-2 font-mono">
                            <span>[{exp.ts}]</span>
                            <span>sEMG: {exp.semgUv} µV</span>
                            <span>HR: {exp.hrBpm} BPM</span>
                            <span className={exp.stressTag.includes('⚠️') ? 'text-[#9E2A22] font-bold' : 'text-[#5D6870]'}>
                              {exp.stressTag}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-bold text-[#0E344D] font-['Space_Grotesk'] text-sm tabular-nums">
                            -${exp.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Longitudinal Bio-Financial Insight */}
                <div className="mt-4 pt-3 border-t border-[#E4E8EB] text-[11px] text-[#36454F] flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#18587A] text-[18px] shrink-0">lightbulb</span>
                  <p>
                    <strong className="text-[#0E344D]">Bio-Financial Correlation:</strong> Over the last 14 days, 74% of discretionary overspends occurred when wrist sEMG exceeded 70 µV and sedentary time was above 180 minutes. Keeping somatic tension relaxed prevents costly impulse urges!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: SAM 3.1 MEAL & POSTURE VISUAL GROUNDING LAB */}
      {activeTab === 'sam' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
          <div className="rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E4E8EB] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                  Meta Model API · SAM 3.1 Multimodal Lab
                </span>
                <h2 className="text-lg font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">Zero-Friction Visual Grounding for the Life Engine</h2>
                <p className="text-xs text-[#36454F] mt-0.5">
                  Instead of manual food, workout, or checkout logging, <code className="text-[#0E344D] font-mono font-semibold">SAM 3.1</code> outlines food portions, desk posture, and impulse retail environments from a quick camera frame.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSamScene('salmon_bowl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'salmon_bowl'
                      ? 'bg-[#18587A] text-white border border-[#18587A]'
                      : 'bg-[#E8EEF3] text-[#0E344D] border border-[#18587A]/30 hover:bg-[#DCE5EC]'
                  }`}
                >
                  Scan Salmon Bowl
                </button>
                <button
                  type="button"
                  onClick={() => setSamScene('espresso_overload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'espresso_overload'
                      ? 'bg-[#0E344D] text-white border border-[#0E344D]'
                      : 'bg-[#F1F3F4] text-[#0E344D] border border-[#D6DCE0] hover:bg-[#E4E8EB]'
                  }`}
                >
                  Scan Caffeine Desk
                </button>
                <button
                  type="button"
                  onClick={() => setSamScene('ergonomic_walk')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'ergonomic_walk'
                      ? 'bg-[#18587A] text-white border border-[#18587A]'
                      : 'bg-[#E8F0F4] text-[#18587A] border border-[#18587A]/30 hover:bg-[#DCE7EE]'
                  }`}
                >
                  Scan Outdoor Walk
                </button>
                <button
                  type="button"
                  onClick={() => setSamScene('shopping_cart')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    samScene === 'shopping_cart'
                      ? 'bg-[#C23B32] text-white border border-[#C23B32]'
                      : 'bg-[#FDF1F0] text-[#9E2A22] border border-[#D4584E]/35 hover:bg-[#FAE5E3]'
                  }`}
                >
                  Scan Shopping Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
              <div className="lg:col-span-7 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between text-xs text-[#5D6870] mb-2">
                  <span className="font-semibold text-[#0E344D]">{samSamples[samScene].title}</span>
                  <span className="font-mono text-[#18587A] font-semibold">
                    Model: sam-3.1-vision · {samSamples[samScene].masks.length} Masks Detected
                  </span>
                </div>
                <div className="relative w-full h-64 rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] overflow-hidden flex items-center justify-center">
                  <canvas ref={samCanvasRef} className="w-full h-full block" />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-[#F5F6F8] border border-[#D6DCE0] p-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0E344D] font-['Space_Grotesk']">
                    SAM 3.1 Segmentation Telemetry
                  </h3>
                  <p className="text-xs text-[#5D6870] mt-1">
                    Text-prompted object masks converted into deterministic Life Engine state shifts:
                  </p>
                  <div className="mt-3 space-y-2.5 text-xs">
                    {samSamples[samScene].masks.map((m, idx) => (
                      <div key={idx} className="rounded-lg bg-white border border-[#D6DCE0] p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#0E344D]">{m.label}</span>
                          <span className="font-mono text-[#18587A] font-semibold">{m.confidence}</span>
                        </div>
                        <div className="text-[#0E344D] font-mono mt-1 font-medium">FSM Impact: {m.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E4E8EB]">
                  <button
                    type="button"
                    onClick={() => {
                      samSamples[samScene].apply();
                      setActiveTab('main');
                      showToast('SAM 3.1 Telemetry Applied', `${samSamples[samScene].title} pushed into Life Engine.`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0E344D] to-[#18587A] hover:from-[#0A283D] hover:to-[#11425C] text-white font-bold text-xs transition shadow-sm cursor-pointer"
                  >
                    Push SAM 3.1 Telemetry into Life Engine FSM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 5: META API & TELEMETRY BRIDGE */}
      {activeTab === 'arch' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: 2026 Web Architecture for Health + Plaid */}
            <div className="lg:col-span-6 rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E344D] font-['Space_Grotesk']">
                  2026 Web Life Coach Architecture
                </span>
                <h2 className="text-base font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">
                  Bridging Wearables, Health &amp; Open Banking in the Browser
                </h2>
                <p className="text-xs text-[#36454F] mt-1 leading-relaxed">
                  How ZoeWave bridges physiological biosignals, emotional states, and financial transactions into the Meta Model API:
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl bg-[#F3F6F6] border border-[#18587A]/30 p-3">
                  <div className="font-semibold text-[#0E344D]">Path A · Google Fitbit Web API + Android Health Connect</div>
                  <p className="text-[#36454F] mt-1">
                    Android Health Connect syncs bi-directionally with Fitbit. The web app connects via OAuth 2.0 PKCE to continuously stream daily step counts, sleep stage architectures, and optical heart rates.
                  </p>
                </div>
                <div className="rounded-xl bg-[#EEF4F7] border border-[#18587A]/30 p-3">
                  <div className="font-semibold text-[#18587A]">Path B · Open Banking &amp; Plaid Micro-Ledger Webhooks</div>
                  <p className="text-[#36454F] mt-1">
                    Direct integration with banking APIs streams real-time discretionary purchase alerts. If an authorization request arrives while sEMG &gt; 75 µV, the Impulse Guard triggers an interactive pre-approval haptic cooldown.
                  </p>
                </div>
                <div className="rounded-xl bg-[#F1F3F4] border border-[#D6DCE0] p-3">
                  <div className="font-semibold text-[#0E344D]">Path C · Native Hardware APIs (Web Bluetooth + sEMG)</div>
                  <p className="text-[#36454F] mt-1">
                    Uses <code className="text-[#0E344D] font-mono font-semibold">navigator.bluetooth</code> to stream raw forearm motor unit action potentials (MUAP 5–250 Hz RMS) directly into the browser client with zero cloud latency.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Meta Model API JSON Payload Inspector */}
            <div className="lg:col-span-6 rounded-2xl bg-white border border-[#D6DCE0] p-5 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18587A] font-['Space_Grotesk']">
                  Meta Model API Live Inspector
                </span>
                <h2 className="text-base font-bold text-[#0E344D] mt-0.5 font-['Space_Grotesk']">Muse Spark 1.3 &amp; Wonder Payload</h2>
                <p className="text-xs text-[#36454F] mt-1">
                  Enter your <code className="text-[#18587A] font-mono font-semibold">$150 Meta Model API</code> hackathon key to run live cloud inferences for all 4 life pillars.
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5D6870] mb-1">Meta Model API Key (Optional)</label>
                    <input
                      type="password"
                      value={metaApiKey}
                      onChange={(e) => setMetaApiKey(e.target.value)}
                      placeholder="meta_sk_live_..."
                      className="w-full rounded-lg bg-[#F5F6F8] border border-[#D6DCE0] px-3 py-1.5 text-xs text-[#0E344D] font-mono focus:outline-none focus:border-[#18587A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5D6870] mb-1">Active Model</label>
                    <select
                      value={metaModel}
                      onChange={(e) => setMetaModel(e.target.value)}
                      className="w-full rounded-lg bg-[#F5F6F8] border border-[#D6DCE0] px-3 py-1.5 text-xs text-[#0E344D] font-mono focus:outline-none focus:border-[#18587A] cursor-pointer"
                    >
                      <option value="muse-spark-1.3">muse-spark-1.3 (Low-Latency Life Coach)</option>
                      <option value="muse-wonder-1.0">muse-wonder-1.0 (1M Context Cross-Domain)</option>
                      <option value="muse-spark-open">muse-spark-open (Baseten / Modal)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5D6870] mb-1">
                      <span className="font-semibold text-[#0E344D]">
                        1. Outbound Tripartite Payload (Enclave → Meta Model API)
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
                          showToast('Copied to Clipboard', 'Meta Model API Life Coach payload copied.');
                        }}
                        className="text-[#18587A] hover:text-[#0E344D] font-semibold cursor-pointer"
                      >
                        Copy Outbound JSON
                      </button>
                    </div>
                    <pre className="h-36 overflow-auto rounded-xl bg-[#F4F6F6] border border-[#D6DCE0] p-2.5 text-[11px] text-[#0E344D] font-mono leading-relaxed">
                      {outboundJsonPayload}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5D6870] mb-1">
                      <span className="font-semibold text-[#0E344D]">
                        2. Inbound Structured Response (Meta Model API → Companion Action Contract)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const ta = document.createElement('textarea');
                          ta.value = structuredMetaResponseJson;
                          document.body.appendChild(ta);
                          ta.select();
                          document.execCommand('copy');
                          document.body.removeChild(ta);
                          showToast('Copied to Clipboard', 'Structured Meta API response contract copied.');
                        }}
                        className="text-[#0E344D] hover:text-[#0E344D] font-semibold cursor-pointer"
                      >
                        Copy Response JSON
                      </button>
                    </div>
                    <pre className="h-36 overflow-auto rounded-xl bg-[#F1F7F6] border border-[#18587A]/40 p-2.5 text-[11px] text-[#1D524B] font-mono leading-relaxed">
                      {structuredMetaResponseJson}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Global Hackathon Compliance & Methodology Footer */}
      <footer className="w-full border-t border-[#D6DCE0] bg-white px-4 sm:px-8 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5D6870]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#E8EEF3] text-[#0E344D] border border-[#18587A]/30 font-mono text-[10px] font-semibold">
              Meta AI Hackathon 2026
            </span>
            <span>·</span>
            <span className="text-[#0E344D] font-semibold">
              ZoeWave Muse Charm: Embodied AI Life Coach
            </span>
            <span>·</span>
            <span className="text-[#18587A] font-mono text-[11px] font-medium">
              Synthetic Data Prototype (Simulated Biosignals &amp; Open Banking)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#5D6870]">
            <span>Progress Over Perfection: Non-Punitive Companion Architecture</span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://dev.meta.ai/events/global-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#18587A] hover:underline font-semibold"
            >
              Meta Hackathon Submission
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
