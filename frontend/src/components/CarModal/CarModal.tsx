import { useEffect, useState } from 'react';
import axios from 'axios';
import './car-modal.css';
import { URL } from '../../constants/globalConstants';
import { Car } from '../../types/types';

interface CarModalProps {
  onModalClose: () => void;
  onSuccess: () => void;
  selectedCar: Car | null;
}

export const CarModal: React.FC<CarModalProps> = ({
  onModalClose,
  onSuccess,
  selectedCar,
}) => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string>('manual');
  const [fuel, setFuel] = useState<string>('');
  const [seats, setSeats] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    // const formData = {
    //   make,
    //   model,
    //   description,
    //   price,
    //   features,
    //   transmission,
    //   fuel,
    //   seats,
    //   year,
    //   image,
    // };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      };
      await axios.post(
        `${URL}/cars`,
        {
          make,
          model,
          description,
          price,
          features,
          transmission,
          fuel,
          seats,
          year,
          image,
        },
        config
      );
      onModalClose();
      onSuccess();
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Ivyko klaida';

        setError(errorMessage);
      }
    }
  };
  useEffect(() => {
    if (selectedCar) {
      setMake(selectedCar.make);
      setModel(selectedCar.model);
      setDescription(selectedCar.description);
      setPrice(selectedCar.price);
      setFeatures(selectedCar.features);
      setTransmission(selectedCar.transmission);
      setFuel(selectedCar.fuel);
      setSeats(selectedCar.seats);
      setYear(selectedCar.year);
      setImage(selectedCar.image);
    }
  }, [selectedCar]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{selectedCar ? 'Add new car' : 'Edit car'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Make</label>
            <input
              type="text"
              id="make"
              onChange={(event) => setMake(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              onChange={(event) => setModel(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="any price"
              onChange={(event) => setPrice(Number(event.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="features">Features</label>
            <input
              type="text"
              id="features"
              onChange={(event) =>
                setFeatures(event.target.value.split(',').map((f) => f.trim()))
              }
              placeholder="Comma separated features"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transmission">Transmission</label>
            <select
              id="transmission"
              value={transmission}
              onChange={(event) => setTransmission(event.target.value)}
              required
            >
              <option value="1">Manual</option>
              <option value="2">Automatic</option>
              <option value="3">Semi-auto</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuel">Fuel type</label>
            <input
              type="text"
              id="fuel"
              onChange={(event) => setFuel(event.target.value)}
              required
              // jksdlds
            />
          </div>
          <div className="form-group">
            <label htmlFor="seats">Seats</label>
            <input
              type="number"
              id="seats"
              placeholder="seats"
              onChange={(event) => setSeats(Number(event.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              placeholder="year"
              onChange={(event) => setYear(Number(event.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Insert image link</label>
            <input
              type="text"
              id="image"
              onChange={(event) => setImage(event.target.value)}
              required
            />
          </div>

          {error && <div className="error-container">{error}</div>}
          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atsaukti
            </button>
            <button type="submit">
              {selectedCar ? 'Update car' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
