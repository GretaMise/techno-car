// import { useNavigate } from 'react-router-dom';
import { Review } from '../../types/types';

import './review-card.css';
// import { ReactNode } from 'react';

// interface ReviewCardProps {
//   id: any;
//   image: string | undefined;
//   name: ReactNode;
//   rating: ReactNode;
//   comment: ReactNode;
//   date: ReactNode;
//   review: Review;
// }

// export const ReviewCard = ({ review }: { review: ReviewCardProps }) => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate(`/reviews/${review.id}`);
//   };

//   return (
//     <div className="review-card" onClick={handleClick}>
//       <div className="photo-name-rating">
//         <img src={review.image} alt="" />
//         <div className="name-rating">
//           <h2>{review.name}</h2>
//           <h1>Rating: {review.rating}/10</h1>
//         </div>
//       </div>
//       <p>Comment: {review.comment}</p>
//       <div className="date">
//         <p>Posted on: {review.date}</p>
//       </div>
//     </div>
//   );
// };

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-author">
          <div className="author-avatar">{review.name[0]}</div>
          <h3>{review.name}</h3>
        </div>
        <span>{review.rating}/5</span>
      </div>
      <div className="review-card-content">
        <p className="review-text">{review.comment}</p>
        <p className="review-date">{formattedDate}</p>
      </div>
    </div>
  );
};
