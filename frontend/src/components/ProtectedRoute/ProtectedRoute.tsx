import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = () => {
  // issitraukiam is contexto reikalingas reiksmes
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  // 2. Jeigu dar neuzkrauta, tai rodome loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // Outlet - reiskia, kad bus rodomi children toliau (pateks i reikalinga route, nes yra autentifikuotas)
    return <Outlet />;
  } else {
    // Jeigu neautentifikuotas, tai nuredirectinam i logina
    <Navigate to="/login" />;
  }
};
