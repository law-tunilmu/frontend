import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function LoginRequired() {
    const { token } = useAuth();

    if (token) {
        return <Outlet />;
    } else{
        return <Navigate to="/login"/>;
    }
}