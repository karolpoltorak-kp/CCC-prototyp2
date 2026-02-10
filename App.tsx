
import React, { useState, useEffect } from 'react';
import { PricingVariant, Product } from './types';
import { MOCK_PRODUCTS, VARIANT_DESCRIPTIONS } from './constants';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import BottomSheet from './components/BottomSheet';

const App: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetData, setBottomSheetData] = useState<any>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleInfoClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setBottomSheetData(product);
    setIsBottomSheetOpen(true);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full h-full max-w-[390px] mx-auto`}>
      <div className="w-full h-full bg-white dark:bg-[#121212] shadow-2xl md:rounded-[50px] overflow-hidden flex flex-col relative dark-transition" style={{ height: '100vh' }}>
          
          {/* Status Bar */}
          <div className="hidden md:flex h-12 bg-white dark:bg-[#121212] items-center justify-between px-8 pt-4 pb-2 z-40 text-xs font-bold dark:text-white dark-transition">
            <span>9:41</span>
            <div className="flex gap-1.5">
              <div className="w-4 h-4 rounded-full border border-black dark:border-white flex items-center justify-center text-[8px]">LTE</div>
              <div className="w-6 h-3 rounded-sm border border-black dark:border-white relative">
                <div className="absolute left-0 top-0 h-full w-2/3 bg-black dark:bg-white"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="px-4 py-4 flex items-center justify-between bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 dark-transition">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 -ml-2 text-gray-800 dark:text-gray-200"
            >
              {isDarkMode ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
            <h1 className="text-base font-black uppercase tracking-tighter dark:text-white">Katalog Produktów</h1>
            <button className="p-2 -mr-2 text-ccc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7H4M14 12H10M18 17H6"/></svg>
            </button>
          </header>

          {/* Controls Bar */}
          <div className="bg-white dark:bg-[#121212] px-4 py-3 flex flex-col gap-3 border-b border-gray-50 dark:border-gray-800 dark-transition">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Opcje Widoku</span>
              <button 
                onClick={() => setIsCompact(!isCompact)}
                className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase transition-all ${isCompact ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-300'}`}
              >
                {isCompact ? 'Tryb Kompaktowy' : 'Tryb Normalny'}
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-[#121212] px-4 pt-4 pb-32 no-scrollbar dark-transition">
            {Object.values(PricingVariant).map((variant) => (
              <section key={variant} className="mb-12 last:mb-20">
                <div className="mb-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black text-sm shrink-0">
                      {variant}
                  </div>
                  <div>
                      <h2 className="text-sm font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                          {VARIANT_DESCRIPTIONS[variant].title}
                      </h2>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 font-medium leading-relaxed">
                          {VARIANT_DESCRIPTIONS[variant].description}
                      </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-6">
                  {MOCK_PRODUCTS.map((product) => (
                    <ProductCard 
                      key={`${variant}-${product.id}`}
                      product={product}
                      variant={variant}
                      isCompact={isCompact}
                      onClick={() => handleProductClick(product)}
                      onInfoClick={(e) => handleInfoClick(e, product)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom Navigation Mock */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 flex items-center justify-between pb-4 z-50 dark-transition">
              <div className="flex flex-col items-center gap-1 text-ccc">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>
                  <span className="text-[10px] font-bold">Start</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <span className="text-[10px] font-bold">Szukaj</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  <span className="text-[10px] font-bold">Koszyk</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span className="text-[10px] font-bold">Klub</span>
              </div>
          </div>

        {/* Modals & Overlays */}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}

        {isBottomSheetOpen && bottomSheetData && (
          <BottomSheet 
            product={bottomSheetData} 
            onClose={() => setIsBottomSheetOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
