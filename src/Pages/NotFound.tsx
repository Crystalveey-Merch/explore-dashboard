import { Link, useNavigate } from "react-router-dom";
import notFoundImage from "../../public/illustration_404.svg";




export const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-[calc(100vh-100px)] px-5 py-8 mt-16">
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl font-bold text-[#212B36]"> Page Not Found!</h1>
            </div>
            <img src={notFoundImage} alt="404" className="" />
            <div className="flex flex-col items-center justify-center gap-2">
                {/* <h1 className="text-2xl font-semibold text-gray-800"> Page Not Found</h1> */}
                <Link to="/" className="">
                    <button className="bg-[#006c9c] text-white px-4 py-2 rounded-md">Go Home</button>
                </Link>
                <p className="text-gray-400">-----or-----</p>
                <button onClick={() => navigate(-1)} className="bg-[#000000] text-white px-4 py-2 rounded-md">Go Back</button>
            </div>
        </div>
    );
}