import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../Redux/Slices/UserSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isShipper = false
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { roles } = decoded

        isShipper = roles.includes('shipper');
        isAdmin = roles.includes('admin');

        if (isShipper) status = "shipper";
        if (isAdmin) status = "admin";
        return { roles, status, isAdmin }
    }

    return { roles: [], isShipper, isAdmin, status }
}
export default useAuth