/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SHOP_ITEMS } from '../../data/mockData';
import { ShopItem } from '../../types';

interface BoutiqueScreenProps {
  onAddToCart?: (item: ShopItem) => void;
  onRequestPrototype?: (name: string) => void;
  onNavigate?: (page: any, sectionId?: string) => void;
}

export const BoutiqueScreen: React.FC<BoutiqueScreenProps> = ({
  onAddToCart,
  onRequestPrototype,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Atelier Formulations' },
    { id: 'formulations', label: 'Biomimetic Nude & Skincare' },
    { id: 'footwear', label: 'SwiftMonster™ Footwear' },
    { id: 'apparel', label: 'Cyber-Couture Silhouettes' },
    { id: 'hardware', label: 'Sensory Hardware Cuffs' },
  ];

  const filteredItems = activeCategory === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: ShopItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
    setAddedToast(`Added ${item.name} to your shopping bag.`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0F15] text-[#dfe2eb] pb-24">
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-2xl bg-[#121824]/95 border border-[#00e5ff] text-[#00e5ff] font-['Space_Grotesk'] text-sm font-semibold shadow-[0_10px_40px_rgba(0,229,255,0.3)] flex items-center gap-3 backdrop-blur-xl animate-fadeIn">
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          <span>{addedToast}</span>
        </div>
      )}

      {/* Atelier Banner */}
      <div className="relative w-full border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#141b26] to-[#0B0F15] px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,183,3,0.1)] border border-[rgba(255,183,3,0.3)] text-[#FFB703] text-xs font-['Space_Grotesk'] tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] animate-pulse"></span>
              Atelier Release 04 · Biomimetic Formulations & Wearables
            </div>
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F8FAFC]">
              Atelier <span className="text-[#00e5ff] font-normal">Boutique</span>
            </h1>
            <p className="mt-3 text-base text-[#94A3B8] max-w-2xl font-light leading-relaxed">
              Where luxury French atelier tailoring converges with transdermal micro-spectrometry, adaptive minerals, and sub-zero bioclimatic footwear.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-['Space_Grotesk'] text-[#94A3B8]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a2333]/60 border border-[rgba(255,255,255,0.06)]">
              <span className="material-symbols-outlined text-[#00e5ff] text-base">verified</span>
              <span>100% Certified On-Chain Authenticity</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a2333]/60 border border-[rgba(255,255,255,0.06)]">
              <span className="material-symbols-outlined text-[#FFB703] text-base">local_shipping</span>
              <span>Insured White-Glove Dispatch</span>
            </div>
          </div>
        </div>

        {/* Subtabs Filter Row (Normal Website Navigation Filter) */}
        <div className="max-w-7xl mx-auto mt-10 flex flex-wrap items-center gap-2 border-t border-[rgba(255,255,255,0.08)] pt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-['Space_Grotesk'] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#00e5ff] text-[#0B0F15] font-semibold shadow-[0_0_20px_rgba(0,229,255,0.35)]'
                  : 'bg-[#141b26] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1a2333] border border-[rgba(255,255,255,0.06)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="group rounded-3xl bg-[#121824]/80 border border-[rgba(255,255,255,0.08)] hover:border-[#00e5ff]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,229,255,0.1)]"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#182030]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-80" />

                  {item.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-['Space_Grotesk'] uppercase tracking-wider font-semibold border backdrop-blur-md ${item.badgeColor || 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30'}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-4 font-['Space_Grotesk'] text-lg font-bold text-[#F8FAFC] drop-shadow-md">
                    {item.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-['Space_Grotesk'] uppercase tracking-widest text-[#FFB703] block mb-1">
                    {item.collection}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[#F8FAFC] group-hover:text-[#00e5ff] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#94A3B8] font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Highlights / Specs */}
                  {(item.techSpecs || item.formulationNotes) && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(item.techSpecs || item.formulationNotes)?.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#1a2333] text-[10px] text-[#bac9cc] font-['Space_Grotesk']"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 border-t border-[rgba(255,255,255,0.06)] mt-4 flex items-center gap-3">
                <button
                  onClick={() => handleAdd(item)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#00e5ff] hover:bg-[#33ebff] text-[#0B0F15] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,229,255,0.25)]"
                >
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  Add to Bag
                </button>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="py-2.5 px-3 rounded-xl bg-[#1a2333] hover:bg-[#222e42] border border-[rgba(255,255,255,0.1)] text-[#dfe2eb] text-xs font-['Space_Grotesk'] transition-colors flex items-center justify-center cursor-pointer"
                  title="Inspect Full Specs & Formulations"
                >
                  <span className="material-symbols-outlined text-base">info</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Detail Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#121824] border border-[rgba(255,255,255,0.15)] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1a2333] hover:bg-[#222e42] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full sm:w-56 aspect-square object-cover rounded-2xl border border-[rgba(255,255,255,0.1)]"
              />
              <div className="flex-1">
                <span className="text-xs font-['Space_Grotesk'] text-[#FFB703] uppercase tracking-widest">
                  {selectedItem.collection}
                </span>
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#F8FAFC] mt-1">
                  {selectedItem.name}
                </h2>
                <div className="text-xl font-bold text-[#00e5ff] font-['Space_Grotesk'] mt-2">
                  {selectedItem.price}
                </div>
                <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.techSpecs && (
                  <div className="mt-4">
                    <span className="text-xs uppercase font-['Space_Grotesk'] text-[#bac9cc] block font-semibold mb-1.5">
                      Technical Architecture:
                    </span>
                    <ul className="space-y-1 text-xs text-[#94A3B8]">
                      {selectedItem.techSpecs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleAdd(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#00e5ff] text-[#0B0F15] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#33ebff] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    Add to Bag ({selectedItem.price})
                  </button>
                  {onRequestPrototype && (
                    <button
                      onClick={() => {
                        onRequestPrototype(selectedItem.name);
                        setSelectedItem(null);
                      }}
                      className="py-3 px-4 rounded-xl bg-[#1a2333] border border-[rgba(255,255,255,0.1)] hover:border-[#00e5ff] text-[#dfe2eb] font-['Space_Grotesk'] text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Bespoke Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
