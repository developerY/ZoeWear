/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { NavPage } from '../../types';
import { RESEARCH_PAPERS, GARMENT_SILHOUETTES, ACADEMIC_MODULES } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const items: Array<{
      category: string;
      title: string;
      snippet: string;
      targetPage: NavPage;
      badge?: string;
    }> = [];

    // Footwear & Fashion
    if ('swiftmonster mountain footwear shoes'.includes(q) || 'shoes'.includes(q)) {
      items.push({
        category: 'Footwear',
        title: 'SwiftMonster Mountain Shoe',
        snippet: 'Sub-dermal gait sensor sole matrix with carbon lattice for high-altitude trekking.',
        targetPage: 'fashion',
        badge: '$1,850',
      });
    }
    if ('swiftmonster beach footwear shoes'.includes(q)) {
      items.push({
        category: 'Footwear',
        title: 'SwiftMonster Beach Shoe',
        snippet: 'Self-aerating biomimetic lattice designed for seaside moisture mitigation.',
        targetPage: 'fashion',
        badge: '$1,650',
      });
    }

    GARMENT_SILHOUETTES.forEach((garment) => {
      if (
        garment.title.toLowerCase().includes(q) ||
        garment.description.toLowerCase().includes(q) ||
        garment.sensor.toLowerCase().includes(q)
      ) {
        items.push({
          category: 'Couture Silhouette',
          title: garment.title,
          snippet: `${garment.sensor} - ${garment.description}`,
          targetPage: 'fashion',
          badge: garment.status,
        });
      }
    });

    // DrunkWatch
    if ('drunkwatch bac alcohol metabolic guardian watch cuff'.includes(q)) {
      items.push({
        category: 'Biometric Core',
        title: 'DrunkWatch™ Metabolic Biometric Guardian',
        snippet: 'Transdermal micro-spectrometry sensor measuring ethanol clearance and hydration.',
        targetPage: 'drunkwatch',
        badge: 'OS v4.8',
      });
    }

    // Fusion & Breathe
    if ('breathe respiratory lungs thoracic diagnostics fusion tensorflow'.includes(q)) {
      items.push({
        category: 'Biomedical App',
        title: '"Breathe" Real-Time Respiratory Diagnostics',
        snippet: 'Continuous thoracic micro-expansion sensing and TensorFlow anomaly clustering.',
        targetPage: 'fusion',
        badge: 'Clinical Beta',
      });
    }

    // Research Papers
    RESEARCH_PAPERS.forEach((paper) => {
      if (
        paper.title.toLowerCase().includes(q) ||
        (paper.journal && paper.journal.toLowerCase().includes(q)) ||
        paper.authors.toLowerCase().includes(q)
      ) {
        items.push({
          category: 'Scholarly Paper',
          title: paper.title,
          snippet: `${paper.authors} (${paper.journal || 'Bio-Sensors Group'})`,
          targetPage: 'teaching-and-research',
          badge: paper.badge,
        });
      }
    });

    // Academic Modules
    ACADEMIC_MODULES.forEach((mod) => {
      if (
        mod.title.toLowerCase().includes(q) ||
        mod.description.toLowerCase().includes(q) ||
        mod.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        items.push({
          category: 'Curriculum Module',
          title: `Module 0${mod.number}: ${mod.title}`,
          snippet: mod.description,
          targetPage: 'teaching-and-research',
          badge: mod.duration,
        });
      }
    });

    return items;
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (targetPage: NavPage) => {
    onNavigate(targetPage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-md overflow-hidden flex flex-col gap-3">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-primary-container text-[22px] absolute left-3">
            search
          </span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, DrunkWatch™, whitepapers, modules..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container-low border border-subtle text-text-primary text-sm focus:outline-none focus:border-primary-container font-body-md"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-text-muted hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Quick Suggestions / Results */}
        <div className="max-h-80 overflow-y-auto flex flex-col gap-1.5 mt-1">
          {query.trim() === '' ? (
            <div className="p-3 text-xs text-text-muted flex flex-col gap-2">
              <span className="font-mono text-circuit-gold uppercase">Popular Queries:</span>
              <div className="flex flex-wrap gap-1.5">
                {['SwiftMonster', 'DrunkWatch', 'Breathe App', 'Opto-Merino', 'TensorFlow', 'Fellowship', 'Ethanol Sensor'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 rounded-full bg-surface-container-low border border-subtle text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-sm text-text-muted">
              No telemetry artifacts found matching "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.targetPage)}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-subtle hover:border-primary-container/40 transition-all flex items-start justify-between gap-3 cursor-pointer group"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface-bright text-circuit-gold">
                      {item.category}
                    </span>
                    <h5 className="text-sm font-medium text-text-primary group-hover:text-primary-container transition-colors">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{item.snippet}</p>
                </div>
                {item.badge && (
                  <span className="text-xs font-mono text-primary px-2 py-0.5 rounded bg-surface-container shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Bottom Escape Hint */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between text-[11px] text-text-muted">
          <span>Click result to navigate</span>
          <button
            onClick={onClose}
            className="hover:text-text-primary px-2 py-0.5 rounded bg-surface-container-high"
          >
            Esc to close
          </button>
        </div>
      </div>
    </div>
  );
};
