import { useState } from 'react';
import axios from 'axios';
import './review-modal.css';

interface ReviewModalProps {
  onModalClose: () => void;
  onSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  onModalClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    try {
      await axios.post('https://localhost:3003/api/reviews', {
        name,
        comment,
        rating: Number(rating),
      });
      onModalClose();
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Ivyko klaida';

        setError(errorMessage);
      }
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Palikite atsiliepima</h2>
        {/* {' '} */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Vardas ir Pavarde</label>

            <input
              type="text"
              id="name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Atsiliepimas</label>
            <textarea
              id="description"
              rows={4}
              onChange={(event) => setComment(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Ivertinimas</label>
            <input
              type="number"
              id="rating"
              placeholder="nuo 1 iki 5"
              onChange={(event) => setRating(event.target.value)}
              required
            />
          </div>
          {error && <div className="error-container">{error}</div>}
          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atsaukti
            </button>
            <button type="submit" onClick={handleSubmit}>
              Pateikti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
