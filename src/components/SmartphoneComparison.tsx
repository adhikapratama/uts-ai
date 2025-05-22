import React from 'react';
import { Smartphone, WeightedScore, FeatureWeight } from '../types';
import { calculateMEAPath } from '../utils/meaAlgorithm';

interface SmartphoneComparisonProps {
  selectedScores: WeightedScore[];
  weights: FeatureWeight[];
}

const SmartphoneComparison: React.FC<SmartphoneComparisonProps> = ({ 
  selectedScores,
  weights
}) => {
  if (selectedScores.length < 1) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // If only one smartphone is selected, just show detailed specs
  if (selectedScores.length === 1) {
    const { smartphone } = selectedScores[0];
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Spesifikasi {smartphone.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={smartphone.image} 
              alt={smartphone.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Merek</span>
                <span className="font-medium">{smartphone.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Harga</span>
                <span className="font-medium">{formatPrice(smartphone.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tahun Rilis</span>
                <span className="font-medium">{smartphone.launchYear}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Fitur Utama</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating Kamera</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${smartphone.features.camera * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{smartphone.features.camera}/10</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating Layar</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${smartphone.features.display * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{smartphone.features.display}/10</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">RAM</span>
                  <span className="font-medium">{smartphone.features.ram} GB</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prosesor</span>
                  <span className="font-medium">{smartphone.features.processor}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Baterai</span>
                  <span className="font-medium">{smartphone.features.battery} mAh</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Penyimpanan</span>
                  <span className="font-medium">{smartphone.features.storage} GB</span>
                </div>
              </div>
            </div>
            
            {smartphone.additionalInfo && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Informasi Tambahan</h3>
                <p className="text-gray-600">{smartphone.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // For comparison between two smartphones
  const mainSmartphone = selectedScores[0].smartphone;
  const comparisonSmartphone = selectedScores[1].smartphone;
  
  // Calculate the MEA path from the comparison to the main smartphone
  const meaPath = calculateMEAPath(comparisonSmartphone, mainSmartphone, weights);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Perbandingan Smartphone</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="text-center font-semibold text-blue-600">{mainSmartphone.name}</div>
        <div className="text-center font-semibold text-purple-600">{comparisonSmartphone.name}</div>
        
        <div className="font-medium text-gray-700">Harga</div>
        <div className={`text-center ${mainSmartphone.price < comparisonSmartphone.price ? 'text-green-600 font-semibold' : ''}`}>
          {formatPrice(mainSmartphone.price)}
        </div>
        <div className={`text-center ${comparisonSmartphone.price < mainSmartphone.price ? 'text-green-600 font-semibold' : ''}`}>
          {formatPrice(comparisonSmartphone.price)}
        </div>
        
        <div className="font-medium text-gray-700">Kamera</div>
        <div className={`text-center ${mainSmartphone.features.camera > comparisonSmartphone.features.camera ? 'text-green-600 font-semibold' : ''}`}>
          {mainSmartphone.features.camera}/10
        </div>
        <div className={`text-center ${comparisonSmartphone.features.camera > mainSmartphone.features.camera ? 'text-green-600 font-semibold' : ''}`}>
          {comparisonSmartphone.features.camera}/10
        </div>
        
        <div className="font-medium text-gray-700">Layar</div>
        <div className={`text-center ${mainSmartphone.features.display > comparisonSmartphone.features.display ? 'text-green-600 font-semibold' : ''}`}>
          {mainSmartphone.features.display}/10
        </div>
        <div className={`text-center ${comparisonSmartphone.features.display > mainSmartphone.features.display ? 'text-green-600 font-semibold' : ''}`}>
          {comparisonSmartphone.features.display}/10
        </div>
        
        <div className="font-medium text-gray-700">RAM</div>
        <div className={`text-center ${mainSmartphone.features.ram > comparisonSmartphone.features.ram ? 'text-green-600 font-semibold' : ''}`}>
          {mainSmartphone.features.ram} GB
        </div>
        <div className={`text-center ${comparisonSmartphone.features.ram > mainSmartphone.features.ram ? 'text-green-600 font-semibold' : ''}`}>
          {comparisonSmartphone.features.ram} GB
        </div>
        
        <div className="font-medium text-gray-700">Prosesor</div>
        <div className="text-center">{mainSmartphone.features.processor}</div>
        <div className="text-center">{comparisonSmartphone.features.processor}</div>
        
        <div className="font-medium text-gray-700">Baterai</div>
        <div className={`text-center ${mainSmartphone.features.battery > comparisonSmartphone.features.battery ? 'text-green-600 font-semibold' : ''}`}>
          {mainSmartphone.features.battery} mAh
        </div>
        <div className={`text-center ${comparisonSmartphone.features.battery > mainSmartphone.features.battery ? 'text-green-600 font-semibold' : ''}`}>
          {comparisonSmartphone.features.battery} mAh
        </div>
        
        <div className="font-medium text-gray-700">Penyimpanan</div>
        <div className={`text-center ${mainSmartphone.features.storage > comparisonSmartphone.features.storage ? 'text-green-600 font-semibold' : ''}`}>
          {mainSmartphone.features.storage} GB
        </div>
        <div className={`text-center ${comparisonSmartphone.features.storage > mainSmartphone.features.storage ? 'text-green-600 font-semibold' : ''}`}>
          {comparisonSmartphone.features.storage} GB
        </div>
        
        <div className="font-medium text-gray-700 pt-2 border-t">Skor Total</div>
        <div className="text-center font-bold text-blue-600 pt-2 border-t">
          {selectedScores[0].totalScore.toFixed(1)}
        </div>
        <div className="text-center font-bold text-purple-600 pt-2 border-t">
          {selectedScores[1].totalScore.toFixed(1)}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Analisis Means-End</h3>
        <p className="text-gray-600 mb-4">
          Berdasarkan preferensi Anda, berikut mengapa {mainSmartphone.name} {selectedScores[0].totalScore > selectedScores[1].totalScore ? 'lebih unggul dari' : 'dibandingkan dengan'} {comparisonSmartphone.name}:
        </p>
        
        <ul className="space-y-3">
          {meaPath.map((path, index) => (
            <li key={index} className="flex items-center">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 text-white text-xs ${index < 2 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                {index + 1}
              </span>
              <span>
                <strong>{path.feature}:</strong> {path.difference > 0 
                  ? `${mainSmartphone.name} lebih baik ${Math.abs(path.difference).toFixed(1)} poin` 
                  : path.difference < 0 
                    ? `${comparisonSmartphone.name} lebih baik ${Math.abs(path.difference).toFixed(1)} poin`
                    : `Keduanya sama baik`
                }
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmartphoneComparison;