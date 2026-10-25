/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const [sovereignMode, setSovereignMode] = useState(true);
  const [physicianSync, setPhysicianSync] = useState(true);
  const [downloadMsg, setDownloadMsg] = useState(false);

  if (!isOpen) return null;

  const handleExportFHIR = () => {
    const fhirRecord = {
      resourceType: 'Bundle',
      id: 'zw-wearer-biometrics-bundle-2025',
      type: 'collection',
      entry: [
        {
          resource: {
            resourceType: 'Observation',
            status: 'final',
            code: { text: 'Thoracic Respiratory Resonant Frequency' },
            valueQuantity: { value: 48.2, unit: 'Hz' },
          },
        },
        {
          resource: {
            resourceType: 'Observation',
            status: 'final',
            code: { text: 'Sub-Dermal Ethanol Transdermal Spectrometry' },
            valueQuantity: { value: 0.02, unit: '%' },
          },
        },
        {
          resource: {
            resourceType: 'Observation',
            status: 'final',
            code: { text: 'Galvanic Interstitial Sweat Electrolytes' },
            valueQuantity: { value: 88.4, unit: 'mEq/L' },
          },
        },
      ],
    };

    const blob = new Blob([JSON.stringify(fhirRecord, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ZoeWear_FHIR_Biometric_Telemetry.json';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadMsg(true);
    setTimeout(() => setDownloadMsg(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.profileAvatar}
              alt="Biometric Profile"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-container"
            />
            <div>
              <h3 className="font-display text-headline-sm text-text-primary leading-tight">
                Wearer Biometric Profile
              </h3>
              <span className="text-xs text-circuit-gold font-mono">
                ZW-KEY // SOVEREIGN ENCLAVE #4491
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

        {/* Status Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle flex flex-col gap-1">
            <span className="text-text-muted font-mono uppercase">Encryption Enclave</span>
            <span className="text-primary font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> On-Device AES-256
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle flex flex-col gap-1">
            <span className="text-text-muted font-mono uppercase">Paired Wearables</span>
            <span className="text-circuit-gold font-semibold">2 Active Silhouettes</span>
          </div>
        </div>

        {/* Paired Garments */}
        <div className="flex flex-col gap-2">
          <span className="font-label-sm text-xs text-text-muted uppercase tracking-wider">
            Active Connected Garments
          </span>
          <div className="space-y-1.5">
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">styler</span>
                <span className="text-text-primary font-medium">Fluid Kinetic Blazer 01</span>
              </div>
              <span className="text-primary font-mono">Synced (98% batt)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-circuit-gold text-[18px]">watch</span>
                <span className="text-text-primary font-medium">DrunkWatch™ Titanium Cuff v4.8</span>
              </div>
              <span className="text-circuit-gold font-mono">Calibrated (100%)</span>
            </div>
          </div>
        </div>

        {/* Privacy Toggles */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-subtle">
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="text-text-primary font-medium">Self-Sovereign Telemetry</span>
              <span className="text-text-muted text-[11px]">
                Never upload raw physiological wave vectors to external servers
              </span>
            </div>
            <input
              type="checkbox"
              checked={sovereignMode}
              onChange={(e) => setSovereignMode(e.target.checked)}
              className="accent-primary-container cursor-pointer w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="text-text-primary font-medium">Direct Physician HL7/FHIR Link</span>
              <span className="text-text-muted text-[11px]">
                Auto-sync emergency metabolic spikes to verified medical team
              </span>
            </div>
            <input
              type="checkbox"
              checked={physicianSync}
              onChange={(e) => setPhysicianSync(e.target.checked)}
              className="accent-primary-container cursor-pointer w-4 h-4"
            />
          </div>
        </div>

        {/* Export & Actions */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between">
          <button
            onClick={handleExportFHIR}
            className="px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-xs text-text-primary transition-colors flex items-center gap-1.5 border border-subtle cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export FHIR JSON</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

        {downloadMsg && (
          <div className="text-center text-xs text-primary font-mono animate-fadeIn">
            ✓ Exported encrypted FHIR bundle to downloads.
          </div>
        )}
      </div>
    </div>
  );
};
