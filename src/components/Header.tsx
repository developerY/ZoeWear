/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { NavPage } from '../types';
import { ZOEWEAR_CHIP_LOGO, ZOEWEAR_FAVICON } from '../data/mockData';

export interface SubmenuItem {
  id: string;
  title: string;
  sublabel?: string;
  sectionId?: string;
  targetPage?: NavPage;
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
          badgeColor: 'text-[#0284C7] bg-[#E0F2FE] border-[#0284C7]/35',
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
          badgeColor: 'text-[#0E344D] bg-[#E8EEF3] border-[#18587A]/35',
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
          badgeColor: 'text-[#18587A] bg-[#EEF4F7] border-[#18587A]/30',
        },
      ],
    },
    {
      id: 'tech',
      label: 'TECH',
      categoryTitle: 'HARDWARE, EDGE ML & BIO-COMPANION',
      items: [
        {
          id: 'muse-charm-page',
          title: 'Muse Charm (Personal Life Coach)',
          sublabel: 'Dedicated Page: Bio-Responsive Life Coach · sEMG, Emotions, Wealth & SAM 3.1',
          targetPage: 'muse-charm',
          badge: 'Meta Hackathon',
          badgeColor: 'text-[#C26D2D] bg-[#FFF3E6] border-[#FDBA74] font-bold',
        },
        {
          id: 'drunkwatch-page',
          title: 'DrunkWatch™',
          sublabel: 'Dedicated Page: Smartwatch ML, gait analysis, concept video & driving safety',
          targetPage: 'drunkwatch',
          badge: 'Dedicated Page',
          badgeColor: 'text-[#0369A1] bg-[#E8F1F8] border-[#0369A1]/30 font-bold',
        },
        {
          id: 'ankle-biometrics-tech',
          title: 'Ankle Biometrics & Gait Lab',
          sublabel: 'Supramalleolar PPG, FoG neural models & 83-paper synthesis',
          targetPage: 'ankle-biometrics',
          badge: 'Research Lab',
          badgeColor: 'text-[#0284C7] bg-[#E0F2FE] border-[#0284C7]/35 font-bold',
        },
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
          badgeColor: 'text-[#0E344D] bg-[#F1F3F4] border-[#D6DCE0]',
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
          badgeColor: 'text-[#2E7D5B] bg-[#EAF7EE] border-[#86EFAC]',
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
          badgeColor: 'text-[#0E344D] bg-[#E8EEF3] border-[#18587A]/30',
        },
        {
          id: 'ankle-biometrics-page',
          title: 'Ankle Biometrics & Kinematics Report',
          sublabel: 'Interactive charts, full monograph & 83 PubMed/PMC citations',
          targetPage: 'ankle-biometrics',
          badge: '83 Citations',
          badgeColor: 'text-[#0284C7] bg-[#E0F2FE] border-[#0284C7]/35 font-bold',
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
      {/* Top Telemetry & Announcement Ribbon */}
      <div className="w-full bg-[#ECEFF2]/95 backdrop-blur-md border-b border-[#D6DCE0] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[#36454F] font-['Space_Grotesk'] text-[11px] leading-4 tracking-[0.06em] font-medium">
          <div className="flex items-center gap-2">
            <span className="tracking-wider uppercase text-[#0E344D] font-semibold">ZoeWear Atelier</span>
            <span className="text-[#C6CED4] hidden sm:inline">·</span>
            <span className="text-[#475866] hidden sm:inline">Fall/Winter Biometric Cyber-Couture Showcase</span>
          </div>

          <div className="flex items-center gap-4 text-[#475866]">
            <button
              onClick={onOpenDiagnostics}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#86EFAC]/80 text-[#0E344D] hover:bg-[#EAF7EE] transition-colors cursor-pointer shadow-xs"
              title="Open Live Telemetry Diagnostics"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-ping"></span>
              <span className="tracking-widest uppercase text-[10px] font-semibold">{liveBpm} BPM Live Biosignal</span>
            </button>
            <span className="text-[#C6CED4] hidden md:inline">·</span>
            <span className="tracking-widest uppercase text-[#0284C7] font-semibold hidden md:inline">
              Complimentary White-Glove Insured Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="w-full bg-white/95 backdrop-blur-2xl shadow-[0_4px_24px_rgba(14, 52, 77,0.06)] border-b border-[#D6DCE0] relative">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo with ZoeWear Chip */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="relative">
              <img
                alt="ZoeWear Core Silicon Chip"
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#18587A]/45 shadow-sm group-hover:scale-105 group-hover:ring-[#18587A] transition-all"
                src={ZOEWEAR_CHIP_LOGO}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-lg font-bold tracking-wider text-[#0E344D] leading-none group-hover:text-[#18587A] transition-colors">
                ZOEWEAR
              </span>
              <span className="font-['Space_Grotesk'] text-[9px] tracking-widest text-[#124460] font-semibold leading-tight uppercase mt-0.5">
                CYBER-COUTURE
              </span>
            </div>
          </button>

          {/* Desktop Tabs Across the Top */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 font-['Space_Grotesk'] text-xs tracking-wider font-semibold relative h-full"
            onMouseLeave={handleMouseLeave}
          >
            {navTabs.map((tab) => {
              const isActive =
                currentPage === tab.id ||
                (tab.id === 'tech' && (currentPage === 'drunkwatch' || currentPage === 'muse-charm')) ||
                (tab.id === 'teaching-and-research' && currentPage === 'ankle-biometrics');
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
                        ? 'text-[#124460]'
                        : isHovered
                        ? 'text-[#0E344D]'
                        : 'text-[#36454F] hover:text-[#0E344D]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-[#18587A]' : 'text-[#7D8890]'
                      }`}
                    >
                      expand_more
                    </span>

                    {/* Underline indicator */}
                    {(isActive || isHovered) && (
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all ${
                          isActive ? 'bg-gradient-to-r from-[#0E344D] via-[#0284C7] to-[#2563EB]' : 'bg-[#0284C7]/45'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Submenu Card */}
                  {isHovered && (
                    <div
                      className="absolute top-[calc(100%-2px)] left-0 min-w-[280px] w-max max-w-sm rounded-2xl bg-white border border-[#D6DCE0] shadow-[0_18px_48px_rgba(14, 52, 77,0.14)] p-4 z-50 animate-fadeIn"
                      onMouseEnter={() => handleMouseEnter(tab.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="absolute -top-3 left-0 w-full h-3 bg-transparent" />

                      <div className="pb-2.5 mb-2 border-b border-[#E8ECEE] flex items-center justify-between">
                        <span className="text-[10px] font-['Space_Grotesk'] tracking-widest text-[#18587A] uppercase font-bold">
                          {tab.categoryTitle}
                        </span>
                        <span className="text-[10px] font-['Space_Grotesk'] text-[#5D6870]">
                          {tab.items.length} sections
                        </span>
                      </div>

                      <div className="space-y-1">
                        {tab.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() =>
                              handleItemClick(
                                item.targetPage || tab.id,
                                item.targetPage ? undefined : item.sectionId
                              )
                            }
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#F1F3F4] transition-all flex items-start justify-between gap-3 group/item cursor-pointer"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-['Space_Grotesk'] text-xs font-semibold text-[#0E344D] group-hover/item:text-[#124460] transition-colors leading-tight">
                                  {item.title}
                                </span>
                              </div>
                              {item.sublabel && (
                                <p className="text-[11px] text-[#5D6870] leading-snug mt-0.5 line-clamp-1">
                                  {item.sublabel}
                                </p>
                              )}
                            </div>

                            {item.badge && (
                              <span
                                className={`text-[10px] font-['Space_Grotesk'] uppercase px-2 py-0.5 rounded-md font-semibold shrink-0 border ${
                                  item.badgeColor || 'bg-[#E8EEF3] text-[#0E344D] border-[#18587A]/25'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#E8ECEE] flex items-center justify-between">
                        <button
                          onClick={() => handleItemClick(tab.id)}
                          className="text-[11px] font-['Space_Grotesk'] text-[#18587A] hover:text-[#124460] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
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

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-[#36454F] hover:text-[#18587A] hover:bg-[#F1F3F4] transition-colors cursor-pointer"
              title="Search (CMD+K)"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2 rounded-xl text-[#36454F] hover:text-[#1D4ED8] hover:bg-[#DBEAFE]/70 transition-colors cursor-pointer relative"
              title="Saved Wishlist"
            >
              <span className="material-symbols-outlined text-xl">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1D4ED8] text-white text-[9px] font-bold flex items-center justify-center font-['Space_Grotesk']">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 rounded-xl text-[#36454F] hover:text-[#0284C7] hover:bg-[#E0F2FE] transition-colors cursor-pointer relative"
              title="Shopping Bag"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0284C7] text-white text-[9px] font-bold flex items-center justify-center font-['Space_Grotesk']">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenProfile}
              className="p-1 rounded-full ring-1 ring-[#CBD5DC] hover:ring-[#18587A] transition-all cursor-pointer ml-1"
              title="Atelier Profile"
            >
              <img
                src={ZOEWEAR_FAVICON}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-[#36454F] hover:text-[#0E344D] hover:bg-[#F1F3F4] rounded-xl transition-colors cursor-pointer"
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
        <div className="lg:hidden w-full bg-white border-b border-[#D6DCE0] shadow-xl max-h-[80vh] overflow-y-auto p-4 animate-fadeIn">
          <div className="space-y-2">
            {navTabs.map((tab) => {
              const isExpanded = mobileExpandedTab === tab.id;
              const isActive =
                currentPage === tab.id ||
                (tab.id === 'tech' && (currentPage === 'drunkwatch' || currentPage === 'muse-charm')) ||
                (tab.id === 'teaching-and-research' && currentPage === 'ankle-biometrics');

              return (
                <div
                  key={tab.id}
                  className="rounded-2xl border border-[#D6DCE0] bg-[#F5F6F8] overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3">
                    <button
                      onClick={() => handleItemClick(tab.id)}
                      className={`text-left font-['Space_Grotesk'] text-sm font-semibold tracking-wide ${
                        isActive ? 'text-[#124460]' : 'text-[#0E344D]'
                      }`}
                    >
                      {tab.label}
                    </button>
                    <button
                      onClick={() =>
                        setMobileExpandedTab(isExpanded ? null : tab.id)
                      }
                      className="p-1 text-[#5D6870] hover:text-[#0E344D]"
                    >
                      <span
                        className={`material-symbols-outlined text-lg transition-transform ${
                          isExpanded ? 'rotate-180 text-[#18587A]' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-1.5 border-t border-[#E4E8EB] pt-2 bg-white">
                      <div className="text-[10px] font-['Space_Grotesk'] text-[#18587A] uppercase tracking-wider font-bold mb-1">
                        {tab.categoryTitle}
                      </div>
                      {tab.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleItemClick(
                              item.targetPage || tab.id,
                              item.targetPage ? undefined : item.sectionId
                            )
                          }
                          className="w-full text-left p-2 rounded-xl text-xs text-[#36454F] hover:text-[#124460] hover:bg-[#F1F3F4] transition-colors flex items-center justify-between"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8EEF3] text-[#0E344D] font-medium">
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
