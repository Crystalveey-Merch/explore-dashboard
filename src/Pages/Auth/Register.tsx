/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import hideImg from "../../assets/SVG/Auth/Eye.svg"
import showImg from "../../assets/SVG/Auth/eye-closed.svg"
import { toast } from "react-toastify"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
import { auth, createUserProfileDocument, createUserWithEmailAndPassword, sendEmailVerification, } from "../../Config/firebase"


export const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [userType, setUserType] = useState("writer")

    useEffect(() => {
        // Update the display name when firstName or lastName changes
        setDisplayName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            await createUserProfileDocument(user, {
                displayName,
                email,
                // userType,
            })

            await sendEmailVerification(user);
            await navigate("/verify-email")
            toast.success("Registration successful");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen py-10 flex flex-col gap-32 w-full md:gap-24">
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
                            Register here!
                        </h2>
                    </div>

                    <form className="w-full flex flex-col gap-6" onSubmit={handleRegister}>

                        <div className="flex gap-3 w-full sm:flex-col">

                            <div className="flex flex-col gap-3 flex-grow md:gap-2">
                                <label htmlFor="first-name" className="text-base font-normal">
                                    First name
                                </label>

                                <input type="text" name="first-name"
                                    id="first-name" placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                                />
                            </div>

                            <div className="flex flex-col gap-3 flex-grow md:gap-2">
                                <label htmlFor="last-name" className="text-base font-normal">
                                    Last name
                                </label>

                                <input type="text" name="last-name"
                                    id="last-name" placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                                />
                            </div>

                        </div>
                        {/* <div className="flex flex-col gap-3 md:gap-2">
                            <label htmlFor="user-type" className="text-base font-normal">
                                You are joining as?
                            </label>

                            <select name="user-type" id="user-type"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2">
                                <option value="writer">
                                    Writer
                                </option>
                                <option value="reader">
                                    Reader
                                </option>
                            </select>
                        </div> */}

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

                        <div className="relative flex flex-col gap-3 md:gap-2">
                            <label htmlFor="confirm-password" className="text-base font-normal">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm-password"
                                id="confirm-password" placeholder="Enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="text-base font-normal border border-gray-300 shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition ease-in-out duration-500 md:p-2"
                            />

                            <img
                                src={showConfirmPassword ? hideImg : showImg}
                                alt="show password"
                                className="absolute right-4 bottom-1.5 transform -translate-y-1/2 cursor-pointer md:bottom-0"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </div>

                        <button type="submit" className="bg-[#00afef] text-white font-medium text-lg rounded-lg p-3 transition ease-in-out duration-300 hover:bg-[#3fc5e7] md:text-base md:p-2.5">
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}