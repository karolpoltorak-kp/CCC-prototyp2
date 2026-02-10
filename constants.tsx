
import { Product, PricingVariant } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: 'LASOCKI',
    name: 'Trzewiki skórzane MI08-C785-813-04',
    image: 'https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?q=80&w=400&auto=format&fit=crop',
    currentPrice: 199.99,
    lowest30Price: 249.99,
    firstPrice: 299.99,
    isBestseller: true,
    clubPrice: 179.99
  },
  {
    id: '2',
    brand: 'GINO ROSSI',
    name: 'Trzewiki klasyczne czarne MTU422',
    image: 'https://images.unsplash.com/photo-1614252331590-7d9768340798?q=80&w=400&auto=format&fit=crop',
    currentPrice: 349.99,
    lowest30Price: 349.99,
    firstPrice: 499.99
  },
  {
    id: '3',
    brand: 'SPRANDI',
    name: 'Trapery Earth MP07-01548-01',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop',
    currentPrice: 159.99,
    lowest30Price: null,
    firstPrice: null,
    isNew: true
  },
  {
    id: '4',
    brand: 'BADURA',
    name: 'Sztyblety zamszowe 2278-04',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=400&auto=format&fit=crop',
    currentPrice: 429.99,
    lowest30Price: 429.99,
    firstPrice: 429.99
  }
];

export const VARIANT_DESCRIPTIONS = {
  [PricingVariant.A]: {
    title: 'Wariant A: Standard Omnibus',
    description: 'Klasyczny układ kaskadowy. Najwyższa czytelność prawna, duży footprint pionowy.'
  },
  [PricingVariant.B]: {
    title: 'Wariant B: Horyzontalna Kompresja',
    description: 'Łączenie danych w jedną linię. Idealne dla widoku siatki (grid), oszczędza miejsce na nazwę.'
  },
  [PricingVariant.C]: {
    title: 'Wariant C: Akcent Promocyjny (Strike)',
    description: 'Przekreślenie ceny najniższej z 30 dni bezpośrednio przy cenie głównej. Agresywna sprzedaż.'
  },
  [PricingVariant.D]: {
    title: 'Wariant D: Fokus na Procent',
    description: 'Badge procentowy wyliczany względem ceny z 30 dni. Najlepiej konwertujący komunikat.'
  },
  [PricingVariant.E]: {
    title: 'Wariant E: "Oszczędzasz" (PLN)',
    description: 'Wyraźne wskazanie na zielono, jaką konkretnie kwotę klient zyskuje dzięki obniżce.'
  },
  [PricingVariant.F]: {
    title: 'Wariant F: Progressive Disclosure',
    description: 'Ukrycie "Ceny pierwszej" pod ikoną info. Redukcja szumu wizualnego dla produktów w stałych cenach.'
  },
  [PricingVariant.G]: {
    title: 'Wariant G: Image Overlay',
    description: 'Przeniesienie ceny na zdjęcie. Styl premium, maksymalizuje widoczność produktu.'
  },
  [PricingVariant.H]: {
    title: 'Wariant H: Inteligentny Minimalizm',
    description: 'Pokazuje "Cenę pierwszą" tylko jeśli różnica wynosi min. 10%. Eliminuje zbędne dane.'
  },
  [PricingVariant.I]: {
    title: 'Wariant I: CCC Club Exclusive',
    description: 'Dodatkowa warstwa ceny dla klubowiczów. Buduje lojalność i pokazuje "cenę ukrytą".'
  },
  [PricingVariant.J]: {
    title: 'Wariant J: Pasek Obniżki (Visual Gauge)',
    description: 'Wizualny pasek postępu pokazujący, jak blisko ceny minimalnej jesteśmy.'
  }
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price).replace(/\s/g, '\u00A0');
};
