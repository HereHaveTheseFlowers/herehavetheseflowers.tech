import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useAuth } from '../hooks/useAuth';
import { RouterList } from './routerList';

export function withPrivateRoute(children: JSX.Element) {
  /*     const { isAuth, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return <Loader />;
    } */
  const isAuth = true;

  return isAuth ? children : <Navigate to={RouterList.HOME} replace />;
}
