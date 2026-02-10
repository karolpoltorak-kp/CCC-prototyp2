
import React from 'react';
import { Product, PricingVariant } from '../types';
import { formatPrice } from '../constants';

interface ProductCardProps {
  product: Product;
  variant: PricingVariant;
  isCompact: boolean;
  onClick: () => void;
  onInfoClick: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant, isCompact, onClick, onInfoClick }) => {
  const { currentPrice, lowest30Price, firstPrice, name, brand, image, isBestseller, isNew, clubPrice } = product;
  
  const hasPromo = lowest30Price && currentPrice < lowest30Price;
  const discountPercent = lowest30Price ? Math.round((1 - currentPrice / lowest30Price) * 100) : 0;
  const savingsAmount = lowest30Price ? lowest30Price - currentPrice : 0;

  const renderPriceBlock = () => {
    switch (variant) {
      case PricingVariant.A:
        return (
          <div className="space-y-0.5">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                Najniższa z 30 dni: {formatPrice(lowest30Price!)}
              </div>
            )}
            {firstPrice && firstPrice !== lowest30Price && (
              <div className="text-[9px] text-gray-400 dark:text-gray-500 font-normal">
                Cena pierwsza: {formatPrice(firstPrice)}
              </div>
            )}
          </div>
        );

      case PricingVariant.E: // Oszczędzasz (Kwotowa Korzyść)
        return (
          <div className="space-y-1">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 dark:bg-green-900/30 rounded text-[10px] text-green-700 dark:text-green-400 font-black">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m7 10 5 5 5-5"/></svg>
                  OSZCZĘDZASZ {formatPrice(savingsAmount)}
                </div>
                <div className="text-[8px] text-gray-400 dark:text-gray-500 font-medium pl-0.5">
                  Najniższa cena 30 dni: {formatPrice(lowest30Price!)}
                </div>
              </div>
            )}
          </div>
        );

      case PricingVariant.I: // CCC Club
        return (
          <div className="space-y-1">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {clubPrice && (
                <div className="bg-black dark:bg-white text-white dark:text-black text-[9px] px-1.5 py-0.5 rounded-sm inline-flex items-center gap-1 font-bold uppercase">
                    Klub: {formatPrice(clubPrice)}
                </div>
            )}
            {hasPromo && (
              <div className="text-[9px] text-gray-400 dark:text-gray-500 font-medium">
                Najniższa 30 dni: {formatPrice(lowest30Price!)}
              </div>
            )}
          </div>
        );

      case PricingVariant.J: // Visual Gauge
        return (
          <div className="space-y-1.5">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E30613]" style={{ width: `${discountPercent}%` }}></div>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                    <span>- {discountPercent}%</span>
                    <span>30 dni: {formatPrice(lowest30Price!)}</span>
                </div>
              </div>
            )}
          </div>
        );

      case PricingVariant.B:
        return (
          <div className="space-y-0.5">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="text-[9px] text-gray-500 dark:text-gray-400 truncate">
                30 dni: {formatPrice(lowest30Price!)} {firstPrice && ` • Pierwsza: ${formatPrice(firstPrice)}`}
              </div>
            )}
          </div>
        );

      case PricingVariant.C:
        return (
          <div className="space-y-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
                {formatPrice(currentPrice)}
              </span>
              {hasPromo && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 line-through">
                  {formatPrice(lowest30Price!)}
                </span>
              )}
            </div>
            {hasPromo && <div className="text-[8px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Najniższa cena (Omnibus)</div>}
          </div>
        );

      case PricingVariant.F:
        return (
          <div className="space-y-1">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                <span>30 dni: {formatPrice(lowest30Price!)}</span>
                <button onClick={onInfoClick} className="p-0.5 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </button>
              </div>
            )}
          </div>
        );

      case PricingVariant.D:
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
                {formatPrice(currentPrice)}
              </span>
              {hasPromo && (
                <span className="bg-[#E30613] text-white text-[9px] font-black px-1 py-0.5 rounded-sm">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {hasPromo && <div className="text-[9px] text-gray-400 dark:text-gray-500 font-medium">Najniższa 30 dni: {formatPrice(lowest30Price!)}</div>}
          </div>
        );

      case PricingVariant.G:
        return (
          <div className="space-y-0.5">
             <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="text-[9px] text-gray-400 dark:text-gray-500 font-medium italic">
                Cena Omnibus: {formatPrice(lowest30Price!)}
              </div>
            )}
          </div>
        );

      case PricingVariant.H:
        const showFirstPrice = firstPrice && ((firstPrice - lowest30Price!) / lowest30Price! >= 0.10);
        return (
          <div className="space-y-0.5">
            <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
              {formatPrice(currentPrice)}
            </div>
            {hasPromo && (
              <div className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                Najniższa 30 dni: {formatPrice(lowest30Price!)}
              </div>
            )}
            {showFirstPrice && (
              <div className="text-[9px] text-gray-300 dark:text-gray-600 font-normal">
                Cena początkowa: {formatPrice(firstPrice)}
              </div>
            )}
          </div>
        );

      default:
        return (
            <div className="space-y-0.5">
              <div className={`font-bold ${hasPromo ? 'text-[#E30613]' : 'text-gray-900 dark:text-gray-100'} ${isCompact ? 'text-base' : 'text-lg'}`}>
                {formatPrice(currentPrice)}
              </div>
              {hasPromo && (
                <div className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">
                  Najniższa z 30 dni: {formatPrice(lowest30Price!)}
                </div>
              )}
            </div>
        );
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col cursor-pointer transition-all hover:shadow-md active:scale-[0.98] dark-transition`}
    >
      <div className="relative aspect-[4/5] bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-black dark:bg-white text-white dark:text-black text-[8px] font-black px-1.5 py-1 rounded-sm uppercase tracking-tighter">NOWOŚĆ</span>
          )}
          {isBestseller && (
            <span className="bg-[#FFD700] text-black text-[8px] font-black px-1.5 py-1 rounded-sm uppercase tracking-tighter">BESTSELLER</span>
          )}
        </div>

        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-gray-400 dark:text-gray-500 hover:text-[#E30613] transition-colors shadow-sm"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>

        {variant === PricingVariant.G && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center justify-between">
                    <span className="text-white font-black text-base drop-shadow-lg">{formatPrice(currentPrice)}</span>
                    {hasPromo && <span className="bg-[#E30613] text-white text-[9px] px-1 font-bold rounded-sm">-{discountPercent}%</span>}
                </div>
            </div>
        )}
      </div>

      <div className={`${isCompact ? 'p-2' : 'p-3'} flex-1 flex flex-col`}>
        {variant !== PricingVariant.G && (
          <>
            <div className={`text-gray-900 dark:text-gray-100 font-black uppercase tracking-tight truncate ${isCompact ? 'text-[9px]' : 'text-[10px]'}`}>
              {brand}
            </div>
            <div className={`text-gray-500 dark:text-gray-400 leading-tight line-clamp-2 font-medium mt-0.5 ${isCompact ? 'text-[9px]' : 'text-[10px]'} min-h-[2.4em]`}>
              {name}
            </div>
          </>
        )}
        {variant === PricingVariant.G && (
            <div className="mb-2">
                <div className="text-gray-900 dark:text-gray-100 font-black uppercase tracking-tight truncate text-[10px]">{brand}</div>
                <div className="text-gray-500 dark:text-gray-400 text-[9px] line-clamp-1">{name}</div>
            </div>
        )}
        <div className="mt-auto pt-2 border-t border-gray-50 dark:border-gray-800">
          {renderPriceBlock()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
