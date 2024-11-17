// componentes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedUser }) => {
    const token = localStorage.getItem('token');
    const storedLogin = localStorage.getItem('login');

    if (!token) {
        return <Navigate to="/login" />;
    }

    // Se um usuário permitido for especificado, verifique se o usuário logado corresponde
    if (allowedUser && storedLogin !== allowedUser) {
        return <Navigate to="/login" />; // Redireciona se o usuário não tiver permissão
    }

    return children;
};

export default ProtectedRoute;
