import axios from 'axios';
import { useState, useEffect } from 'react';
import { URL } from '../../../constants/globalConstants';
import { Car } from '../../../types/types';
import { CarModal } from '../../CarModal/CarModal';

export const AdminCarsTab = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL}/cars`);
      setCars(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // CarModal suhandlina pats
  // const handleCarSubmit = async (formData: Car) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //     },
  //   };

  //   try {
  // if (selected car) {
  //     await axios.patch(`${URL}/cars/${selectedCar._id}`, formData, config);
  //   } else  {
  //    await axios.post(`${URL}/cars/`)
  //     alert('Failed to create car');
  //   }
  // };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalVisible(true);
  };

  const handleDeleteCar = async (car: Car) => {
    const confirm = window.confirm('Are you sure you want to delete this car?');

    if (!confirm) return;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
    try {
      await axios.delete(`${URL}/cars/${car._id}`, config);
      fetchCars();
      alert('Car deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete car');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="admin-tab">
      <div className="admin-header">
        <h2>Car management</h2>
        <button className="btn" onClick={() => setIsModalVisible(true)}>
          Add new car
        </button>
      </div>
      {isloading ? (
        <p>Loading cars..</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price/day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.make} className="car-image" />
                </td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{`${car.price}/day`}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditCar(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCar(car)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalVisible && (
        <CarModal
          onModalClose={() => setIsModalVisible(false)}
          // selectedCar(null)
          onSuccess={fetchCars}
          selectedCar={selectedCar}
        />
      )}
    </div>
  );
};
