import { ReactNode } from "react"
import SideBar from "../Components/Atelier/SideBar"
// import { useNavigate } from "react-router-dom"
// import { getKey } from "../Components/KeyFunctions"

export const AtelierDashboardLayout = ({ children }: { children: ReactNode }) => {
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const key = getKey("brand")
    //     if (!key) {
    //         navigate("/choose-brand")
    //     }
    // }, [navigate])

    return (
        <div className='flex h-screen overflow-hidden'>
            <SideBar/>
           
            <div className='flex flex-grow overflow-auto'>
                {children}
            </div>
        </div>
    )
}