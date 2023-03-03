import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../Components/Exports';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
const RequireAuth = ({ allowedRoles }) => {
    const { roles } = useAuth();
    const location = useLocation();
    const userInfo = useSelector(selectCurrentUser)
    return (
        <>
            {!userInfo?.isEmailActivated && <Navigate to={`/confirm?email=${userInfo?.email}`} state={{ from: location }} replace />}
            {roles.some(role => allowedRoles.includes(role))
                ? <Outlet />
                : <Navigate to="/signin" state={{ from: location }} replace />
            }
        </>
    )
}
export default RequireAuth