export interface Smartphone {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  features: {
    camera: number; // Rating out of 10
    display: number; // Rating out of 10
    ram: number; // GB
    processor: string;
    battery: number; // mAh
    storage: number; // GB
  };
  launchYear: number;
  additionalInfo?: string;
}

export interface FeatureWeight {
  id: string;
  name: string;
  weight: number; // 0-100
  description: string;
}

export interface WeightedScore {
  smartphone: Smartphone;
  totalScore: number;
  featureScores: {
    camera: number;
    display: number;
    ram: number;
    price: number;
  };
}