import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarList } from './components/CarList/CarList';
import { Navigation } from './components/Navigation/Navigation';
import { CarDetails } from './components/CarDetails/CarDetails';
import { ReviewPage } from './components/ReviewPage/ReviewPage';
import { Login } from './components/LoginForm/LoginForm';
import { Register } from './components/Register/Register';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
// import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<CarList />} />
                <Route
                  path="/cars/:id"
                  element={<CarDetails carr={undefined} />}
                />
                <Route path="/reviews" element={<ReviewPage />} />
                {/* <Route path="/reviews" element={<ReviewCard />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Tikriname ar zmous gali patekti i dashboarda */}
                {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* </Route> */}
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
