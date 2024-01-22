import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../Config/userSlice"
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Config/firebase";
// import SideBar from "../../Components/Atelier/SideBar";
export const AtelierOverview = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const dispatch = useDispatch();

    const SignOut = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await signOut(auth);
                dispatch(logout);
                localStorage.removeItem("user");
                window.location.href = "/login";
                toast.success("Logout successful");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                alert(error.message);
            }
        }
    };


    return (
        <div className="min-h-screen py-10 flex flex-col gap-14 justify-center items-center text-center">
            <h2 className="text-2xl font-medium text-gray-400 md:text-xl">
                Welcome {user?.displayName} to Atelier Admin Block
            </h2>
            <button onClick={SignOut} className="p-6 text-black font-bold text-base md:font-semibold border-2 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white">
                Logout
            </button>
        </div>
    )
}