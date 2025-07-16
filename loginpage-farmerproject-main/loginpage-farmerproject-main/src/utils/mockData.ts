export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  farmerId: string;
  isActive: boolean;
}

export interface Warehouse {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: string;
  pricePerMonth: number;
  image: string;
  isAvailable: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, locally grown organic tomatoes perfect for cooking and salads.',
    price: 4.50,
    quantity: 100,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmerId: '1',
    isActive: true
  },
  {
    id: '2',
    name: 'Sweet Corn',
    description: 'Freshly harvested sweet corn, perfect for grilling or boiling.',
    price: 3.20,
    quantity: 75,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmerId: '1',
    isActive: true
  },
  {
    id: '3',
    name: 'Fresh Lettuce',
    description: 'Crisp and fresh lettuce leaves, ideal for salads and sandwiches.',
    price: 2.80,
    quantity: 50,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmerId: '1',
    isActive: false
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Green Valley Storage',
    description: 'Climate-controlled warehouse facility perfect for storing fresh produce and grains.',
    location: 'Valley Road, Farmington',
    capacity: '500 tons',
    pricePerMonth: 1200,
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: false
  },
  {
    id: '2',
    name: 'Sunrise Warehouse',
    description: 'Large storage facility with modern refrigeration systems.',
    location: 'Industrial District, Riverside',
    capacity: '750 tons',
    pricePerMonth: 1800,
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  }
];