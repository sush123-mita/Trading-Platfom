import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';


export default function ProtectedRoute({children}){
    const token =localStorage.getItem('token')
    const location=useLocation;

     console.log('ProtectedRoute - Current path:', location.pathname);
    console.log('ProtectedRoute - Token exists:', !!token);

    if(!token) return <Navigate to="/login" replace/>
    return children;
}