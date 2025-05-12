export interface Car {
  _id: string;
  make: string;
  model: string;
  description: string;
  price: number;
  features: string[];
  transmission: string;
  fuel: string;
  seats: number;
  year: number;
  image: string;
}

export interface Review {
  _id: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  _id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  car: {
    _id: string;
    make: string;
    model: string;
    image: string;
    price: number;
  };
}
