/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopItem } from '../../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ShopItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.numericPrice || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121824] border-l border-[rgba(255,255,255,0.1)] h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff]">shopping_bag</span>
            <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#F8FAFC]">
              Shopping Bag ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a2333] hover:bg-[#222e42] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-[#94A3B8]">
              <span className="material-symbols-outlined text-4xl text-[#94A3B8]/40 mb-2 block">
                production_quantity_limits
              </span>
              <p className="font-['Space_Grotesk'] text-sm">Your shopping bag is empty.</p>
              <p className="text-xs text-[#94A3B8]/70 mt-1">
                Explore the Atelier Shop or Runway Looks to add items.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#182030]/60 border border-[rgba(255,255,255,0.05)]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[rgba(255,255,255,0.08)] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Space_Grotesk'] text-xs font-semibold text-[#F8FAFC] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#00e5ff] font-['Space_Grotesk'] font-bold mt-0.5">
                    {item.price}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] truncate">{item.collection}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-[#94A3B8] hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                  title="Remove Item"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[rgba(255,255,255,0.08)] bg-[#0d121c]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-['Space_Grotesk'] text-[#94A3B8] uppercase tracking-wider">
                Subtotal
              </span>
              <span className="text-lg font-bold font-['Space_Grotesk'] text-[#F8FAFC]">
                ${total.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] mb-4">
              Complimentary White-Glove Insured Delivery & Biometric Calibration.
            </p>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl bg-[#00e5ff] hover:bg-[#33ebff] text-[#0B0F15] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_20px_rgba(0,229,255,0.3)]"
            >
              <span>Proceed to Bespoke Reserve</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
