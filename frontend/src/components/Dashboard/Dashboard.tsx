import { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { AccountInfo } from './components/AccountInfo';
import { ReservationList } from './components/ReservationList';
import axios from 'axios';
import { Reservation } from '../../types/types';
import { URL } from '../../constants/globalConstants';
import { AdminCarsTab } from './components/AdminCarsTab';
import { AdminsReservationsTab } from './components/AdminReservationsTab';

// 0. susikuriame API interface
// 1. pasifetchinam rezervacijas. panaudojam useEffect (axios token)
// 2. perduodame rezervacijas i ReservationList komponenta
// 3. ReservationList komponentas atvaizduoja rezervacijas

// interface ReservationProps {
//   reservation: Reservation;
// }

type Tab = 'user' | 'admin-cars' | 'admin-reservations';

export const Dashboard = () => {
  const { user, access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>('user');
  const isAdmin = user?.role === 'admin';

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const response = await axios.get<Reservation[]>(
        `${URL}/reservations`,
        config
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  // pasitvarkyt error

  useEffect(() => {
    if (access_token) {
      fetchReservations();
    }
  }, [access_token]);

  // handle delete// kodel istrina visas reszervacijas kartu?
  const handleDelete = async (reservationId: string) => {
    if (!confirm('Ar tikrai norite istrinti automobili?')) return;

    try {
      setDeleteLoading(reservationId);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.delete(`${URL}/reservations/${reservationId}`, config);

      // Update the reservations list
      setReservations((prev) =>
        prev.filter((res) => res._id !== reservationId)
      );
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>
      {isAdmin && (
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            My Reservations
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-cars' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-cars')}
          >
            Manage Cars
          </button>
          <button
            className={`tab-button ${
              activeTab === 'admin-reservations' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('admin-reservations')}
          >
            All Reservations
          </button>
        </div>
      )}

      <div className="dashboard-content">
        {activeTab === 'user' && (
          <>
            <AccountInfo user={user} />
            <ReservationList
              reservations={reservations}
              loading={loading}
              deleteLoading={deleteLoading}
              onDelete={handleDelete}
            />
          </>
        )}
        {activeTab === 'admin-cars' && <AdminCarsTab />}
        {activeTab === 'admin-reservations' && <AdminsReservationsTab />}
      </div>
    </div>
  );
};
