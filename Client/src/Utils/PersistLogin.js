import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "../Redux/APIs/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "../Redux/Slices/UserSlice";
import usePersist from "../Hooks/usePersist";
import { LoadingScreen } from "../Components/Exports";
const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);

    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false)
    const dispatch = useDispatch();
    const [refresh, { isUninitialized, isLoading, isSuccess, isError }] = useRefreshMutation();

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const { accessToken, user } = await refresh().unwrap()
                    dispatch(setCredentials({ accessToken, user }))
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])



    let content
    if (!persist) { // persist: no
        // console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        // console.log('loading')

        content =
            <>
                <LoadingScreen />
            </>
    } else if (isError) { //persist: yes, token: no
        // console.log('error')
        // console.log(error)
        content = <Outlet />
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        // console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        // console.log('token and uninit')
        // console.log(isUninitialized)
        content = <Outlet />
    }
    return content
}

export default PersistLogin

