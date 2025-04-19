import { useState, useEffect } from 'react';
import './car-list.css';
import axios from 'axios';
import { CarCard } from '../CarCard/CarCard';

interface Car {
  _id: number;
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

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Automobiliu Nuomos Platforma</h1>
        <p>Atraskite musu atrinktu automobiliu kolekcija</p>
      </div>
      <div className="section">
        <div className="section-title">
          <h2>Automobiliu Nuomos Pasiulymai</h2>
          <p>Perziurekite musu automobiliu kolekcija</p>
        </div>
        <div className="car-list">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarList;
