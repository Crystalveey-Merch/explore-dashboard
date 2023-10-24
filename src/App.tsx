import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import {
  loginUser,
  //selectUser,
  //updateUserProfile
} from './Config/userSlice';
import { addUsers } from './Config/usersSlice';
import {
  onAuthStateChanged,
  auth,
  createUserProfileDocument,
  db,
} from "./Config/firebase";
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import './App.css'
import { AuthLayout } from './Layout';
import { Login, Register, ForgetPassword, VerifyEmail } from './Pages';

function App() {
  const dispatch = useDispatch()

  onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth, {});
      if (!userRef) return;

      const snapShot = await getDoc(userRef);

      if (!snapShot.exists()) return;
      const user = { id: snapShot.id, ...snapShot.data() };
      dispatch(loginUser(user));
      localStorage.setItem("user", JSON.stringify(user));

      // Fetch all users from Firestore
      const usersRef = collection(db, "save4LaterUsers");
      const usersSnapshot = await getDocs(usersRef);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users: any[] = [];
      usersSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
          photoURL: doc.data().photoURL,
          // || handleCreateDefaultAvatar(doc.data().displayName
        });
      });

      dispatch(addUsers(users))
    } else {
      dispatch(loginUser(null));
      localStorage.removeItem("user");
    }
  });

  //TODO: update user profile in real time

  // Fetch all users from Firestore and update in real time
  useEffect(() => {
    const usersRef = collection(db, "save4LaterUsers");
    const unsubscribe = onSnapshot(usersRef, (usersSnapshot) => {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users: any[] = [];
      usersSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
          photoURL: doc.data().photoURL,
        });
      });

      dispatch(addUsers(users))

    });
    return () => unsubscribe();
  }, [dispatch]);

  //update user profile in real time
  useEffect(() => {
    const userRef = collection(db, "save4LaterUsers");
    const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users: any[] = [];
      userSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
          photoURL: doc.data().photoURL,
        });
      });

      const loggedInUser = users.find(
        (user) => user.id === auth.currentUser?.uid
      );
      dispatch(loginUser(loggedInUser));
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Routes>
      <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/forget-password"
          element={
            <AuthLayout>
              <ForgetPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthLayout>
              <VerifyEmail />
            </AuthLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
