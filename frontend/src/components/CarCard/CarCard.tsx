import { useNavigate } from 'react-router-dom';
import './car-card.css';
// import CarList from '../CarList/CarList';
import { Car } from '../../types/types';

interface CarProps {
  car: Car;
}

import { URL } from '../../constants/globalConstants';

export const CarCard = ({ car }: CarProps) => {
  const naviguotiPuslapiuose = useNavigate();
  const handleClick = () => {
    // navigate (naviguotiPuslapiuose) - nuveda i kita puslapi jo neoerkraunant. Gali nuvesti tik i ta puslapi, kuri esame apsirase route.
    naviguotiPuslapiuose(`/cars/${car._id}`);
  };

  // Check if image path is relative and prepend backend base URL if needed
  const imageUrl = car.image.startsWith('http')
    ? car.image
    : `${URL}/${car.image}`;

  return (
    <div className="car-card" onClick={handleClick}>
      <img
        src={imageUrl}
        alt={`${car.make} ${car.model}`}
        className="car-card-image"
      />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>{car.description}</p>
      </div>
    </div>
  );
};
