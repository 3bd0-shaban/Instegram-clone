import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../Redux/Slices/UserSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { roles } = decoded

        isAdmin = roles.includes('admin');
        if (isAdmin) status = "admin";
        return { roles, status, isAdmin }
    }

    return { roles: [], isAdmin, status }
}
export default useAuth