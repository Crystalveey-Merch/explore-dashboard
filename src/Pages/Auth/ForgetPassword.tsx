/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { auth, sendPasswordResetEmail } from "../../Config/firebase"
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom"


export const ForgetPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await sendPasswordResetEmail(auth, email, {
                url: "https://admin.crystalveey.com/login",
                handleCodeInApp: true,
            });
            toast.success("Password reset email sent!");
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-full gap-12">
            <div className="flex gap-3 w-full flex-col items-center">
                <h3 className="text-4xl font-bold sm:text-3xl">
                    Admin Dashboard
                </h3>

                <h2 className=" text-2xl font-medium text-gray-400 md:text-xl">
                    Reset your password here!
                </h2>
            </div>
            <form
                className="w-full flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
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
                <button type="submit" className="bg-[#00afef] text-white font-medium text-lg rounded-lg p-3 transition ease-in-out duration-300 hover:bg-[#3fc5e7] md:text-base md:p-2.5">
                    Send Password Reset Email
                </button>
                <p className="text-sm font-normal text-gray-600 text-center">
                    <NavLink
                        to="/login"
                        className="text-blue-700 font-semibold"
                    >Login
                    </NavLink>
                </p>
            </form>
        </div>
    )
}