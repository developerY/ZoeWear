/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopItem } from '../../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: ShopItem[];
  onRemoveWishlist: (index: number) => void;
  onMoveToCart: (item: ShopItem, index: number) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121824] border-l border-[rgba(255,255,255,0.1)] h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFB703]">favorite</span>
            <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#F8FAFC]">
              Saved Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a2333] hover:bg-[#222e42] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 text-[#94A3B8]">
              <span className="material-symbols-outlined text-4xl text-[#94A3B8]/40 mb-2 block">
                favorite_border
              </span>
              <p className="font-['Space_Grotesk'] text-sm">No items in your wishlist yet.</p>
              <p className="text-xs text-[#94A3B8]/70 mt-1">
                Click the heart or save buttons across the boutique and lookbook.
              </p>
            </div>
          ) : (
            wishlistItems.map((item, idx) => (
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
                  <p className="text-[11px] text-[#FFB703] font-['Space_Grotesk'] font-bold mt-0.5">
                    {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onMoveToCart(item, idx)}
                    className="p-1.5 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] transition-colors cursor-pointer"
                    title="Move to Bag"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(idx)}
                    className="p-1.5 text-[#94A3B8] hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
