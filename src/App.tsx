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
import { AuthLayout, AtelierDashboardLayout, ExploreDasboardLayout } from './Layout';
import {
  Login, Register, ChooseBrand, ForgetPassword, VerifyEmail, NotFound, PrivateRoutes
} from './Pages';
import {
  Overview,
  Activities, AddActivity, EditActivity, TravelPackages, AddTravelPackage, EditTravelPackage, RetreatPackages, AddRetreatPackages, EditRetreatPackages, Invoice, Invoices, EditInvoice, FlightBookings, HotelReservations, VisaApplications, PrivateTrips, ExploreVault
} from "./Pages"
import { AtelierOverview } from './Pages/Atelier';
import { All, Cancelled, Installments, Paid, Review, Refunded, Booking } from "./Pages/Explore/TravelBookinngs"
import { AllActivities, CancelledActivities, InstallmentActivities, PaidActivities, ReviewActivities, RefundedActivities, BookingActivities } from "./Pages/Explore/ActivitiesBookings"
import { AllRetreats, CancelledRetreats, InstallmentRetreats, PaidRetreats, ReviewRetreats, RefundedRetreats, BookingRetreats } from "./Pages/Explore/RetreatBookings"
import { Waitlist } from './Components/Explore/Waitlist';
import { UploadProductForm } from './Components/Atelier/UploadProduct/UploadProductForm';
import { AllProducts } from './Components/Atelier/AllProducts';
import { Refurblish } from './Components/Atelier/Refurblish';
import RefurblishAndSell from './Components/Atelier/RefurblishAndSell';
import Orders from './Components/Atelier/Orders';
import UntagSell from './Components/Atelier/UntaggSell';
import CustonMade from './Components/Atelier/CustomMade';
import Users from './Components/Atelier/Users';


function App() {
  // const navigate = useNavigate()
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
      const usersRef = collection(db, "admins");
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
    const usersRef = collection(db, "admins");
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
    const userRef = collection(db, "admins");
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
          path="/"
          element={
            <AuthLayout>
              <ChooseBrand />
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
        <Route path="*" element={<NotFound />} />

        {/* <ExploreRoutes /> */}

        <Route element={<PrivateRoutes />}>
          <Route
            path="/explore"
            element={
              <ExploreDasboardLayout>
                <Overview />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/invoices"
            element={
              <ExploreDasboardLayout>
                <Invoices />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/invoices/edit/:id"
            element={
              <ExploreDasboardLayout>
                <EditInvoice />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/invoices/:id"
            element={
              <ExploreDasboardLayout>
                <Invoice />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities"
            element={
              <ExploreDasboardLayout>
                <Activities />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/activities/add"
            element={
              <ExploreDasboardLayout>
                <AddActivity />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/activities/edit/:id"
            element={
              <ExploreDasboardLayout>
                <EditActivity />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-packages"
            element={
              <ExploreDasboardLayout>
                <TravelPackages />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/travel-packages/add"
            element={
              <ExploreDasboardLayout>
                <AddTravelPackage />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/travel-packages/edit/:id"
            element={
              <ExploreDasboardLayout>
                <EditTravelPackage />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/retreat-packages"
            element={
              <ExploreDasboardLayout>
                <RetreatPackages />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/retreat-packages/add"
            element={
              <ExploreDasboardLayout>
                <AddRetreatPackages />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/retreat-packages/edit/:id"
            element={
              <ExploreDasboardLayout>
                <EditRetreatPackages />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/flight-bookings"
            element={
              <ExploreDasboardLayout>
                <FlightBookings />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/hotel-reservations"
            element={
              <ExploreDasboardLayout>
                <HotelReservations />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/visa-applications"
            element={
              <ExploreDasboardLayout>
                <VisaApplications />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/private-trips"
            element={
              <ExploreDasboardLayout>
                <PrivateTrips />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings"
            element={
              <ExploreDasboardLayout>
                <All />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/confirmed"
            element={
              <ExploreDasboardLayout>
                <Paid />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/installments"
            element={
              <ExploreDasboardLayout>
                <Installments />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/pending"
            element={
              <ExploreDasboardLayout>
                <Review />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/refunded"
            element={
              <ExploreDasboardLayout>
                <Refunded />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/cancelled"
            element={
              <ExploreDasboardLayout>
                <Cancelled />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/:id"
            element={
              <ExploreDasboardLayout>
                <Booking />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings"
            element={
              <ExploreDasboardLayout>
                <AllActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/confirmed"
            element={
              <ExploreDasboardLayout>
                <PaidActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/installments"
            element={
              <ExploreDasboardLayout>
                <InstallmentActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/pending"
            element={
              <ExploreDasboardLayout>
                <ReviewActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/refunded"
            element={
              <ExploreDasboardLayout>
                <RefundedActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/cancelled"
            element={
              <ExploreDasboardLayout>
                <CancelledActivities />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings/:id"
            element={
              <ExploreDasboardLayout>
                <BookingActivities />
              </ExploreDasboardLayout>
            }
          />
        </Route>
        <Route
          path="/explore/retreat-bookings"
          element={
            <ExploreDasboardLayout>
              <AllRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/confirmed"
          element={
            <ExploreDasboardLayout>
              <PaidRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/installments"
          element={
            <ExploreDasboardLayout>
              <InstallmentRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/pending"
          element={
            <ExploreDasboardLayout>
              <ReviewRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/refunded"
          element={
            <ExploreDasboardLayout>
              <RefundedRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/cancelled"
          element={
            <ExploreDasboardLayout>
              <CancelledRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/retreat-bookings/:id"
          element={
            <ExploreDasboardLayout>
              <BookingRetreats />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/waitlist/:packageTitle"
          element={
            <ExploreDasboardLayout>
              <Waitlist />
            </ExploreDasboardLayout>
          }
        />
        <Route
          path="/explore/explore-vault"
          element={
            <ExploreDasboardLayout>
              <ExploreVault />
            </ExploreDasboardLayout>
          }
        />
        {/* explore routes end */}
        {/* atelier routes */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/atelier"
            element={
              <AtelierDashboardLayout>
                <AtelierOverview />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/upload-product"
            element={
              <AtelierDashboardLayout>
                <UploadProductForm />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/all-products"
            element={
              <AtelierDashboardLayout>
                <AllProducts />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/uploadproduct/:id"
            element={
              <AtelierDashboardLayout>
                <UploadProductForm />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/refurblish"
            element={
              <AtelierDashboardLayout>
                <Refurblish />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/refurblish-and-sell"
            element={
              <AtelierDashboardLayout>
                <RefurblishAndSell />
              </AtelierDashboardLayout>
            }
          />
          <Route
            path="/atelier/orders"
            element={
              <AtelierDashboardLayout>
                <Orders />
              </AtelierDashboardLayout>
            }

          />
          <Route
            path="/atelier/untag-sell"
            element={
              <AtelierDashboardLayout>
                <UntagSell />
              </AtelierDashboardLayout>
            }

          />
          <Route
            path="/atelier/custom-made"
            element={
              <AtelierDashboardLayout>
                <CustonMade />
              </AtelierDashboardLayout>
            }

          />
          <Route
            path="/atelier/users"
            element={
              <AtelierDashboardLayout>
                <Users />
              </AtelierDashboardLayout>
            }

          />

        </Route>


        {/* atelier routes end */}
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
