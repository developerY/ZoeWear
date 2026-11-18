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
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0E344D]/35 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border-l border-[#D6DCE0] h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#D6DCE0] flex items-center justify-between bg-[#F7F8F7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#18587A]">favorite</span>
            <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#0E344D]">
              Saved Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F3F4] hover:bg-[#E4E8EB] border border-[#D6DCE0] text-[#5D6870] hover:text-[#0E344D] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 text-[#5D6870]">
              <span className="material-symbols-outlined text-4xl text-[#5D6870]/50 mb-2 block">
                favorite_border
              </span>
              <p className="font-['Space_Grotesk'] text-sm text-[#0E344D] font-medium">
                No items in your wishlist yet.
              </p>
              <p className="text-xs text-[#5D6870] mt-1">
                Click the heart or save buttons across the boutique and lookbook.
              </p>
            </div>
          ) : (
            wishlistItems.map((item, idx) => (
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
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onMoveToCart(item, idx)}
                    className="p-1.5 rounded-lg bg-[#E8F3F1] hover:bg-[#3B8E82] text-[#25665D] hover:text-white border border-[#3B8E82]/30 transition-colors cursor-pointer"
                    title="Move to Bag"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(idx)}
                    className="p-1.5 text-[#5D6870] hover:text-[#C23B32] transition-colors cursor-pointer"
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
