import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({isAuthenticated, children}) {
  if (!isAuthenticated){
    return <Navigate to="/login" replace />
  }else{
    return children;
  }
}

export default ProtectedRoutes
