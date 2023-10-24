import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import emailImg from "../../assets/Images/Auth/email.png"
import { User, auth, onAuthStateChanged } from "../../Config/firebase";
import { onIdTokenChanged } from "firebase/auth";


export const VerifyEmail = () => {
    const navigate = useNavigate()
    ///const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const email = user?.email;


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            //setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleEmailVerification = async () => {
          
            if (user && user.emailVerified) {
                await user.getIdTokenResult(true);
                navigate("/");
            }
        };

        const unsubscribe = onIdTokenChanged(auth, handleEmailVerification);
        return () => unsubscribe();
    }, [user, navigate]);

    
    setInterval(() => {
        if (user && user.emailVerified) {
            navigate("/");
        }
    }, 3000);

    return (
        <div className="flex flex-col justify-center items-center h-full gap-12">
            <img src={emailImg} alt="email" className="w-40 h-40 sm:w-36 sm:h-36" />
            <div className=" flex flex-col items-center gap-4">
                <h3 className="text-5xl font-bold sm:text-3xl">
                    Check your email
                </h3>
                <p className="text-lg font-medium leading-normal text-center sm:text-base">
                    We have sent a verification link to {email}
                </p>
            </div>

        </div>
    );
}
