// Taken from https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

// Code for Token Validity and Expiration Strategy
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';


const AuthContext = createContext();

// Function to check if JWT is expired
const checkTokenValidity = (token) => {
  if (!token) return false; // Token doesn't exist

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

  return Date.now() < expirationTime; // Check if token is not expired
};


// Function to handle expired tokens
const handleExpiredToken = () => {
  delete axios.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');

};

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  // useEffect hook to handle token expiration and validity checks
  useEffect(() => {
    // Check if token exists and is valid
    if (token && checkTokenValidity(token)) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);

      // Calculate the time until token expiration
      const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000; // Convert to milliseconds
      const timeUntilExpiration = expirationTime - Date.now();

      // Set a timeout to automatically log out the user when the token expires
      setTimeout(() => {
        handleExpiredToken();
      }, timeUntilExpiration);
    } else {
      // Token is invalid or expired, handle accordingly
      handleExpiredToken();
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const currentUsername = (token) => {
  if (!token) return undefined;

  const decodedToken = JSON.parse(atob(token.split('.')[1]));

  return decodedToken.iat;  
}

export default AuthProvider;
