/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import hideImg from "../../assets/SVG/Auth/Eye.svg"
import showImg from "../../assets/SVG/Auth/eye-closed.svg"
import { toast } from "react-toastify"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
import { auth, signInWithEmailAndPassword, db } from "../../Config/firebase"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

export const Login = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user) {
            navigate(-1)
        }
        // const previousRoute = document.referrer; // Get the previous route

        // if (user) {
        //     if (previousRoute.includes("admin.crystalveey.com")) {
        //         navigate(-1)
        //     } else {
        //         window.location.replace("https://admin.crystalveey.com");
        //     }
        // }
    }, [user, navigate])

    // useEffect(() => {
    //     const delay = 2000; // 4 seconds

    //     const timerId = setTimeout(() => {
    //         if (user) {
    //             navigate(-1);
    //         }
    //     }, delay);

    //     // Cleanup the timer on component unmount or if the user is already navigated
    //     return () => {
    //         clearTimeout(timerId);
    //     };
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user]);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            const userRef = doc(db, "admins", user.uid);
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
            });
            navigate("/")
            toast.success("Login Successful")
        } catch (error: any) {
            toast.error(error.message)
        }
    }



    return (
        <div className="min-h-screen py-10 flex flex-col gap-32md:gap-24">
            <div className="h-max">
                <NavLink to="/register" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700 md:pb-2" : "border-b-4 border-blue-50 pb-3 md:pb-2")}>
                    <button className="w-56 text-left text-black font-bold text-base xl:w-48 md:w-2/5 md:font-semibold">
                        REGISTER
                    </button>
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "pb-3 border-b-4 border-blue-700 md:pb-2" : "border-b-4 border-blue-50 pb-3 md:pb-2")}>
                    <button className="w-56 text-left text-black font-bold text-base xl:w-48 md:w-2/5 md:font-semibold">
                        LOGIN
                    </button>
                </NavLink>
            </div>
            <div className="w-full flex-grow flex justify-center items-center">
                <div className="w-full flex flex-col gap-14 items-center">
                    <div className="flex gap-3 w-full flex-col items-center">
                        <h3 className="text-4xl font-bold sm:text-3xl">
                            Admin Dashboard
                        </h3>

                        <h2 className=" text-2xl font-medium text-gray-400 md:text-xl">
                            Welcome back!
                        </h2>
                    </div>

                    <form className="w-full flex flex-col gap-6 md:gap-5" onSubmit={handleLogin}>

                        <div className="flex flex-col gap-3 md:gap-2">
                            <label htmlFor="email" className="text-base font-normal">
                                Email
                            </label>

                            <input type="email" name="email"
                                id="email" placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                            />
                        </div>

                        <div className="relative flex flex-col gap-3 md:gap-2">
                            <label htmlFor="password" className="text-base font-normal">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password" placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                            />

                            <img
                                src={showPassword ? hideImg : showImg}
                                alt="show password"
                                className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer md:bottom-0"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-900 font-medium flex items-center"
                            >
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="mr-2 bg-blue-600 cursor-pointer border-transparent rounded h-4 w-4"
                                />
                                <p> Remember for 30 days</p>
                            </label>
                            <p className="text-sm font-normal text-gray-600">
                                <NavLink
                                    to="/forget-password"
                                    className="text-blue-700 font-semibold"
                                >Forgot password
                                </NavLink>
                            </p>
                        </div>
                        <button type="submit"

                            className="bg-[#00afef] text-white font-medium text-lg rounded-lg p-3 transition ease-in-out duration-300 hover:bg-[#3fc5e7]  md:text-base md:p-2.5">
                            Log In
                        </button>
                    </form>

                </div>
            </ div>
        </div>
    )
}