import { Outlet, Navigate } from "react-router-dom";


export const ProtectedRoute = () => {
    const accessToken = localStorage.getItem("accessToken");

    return accessToken ? <Outlet /> : <Navigate to="/login"/>;
}