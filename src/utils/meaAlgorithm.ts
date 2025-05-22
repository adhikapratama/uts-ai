import { Smartphone, WeightedScore, FeatureWeight } from '../types';

// Normalize values to a 0-10 scale
const normalizeValue = (value: number, min: number, max: number): number => {
  if (max === min) return 5; // If all values are the same, return middle score
  return ((value - min) / (max - min)) * 10;
};

// For price, lower is better, so we invert the normalized score
const invertScore = (score: number): number => {
  return 10 - score;
};

export const calculateWeightedScores = (
  smartphones: Smartphone[],
  weights: FeatureWeight[]
): WeightedScore[] => {
  if (smartphones.length === 0) return [];

  // Find min and max values for normalization
  const minMaxValues = {
    camera: { min: Math.min(...smartphones.map(s => s.features.camera)), max: Math.max(...smartphones.map(s => s.features.camera)) },
    display: { min: Math.min(...smartphones.map(s => s.features.display)), max: Math.max(...smartphones.map(s => s.features.display)) },
    ram: { min: Math.min(...smartphones.map(s => s.features.ram)), max: Math.max(...smartphones.map(s => s.features.ram)) },
    price: { min: Math.min(...smartphones.map(s => s.price)), max: Math.max(...smartphones.map(s => s.price)) }
  };

  // Get individual weights
  const weightMap = weights.reduce((acc, w) => {
    acc[w.id] = w.weight / 100; // Convert to 0-1 scale
    return acc;
  }, {} as Record<string, number>);

  // Calculate weighted scores for each smartphone
  return smartphones.map(smartphone => {
    // Normalize and calculate individual feature scores
    const normalizedCamera = normalizeValue(smartphone.features.camera, minMaxValues.camera.min, minMaxValues.camera.max);
    const normalizedDisplay = normalizeValue(smartphone.features.display, minMaxValues.display.min, minMaxValues.display.max);
    const normalizedRam = normalizeValue(smartphone.features.ram, minMaxValues.ram.min, minMaxValues.ram.max);
    const normalizedPrice = normalizeValue(smartphone.price, minMaxValues.price.min, minMaxValues.price.max);
    const invertedPriceScore = invertScore(normalizedPrice); // Invert price score since lower is better

    // Calculate weighted feature scores
    const cameraScore = normalizedCamera * (weightMap.camera || 0.25);
    const displayScore = normalizedDisplay * (weightMap.display || 0.25);
    const ramScore = normalizedRam * (weightMap.ram || 0.25);
    const priceScore = invertedPriceScore * (weightMap.price || 0.25);

    // Calculate total score
    const totalScore = cameraScore + displayScore + ramScore + priceScore;

    return {
      smartphone,
      totalScore,
      featureScores: {
        camera: cameraScore,
        display: displayScore,
        ram: ramScore,
        price: priceScore
      }
    };
  }).sort((a, b) => b.totalScore - a.totalScore); // Sort by total score in descending order
};

export const calculateMEAPath = (
  currentSmartphone: Smartphone | null,
  targetSmartphone: Smartphone,
  weights: FeatureWeight[]
): { feature: string; difference: number }[] => {
  if (!currentSmartphone) return [];

  // Get individual weights
  const weightMap = weights.reduce((acc, w) => {
    acc[w.id] = w.weight / 100; // Convert to 0-1 scale
    return acc;
  }, {} as Record<string, number>);

  // Calculate differences for each feature
  const differences = [
    {
      feature: 'Camera',
      difference: (targetSmartphone.features.camera - currentSmartphone.features.camera) * (weightMap.camera || 0.25)
    },
    {
      feature: 'Display',
      difference: (targetSmartphone.features.display - currentSmartphone.features.display) * (weightMap.display || 0.25)
    },
    {
      feature: 'Performance',
      difference: (targetSmartphone.features.ram - currentSmartphone.features.ram) * (weightMap.ram || 0.25) / 2 // Normalize RAM differences
    },
    {
      feature: 'Price',
      difference: (currentSmartphone.price - targetSmartphone.price) * (weightMap.price || 0.25) / 100 // Invert and normalize price
    }
  ];

  // Sort by absolute difference (most significant first)
  return differences.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));
};