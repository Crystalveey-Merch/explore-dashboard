import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"

export const Overview = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <div>
            Overview
        </div>
    )
}