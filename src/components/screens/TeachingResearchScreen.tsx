/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ASSETS, RESEARCH_PAPERS, ACADEMIC_MODULES } from '../../data/mockData';
import { NavPage, ResearchPaper, CourseModule } from '../../types';

interface TeachingResearchScreenProps {
  onNavigate: (page: NavPage) => void;
  onOpenPaper: (paper: ResearchPaper) => void;
  onOpenKeynote: (title: string, slidesCount: number) => void;
}

export const TeachingResearchScreen: React.FC<TeachingResearchScreenProps> = ({
  onNavigate,
  onOpenPaper,
  onOpenKeynote,
}) => {
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    discipline: 'Transdermal Biosensors & DrunkWatch™ Mechanics',
    abstract: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleDownloadSyllabus = () => {
    const syllabusContent = `WestCoast Institute of Cyber-Couture & Wearable Tech
Academic Curricula Syllabus 2025.2
IRB Protocol: WC-409 | IEEE/HCI Standardized

Module 1: NewFashion & CoreTech (16 Weeks)
Module 2: Phygital Transformation & Digital Twins (14 Weeks)
Module 3: AI / ML in Haute Couture & TensorFlow Serving (16 Weeks)
Module 4: Sustainable Bio-Polymers & Regenerative Silk (12 Weeks)

Governance: HIPAA compliant zero-knowledge telemetry.
ZoeWear Technologies Corp. Academic Outreach.`;
    const blob = new Blob([syllabusContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WestCoast_BioCouture_Syllabus_2025.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle ambient top gradient flare */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[580px] h-[340px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-12 right-12 w-[320px] h-[220px] bg-circuit-gold/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Editorial Header / Curricular Vision */}
        <section className="max-w-7xl mx-auto px-margin pt-6 pb-space-xl">
          {/* Scholarly Breadcrumb & Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-lg">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
              <span className="text-circuit-gold">WestCoast Institute</span>
              <span className="text-text-muted">/</span>
              <span className="text-primary-container">Bio-Couture Curricula</span>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">SYLLABUS 2025.2</span>
            </div>
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-circuit-gold/30">
              <span className="w-2 h-2 rounded-full bg-circuit-gold animate-pulse" />
              <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-wider font-semibold">
                Summer Fellowships Active
              </span>
            </div>
          </div>

          {/* Main Asymmetric Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <span className="font-label-lg text-label-lg text-primary tracking-widest uppercase flex items-center gap-2">
                <span className="inline-block w-8 h-[1px] bg-primary-container" />
                Academic & Clinical Fellowship
              </span>
              <h1 className="font-display text-display text-text-primary tracking-tight max-w-4xl">
                Building the Future: Interdisciplinary Fashion, Technology & Healthcare Curricula
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Teaching fashion, technology, and health as a unified discipline ensures that technology performs optimally while meeting rigorous aesthetic and ergonomic standards. At WestCoast Lab, we discard the boundary between sterile medical monitors and bespoke runway ateliers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                <a
                  className="px-space-xl py-3.5 rounded-full bg-primary-container text-surface-obsidian font-headline-sm text-headline-sm hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-all flex items-center gap-space-xs cursor-pointer font-semibold"
                  href="#fellowship"
                >
                  Apply for Research Fellowship
                  <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                </a>
                <button
                  onClick={handleDownloadSyllabus}
                  className="px-space-xl py-3.5 rounded-full bg-surface-container-high text-text-primary font-headline-sm text-headline-sm hover:bg-surface-container-highest transition-all flex items-center gap-space-xs shadow-md border border-subtle cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary-container text-[20px]">download</span>
                  Download Academic Syllabus
                </button>
              </div>
            </div>

            {/* Telemetry Spec Card (Right Spanning Metadata) */}
            <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-lg shadow-xl relative overflow-hidden flex flex-col gap-space-md border border-subtle">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-widest font-semibold">
                  Lab Metric Index
                </span>
                <span className="font-label-sm text-label-sm text-text-muted font-mono">[ PROTOCOL // WC-409 ]</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="bg-surface-container rounded-lg p-space-sm border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase block">Active Cohorts</span>
                  <span className="font-display text-headline-md text-text-primary">14 Labs</span>
                </div>
                <div className="bg-surface-container rounded-lg p-space-sm border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase block">Peer-Reviewed</span>
                  <span className="font-display text-headline-md text-primary-container">48 Papers</span>
                </div>
                <div className="bg-surface-container rounded-lg p-space-sm border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase block">Sensor Matrix</span>
                  <span className="font-display text-headline-md text-text-primary">32 Channels</span>
                </div>
                <div className="bg-surface-container rounded-lg p-space-sm border border-subtle">
                  <span className="font-label-sm text-label-sm text-text-muted uppercase block">Patents Granted</span>
                  <span className="font-display text-headline-md text-circuit-gold">11 Global</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 rounded-lg p-space-sm flex flex-col gap-1 border border-subtle">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Syllabus Compliance</span>
                  <span className="text-primary-container font-semibold">99.4% IEEE/HCI</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full w-[99.4%] shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant italic leading-normal">
                "We construct wearable artifacts that interpret living physiology without imposing the clinical burden of disease."
              </p>
            </div>
          </div>
        </section>

        {/* Lab Feature Imagery Strip */}
        <section className="max-w-7xl mx-auto px-margin py-space-md" id="labs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
            <div className="md:col-span-7 rounded-xl overflow-hidden bg-surface-container shadow-xl relative min-h-[340px] border border-subtle group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Close up high-precision macro photography of conductive silver threads woven into fine dark cashmere and silk"
                src={ASSETS.textileFoundry}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/40 to-transparent p-space-lg flex flex-col justify-end">
                <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-widest font-semibold">
                  [ LAB 01 // TEXTILE FOUNDRY ]
                </span>
                <h3 className="font-headline-md text-headline-md text-text-primary">
                  Conductive Weft Micro-Integration
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg mt-1">
                  Precision automated looms interpolating insulated gold micro-leads with organic Merino fibers for zero-impedance biosensing.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 rounded-xl overflow-hidden bg-surface-container shadow-xl relative min-h-[340px] border border-subtle group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Futuristic university research laboratory with graduate design students inspecting a holographic 3D mannequin draped in glowing biometric cyber-garments"
                src={ASSETS.virtualAtelier}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/40 to-transparent p-space-lg flex flex-col justify-end">
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest font-semibold">
                  [ LAB 04 // VIRTUAL ATELIER ]
                </span>
                <h3 className="font-headline-md text-headline-md text-text-primary">
                  Real-Time Twin Synthesis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Physics-accurate drape mechanics simulated directly from live pulse and respiratory input feeds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curricular Catalog (Four Pillars) */}
        <section className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg" id="syllabus">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg">
            <div>
              <span className="font-label-sm text-label-sm text-circuit-gold tracking-widest uppercase font-semibold">
                Four Core Academic Modules
              </span>
              <h2 className="font-headline-lg text-headline-lg text-text-primary mt-1">
                Interdisciplinary Course Catalog
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Graduates master the synthesis of haute couture tailoring and medical-grade bio-telemetry computation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {ACADEMIC_MODULES.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className={`bg-surface-container-low rounded-xl p-space-lg shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group border cursor-pointer ${
                  selectedModule?.id === mod.id
                    ? 'border-primary-container shadow-[0_0_16px_rgba(0,229,255,0.25)]'
                    : 'border-subtle hover:border-border-luminous/40'
                }`}
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm border border-subtle">
                      0{mod.number}
                    </span>
                    <span className="font-label-sm text-label-sm text-text-muted font-mono">
                      {mod.duration}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary-container transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <div className="pt-space-md flex flex-wrap gap-1">
                  {mod.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm border border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedModule && (
            <div className="mt-space-md p-space-lg rounded-xl bg-surface-container border border-primary-container/40 flex flex-col md:flex-row items-center justify-between gap-space-md animate-fadeIn">
              <div>
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold">
                  Active Syllabus Inspection: Module 0{selectedModule.number}
                </span>
                <h4 className="font-headline-sm text-headline-sm text-text-primary mt-0.5">
                  {selectedModule.title} ({selectedModule.duration})
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Prerequisites: Differential Equations, Textile Fabrication, Python/C++ Embedded Basics.
                </p>
              </div>
              <button
                onClick={handleDownloadSyllabus}
                className="px-space-md py-2 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wide hover:shadow-lg transition-all font-semibold"
              >
                Get Syllabus PDF
              </button>
            </div>
          )}
        </section>

        {/* WestCoast Academic Research Portal */}
        <section className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg" id="whitepapers">
          <div className="bg-surface-slate rounded-2xl p-space-xl shadow-2xl relative overflow-hidden border border-subtle">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
              <div>
                <span className="font-label-sm text-label-sm text-primary-container tracking-widest uppercase font-semibold">
                  WestCoast Academic Research Portal
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary">
                  Scholarly Citations & Whitepapers
                </h2>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Archived in IEEE, ACM, Nature-Biotech
                </span>
              </div>
            </div>

            {/* Research Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              {RESEARCH_PAPERS.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col justify-between border border-subtle hover:border-border-luminous/40 transition-all group"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between font-label-sm text-label-sm text-circuit-gold font-mono">
                      <span>{paper.volume}</span>
                      <span className="text-text-muted">{paper.badge}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-text-primary group-hover:text-primary transition-colors">
                      {paper.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {paper.authors}. Published in <em className="text-text-primary">{paper.journal}</em>.
                    </p>
                  </div>
                  <div className="pt-space-md flex items-center justify-between border-t border-subtle mt-space-sm">
                    <span className="font-label-sm text-label-sm text-primary-container font-mono">
                      {paper.doi}
                    </span>
                    <button
                      onClick={() => onOpenPaper(paper)}
                      title="Read Paper Abstract"
                      className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary-container transition-colors flex items-center cursor-pointer border border-subtle"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Keynote Archive Strip */}
            <div className="mt-space-lg pt-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest/60 rounded-xl p-space-md border border-subtle">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-full bg-circuit-gold/20 flex items-center justify-center text-circuit-gold border border-circuit-gold/30">
                  <span className="material-symbols-outlined text-[22px]">podium</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-text-primary block">
                    Lecture Presentations & Symposiums
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Direct access to keynote slide decks & workshop audio
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <button
                  onClick={() => onOpenKeynote('ETsig Keynote 2024: The Architecture of Smart Couture', 38)}
                  className="px-space-md py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:text-primary transition-colors flex items-center gap-1.5 border border-subtle cursor-pointer"
                >
                  <span>ETsig Keynote 2024</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
                <button
                  onClick={() => onOpenKeynote('Silicon Valley Code Camp: Wearable ML with TensorFlow', 44)}
                  className="px-space-md py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:text-primary transition-colors flex items-center gap-1.5 border border-subtle cursor-pointer"
                >
                  <span>Silicon Valley Code Camp</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
                <button
                  onClick={() => onOpenKeynote('DevFest TechFashion Deck: Future of Sensory Fabrics', 52)}
                  className="px-space-md py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:text-primary transition-colors flex items-center gap-1.5 border border-subtle cursor-pointer"
                >
                  <span>DevFest TechFashion Deck</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Student Projects & Summer Fellowship Application Section */}
        <section className="max-w-7xl mx-auto px-margin pt-space-lg pb-space-xl" id="fellowship">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Student Project Archive Preview */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-circuit-gold uppercase tracking-widest font-semibold">
                  Student Work Index
                </span>
                <h3 className="font-headline-lg text-headline-lg text-text-primary">
                  Featured Graduate Inventions
                </h3>
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-subtle">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span className="text-primary-container font-mono">[ PROJECT 089 ]</span>
                  <span>Class of 2024 Cohort</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-text-primary">
                  RespiratOne: Vocal Cord Haptic Corset
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  An ergonomic bustier utilizing micro-piezoelectric films to provide real-time haptic diaphragm guidance for opera performers and respiratory recovery patients.
                </p>
                <div className="flex items-center gap-space-xs pt-1">
                  <span className="text-circuit-gold text-label-sm font-label-sm font-semibold">
                    Winner: Prix de l'Innovation Paris 2024
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-subtle">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span className="text-primary-container font-mono">[ PROJECT 094 ]</span>
                  <span>Class of 2024 Cohort</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-text-primary">
                  NeuralDrape: Predictive Silk Shirring
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Garments wired with low-voltage shape memory alloys that physically contract or expand in response to user autonomic heart-rate variability.
                </p>
                <div className="flex items-center gap-space-xs pt-1">
                  <span className="text-circuit-gold text-label-sm font-label-sm font-semibold">
                    Honorable Mention: MIT Media Lab BioSummit
                  </span>
                </div>
              </div>
            </div>

            {/* Summer Fellowship Interactive Portal Form */}
            <div className="lg:col-span-7 bg-surface-container rounded-2xl p-space-xl shadow-2xl flex flex-col justify-between border border-subtle">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest font-semibold">
                    Admissions & Grants
                  </span>
                  <span className="px-space-sm py-0.5 rounded-full bg-circuit-gold/15 text-circuit-gold font-label-sm text-label-sm border border-circuit-gold/30">
                    Summer 2025 Cohort Open
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-text-primary">
                  Apply for WestCoast Research Fellowship
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Open to graduate researchers, biomaterial chemists, and couturiers interested in spending 12 weeks at our San Francisco bio-textiles prototyping studio.
                </p>

                {/* Form */}
                {!formSubmitted ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-sm" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-text-muted uppercase">
                        Full Name
                      </label>
                      <input
                        className="w-full bg-surface-container-low rounded-lg p-2.5 text-text-primary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-subtle transition-colors"
                        placeholder="Dr. Elena Rossi"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-text-muted uppercase">
                        Institutional Affiliation
                      </label>
                      <input
                        className="w-full bg-surface-container-low rounded-lg p-2.5 text-text-primary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-subtle transition-colors"
                        placeholder="University / Studio Name"
                        required
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-label-sm text-label-sm text-text-muted uppercase">
                        Academic Email
                      </label>
                      <input
                        className="w-full bg-surface-container-low rounded-lg p-2.5 text-text-primary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-subtle transition-colors"
                        placeholder="researcher@lab.edu"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-label-sm text-label-sm text-text-muted uppercase">
                        Focus Discipline
                      </label>
                      <select
                        className="w-full bg-surface-container-low rounded-lg p-2.5 text-text-primary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-subtle transition-colors"
                        value={formData.discipline}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      >
                        <option>Transdermal Biosensors & DrunkWatch™ Mechanics</option>
                        <option>Smart Textile Weave & Micro-Electronics</option>
                        <option>Generative AI / ML Biometric Drapery</option>
                        <option>Regenerative Bio-Polymer Synthesis</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-label-sm text-label-sm text-text-muted uppercase">
                        Abstract / Proposal Link (Max 300 Words)
                      </label>
                      <textarea
                        className="w-full bg-surface-container-low rounded-lg p-2.5 text-text-primary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-subtle transition-colors resize-none"
                        placeholder="Summarize your experimental hypothesis and required laboratory equipment..."
                        rows={3}
                        required
                        value={formData.abstract}
                        onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 pt-space-xs flex flex-col md:flex-row items-center justify-between gap-space-sm">
                      <span className="font-label-sm text-label-sm text-text-muted">
                        Deadline: May 15, 2025. Fully Funded Stipend.
                      </span>
                      <button
                        className="w-full md:w-auto px-space-xl py-3 rounded-full bg-primary-container text-surface-obsidian font-headline-sm text-headline-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer font-semibold"
                        type="submit"
                      >
                        Submit Research Proposal
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low border border-primary-container text-primary-container flex flex-col gap-3 animate-fadeIn">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[28px]">check_circle</span>
                      <span className="font-headline-sm text-headline-sm text-text-primary">
                        Proposal Dispatch Received: #{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Academic review sequence initiated for {formData.name || 'Applicant'} ({formData.email || 'your email'}). Confirmation receipt sent to academic registry.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="self-start text-xs text-primary underline hover:text-text-primary mt-1"
                    >
                      Submit another proposal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Ethics & Calibration Accordion / Manifest */}
        <section className="max-w-7xl mx-auto px-margin pt-space-md pb-space-xl">
          <div className="bg-surface-container-lowest/80 rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-lg border border-subtle">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-circuit-gold/10 flex items-center justify-center text-circuit-gold shrink-0 border border-circuit-gold/20">
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <div>
                <span className="font-headline-sm text-headline-sm text-text-primary block">
                  IRB & Clinical Privacy Governance
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
                  All academic telemetry curricula operate under strict end-to-end encrypted biometric zero-knowledge protocols. Human physiological data remains the uncompromised property of the wearer.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-space-xs">
              <span className="px-space-md py-1.5 rounded-full bg-surface-container font-label-sm text-label-sm text-circuit-gold border border-subtle">
                HIPAA & GDPR Aware
              </span>
              <span className="px-space-md py-1.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary-container border border-subtle">
                ISO 13485 Standardized
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
