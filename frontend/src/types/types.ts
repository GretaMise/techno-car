export interface Car {
  _id: string;
  make: string;
  model: string;
  description: string;
  price: number;
  features: string[];
  transmission: string;
  fuelType: string;
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
