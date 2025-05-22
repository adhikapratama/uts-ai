import React, { useState, useMemo, useEffect } from 'react';
import { smartphones, defaultFeatureWeights } from './data/smartphones';
import { calculateWeightedScores } from './utils/meaAlgorithm';
import { Smartphone, FeatureWeight, WeightedScore } from './types';

import Header from './components/Header';
import FilterBar from './components/FilterBar';
import SmartphoneCard from './components/SmartphoneCard';
import SmartphoneComparison from './components/SmartphoneComparison';

function App() {
  const [weights, setWeights] = useState<FeatureWeight[]>(defaultFeatureWeights);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 30000000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSmartphones, setSelectedSmartphones] = useState<WeightedScore[]>([]);

  const handleWeightChange = (id: string, value: number) => {
    const otherWeights = weights.filter(w => w.id !== id);
    const totalOtherWeights = otherWeights.reduce((acc, w) => acc + w.weight, 0);
    
    if (value === 100) {
      setWeights([
        { ...weights.find(w => w.id === id)!, weight: 100 },
        ...otherWeights.map(w => ({ ...w, weight: 0 }))
      ]);
      return;
    }
    
    let remaining = 100 - value;
    if (totalOtherWeights === 0) {
      const equalWeight = Math.floor(remaining / otherWeights.length);
      setWeights([
        { ...weights.find(w => w.id === id)!, weight: value },
        ...otherWeights.map(w => ({ ...w, weight: equalWeight }))
      ]);
    } else {
      setWeights([
        { ...weights.find(w => w.id === id)!, weight: value },
        ...otherWeights.map(w => ({
          ...w,
          weight: Math.round((w.weight / totalOtherWeights) * remaining)
        }))
      ]);
    }
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleBrandFilter = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const handleSmartphoneSelect = (smartphone: WeightedScore) => {
    if (selectedSmartphones.some(s => s.smartphone.id === smartphone.smartphone.id)) {
      setSelectedSmartphones(selectedSmartphones.filter(s => s.smartphone.id !== smartphone.smartphone.id));
    } else {
      setSelectedSmartphones([
        ...selectedSmartphones.slice(0, 1),
        smartphone
      ].slice(0, 2));
    }
  };

  const handleReset = () => {
    setSelectedSmartphones([]);
  };

  const filteredAndScoredSmartphones = useMemo(() => {
    const filtered = smartphones.filter(phone => {
      const priceMatch = phone.price >= priceRange.min && phone.price <= priceRange.max;
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(phone.brand);
      return priceMatch && brandMatch;
    });
    
    return calculateWeightedScores(filtered, weights);
  }, [smartphones, weights, priceRange, selectedBrands]);

  const availableBrands = useMemo(() => {
    return [...new Set(smartphones.map(s => s.brand))];
  }, [smartphones]);

  useEffect(() => {
    document.title = "PilihPintar - Rekomendasi Smartphone";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onReset={handleReset} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar 
          onPriceRangeChange={handlePriceRangeChange}
          onBrandFilter={handleBrandFilter}
          availableBrands={availableBrands}
          weights={weights}
          onWeightChange={handleWeightChange}
        />
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`${selectedSmartphones.length > 0 ? 'md:w-1/2' : 'w-full'}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Smartphone ({filteredAndScoredSmartphones.length})</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndScoredSmartphones.map(score => (
                <SmartphoneCard
                  key={score.smartphone.id}
                  weightedScore={score}
                  onSelect={() => handleSmartphoneSelect(score)}
                  isSelected={selectedSmartphones.some(s => s.smartphone.id === score.smartphone.id)}
                />
              ))}
            </div>
            
            {filteredAndScoredSmartphones.length === 0 && (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500">Tidak ada smartphone yang sesuai dengan filter Anda.</p>
              </div>
            )}
          </div>
          
          {selectedSmartphones.length > 0 && (
            <div className="md:w-1/2 md:sticky md:top-6 self-start">
              <SmartphoneComparison 
                selectedScores={selectedSmartphones}
                weights={weights}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;