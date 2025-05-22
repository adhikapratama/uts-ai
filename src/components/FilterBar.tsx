import React, { useState } from 'react';
import { FeatureWeight } from '../types';

interface FilterBarProps {
  onPriceRangeChange: (min: number, max: number) => void;
  onBrandFilter: (brands: string[]) => void;
  availableBrands: string[];
  weights: FeatureWeight[];
  onWeightChange: (id: string, value: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onPriceRangeChange,
  onBrandFilter,
  availableBrands,
  weights,
  onWeightChange
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(30000000);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = parseInt(e.target.value);
    setMinPrice(newMinPrice);
    onPriceRangeChange(newMinPrice, maxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = parseInt(e.target.value);
    setMaxPrice(newMaxPrice);
    onPriceRangeChange(minPrice, newMaxPrice);
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(updatedBrands);
    onBrandFilter(updatedBrands);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Bobot Kepentingan Fitur</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
        >
          {showFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'} 
          <span className="ml-1">
            {showFilters ? '▲' : '▼'}
          </span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {weights.map(weight => (
          <div key={weight.id} className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">{weight.name} ({weight.weight}%)</label>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weight.weight}
              onChange={(e) => onWeightChange(weight.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0066CC 0%, #0066CC ${weight.weight}%, #E5E7EB ${weight.weight}%, #E5E7EB 100%)`
              }}
            />
            <p className="text-xs text-gray-500 mt-1">{weight.description}</p>
          </div>
        ))}
      </div>

      {showFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200 animate-fadeIn">
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Rentang Harga</h3>
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Harga Minimum</label>
                <input
                  type="number"
                  min="0"
                  max={maxPrice}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">{formatPrice(minPrice)}</div>
              </div>
              <div className="text-gray-400">sampai</div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Harga Maksimum</label>
                <input
                  type="number"
                  min={minPrice}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">{formatPrice(maxPrice)}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Merek</h3>
            <div className="flex flex-wrap gap-2">
              {availableBrands.map(brand => (
                <label key={brand} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;