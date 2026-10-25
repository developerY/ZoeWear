/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface TelemetryDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryDiagnosticsModal: React.FC<TelemetryDiagnosticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[09:41:02] BLE 5.4 Mesh: Handshake established with Sub-Dermal Ring Node.',
    '[09:41:03] Transdermal Impedance: 41.8 kΩ (Optimal contact).',
    '[09:41:05] TensorFlow Lite Serving: Neural clustering online (latency 11.2ms).',
  ]);

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= 4) {
          setIsScanning(false);
          setLogs((l) => [
            `[${new Date().toLocaleTimeString()}] Diagnostic sweep complete. All 32 sensor channels reporting NOMINAL (99.8% precision).`,
            ...l,
          ]);
          return 4;
        }
        const next = prev + 1;
        const msg = [
          'Sweeping Thoracic Conductive Strands... SNR 38dB (OK)',
          'Sampling Epidermal Interstitial Sweat Metabolites... Zero lag (OK)',
          'Verifying SwiftMonster Plantar Pressure Arrays... 16/16 cells calibrated (OK)',
          'Running AES-256 Sovereign Encryption Handshake... Verified (OK)',
        ][prev];
        setLogs((l) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...l]);
        return next;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [isScanning]);

  if (!isOpen) return null;

  const startSweep = () => {
    setIsScanning(true);
    setScanStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-obsidian/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container border border-border-luminous/40 shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-space-lg overflow-hidden flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping" />
            <div>
              <h3 className="font-display text-headline-sm text-text-primary leading-tight">
                Live Biosignal Diagnostic HUD
              </h3>
              <span className="text-xs text-text-muted font-mono">
                HARDWARE FW: v4.8.2 // ZERO-KNOWLEDGE BUS
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

        {/* Channel Health Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle">
            <span className="text-[10px] text-text-muted uppercase block font-mono">CH 01: Thoracic</span>
            <span className="text-sm font-semibold text-primary-container">48.2 Hz</span>
            <span className="text-[10px] text-primary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Synced
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle">
            <span className="text-[10px] text-text-muted uppercase block font-mono">CH 02: Interstitial</span>
            <span className="text-sm font-semibold text-circuit-gold">0.02% BAC</span>
            <span className="text-[10px] text-circuit-gold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-circuit-gold" /> Cleared
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle">
            <span className="text-[10px] text-text-muted uppercase block font-mono">CH 03: Electrolytes</span>
            <span className="text-sm font-semibold text-secondary">88.4 mEq/L</span>
            <span className="text-[10px] text-secondary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Stable
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-subtle">
            <span className="text-[10px] text-text-muted uppercase block font-mono">CH 04: Plantar Sole</span>
            <span className="text-sm font-semibold text-text-primary">16 / 16 Nodes</span>
            <span className="text-[10px] text-primary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
            </span>
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs text-text-muted font-mono">
            <span>TELEMETRY SUBSYSTEM STREAM:</span>
            <span className="text-primary-container">TLS 1.3 ENCRYPTED</span>
          </div>
          <div className="h-40 rounded-lg bg-surface-obsidian p-3 font-mono text-xs overflow-y-auto flex flex-col gap-1.5 border border-subtle">
            {logs.map((log, index) => (
              <div key={index} className="text-on-surface-variant leading-relaxed">
                <span className="text-text-muted">{log.slice(0, 10)}</span>
                <span className="text-primary">{log.slice(10)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-2 border-t border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-circuit-gold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>ISO 13485 Calibration: Validated</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={startSweep}
              disabled={isScanning}
              className="px-4 py-2 rounded-full bg-primary-container text-surface-obsidian text-xs font-semibold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <span className={`material-symbols-outlined text-[16px] ${isScanning ? 'animate-spin' : ''}`}>
                autorenew
              </span>
              <span>{isScanning ? 'Sweeping Bus...' : 'Trigger Full HW Sweep'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-surface-container-high text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
