
import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { currentPrice, lowest30Price, firstPrice, name, brand, image } = product;
  const hasPromo = lowest30Price && currentPrice < lowest30Price;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[390px] h-[80vh] bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden flex flex-col dark-transition">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button 
            onClick={onClose}
            className="p-2 bg-white/90 dark:bg-black/60 rounded-full shadow-lg text-gray-800 dark:text-gray-200 hover:scale-110 active:scale-95 transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="aspect-[3/4] w-full bg-gray-100 dark:bg-gray-900">
            <img src={image} className="w-full h-full object-cover" alt={name} />
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <p className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{brand}</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 leading-tight">{name}</h2>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black ${hasPromo ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                  {formatPrice(currentPrice)}
                </span>
                {hasPromo && (
                    <span className="text-sm text-gray-400 dark:text-gray-600 line-through font-bold">
                        {formatPrice(lowest30Price!)}
                    </span>
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                 {lowest30Price && (
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Najniższa cena (30 dni)</span>
                        <span className="text-gray-900 dark:text-gray-200 font-bold">{formatPrice(lowest30Price)}</span>
                    </div>
                 )}
                 {firstPrice && (
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Cena pierwsza</span>
                        <span className="text-gray-900 dark:text-gray-200 font-bold">{formatPrice(firstPrice)}</span>
                    </div>
                 )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button className="col-span-2 py-4 bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-100 dark:shadow-none uppercase tracking-widest text-sm active:scale-95 transition-transform">
                    Do koszyka
                </button>
                <button className="py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 font-bold rounded-xl text-sm active:scale-95 transition-transform">
                    Sprawdź w salonie
                </button>
                <button className="py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 font-bold rounded-xl text-sm active:scale-95 transition-transform">
                    Tabela rozmiarów
                </button>
            </div>

            <div className="pt-4 text-xs text-gray-400 dark:text-gray-600 leading-relaxed italic">
                * Prezentowane ceny są zgodne z Dyrektywą Omnibus. Informujemy o najniższej cenie z ostatnich 30 dni przed obniżką.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
