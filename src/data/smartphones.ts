import { Smartphone } from '../types';

export const smartphones: Smartphone[] = [
  {
    id: '1',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    image: 'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 1299,
    features: {
      camera: 9.5,
      display: 9.8,
      ram: 12,
      processor: 'Snapdragon 8 Gen 3',
      battery: 5000,
      storage: 512
    },
    launchYear: 2024,
    additionalInfo: 'S Pen support, IP68 water resistance'
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 1199,
    features: {
      camera: 9.7,
      display: 9.6,
      ram: 8,
      processor: 'A17 Pro',
      battery: 4422,
      storage: 256
    },
    launchYear: 2023,
    additionalInfo: 'Dynamic Island, Titanium frame'
  },
  {
    id: '3',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    image: 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 999,
    features: {
      camera: 9.8,
      display: 9.0,
      ram: 12,
      processor: 'Google Tensor G3',
      battery: 4950,
      storage: 128
    },
    launchYear: 2023,
    additionalInfo: 'Best-in-class computational photography'
  },
  {
    id: '4',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 799,
    features: {
      camera: 8.5,
      display: 9.5,
      ram: 16,
      processor: 'Snapdragon 8 Gen 3',
      battery: 5400,
      storage: 256
    },
    launchYear: 2024,
    additionalInfo: 'Ultra-fast charging, Alert Slider'
  },
  {
    id: '5',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    image: 'https://images.pexels.com/photos/3644098/pexels-photo-3644098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 899,
    features: {
      camera: 9.6,
      display: 9.3,
      ram: 12,
      processor: 'Snapdragon 8 Gen 3',
      battery: 5000,
      storage: 256
    },
    launchYear: 2024,
    additionalInfo: 'Leica optics, MIUI 15'
  },
  {
    id: '6',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    image: 'https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 599,
    features: {
      camera: 7.8,
      display: 8.5,
      ram: 8,
      processor: 'Snapdragon 8+ Gen 1',
      battery: 4700,
      storage: 128
    },
    launchYear: 2023,
    additionalInfo: 'Glyph Interface, Transparent design'
  },
  {
    id: '7',
    name: 'Motorola Edge 40 Pro',
    brand: 'Motorola',
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 699,
    features: {
      camera: 8.2,
      display: 9.0,
      ram: 12,
      processor: 'Snapdragon 8 Gen 2',
      battery: 4600,
      storage: 256
    },
    launchYear: 2023,
    additionalInfo: 'Clean Android experience, 165Hz display'
  },
  {
    id: '8',
    name: 'ASUS ROG Phone 8 Pro',
    brand: 'ASUS',
    image: 'https://images.pexels.com/photos/7795106/pexels-photo-7795106.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 1099,
    features: {
      camera: 7.5,
      display: 9.7,
      ram: 16,
      processor: 'Snapdragon 8 Gen 3',
      battery: 5800,
      storage: 512
    },
    launchYear: 2024,
    additionalInfo: 'Gaming-focused, AirTrigger 6 system'
  }
];

export const defaultFeatureWeights = [
  {
    id: 'camera',
    name: 'Camera',
    weight: 30,
    description: 'Photo and video quality, features, and versatility'
  },
  {
    id: 'display',
    name: 'Display',
    weight: 25,
    description: 'Screen quality, brightness, refresh rate, and resolution'
  },
  {
    id: 'ram',
    name: 'Performance',
    weight: 20,
    description: 'Processing power, RAM, and overall speed'
  },
  {
    id: 'price',
    name: 'Price',
    weight: 25,
    description: 'Value for money and affordability'
  }
];