import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
// import { getKey, setKey } from "../../Components/KeyFunctions";


export const ChooseBrand = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    // const key = getKey("brand")

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    // useEffect(() => {
    //     const key = getKey("brand")
    //     if (key) {
    //         navigate("/")
    //     }
    // }, [navigate])

    const handleBrand = (brand: string) => {
        navigate(`/${brand}`);
        // navigate("/");
        // setKey("brand", brand);
    };

    return (
        <div className="min-h-screen py-10 flex gap-14 flex-col justify-center items-center text-center">
            <h3 className="text-5xl font-bold sm:text-3xl"
                style={{
                    background: 'linear-gradient(90deg, black, #006c9c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                Choose Brand
            </h3>
            <div className="flex gap-8">
                <button
                    onClick={() => handleBrand("explore")}
                    className="p-6 text-[#006c9c] font-bold text-base md:font-semibold border-2 border-[#006c9c] rounded-xl transition duration-300 hover:bg-[#006c9c] hover:text-white">
                    Explore Dashboard
                </button>
                <button
                    onClick={() => handleBrand("atelier")}
                    className="p-6 text-black font-bold text-base md:font-semibold border-2 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white">
                    Atelier Dashboard
                </button>
            </div>
        </div>
    )
}