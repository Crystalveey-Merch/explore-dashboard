/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
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
  Activities, AddActivity, EditActivity, TravelPackages, AddTravelPackage, EditTravelPackage, RetreatPackages, AddRetreatPackages, EditRetreatPackages, Invoice, Invoices, EditInvoice, FlightBookings, HotelReservations, VisaApplications, PrivateTrips, ExploreVault,
  Employees
} from "./Pages"
import { AtelierOverview } from './Pages/Atelier';
import { All, Cancelled, Installments, Paid, Review, Refunded, Booking } from "./Pages/Explore/TravelBookinngs"
import { AllActivities, CancelledActivities, InstallmentActivities, PaidActivities, ReviewActivities, RefundedActivities, BookingActivities } from "./Pages/Explore/ActivitiesBookings"
import { AllRetreats, CancelledRetreats, InstallmentRetreats, PaidRetreats, ReviewRetreats, RefundedRetreats, BookingRetreats } from "./Pages/Explore/RetreatBookings"
import { AllTours, CancelledTours, InstallmentTours, PaidTours, ReviewTours, RefundedTours, BookingTours } from "./Pages/Explore/TourBookings"
import { AddTourPackage, EditTourPackage, TourPackages } from "./Pages/Explore/TourPackages"
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


  //all states will be fetched here and assigned to their pages
  const [bookings, setBookings] = useState<any[]>([]);
  const [travelBookings, setTravelBookings] = useState<any[]>([])
  const [activityBookings, setActivityBookings] = useState<any[]>([])
  const [retreatBookings, setRetreatBookings] = useState<any[]>([])
  const [tourBookings, setTourBookings] = useState<any[]>([])
  const [waitList, setWaitList] = useState<any[]>([])

  const [activities, setActivities] = useState<any[]>([])
  const [travelPackages, setTravelPackages] = useState<any[]>([])
  const [retreatPackages, setRetreatPackages] = useState<any[]>([])
  const [tourPackages, setTourPackages] = useState<any[]>([])

  const [admins, setAdmins] = useState<any[]>([])

  useEffect(() => {
    const unsubscribeBookings = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const updatedBookings = [] as any;
      snapshot.forEach((doc) => {
        updatedBookings.push({ ...doc.data(), id: doc.id });
      });
      setBookings(updatedBookings);
    });

    const unsubscribeWaitlist = onSnapshot(collection(db, 'waitlist'), (snapshot) => {
      const updatedWaitlist = [] as any;
      snapshot.forEach((doc) => {
        const waitlistEntry = { ...doc.data(), id: doc.id };
        updatedWaitlist.push(waitlistEntry);
      });
      setWaitList(updatedWaitlist);
    });

    const unsubscribeActivities = onSnapshot(collection(db, 'activities'), (snapshot) => {
      const updatedActivities = [] as any;
      snapshot.forEach((doc) => {
        updatedActivities.push({ ...doc.data(), id: doc.id });
      });
      setActivities(updatedActivities);
    });

    const unsubscribeTravelPackages = onSnapshot(collection(db, 'travelPackages'), (snapshot) => {
      const updatedTravelPackages = [] as any;
      snapshot.forEach((doc) => {
        updatedTravelPackages.push({ ...doc.data(), id: doc.id });
      });
      setTravelPackages(updatedTravelPackages);
    });

    const unsubscribeRetreatPackages = onSnapshot(collection(db, 'retreatPackages'), (snapshot) => {
      const updatedRetreatPackages = [] as any;
      snapshot.forEach((doc) => {
        updatedRetreatPackages.push({ ...doc.data(), id: doc.id });
      });
      setRetreatPackages(updatedRetreatPackages);
    });

    const unsubscribeTourPackages = onSnapshot(collection(db, 'tourPackages'), (snapshot) => {
      const updatedTourPackages = [] as any;
      snapshot.forEach((doc) => {
        updatedTourPackages.push({ ...doc.data(), id: doc.id });
      });
      setTourPackages(updatedTourPackages);
    });


    const unsubscribeAdmins = onSnapshot(collection(db, 'admins'), (snapshot) => {
      const updatedAdmins = [] as any;
      snapshot.forEach((doc) => {
        updatedAdmins.push({ ...doc.data(), id: doc.id });
      });
      setAdmins(updatedAdmins);
    });



    // Cleanup function to unsubscribe from real-time updates
    return () => {
      unsubscribeBookings();
      unsubscribeWaitlist();
      unsubscribeActivities();
      unsubscribeTravelPackages();
      unsubscribeRetreatPackages();
      unsubscribeTourPackages();
      unsubscribeAdmins()
    };
  }, []);

  useEffect(() => {
    const travelBookings = bookings.filter((booking: { type: string }) => booking.type === "Promoted Travel Package");
    const activityBookings = bookings.filter((booking: { type: string }) => booking.type === "Exciting Activities");
    const retreatBookings = bookings.filter((booking: { type: string }) => booking.type === "Retreats Packages");
    const tourBookings = bookings.filter((booking: { type: string }) => booking.type === "Tour Packages");

    setTravelBookings(travelBookings);
    setActivityBookings(activityBookings);
    setRetreatBookings(retreatBookings);
    setTourBookings(tourBookings);
  }, [bookings]);

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
            path="/employees"
            element={
              <ExploreDasboardLayout>
                <Employees admins={admins} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore"
            element={
              <ExploreDasboardLayout>
                <Overview transactions={bookings} />
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
                <Activities allActivities={activities} />
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
                <EditActivity activities={activities} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-packages"
            element={
              <ExploreDasboardLayout>
                <TravelPackages allTravelPackages={travelPackages} />
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
                <EditTravelPackage travelPackages={travelPackages} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/retreat-packages"
            element={
              <ExploreDasboardLayout>
                <RetreatPackages allRetreatPackages={retreatPackages} />
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
                <EditRetreatPackages retreatPackages={retreatPackages} />
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
                <All travelBookings={travelBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/confirmed"
            element={
              <ExploreDasboardLayout>
                <Paid allTravelBookings={travelBookings} />
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
                <Review allTravelBookings={travelBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/refunded"
            element={
              <ExploreDasboardLayout>
                <Refunded allTravelBookings={travelBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/cancelled"
            element={
              <ExploreDasboardLayout>
                <Cancelled allTravelBookings={travelBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/travel-bookings/:id"
            element={
              <ExploreDasboardLayout>
                <Booking bookings={travelBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-packages"
            element={
              <ExploreDasboardLayout>
                <TourPackages allTours={tourPackages} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-packages/add"
            element={
              <ExploreDasboardLayout>
                <AddTourPackage />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-packages/edit/:id"
            element={
              <ExploreDasboardLayout>
                <EditTourPackage tourPackages={tourPackages} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings"
            element={
              <ExploreDasboardLayout>
                <AllTours tourBookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/confirmed"
            element={
              <ExploreDasboardLayout>
                <PaidTours allTourBookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/installments"
            element={
              <ExploreDasboardLayout>
                <InstallmentTours />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/pending"
            element={
              <ExploreDasboardLayout>
                <ReviewTours allTourBookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/refunded"
            element={
              <ExploreDasboardLayout>
                <RefundedTours allTourBookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/cancelled"
            element={
              <ExploreDasboardLayout>
                <CancelledTours allTourBookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/tour-bookings/:id"
            element={
              <ExploreDasboardLayout>
                <BookingTours bookings={tourBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/activities-bookings"
            element={
              <ExploreDasboardLayout>
                <AllActivities activitiesBookings={activityBookings} />
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
                <BookingActivities bookings={activityBookings} />
              </ExploreDasboardLayout>
            }
          />

          <Route
            path="/explore/retreat-bookings"
            element={
              <ExploreDasboardLayout>
                <AllRetreats retreatBookings={retreatBookings} />
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
                <BookingRetreats bookings={retreatBookings} />
              </ExploreDasboardLayout>
            }
          />
          <Route
            path="/explore/waitlist/:packageTitle"
            element={
              <ExploreDasboardLayout>
                <Waitlist allWaitlist={waitList} />
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
        </Route>
        {/* explore routes end */}
        {/* atelier routes */}
        <Route element={<PrivateRoutes />}>
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
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
