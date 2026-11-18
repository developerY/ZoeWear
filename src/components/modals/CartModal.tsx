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
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0E344D]/35 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border-l border-[#D6DCE0] h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#D6DCE0] flex items-center justify-between bg-[#F7F8F7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3B8E82]">shopping_bag</span>
            <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#0E344D]">
              Shopping Bag ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F3F4] hover:bg-[#E4E8EB] border border-[#D6DCE0] text-[#5D6870] hover:text-[#0E344D] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-[#5D6870]">
              <span className="material-symbols-outlined text-4xl text-[#5D6870]/50 mb-2 block">
                production_quantity_limits
              </span>
              <p className="font-['Space_Grotesk'] text-sm text-[#0E344D] font-medium">
                Your shopping bag is empty.
              </p>
              <p className="text-xs text-[#5D6870] mt-1">
                Explore the Atelier Shop or Runway Looks to add items.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#F4F6F6] border border-[#D6DCE0]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-[#D6DCE0] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Space_Grotesk'] text-xs font-semibold text-[#0E344D] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#25665D] font-['Space_Grotesk'] font-bold mt-0.5">
                    {item.price}
                  </p>
                  <p className="text-[10px] text-[#5D6870] truncate">{item.collection}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-[#5D6870] hover:text-[#9E2A22] p-1.5 transition-colors cursor-pointer"
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
          <div className="p-6 border-t border-[#D6DCE0] bg-[#F1F3F4]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-['Space_Grotesk'] text-[#5D6870] uppercase tracking-wider font-semibold">
                Subtotal
              </span>
              <span className="text-lg font-bold font-['Space_Grotesk'] text-[#0E344D]">
                ${total.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[10px] text-[#5D6870] mb-4">
              Complimentary White-Glove Insured Delivery &amp; Biometric Calibration.
            </p>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl bg-[#3B8E82] hover:bg-[#2E766B] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#3B8E82]/20"
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
