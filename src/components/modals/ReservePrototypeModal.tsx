/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ReservePrototypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototypeName: string;
}

export const ReservePrototypeModal: React.FC<ReservePrototypeModalProps> = ({
  isOpen,
  onClose,
  prototypeName,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('Custom Atelier Measurement');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationToken, setReservationToken] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = 'ZW-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setReservationToken(token);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary-container/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
            <h3 className="font-display text-headline-sm text-text-primary">
              Prototype Reservation Atelier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-bright transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <div>
              <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-wider block">
                Selected Artifact
              </span>
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle text-primary font-display text-headline-sm mt-1">
                {prototypeName || 'Bespoke Cyber-Couture Prototype'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-label-sm text-label-sm text-text-muted uppercase block">
                  Wearer Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aria Alexander"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-container-low border border-subtle text-text-primary text-sm focus:outline-none focus:border-primary-container"
                />
              </div>
              <div>
                <label className="font-label-sm text-label-sm text-text-muted uppercase block">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="wearer@couture.com"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-container-low border border-subtle text-text-primary text-sm focus:outline-none focus:border-primary-container"
                />
              </div>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-text-muted uppercase block">
                Sizing & Tailoring Profile
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-container-low border border-subtle text-text-primary text-sm focus:outline-none focus:border-primary-container"
              >
                <option>Custom Atelier Measurement (San Francisco Studio)</option>
                <option>EU 38 / US S (Biometric Fitted)</option>
                <option>EU 40 / US M (Biometric Fitted)</option>
                <option>EU 42 / US L (Biometric Fitted)</option>
                <option>Footwear US 7 / EU 40</option>
                <option>Footwear US 9 / EU 42</option>
                <option>Footwear US 11 / EU 44</option>
                <option>DrunkWatch™ Titanium Wrist Cuff (160mm - 210mm)</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-text-muted uppercase block">
                Bespoke Specifications / Physiological Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred conductive thread finish (gold vs stealth cyan), skin sensitivity notes..."
                className="w-full mt-1 px-3 py-2 rounded-lg bg-surface-container-low border border-subtle text-text-primary text-sm focus:outline-none focus:border-primary-container resize-none"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer mt-1 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-primary-container cursor-pointer"
              />
              <span>
                I agree to zero-knowledge biometric calibration under ISO 13485 standards. Personal sensor records are encrypted on-device.
              </span>
            </label>

            <div className="mt-2 pt-3 border-t border-subtle flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-surface-container-high text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!consent}
                className="px-5 py-2 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                Confirm Prototype Allocation
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 flex flex-col items-center text-center gap-3 py-4">
            <div className="w-14 h-14 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center border border-primary-container/40">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>
            <h4 className="font-display text-headline-sm text-text-primary">
              Atelier Prototype Reserved
            </h4>
            <p className="text-sm text-on-surface-variant max-w-sm">
              Your bespoke fitting appointment and hardware allocation token have been generated:
            </p>
            <div className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-border-luminous/40 font-mono text-circuit-gold text-lg font-bold">
              {reservationToken}
            </div>
            <p className="text-xs text-text-muted">
              A private concierge courier dispatch will coordinate fitting at your specified address.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
