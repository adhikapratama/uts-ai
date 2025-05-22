import React from 'react';
import { Smartphone, WeightedScore } from '../types';

interface SmartphoneCardProps {
  weightedScore: WeightedScore;
  onSelect: () => void;
  isSelected: boolean;
}

const SmartphoneCard: React.FC<SmartphoneCardProps> = ({ 
  weightedScore, 
  onSelect, 
  isSelected 
}) => {
  const { smartphone, totalScore, featureScores } = weightedScore;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 
        ${isSelected ? 'ring-2 ring-blue-500 scale-102' : 'hover:shadow-lg'}`}
      onClick={onSelect}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={smartphone.image} 
          alt={smartphone.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
          {smartphone.launchYear}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white font-semibold text-lg">{smartphone.name}</div>
          <div className="text-white/90 text-sm">{smartphone.brand}</div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-900">{formatPrice(smartphone.price)}</span>
          <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">
            Skor: {totalScore.toFixed(1)}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kamera</span>
              <span className="font-medium">{smartphone.features.camera}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${smartphone.features.camera * 10}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Layar</span>
              <span className="font-medium">{smartphone.features.display}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-purple-600 h-1.5 rounded-full" 
                style={{ width: `${smartphone.features.display * 10}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>RAM</span>
              <span className="font-medium">{smartphone.features.ram} GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-600 h-1.5 rounded-full" 
                style={{ width: `${(smartphone.features.ram/16) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="pt-2 text-xs text-gray-600">
            {smartphone.processor} · {smartphone.features.battery} mAh · {smartphone.features.storage} GB
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneCard;