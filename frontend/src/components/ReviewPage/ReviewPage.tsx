import axios from 'axios';
import { useEffect, useState } from 'react';
import './review-page.css';
import { Review } from '../../types/types';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { ReviewModal } from '../ReviewModal/ReviewModal';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Reviews</h1>
        <h2>Our customers love us!</h2>
        <button
          className="add-review-button"
          onClick={() => setIsModalVisible(true)}
        >
          New review
        </button>
      </div>
      <div className="review-page">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
      {isModalVisible && (
        <ReviewModal
          onModalClose={() => setIsModalVisible(false)}
          onSuccess={fetchReviews}
        />
      )}
    </>
  );
};
