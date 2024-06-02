import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function LoginRequired() {
    const { token } = useAuth();
    const location = useLocation();    
    const params = new URLSearchParams();
    params.set("redirect_to", location.pathname);

    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to={`/login?${params}`}/>;
    }
}