import { useSelector } from "react-redux"
import { Outlet, Navigate } from 'react-router-dom'
import { selectUser } from "../../Config/userSlice"

export const PrivateRoutes = () => {
    const user = useSelector(selectUser)
    return(
        user ? <Outlet /> : <Navigate to="/login" />
    )
}