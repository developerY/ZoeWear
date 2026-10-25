/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ResearchPaper } from '../../types';

interface PaperViewerModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export const PaperViewerModal: React.FC<PaperViewerModalProps> = ({ paper, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!paper) return null;

  const handleCopyCitation = () => {
    const citation = `${paper.authors}. "${paper.title}." ${paper.journal}, ${paper.volume}, ${paper.year}. DOI: ${paper.doi}.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-subtle">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-circuit-gold px-2 py-0.5 rounded bg-circuit-gold/15 border border-circuit-gold/30">
                {paper.badge}
              </span>
              <span className="text-xs font-mono text-text-muted">{paper.volume}</span>
            </div>
            <h3 className="font-display text-headline-sm text-text-primary leading-tight mt-1">
              {paper.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-bright transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Authors & Journal */}
        <div className="flex flex-col gap-1 text-xs text-on-surface-variant font-body-sm">
          <div>
            <strong className="text-text-primary">Authors:</strong> {paper.authors}
          </div>
          <div>
            <strong className="text-text-primary">Journal:</strong> {paper.journal} ({paper.year})
          </div>
          <div className="text-primary font-mono">{paper.doi}</div>
        </div>

        {/* Abstract */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-subtle flex flex-col gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-semibold">
            Peer-Reviewed Abstract
          </span>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {paper.abstract}
          </p>
        </div>

        {/* Footer actions */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between">
          <span className="text-xs text-text-muted font-mono">
            WestCoast Computational Bio-Lab Archive
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopyCitation}
              className="px-3.5 py-1.5 rounded-full bg-surface-container-high text-xs text-text-primary hover:bg-surface-bright transition-colors flex items-center gap-1 border border-subtle cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Citation Copied' : 'Copy Citation (BibTeX)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
