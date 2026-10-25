/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavPage } from '../types';
import { ZOEWEAR_INSIGNIA } from '../data/mockData';

export interface SubmenuItem {
  id: string;
  title: string;
  sublabel?: string;
  sectionId?: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
}

export interface NavTabConfig {
  id: NavPage;
  label: string;
  categoryTitle: string;
  subheading?: string;
  items: SubmenuItem[];
  featuredCard?: {
    title: string;
    description: string;
    badge: string;
    imageUrl?: string;
    actionSection?: string;
  };
}

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage, sectionId?: string) => void;
  onOpenSearch: () => void;
  onOpenDiagnostics: () => void;
  onOpenProfile: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  liveBpm: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenDiagnostics,
  onOpenProfile,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount,
  liveBpm,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<NavPage | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<NavPage | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration of Tabs with Submenus (like standard website: ZoeNude, MAC, Apple)
  const navTabs: NavTabConfig[] = [
    {
      id: 'home',
      label: 'HOME',
      categoryTitle: 'BRAND & MANIFESTO',
      items: [
        {
          id: 'overview',
          title: 'Brand Vision & Overview',
          sublabel: 'Biometric telemetry and couture philosophy',
          sectionId: 'overview',
        },
        {
          id: 'dimensions',
          title: 'Five Core Dimensions',
          sublabel: 'Fashion, Tech, Fusion, DrunkWatch & Labs',
          sectionId: 'dimensions',
        },
        {
          id: 'spotlight',
          title: 'Curated Runway Silhouettes',
          sublabel: 'High-fashion prototypes with invisible circuitry',
          sectionId: 'spotlight',
          badge: 'New Season',
        },
      ],
    },
    {
      id: 'shop',
      label: 'SHOP',
      categoryTitle: 'ATELIER FORMULATIONS & PIECES',
      items: [
        {
          id: 'all',
          title: 'All Atelier Formulations',
          sublabel: 'Complete catalogue of garments & care',
          sectionId: 'all',
        },
        {
          id: 'biomimetic-nude-veil',
          title: 'Complexion Veil · Biomimetic Nude',
          sublabel: 'Impedance-balancing second-skin veil (50ml)',
          sectionId: 'biomimetic-nude-veil',
          badge: 'Atelier 04',
          badgeColor: 'text-[#FFB703] bg-[#FFB703]/10',
        },
        {
          id: 'swiftmonster-mountain',
          title: 'SwiftMonster™ Mountain Boot',
          sublabel: 'Sub-zero carbon nanotube heating',
          sectionId: 'swiftmonster-mountain',
          badge: '$840 USD',
        },
        {
          id: 'transdermal-silk-gown',
          title: 'Transdermal Silk Biometric Gown',
          sublabel: 'Pure mulberry silk with thread No. 889',
          sectionId: 'transdermal-silk-gown',
          badge: 'Haute Couture',
        },
        {
          id: 'drunkwatch-spectro-cuff',
          title: 'DrunkWatch™ Micro-Spectrometry Cuff',
          sublabel: 'Autonomous metabolic optical sensor',
          sectionId: 'drunkwatch-spectro-cuff',
          badge: '$540 USD',
        },
        {
          id: 'breathe-thoracic-sensor',
          title: '"Breathe" Thoracic Sensor Pod',
          sublabel: '4.8L lung capacitance clip-on unit',
          sectionId: 'breathe-thoracic-sensor',
          badge: '$420 USD',
        },
      ],
    },
    {
      id: 'fashion',
      label: 'FASHION',
      categoryTitle: 'RUNWAY & FOOTWEAR',
      items: [
        {
          id: 'all-fashion',
          title: 'All Runway Silhouettes',
          sublabel: 'Haute cyber-couture lookbook',
        },
        {
          id: 'swiftmonster',
          title: 'SwiftMonster™ Footwear',
          sublabel: 'Alpine Mountain & Hydrodynamic Beach footwear',
          sectionId: 'swiftmonster',
          badge: 'Dual Series',
          badgeColor: 'text-[#00e5ff] bg-[#00e5ff]/10',
        },
        {
          id: 'lookbook',
          title: 'Cyber-Couture Lookbook',
          sublabel: 'Silk Gown, Cyber-Trench, Blazer & Opto-Merino',
          sectionId: 'lookbook',
        },
        {
          id: 'calculator',
          title: 'Wearer Acceptance Calculator',
          sublabel: 'Interactive compliance & drape ergonomics',
          sectionId: 'calculator',
          badge: 'Interactive',
          badgeColor: 'text-[#4cd6fb] bg-[#4cd6fb]/10',
        },
      ],
    },
    {
      id: 'tech',
      label: 'TECH',
      categoryTitle: 'HARDWARE & KERNEL MATRIX',
      items: [
        {
          id: 'pillars',
          title: 'Four Technological Pillars',
          sublabel: 'AI engine, blockchain passport, 3D printing & watches',
          sectionId: 'pillars',
        },
        {
          id: 'smartwatch',
          title: 'Wear OS & watchOS Matrix',
          sublabel: 'Ultra-low latency micro-app engine',
          sectionId: 'smartwatch',
          badge: 'Ultra & Series 10',
        },
        {
          id: 'terminal',
          title: 'Virtual Terminal Console',
          sublabel: 'Interactive telemetry debug kernel',
          sectionId: 'terminal',
          badge: 'Port 9042',
          badgeColor: 'text-[#FFB703] bg-[#FFB703]/10',
        },
        {
          id: 'convergence',
          title: 'Convergence Pipeline',
          sublabel: 'Micro-sensory weave to encrypted ledger passports',
          sectionId: 'convergence',
        },
        {
          id: 'keynotes',
          title: 'Keynote Presentation Decks',
          sublabel: 'ETsig, SVCC & DevFest technical slide archives',
          sectionId: 'keynotes',
        },
      ],
    },
    {
      id: 'fusion',
      label: 'FUSION',
      categoryTitle: 'BIOMEDICAL & RESPIRATORY',
      items: [
        {
          id: 'fabric-matrix',
          title: 'Transdermal Fabric Matrix',
          sublabel: 'Conductive thread No. 889 with 98.8% conductance',
          sectionId: 'fabric-matrix',
        },
        {
          id: 'breathe-app',
          title: '"Breathe" Respiratory Diagnostics',
          sublabel: 'Thoracic strain sensor tracking lung volume & stress tone',
          sectionId: 'breathe-app',
          badge: 'Pro Beta',
          badgeColor: 'text-[#00e5ff] bg-[#00e5ff]/10',
        },
        {
          id: 'cleanroom',
          title: 'Station 4 Cleanroom Lab',
          sublabel: 'Bio-sensory clinical validation facility',
          sectionId: 'cleanroom',
        },
        {
          id: 'curriculum',
          title: 'Clinical Pathology Curriculum',
          sublabel: 'Academic triad connecting medicine with fashion',
          sectionId: 'curriculum',
        },
      ],
    },
    {
      id: 'drunkwatch',
      label: 'DRUNKWATCH™',
      categoryTitle: 'METABOLIC BIOMETRIC GUARDIAN',
      items: [
        {
          id: 'simulator',
          title: 'Interactive BAC Dial Simulator',
          sublabel: 'Radial dial, metabolic states & impedance sweep',
          sectionId: 'simulator',
          badge: 'Live Sim',
          badgeColor: 'text-[#00e5ff] bg-[#00e5ff]/10',
        },
        {
          id: 'pillars',
          title: 'Four Metabolic Defense Pillars',
          sublabel: 'Spectroscopy, osmolarity, haptics & concierge',
          sectionId: 'pillars',
        },
        {
          id: 'chaperone',
          title: 'Encrypted Chaperone Concierge',
          sublabel: 'Zero-touch geofenced rideshare dispatch',
          sectionId: 'chaperone',
        },
        {
          id: 'compliance',
          title: 'DOT & NHTSA Compliance Specs',
          sublabel: 'Calibrated laboratory blood-alcohol standards',
          sectionId: 'compliance',
        },
      ],
    },
    {
      id: 'teaching-and-research',
      label: 'TEACHING & RESEARCH',
      categoryTitle: 'SCHOLARSHIP & PAPERS',
      items: [
        {
          id: 'labs',
          title: 'Phygital Textile Foundry',
          sublabel: 'Advanced biomaterial spinning & weaving facilities',
          sectionId: 'labs',
        },
        {
          id: 'syllabus',
          title: 'Four Core Academic Modules',
          sublabel: 'Haute Couture, Phygital Transformation & AI/ML',
          sectionId: 'syllabus',
          badge: 'Syllabi PDFs',
        },
        {
          id: 'whitepapers',
          title: 'Peer-Reviewed DOIs & Whitepapers',
          sublabel: 'IEEE, ACM Transactions & Nature-Biotech papers',
          sectionId: 'whitepapers',
          badge: 'Open Access',
          badgeColor: 'text-[#FFB703] bg-[#FFB703]/10',
        },
        {
          id: 'fellowship',
          title: 'Summer Research Fellowship',
          sublabel: 'Graduate admissions & biomaterial chemist portal',
          sectionId: 'fellowship',
        },
      ],
    },
  ];

  // Mouse hover handlers with graceful timeout to prevent flickering
  const handleMouseEnter = (tabId: NavPage) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(tabId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleItemClick = (page: NavPage, sectionId?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Top Telemetry & Announcement Ribbon (like ZoeNude / MAC) */}
      <div className="w-full bg-[#0a0e14]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[#bac9cc] font-['Space_Grotesk'] text-[11px] leading-4 tracking-[0.08em] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
            <span className="tracking-wider uppercase text-[#F8FAFC]">ZoeWear Atelier</span>
            <span className="text-[rgba(255,255,255,0.15)] hidden sm:inline">·</span>
            <span className="text-[#94A3B8] hidden sm:inline">Fall/Winter Biometric Cyber-Couture Showcase</span>
          </div>

          <div className="flex items-center gap-4 text-[#94A3B8]">
            <button
              onClick={onOpenDiagnostics}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#182030] border border-[rgba(0,229,255,0.3)] text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors cursor-pointer"
              title="Open Live Telemetry Diagnostics"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping"></span>
              <span className="tracking-widest uppercase text-[10px]">{liveBpm} BPM Live Biosignal</span>
            </button>
            <span className="text-[rgba(255,255,255,0.15)] hidden md:inline">·</span>
            <span className="tracking-widest uppercase text-[#FFB703] hidden md:inline">Complimentary White-Glove Insured Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="w-full bg-[#121824]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-[rgba(255,255,255,0.08)] relative">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="relative">
              <img
                alt="ZoeWear Insignia"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[rgba(0,229,255,0.5)] group-hover:scale-105 transition-transform"
                src={ZOEWEAR_INSIGNIA}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00e5ff] border-2 border-[#0B0F15]"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-lg font-bold tracking-wider text-[#F8FAFC] leading-none group-hover:text-[#00e5ff] transition-colors">
                ZOEWEAR
              </span>
              <span className="font-['Space_Grotesk'] text-[9px] tracking-widest text-[#00e5ff] leading-tight uppercase">
                CYBER-COUTURE
              </span>
            </div>
          </button>

          {/* Desktop Tabs Across the Top (like Apple / ZoeNude / MAC) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 font-['Space_Grotesk'] text-xs tracking-wider font-semibold relative h-full"
            onMouseLeave={handleMouseLeave}
          >
            {navTabs.map((tab) => {
              const isActive = currentPage === tab.id;
              const isHovered = activeDropdown === tab.id;

              return (
                <div
                  key={tab.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(tab.id)}
                >
                  <button
                    onClick={() => handleItemClick(tab.id)}
                    className={`h-full px-3 py-2 flex items-center gap-1 transition-colors cursor-pointer relative ${
                      isActive
                        ? 'text-[#00e5ff]'
                        : isHovered
                        ? 'text-[#F8FAFC]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-[#00e5ff]' : 'text-[#94A3B8]/60'
                      }`}
                    >
                      expand_more
                    </span>

                    {/* Underline indicator for active or hovered tab (like ZoeNude / MAC) */}
                    {(isActive || isHovered) && (
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all ${
                          isActive ? 'bg-[#00e5ff]' : 'bg-[#94A3B8]/50'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Submenu Card (Anchored directly beneath this tab!) */}
                  {isHovered && (
                    <div
                      className="absolute top-[calc(100%-2px)] left-0 min-w-[280px] w-max max-w-sm rounded-2xl bg-[#121824] border border-[rgba(255,255,255,0.12)] shadow-[0_16px_50px_rgba(0,0,0,0.85)] p-4 backdrop-blur-2xl z-50 animate-fadeIn"
                      onMouseEnter={() => handleMouseEnter(tab.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Subtle bridge so mouse never leaves hitbox */}
                      <div className="absolute -top-3 left-0 w-full h-3 bg-transparent" />

                      {/* Category Header (like ZoeNude "ATELIER FORMULATIONS") */}
                      <div className="pb-2.5 mb-2 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                        <span className="text-[10px] font-['Space_Grotesk'] tracking-widest text-[#FFB703] uppercase font-bold">
                          {tab.categoryTitle}
                        </span>
                        <span className="text-[10px] font-['Space_Grotesk'] text-[#94A3B8]">
                          {tab.items.length} sections
                        </span>
                      </div>

                      {/* Subtabs Vertical List */}
                      <div className="space-y-1">
                        {tab.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleItemClick(tab.id, item.sectionId)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#1a2333] transition-all flex items-start justify-between gap-3 group/item cursor-pointer"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-['Space_Grotesk'] text-xs font-semibold text-[#dfe2eb] group-hover/item:text-[#00e5ff] transition-colors leading-tight">
                                  {item.title}
                                </span>
                              </div>
                              {item.sublabel && (
                                <p className="text-[10px] text-[#94A3B8] font-light leading-snug mt-0.5 line-clamp-1">
                                  {item.sublabel}
                                </p>
                              )}
                            </div>

                            {item.badge && (
                              <span
                                className={`text-[9px] font-['Space_Grotesk'] uppercase px-2 py-0.5 rounded-md font-semibold shrink-0 border border-[rgba(255,255,255,0.08)] ${
                                  item.badgeColor || 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/20'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Direct jump to main page footer */}
                      <div className="mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                        <button
                          onClick={() => handleItemClick(tab.id)}
                          className="text-[11px] font-['Space_Grotesk'] text-[#00e5ff] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <span>Explore Full {tab.label}</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons (like ZoeNude & MAC: Search, Wishlist, Bag, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-[#00e5ff] hover:bg-[#1a2333] transition-colors cursor-pointer"
              title="Search (CMD+K)"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            {/* Wishlist / Saved Prototypes (with counter badge like ZoeNude) */}
            <button
              onClick={onOpenWishlist}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-[#FFB703] hover:bg-[#1a2333] transition-colors cursor-pointer relative"
              title="Saved Wishlist"
            >
              <span className="material-symbols-outlined text-xl">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FFB703] text-[#0B0F15] text-[9px] font-bold flex items-center justify-center font-['Space_Grotesk']">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart (with counter badge like ZoeNude & MAC) */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-[#00e5ff] hover:bg-[#1a2333] transition-colors cursor-pointer relative"
              title="Shopping Bag"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#00e5ff] text-[#0B0F15] text-[9px] font-bold flex items-center justify-center font-['Space_Grotesk']">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="p-1 rounded-full ring-1 ring-[rgba(255,255,255,0.15)] hover:ring-[#00e5ff] transition-all cursor-pointer ml-1"
              title="Atelier Profile"
            >
              <img
                src={ZOEWEAR_INSIGNIA}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#94A3B8] hover:text-[#00e5ff] hover:bg-[#1a2333] rounded-xl transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Accordion Subtabs */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#121824] border-b border-[rgba(255,255,255,0.1)] shadow-2xl max-h-[80vh] overflow-y-auto p-4 animate-fadeIn">
          <div className="space-y-2">
            {navTabs.map((tab) => {
              const isExpanded = mobileExpandedTab === tab.id;
              const isActive = currentPage === tab.id;

              return (
                <div
                  key={tab.id}
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#182030]/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3">
                    <button
                      onClick={() => handleItemClick(tab.id)}
                      className={`text-left font-['Space_Grotesk'] text-sm font-semibold tracking-wide ${
                        isActive ? 'text-[#00e5ff]' : 'text-[#F8FAFC]'
                      }`}
                    >
                      {tab.label}
                    </button>
                    <button
                      onClick={() =>
                        setMobileExpandedTab(isExpanded ? null : tab.id)
                      }
                      className="p-1 text-[#94A3B8] hover:text-white"
                    >
                      <span
                        className={`material-symbols-outlined text-lg transition-transform ${
                          isExpanded ? 'rotate-180 text-[#00e5ff]' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-1.5 border-t border-[rgba(255,255,255,0.06)] pt-2 bg-[#0d121c]/60">
                      <div className="text-[10px] font-['Space_Grotesk'] text-[#FFB703] uppercase tracking-wider font-bold mb-1">
                        {tab.categoryTitle}
                      </div>
                      {tab.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(tab.id, item.sectionId)}
                          className="w-full text-left p-2 rounded-xl text-xs text-[#94A3B8] hover:text-[#00e5ff] hover:bg-[#1a2333] transition-colors flex items-center justify-between"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1a2333] text-[#00e5ff]">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
