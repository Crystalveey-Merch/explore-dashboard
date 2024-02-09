import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectUser } from '../../Config/userSlice';

export const PrivateRoutes = () => {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const user = useSelector(selectUser);

    useEffect(() => {
        // Simulate an asynchronous authentication check
        const delay = 3000; // 3 seconds
        const timerId = setTimeout(() => {
            setCheckingAuth(false);
        }, delay);

        // Cleanup the timer on component unmount or if authentication is resolved
        return () => clearTimeout(timerId);
    }, []);

    if (checkingAuth) {
        // You can render a loading spinner or any other UI while checking authentication
        return <div className="flex flex-col items-center justify-center w-full h-screen">
            <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};
