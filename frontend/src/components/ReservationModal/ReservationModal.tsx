import { useState, useEffect } from 'react';
import { Car } from '../../types/types';
import './reservation-modal.css';
import axios from 'axios';
import { URL } from '../../constants/globalConstants';
// import { useNavigate } from 'react-router-dom';

interface ReservationModalProps {
  onModalClose: () => void;
  onSuccess: () => void;
  car: Car;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  onModalClose,
  onSuccess,
  car,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();
  //gauname siandienos data
  const today = new Date().toISOString().split('T')[0];
  const token = localStorage.getItem('access_token');

  const handleFormSubmit = async (event: React.FormEvent) => {
    // kad nepersikrautu
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // skaiciuojam kiek dienu rezervuotis
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      await axios.post(
        `${URL}/reservations`,
        {
          totalDays: differenceInDays,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          carId: car._id,
        },
        config
      );
      onModalClose();
      onSuccess();
      setError(null);
      // navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.error || 'Ivyko klaida reszervavimo metu';
        setError(errorMessage);
      }
    }
  };

  // apskaiciuojame totalPrice
  // kai keisis datos, kaina bus perskaiciuota automatiskai
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = Math.abs(end.getTime() - start.getTime());
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(differenceInDays * car.price);
    }
  }, [startDate, endDate]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          Rezervuoti {car.make} {car.model}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Pradzios data</label>
            <input
              type="date"
              id="startDate"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Pabaigos data</label>
            <input
              type="date"
              id="endDate"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="booking-summary">
            <div className="price-info">
              <p>
                Kaina per diena: <strong>{car.price} €</strong>
              </p>
              <p className="total-price">
                Bendra kaina: <strong>{totalPrice} €</strong>
              </p>
            </div>
          </div>
          {error && <div className="error-container">{error}</div>}
          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atsaukti
            </button>
            <button type="submit" disabled={!startDate || !endDate}>
              Rezervuoti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
