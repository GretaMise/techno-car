import { useNavigate } from 'react-router-dom';
import './car-card.css';
// import CarList from '../CarList/CarList';
import { Car } from '../../types/types';

interface CarProps {
  car: Car;
}

export const CarCard = ({ car }: CarProps) => {
  const naviguotiPuslapiuose = useNavigate();
  const handleClick = () => {
    // navigate (naviguotiPuslapiuose) - nuveda i kita puslapi jo neoerkraunant. Gali nuvesti tik i ta puslapi, kuri esame apsirase route.
    naviguotiPuslapiuose(`/cars/${car._id}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <img
        src={car.image}
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
