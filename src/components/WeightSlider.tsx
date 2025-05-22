import React from 'react';
import { FeatureWeight } from '../types';

interface WeightSliderProps {
  featureWeight: FeatureWeight;
  onChange: (id: string, value: number) => void;
}

const WeightSlider: React.FC<WeightSliderProps> = ({ featureWeight, onChange }) => {
  const getGradientColor = (weight: number) => {
    if (weight < 25) return '#6B7280'; // Gray for low importance
    if (weight < 50) return '#0EA5E9'; // Light blue for medium importance
    if (weight < 75) return '#0284C7'; // Blue for high importance
    return '#0066CC'; // Dark blue for very high importance
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={`slider-${featureWeight.id}`} className="font-medium text-gray-700">
          {featureWeight.name} ({featureWeight.weight}%)
        </label>
        <span className="text-sm text-gray-500">{featureWeight.description}</span>
      </div>
      
      <input
        id={`slider-${featureWeight.id}`}
        type="range"
        min="0"
        max="100"
        value={featureWeight.weight}
        onChange={(e) => onChange(featureWeight.id, parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${getGradientColor(featureWeight.weight)} 0%, ${getGradientColor(featureWeight.weight)} ${featureWeight.weight}%, #E5E7EB ${featureWeight.weight}%, #E5E7EB 100%)`
        }}
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Not important</span>
        <span>Very important</span>
      </div>
    </div>
  );
};

export default WeightSlider;