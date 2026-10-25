/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavPage } from '../../types';

interface InnovationExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
  onReserve: (item: string) => void;
}

export const InnovationExplorerModal: React.FC<InnovationExplorerModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onReserve,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'garments' | 'footwear' | 'diagnostics'>('all');

  if (!isOpen) return null;

  const innovations = [
    {
      id: 'swift-mountain',
      category: 'footwear',
      title: 'SwiftMonster Mountain Shoe',
      desc: '16-node sub-dermal gait sensor sole matrix with carbon lattice for extreme terrain.',
      page: 'fashion' as NavPage,
      status: 'Functional Prototype',
      color: 'text-circuit-gold',
    },
    {
      id: 'swift-beach',
      category: 'footwear',
      title: 'SwiftMonster Beach Shoe',
      desc: 'Parametric lattice with marine drainage channels and posture correction telemetry.',
      page: 'fashion' as NavPage,
      status: 'Functional Prototype',
      color: 'text-primary',
    },
    {
      id: 'drunkwatch-core',
      category: 'diagnostics',
      title: 'DrunkWatch™ Metabolic Core v4.8',
      desc: 'Sub-dermal micro-spectrometry measuring ethanol clearance, osmotic flux, and chauffeur concierge.',
      page: 'drunkwatch' as NavPage,
      status: 'ISO 13485 Certified',
      color: 'text-circuit-gold',
    },
    {
      id: 'breathe-app',
      category: 'diagnostics',
      title: '"Breathe" Respiratory Diagnostics',
      desc: 'Pulmonary volumetric estimation from thoracic micro-expansions with TensorFlow clustering.',
      page: 'fusion' as NavPage,
      status: 'Clinical Beta',
      color: 'text-secondary',
    },
    {
      id: 'blazer-kinetic',
      category: 'garments',
      title: 'Fluid Kinetic Blazer 01',
      desc: 'Dynamic posture realignment with continuous galvanic skin response sensors.',
      page: 'fashion' as NavPage,
      status: 'Couture Edition',
      color: 'text-primary-container',
    },
    {
      id: 'gown-transdermal',
      category: 'garments',
      title: 'Transdermal Silk Gown',
      desc: 'Micro-electrolyte capillary channels woven into 100% natural mulberry silk.',
      page: 'fashion' as NavPage,
      status: 'Atelier Bespoke',
      color: 'text-circuit-gold',
    },
    {
      id: 'trench-cyber',
      category: 'garments',
      title: 'Adaptive Cyber Trench Coat',
      desc: 'Ambient temperature thermoregulation and environmental VOC pollutant detection.',
      page: 'fashion' as NavPage,
      status: 'Autumn 25',
      color: 'text-secondary',
    },
    {
      id: 'opto-merino',
      category: 'garments',
      title: 'Opto-Merino Sweater',
      desc: 'Photoplethysmography optical sensors seamlessly knit into 18.5 micron Merino wool.',
      page: 'fashion' as NavPage,
      status: 'Runway Capsule',
      color: 'text-primary',
    },
  ];

  const filtered = activeFilter === 'all' ? innovations : innovations.filter((i) => i.category === activeFilter);

  const handleGo = (page: NavPage) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
            <div>
              <h3 className="font-display text-headline-sm text-text-primary leading-tight">
                ZoeWear Innovation Matrix
              </h3>
              <span className="text-xs text-text-muted font-mono">
                CROSS-DISCIPLINARY COUTURE & BIOMETRIC HARDWARE
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

        {/* Category Tabs */}
        <div className="flex items-center gap-2">
          {(['all', 'garments', 'footwear', 'diagnostics'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase font-label-sm tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-primary-container text-surface-obsidian font-semibold shadow-md'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-surface-container-low border border-subtle hover:border-primary-container/40 transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-mono font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-text-muted">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-base font-medium text-text-primary group-hover:text-primary-container transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-subtle">
                <button
                  onClick={() => handleGo(item.page)}
                  className="text-xs text-primary hover:text-text-primary transition-colors flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Explore Architecture</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onReserve(item.title);
                  }}
                  className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-surface-obsidian text-xs font-medium transition-colors cursor-pointer text-text-primary"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-3 border-t border-subtle flex items-center justify-between text-xs text-text-muted">
          <span>8 Active Hardware & Garment Prototyping Programs</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-surface-container-high text-text-primary hover:bg-surface-bright transition-colors cursor-pointer"
          >
            Close Index
          </button>
        </div>
      </div>
    </div>
  );
};
