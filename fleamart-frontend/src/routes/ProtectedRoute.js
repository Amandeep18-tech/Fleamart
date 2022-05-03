// This file protects the unauthorised access to the application.
import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AccountContext } from '../Account';

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { fetchSession } = useContext(AccountContext);

  useEffect(() => {
    fetchSession()
      .then()
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
