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
    <div className="w-full min-h-screen bg-[#F7F8F7] text-[#0E344D] pb-24">
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-2xl bg-white/95 border border-[#3B8E82] text-[#25665D] font-['Space_Grotesk'] text-sm font-semibold shadow-lg flex items-center gap-3 backdrop-blur-xl animate-fadeIn">
          <span className="material-symbols-outlined text-lg text-[#3B8E82]">shopping_bag</span>
          <span>{addedToast}</span>
        </div>
      )}

      {/* Atelier Banner */}
      <div className="relative w-full border-b border-[#D6DCE0] bg-gradient-to-b from-[#EEF4F7] via-[#F3F6F6] to-[#F7F8F7] px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3F1] border border-[#3B8E82]/30 text-[#25665D] text-xs font-['Space_Grotesk'] tracking-widest uppercase mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B8E82] animate-pulse"></span>
              Atelier Release 04 · Biomimetic Formulations &amp; Wearables
            </div>
            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#0E344D]">
              Atelier <span className="text-[#25665D] font-semibold">Boutique</span>
            </h1>
            <p className="mt-3 text-base text-[#36454F] max-w-2xl leading-relaxed">
              Where luxury French atelier tailoring converges with transdermal micro-spectrometry, adaptive minerals, and sub-zero bioclimatic footwear.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-['Space_Grotesk'] text-[#36454F] font-medium">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#D6DCE0] shadow-xs">
              <span className="material-symbols-outlined text-[#3B8E82] text-base">verified</span>
              <span>100% Certified On-Chain Authenticity</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#D6DCE0] shadow-xs">
              <span className="material-symbols-outlined text-[#18587A] text-base">local_shipping</span>
              <span>Insured White-Glove Dispatch</span>
            </div>
          </div>
        </div>

        {/* Subtabs Filter Row */}
        <div className="max-w-7xl mx-auto mt-10 flex flex-wrap items-center gap-2 border-t border-[#D6DCE0] pt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-['Space_Grotesk'] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0E344D] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#36454F] hover:text-[#0E344D] hover:bg-[#F1F3F4] border border-[#D6DCE0]'
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
              className="group rounded-3xl bg-white border border-[#D6DCE0] hover:border-[#3B8E82] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F3F4]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E344D]/80 via-[#0E344D]/15 to-transparent opacity-85" />

                  {item.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-['Space_Grotesk'] uppercase tracking-wider font-semibold border backdrop-blur-md shadow-xs ${item.badgeColor || 'text-[#25665D] bg-[#E8F3F1]/95 border-[#3B8E82]/40'}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-4 font-['Space_Grotesk'] text-lg font-bold text-white drop-shadow-md">
                    {item.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-['Space_Grotesk'] uppercase tracking-widest text-[#18587A] font-semibold block mb-1">
                    {item.collection}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[#0E344D] group-hover:text-[#25665D] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#36454F] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Highlights / Specs */}
                  {(item.techSpecs || item.formulationNotes) && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(item.techSpecs || item.formulationNotes)?.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-[#F1F3F4] border border-[#D6DCE0] text-[10px] text-[#36454F] font-['Space_Grotesk'] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-4 border-t border-[#E4E8EB] mt-2 flex items-center gap-3">
                <button
                  onClick={() => handleAdd(item)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#3B8E82] hover:bg-[#2E766B] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  Add to Bag
                </button>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="py-2.5 px-3 rounded-xl bg-[#F1F3F4] hover:bg-[#E4E8EB] border border-[#D6DCE0] text-[#0E344D] text-xs font-['Space_Grotesk'] transition-colors flex items-center justify-center cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E344D]/35 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white border border-[#D6DCE0] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-[#0E344D]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F3F4] hover:bg-[#E4E8EB] text-[#36454F] hover:text-[#0E344D] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full sm:w-56 aspect-square object-cover rounded-2xl border border-[#D6DCE0]"
              />
              <div className="flex-1">
                <span className="text-xs font-['Space_Grotesk'] text-[#18587A] font-semibold uppercase tracking-widest">
                  {selectedItem.collection}
                </span>
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#0E344D] mt-1">
                  {selectedItem.name}
                </h2>
                <div className="text-xl font-bold text-[#25665D] font-['Space_Grotesk'] mt-2">
                  {selectedItem.price}
                </div>
                <p className="mt-3 text-sm text-[#36454F] leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.techSpecs && (
                  <div className="mt-4">
                    <span className="text-xs uppercase font-['Space_Grotesk'] text-[#0E344D] block font-semibold mb-1.5">
                      Technical Architecture:
                    </span>
                    <ul className="space-y-1 text-xs text-[#36454F]">
                      {selectedItem.techSpecs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B8E82]"></span>
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
                    className="flex-1 py-3 rounded-xl bg-[#3B8E82] text-white font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider hover:bg-[#2E766B] transition-all cursor-pointer flex items-center justify-center gap-2"
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
                      className="py-3 px-4 rounded-xl bg-[#F1F3F4] border border-[#D6DCE0] hover:border-[#3B8E82] text-[#0E344D] font-['Space_Grotesk'] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
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
