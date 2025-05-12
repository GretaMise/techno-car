// import { Reservation } from '../../../types/types';

// interface ReservationItemProps {
//   reservation: Reservation;
//   onDelete: (id: string) => void;
//   isDeleting: boolean;
// }
// can you push everything to github?

export const AdminsReservationsTab = () => {
  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Total price</th>
            <th>Booking date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tomas@gmail.com</td>
            <td>BMW 530</td>
            <td>2025-01-01</td>
            <td>2025-01-10</td>
            <td>1000 eur</td>
            <td>2024-01-01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
