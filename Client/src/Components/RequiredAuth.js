import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../Components/Exports';
const RequireAuth = ({ allowedRoles }) => {
    const { roles } = useAuth();
    const location = useLocation();
    return (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}
export default RequireAuth