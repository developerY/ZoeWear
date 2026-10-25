/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface KeynoteViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  totalSlides: number;
}

export const KeynoteViewerModal: React.FC<KeynoteViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  totalSlides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  if (!isOpen) return null;

  const slidesData = [
    {
      heading: 'Introduction: The Epistemology of Cyber-Couture',
      bullets: [
        'Fashion as the primary communicative envelope of human identity.',
        'Why medical diagnostics failed consumer adoption: stigmatizing design.',
        'The principle of invisible telemetry: 100% aesthetic concealment.',
      ],
      quote: '"Technology that looks like medicine will be discarded when symptoms recede."',
    },
    {
      heading: 'Conductive Textile Science: Warp, Weft & Micro-Copper',
      bullets: [
        'Interpolating 12-micron gold insulated strands into Italian silk.',
        'Maintaining 200 wash/dry cycles without impedance degradation.',
        'Sub-dermal capacitive impedance under sweat salinity shifts.',
      ],
      quote: '"The loom is humanity’s first binary program; we simply restored its computational destiny."',
    },
    {
      heading: 'TensorFlow Edge Inference & Real-Time Motion Decoupling',
      bullets: [
        'Eliminating running motion artifacts from genuine cardiac dysrhythmias.',
        'k-Means clustering against 14-day rolling normative baselines.',
        'Zero-knowledge on-device encryption pipeline before cloud sync.',
      ],
      quote: '"Latency under 14ms gives the wearer an autonomic preemptive reflex."',
    },
    {
      heading: 'DrunkWatch™: Transdermal Interstitial Alcohol Clearance',
      bullets: [
        'Continuous optical multi-wavelength spectrometry (680nm - 940nm).',
        'Direct mathematical correlation with GC-MS venous blood draws.',
        'Autonomic chaperone dispatch architecture without plain-text GPS exposure.',
      ],
      quote: '"Human sovereignty means the discretion to celebrate safely."',
    },
    {
      heading: 'Conclusion: The Phygital Atelier of the 21st Century',
      bullets: [
        'Unifying haute couture ateliers and cleanroom semiconductor foundries.',
        'Academic curricula at WestCoast Institute: cross-training biologists and couturiers.',
        'Open call for fellows and research partnerships.',
      ],
      quote: '"Wearable for life. Technology is the new black."',
    },
  ];

  const slideIndex = (currentSlide - 1) % slidesData.length;
  const slide = slidesData[slideIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-circuit-gold animate-pulse" />
            <div>
              <h3 className="font-display text-headline-sm text-text-primary leading-tight">
                {title || 'Academic Keynote Presentation'}
              </h3>
              <span className="text-xs text-text-muted font-mono">
                SLIDE {currentSlide} OF {totalSlides || 40} // SYMPOSIUM SLIDEDECK
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-bright transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Slide Screen Canvas */}
        <div className="relative w-full aspect-[16/9] rounded-xl bg-surface-obsidian border border-subtle p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-60 h-60 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-subtle/50 pb-3">
            <span className="font-label-sm text-xs text-primary-container tracking-widest uppercase font-mono">
              ZOEWEAR ACADEMIC KEYNOTE // DOCT15
            </span>
            <span className="text-xs font-mono text-circuit-gold">
              SLIDE #{currentSlide.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="my-auto flex flex-col gap-4">
            <h4 className="font-display text-2xl text-text-primary">{slide.heading}</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              {slide.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1 text-xs">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-subtle/50 flex items-center justify-between text-xs text-text-muted italic">
            <span>{slide.quote}</span>
            <span className="text-primary font-mono not-italic">Zoe Alexander, Ph.D.</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((s) => Math.max(1, s - 1))}
              disabled={currentSlide === 1}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-text-primary hover:bg-surface-bright disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Prev Slide</span>
            </button>
            <button
              onClick={() => setCurrentSlide((s) => Math.min(totalSlides || 40, s + 1))}
              disabled={currentSlide >= (totalSlides || 40)}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-text-primary hover:bg-surface-bright disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Next Slide</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
          >
            Close Presentation
          </button>
        </div>
      </div>
    </div>
  );
};
