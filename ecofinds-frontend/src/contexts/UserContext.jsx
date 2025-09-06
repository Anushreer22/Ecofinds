import { createContext, useContext, useReducer } from 'react';
import { authAPI } from '../services/api';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: true 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null,
        isAuthenticated: false 
      };
    case 'REGISTER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: true 
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { 
    user: null,
    isAuthenticated: false
  });

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { user, token } = response.data;
      
      dispatch({ type: 'LOGIN', payload: user });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { user, token } = response.data;
      
      dispatch({ type: 'REGISTER', payload: user });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ 
      state, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);