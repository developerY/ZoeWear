/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavPage, ResearchPaper, ShopItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SHOP_ITEMS } from './data/mockData';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { BoutiqueScreen } from './components/screens/BoutiqueScreen';
import { FashionScreen } from './components/screens/FashionScreen';
import { TechScreen } from './components/screens/TechScreen';
import { FusionScreen } from './components/screens/FusionScreen';
import { DrunkWatchScreen } from './components/screens/DrunkWatchScreen';
import { MuseCharmScreen } from './components/screens/MuseCharmScreen';
import { TeachingResearchScreen } from './components/screens/TeachingResearchScreen';

// Modals
import { ReservePrototypeModal } from './components/modals/ReservePrototypeModal';
import { TelemetryDiagnosticsModal } from './components/modals/TelemetryDiagnosticsModal';
import { SearchModal } from './components/modals/SearchModal';
import { PaperViewerModal } from './components/modals/PaperViewerModal';
import { KeynoteViewerModal } from './components/modals/KeynoteViewerModal';
import { InnovationExplorerModal } from './components/modals/InnovationExplorerModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { PolicyModal } from './components/modals/PolicyModal';
import { CartModal } from './components/modals/CartModal';
import { WishlistModal } from './components/modals/WishlistModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [liveBpm, setLiveBpm] = useState<number>(72);

  // Initial cart items (2 items to mirror the badge '2' in the user's reference image)
  const [cartItems, setCartItems] = useState<ShopItem[]>([
    SHOP_ITEMS[0], // SwiftMonster Mountain Boot
    SHOP_ITEMS[6], // Biomimetic Complexion Veil
  ]);

  // Initial wishlist items (1 item to mirror badge '1' in user's reference image)
  const [wishlistItems, setWishlistItems] = useState<ShopItem[]>([
    SHOP_ITEMS[2], // Transdermal Silk Biometric Gown
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Live heart rate telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBpm(70 + Math.floor(Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Modal States
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedPrototype, setSelectedPrototype] = useState('SwiftMonster Mountain Footwear');

  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInnovationsOpen, setIsInnovationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const [keynoteModal, setKeynoteModal] = useState<{
    isOpen: boolean;
    title: string;
    slides: number;
  }>({
    isOpen: false,
    title: '',
    slides: 36,
  });

  const [policyModal, setPolicyModal] = useState<{
    isOpen: boolean;
    type?: 'privacy' | 'terms' | 'ethics' | 'standards';
    customTitle?: string;
    customContent?: string;
  }>({
    isOpen: false,
    type: 'privacy',
  });

  // Helper to parse URL hash into Page and optional Section
  const parseUrlHash = (): { page: NavPage; sectionId?: string } => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home' };

    const parts = hash.split('#');
    const pageName = parts[0] as NavPage;
    const sectionName = parts[1];

    const validPages: NavPage[] = [
      'home',
      'shop',
      'fashion',
      'tech',
      'fusion',
      'drunkwatch',
      'muse-charm',
      'teaching-and-research',
    ];

    if (validPages.includes(pageName)) {
      return { page: pageName, sectionId: sectionName };
    }
    return { page: 'home' };
  };

  // URL Hash Synchronizer on initial load & popstate/hashchange
  useEffect(() => {
    const { page, sectionId } = parseUrlHash();
    setCurrentPage(page);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }

    const handleHashChange = () => {
      const parsed = parseUrlHash();
      setCurrentPage(parsed.page);

      if (parsed.sectionId) {
        setTimeout(() => {
          const el = document.getElementById(parsed.sectionId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Navigate handler that updates URL hash and scrolls to section if provided
  const handleNavigate = (page: NavPage, sectionId?: string) => {
    setCurrentPage(page);

    const targetHash = sectionId ? `#/${page}#${sectionId}` : `#/${page}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Keyboard shortcut: CMD+K opens Search, ESC closes modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsReserveOpen(false);
        setIsDiagnosticsOpen(false);
        setIsSearchOpen(false);
        setIsInnovationsOpen(false);
        setIsProfileOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setSelectedPaper(null);
        setKeynoteModal((prev) => ({ ...prev, isOpen: false }));
        setPolicyModal((prev) => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenReserve = (prototypeName: string) => {
    setSelectedPrototype(prototypeName);
    setIsReserveOpen(true);
  };

  const handleOpenKeynote = (title: string, slidesCount: number) => {
    setKeynoteModal({
      isOpen: true,
      title,
      slides: slidesCount,
    });
  };

  const handleOpenPolicy = (title: string, content: string) => {
    setPolicyModal({
      isOpen: true,
      customTitle: title,
      customContent: content,
    });
  };

  const handleAddToCart = (item: ShopItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFromWishlist = (index: number) => {
    setWishlistItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveToCart = (item: ShopItem, index: number) => {
    handleRemoveFromWishlist(index);
    handleAddToCart(item);
  };

  return (
    <div className="bg-[#0B0F15] text-[#dfe2eb] font-['Plus_Jakarta_Sans',sans-serif] antialiased min-h-screen flex flex-col selection:bg-[#00e5ff] selection:text-[#00363d]">
      {/* Top Navigation Tabs with Hover Submenus (Zero Share Buttons) */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        liveBpm={liveBpm}
      />

      {/* Main Content View with Top Offset for Fixed Header */}
      <main className="w-full pt-24 bg-[#0B0F15] flex-grow min-h-screen">
        {currentPage === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onRequestPrototype={handleOpenReserve}
            onOpenInnovations={() => setIsInnovationsOpen(true)}
          />
        )}

        {currentPage === 'shop' && (
          <BoutiqueScreen
            onAddToCart={handleAddToCart}
            onRequestPrototype={handleOpenReserve}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'fashion' && (
          <FashionScreen
            onReserveFootwear={(f) => handleOpenReserve(f.name)}
            onViewGarment={(g) => handleOpenReserve(g.title)}
            onNavigateToTeaching={() => handleNavigate('teaching-and-research')}
          />
        )}

        {currentPage === 'tech' && (
          <TechScreen
            onNavigateToDrunkwatch={() => handleNavigate('drunkwatch')}
            onNavigateToMuseCharm={() => handleNavigate('muse-charm')}
            onNavigateToTeaching={() => handleNavigate('teaching-and-research')}
            onOpenKeynote={(deck) => handleOpenKeynote(deck.title, deck.slides)}
          />
        )}

        {currentPage === 'fusion' && (
          <FusionScreen
            onNavigate={handleNavigate}
            onRequestBeta={() => handleOpenReserve('Breathe Pro Respiratory Beta')}
            onOpenSpecs={() => handleOpenReserve('FHIR & HL7 Biomedical Spec Documentation')}
            onJoinCohort={() => handleNavigate('teaching-and-research')}
          />
        )}

        {currentPage === 'drunkwatch' && (
          <DrunkWatchScreen
            onNavigate={handleNavigate}
            onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
            onRequestPrototype={handleOpenReserve}
          />
        )}

        {currentPage === 'muse-charm' && (
          <MuseCharmScreen
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'teaching-and-research' && (
          <TeachingResearchScreen
            onNavigate={handleNavigate}
            onOpenPaper={(paper) => setSelectedPaper(paper)}
            onOpenKeynote={handleOpenKeynote}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Shopping Bag Drawer Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          handleOpenReserve('Atelier Bag Selection');
        }}
      />

      {/* Wishlist Drawer Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      {/* Interactive Modal Layer */}
      <ReservePrototypeModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        prototypeName={selectedPrototype}
      />

      <TelemetryDiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <PaperViewerModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />

      <KeynoteViewerModal
        isOpen={keynoteModal.isOpen}
        onClose={() => setKeynoteModal((prev) => ({ ...prev, isOpen: false }))}
        title={keynoteModal.title}
        totalSlides={keynoteModal.slides}
      />

      <InnovationExplorerModal
        isOpen={isInnovationsOpen}
        onClose={() => setIsInnovationsOpen(false)}
        onNavigate={handleNavigate}
        onReserve={handleOpenReserve}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal((prev) => ({ ...prev, isOpen: false }))}
        policyType={policyModal.type}
        customTitle={policyModal.customTitle}
        customContent={policyModal.customContent}
      />
    </div>
  );
}
