import React, { useState } from 'react';
import { NavPage } from '../types';
import { ZOEWEAR_CHIP_LOGO } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenPolicy: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-white border-t border-[#D6DCE0] mt-10 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-[#E8ECEE]">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={ZOEWEAR_CHIP_LOGO}
                alt="ZoeWear Silicon Chip"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#3B8E82]/45 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] text-[20px] font-semibold tracking-wider text-[#0E344D] leading-none">
                  ZOEWEAR
                </span>
                <span className="font-['Space_Grotesk'] text-[11px] tracking-widest text-[#2E766B] font-semibold mt-1 uppercase">
                  CYBER-COUTURE & WEARABLE TECH
                </span>
              </div>
            </div>

            <p className="text-[#18587A] font-['Plus_Jakarta_Sans'] text-[13px] italic font-medium">
              Awaken the Soul of the Shoe & Garment.
            </p>

            <p className="text-[#475866] font-['Plus_Jakarta_Sans'] text-[13px] leading-relaxed max-w-md">
              Pioneering haute cybernetic apparel, autonomous transdermal diagnostics, and ML-accelerated bio-analytics woven into luxury silhouettes for preventive human sovereignty.
            </p>

            {/* Telemetry Dispatch Newsletter */}
            <div className="flex flex-col gap-1.5 pt-2 max-w-sm">
              <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#0E344D] font-semibold">
                Telemetry Dispatch
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-[#E8F3F1] border border-[#3B8E82]/40 text-[#25665D] text-[13px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Dispatch Link Confirmed. Encrypted transmission enrolled.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="couture@biometrics.com"
                    required
                    className="w-full bg-[#F7F8F7] border border-[#CBD5DC] rounded-lg px-3 py-2 text-[#0E344D] text-[13px] placeholder:text-[#7D8890] focus:outline-none focus:border-[#3B8E82] transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Dispatch"
                    className="px-4 py-2 rounded-lg bg-[#0E344D] text-white hover:bg-[#3B8E82] transition-all flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Fashion */}
          <div className="flex flex-col gap-3">
            <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#0E344D] font-semibold pb-2 border-b border-[#E8ECEE]">
              Fashion
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#36454F]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer font-semibold text-[#0E344D]"
                >
                  Atelier Boutique & Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fashion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  SwiftMonster Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fashion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Haute Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fashion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Avant-Garde Concept
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fashion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Phygital Runway Silhouettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fashion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Conductive Fiber Weaving
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Tech & Fusion */}
          <div className="flex flex-col gap-3">
            <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#18587A] font-semibold pb-2 border-b border-[#E8ECEE]">
              Tech & Fusion
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#36454F]">
              <li>
                <button
                  onClick={() => onNavigate('tech')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Smartwatch Sensor Core
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tech')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  AI / ML Autonomous Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tech')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  3D Print Cyber-Structures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tech')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  Blockchain Fabric Ledgers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fusion')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer"
                >
                  TensorFlow Telemetry & Breathe
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Innovation & Labs */}
          <div className="flex flex-col gap-3">
            <span className="font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#2E766B] font-semibold pb-2 border-b border-[#E8ECEE]">
              Innovation & Labs
            </span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#36454F]">
              <li>
                <button
                  onClick={() => onNavigate('muse-charm')}
                  className="hover:text-[#18587A] transition-colors text-left cursor-pointer text-[#25665D] font-semibold"
                >
                  Muse Charm (Personal Life Coach)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('drunkwatch')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer"
                >
                  DrunkWatch™ Biosensor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ankle-biometrics')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer font-semibold text-[#18587A]"
                >
                  Ankle Biometrics &amp; Gait Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teaching-and-research')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer"
                >
                  Academic Curricula Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teaching-and-research')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer"
                >
                  WestCoast Computational Bio-Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teaching-and-research')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer"
                >
                  Whitepapers & Clinical Data
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fusion')}
                  className="hover:text-[#2E766B] transition-colors text-left cursor-pointer"
                >
                  Global Health Consortium Trials
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal Modals */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#475866] font-['Space_Grotesk'] text-[11px] font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[#0E344D] font-semibold">© 2025 ZoeWear Technologies Corp.</span>
            <span className="text-[#C6CED4]">|</span>
            <span>All Rights Reserved. Wearable for Life.</span>
          </div>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button
              onClick={() =>
                onOpenPolicy(
                  'Privacy Policy',
                  'ZoeWear Technologies Corp. enforces sovereign, zero-knowledge biometric telemetry. All transdermal electrochemical markers, respiratory traces, and cardiovascular metrics are processed on local device nodes (Wear OS / watchOS / MCU firmware) with AES-256 encrypted cryptographic tokens. No raw biological biomarkers are ever sold or monetized.'
                )
              }
              className="hover:text-[#18587A] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                onOpenPolicy(
                  'Terms of Innovation',
                  'Access to ZoeWear telemetry SDKs, wearable phygital blueprints, and prototype firmware is governed by our open research charter. Researchers, couturiers, and academic affiliates must adhere to strict human data sovereignty guidelines and biocompatibility benchmarks.'
                )
              }
              className="hover:text-[#18587A] transition-colors cursor-pointer"
            >
              Terms of Innovation
            </button>
            <button
              onClick={() =>
                onOpenPolicy(
                  'Ethics in Biometrics',
                  'We believe physiological monitoring must liberate rather than subjugate. By embedding clinical precision into haute couture silhouettes, we eradicate the dehumanizing stigma of bulky medical monitors and establish proactive health autonomy as a celebrated form of human expression.'
                )
              }
              className="hover:text-[#18587A] transition-colors cursor-pointer"
            >
              Ethics in Biometrics
            </button>
            <button
              onClick={() =>
                onOpenPolicy(
                  'Sensor Calibration Standards',
                  'Every ZoeWear garment and footwear model is calibrated in accordance with ISO 13485:2016 medical device quality management and IEEE P2730 wearable biosensor electrical impedance specifications. Micro-spectrometry optical paths maintain 99.8% precision with dynamic ambient drift compensation.'
                )
              }
              className="hover:text-[#18587A] transition-colors cursor-pointer"
            >
              Sensor Calibration Standards
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
