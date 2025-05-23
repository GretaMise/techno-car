import { useNavigate, useParams } from 'react-router-dom';
import './car-details.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Car } from '../../types/types';
import { URL } from '../../constants/globalConstants';
import { AuthContext } from '../../context/AuthContext';
import { ReservationModal } from '../ReservationModal/ReservationModal';

export const CarDetails = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);

  // useParams() - yra hook, kuris naudojamas gauti URL parametrus, pvz. id = :id, name => :name
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isReservationModalVisible, setIsReservationModalVisible] =
    useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${URL}/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('CarDetails 26th. ');
      }
    };

    fetchCar();
  }, []);

  const handleBackClick = () => {
    // navigate  - nuveda i kita puslapi jo neoerkraunant. Gali nuvesti tik i ta puslapi, kuri esame apsirase route.
    navigate('/');
  };

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsReservationModalVisible(true);
  };

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* kaire puse */}
        <div className="car-detail-left">
          <img src={car?.image} alt="Car" className="car-detail-image" />
        </div>
        {/* desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header">
            <h2>
              {car?.make} {car?.model}
            </h2>
            <p className="car-year">{car?.year} m.</p>
          </div>
          {/*  */}
          <div className="car-description">
            <p>{car?.description}</p>
          </div>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Pavaru deze: </span>
              <span className="spec-value">{car?.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kuro tipas: </span>
              <span className="spec-value">{car?.fuel}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sedimu vietu skaicius: </span>
              <span className="spec-value">{car?.seats}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kaina per diena: </span>
              <span className="spec-value">{car?.price}</span>
            </div>
          </div>
          <div className="car-actions">
            <button
              className="button button-primary"
              onClick={handleReserveClick}
            >
              Rezervuoti
            </button>
            <button
              className="button button-secondary"
              onClick={handleBackClick}
            >
              Grizti i pagrindini puslapi
            </button>
          </div>
        </div>
      </div>
      {isReservationModalVisible && car && (
        <ReservationModal
          onModalClose={() => setIsReservationModalVisible(false)}
          car={car}
        />
      )}
    </div>
  );
};
