
import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../constants';

interface BottomSheetProps {
  product: Product;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ product, onClose }) => {
  const { currentPrice, lowest30Price, firstPrice } = product;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 dark:bg-black/70 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-[420px] bg-white dark:bg-[#1E1E1E] rounded-t-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out dark-transition">
        {/* Drag Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full" />
        
        <header className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Informacje o cenie</h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </header>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800">
              <div>
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Cena aktualna</p>
                <p className="text-gray-500 dark:text-gray-600 text-[10px]">Cena, którą płacisz teraz</p>
              </div>
              <p className="text-lg font-black text-red-600">{formatPrice(currentPrice)}</p>
            </div>

            {lowest30Price && (
              <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800">
                <div>
                  <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Najniższa z 30 dni</p>
                  <p className="text-gray-500 dark:text-gray-600 text-[10px]">Najniższa cena produktu w ciągu 30 dni przed obniżką</p>
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-gray-200">{formatPrice(lowest30Price)}</p>
              </div>
            )}

            {firstPrice && (
              <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800">
                <div>
                  <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Cena pierwsza</p>
                  <p className="text-gray-500 dark:text-gray-600 text-[10px]">Cena regularna przy wprowadzeniu do sprzedaży</p>
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-gray-200">{formatPrice(firstPrice)}</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-500 text-white rounded-full self-start">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong>Dyrektywa Omnibus</strong><br/>
                Zgodnie z prawem, przy promocjach musimy pokazywać najniższą cenę z ostatnich 30 dni. Dzięki temu wiesz, czy rabat jest prawdziwy i jak zmieniała się cena w czasie.
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black rounded-xl uppercase tracking-widest text-sm shadow-lg dark:shadow-none"
          >
            Rozumiem
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
