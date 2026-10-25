/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType?: 'privacy' | 'terms' | 'ethics' | 'standards';
  customTitle?: string;
  customContent?: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  policyType = 'privacy',
  customTitle,
  customContent,
}) => {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & Zero-Knowledge Enclave',
      subtitle: 'SOVEREIGN DATA CHARTER // ISO 13485 & GDPR AWARE',
      body: (
        <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
          <p>
            At ZoeWear Technologies Corp., we reject the surveillance paradigm of commercial wearables. All raw biosignals—including thoracic respiration expansion, sub-dermal ethanol spectrometry, and galvanic sweat electrolyte measurements—are computed entirely on-device within a dedicated secure hardware enclave.
          </p>
          <p>
            <strong className="text-text-primary">1. Zero Plain-Text Transmission:</strong> No continuous physiological logs are transmitted to external cloud servers without explicit, multi-signature biometric wearer consent.
          </p>
          <p>
            <strong className="text-text-primary">2. Ephemeral Machine Learning:</strong> TensorFlow inference matrices utilize rolling 14-day baseline models. Older vectors are cryptographically scrubbed after baseline consolidation.
          </p>
          <p>
            <strong className="text-text-primary">3. Chaperone Autonomy:</strong> When DrunkWatch™ detects metabolic spikes, ride concierge tokens are generated using one-time blind signatures, leaving zero plain-text GPS routes on centralized servers.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Innovation & Prototype Access',
      subtitle: 'ATELIER EXPERIMENTAL COUTURE USAGE AGREEMENT',
      body: (
        <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
          <p>
            ZoeWear garments, SwiftMonster footwear, and DrunkWatch™ modules are early-stage functional cyber-couture artifacts developed under WestCoast Institute IRB protocols.
          </p>
          <p>
            <strong className="text-text-primary">1. Atelier Allocation:</strong> Prototypes reserved through this portal are custom-tailored to the individual wearer’s anatomical measurements and conductance profile.
          </p>
          <p>
            <strong className="text-text-primary">2. Care and Washability:</strong> Computational silk and opto-merino garments are engineered for up to 200 standard cold-wash cycles. Dry-cleaning or industrial ironing is strictly prohibited due to insulated micro-wire fragility.
          </p>
        </div>
      ),
    },
    ethics: {
      title: 'Ethics in Biometrics & Human Sovereignty',
      subtitle: 'THE MANIFESTO FOR SARTORIAL DIGNITY',
      body: (
        <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
          <p>
            We believe that wearable intelligence should dignify the wearer, not turn them into clinical patients. Medical apparatus that looks like illness is abandoned; haute couture that empowers human biological resilience becomes a daily second skin.
          </p>
          <p>
            <strong className="text-text-primary">Anti-Surveillance Architecture:</strong> Our sensors are intentionally engineered without persistent remote cellular backdoors. Your body belongs exclusively to you.
          </p>
          <p>
            <strong className="text-text-primary">Academic Integrity:</strong> All algorithms, noise cancellation models, and metabolic clearance coefficients are published openly across IEEE and ACM transactions to ensure clinical transparency.
          </p>
        </div>
      ),
    },
    standards: {
      title: 'Sensor Calibration Standards',
      subtitle: 'CLINICAL BENCHMARKING & HW ACCREDITATION',
      body: (
        <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed">
          <p>
            ZoeWear hardware conforms to rigorous international standards for wearable medical sensors and conductive smart textiles:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-on-surface-variant">
            <li><strong className="text-text-primary">ISO 13485:2016:</strong> Comprehensive quality management system for medical device design and manufacturing.</li>
            <li><strong className="text-text-primary">ASTM D7771:</strong> Conductive yarn linear resistance and wash-durability testing standard.</li>
            <li><strong className="text-text-primary">IEEE 1708:</strong> Standard for wearable cuffless blood-pressure and autonomic vascular measurement devices.</li>
            <li><strong className="text-text-primary">GC-MS Blood Corroboration:</strong> Interstitial ethanol vapor models cross-validated against 1,400 clinical trials with venous blood correlation coefficients &gt; 0.98.</li>
          </ul>
        </div>
      ),
    },
  }[policyType];

  const title = customTitle || contentMap.title;
  const subtitle = contentMap.subtitle;
  const body = customContent ? (
    <div className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
      {customContent}
    </div>
  ) : (
    contentMap.body
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-subtle">
          <div>
            <span className="font-label-sm text-[11px] text-circuit-gold tracking-widest font-mono">
              {subtitle}
            </span>
            <h3 className="font-display text-headline-sm text-text-primary leading-tight mt-0.5">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-bright transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-subtle max-h-96 overflow-y-auto">
          {body}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between text-xs text-text-muted">
          <span>ZoeWear Technologies Corp. Legal & Compliance Division</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
