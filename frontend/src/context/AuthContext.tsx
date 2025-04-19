// Auth Context - bus atsakingas uz zmogaus autentifikacija, laikys funkcijas bei state

import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  token: null,
  error: null,
  login: async () => {},
  register: async () => {},
  // login: (email: string, password: string) => Promise<void>;
});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:3003/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setIsAuthenticated(true);
      setUser(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Klaida registruojant vartotoja');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:3003/api/auth/login`,
        {
          name,

          password,
        }
      );

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Klaida registruojant vartotoja');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, token, error, register, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
