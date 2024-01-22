
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  // PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
//   import { auth, db } from "../firebase/auth";
//   import { signOut } from "firebase/auth";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
//   import { onAuthStateChanged } from "firebase/auth";
//   import { doc, getDoc } from "firebase/firestore";

const SideBar = () => {
  // const [open, setOpen] = useState(0);
  // const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [authUser, setAuthUser] = useState(null);
  // const [profileData, setProfileData] = useState(null);
  // const navigate = useNavigate();

  // const handleOpen = (value: SetStateAction<number>) => {
  //   setOpen(open === value ? 0 : value);
  // };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div className="flex  relative ">
      <Card placeholder={undefined} className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  bg-blue-100 border static sm:hidden ">
        <div className="mb-2 p-4">
          <Typography placeholder={undefined} variant="h5" color="blue-gray">
            Atelier Dash
          </Typography>
        </div>
        {/* <div>
        <img
          src={profileData?.photoURL}
          alt="Photo"
          className="rounded-full m-auto w-36 h-36"
        />
       <Typography variant="h5" color="blue"> {profileData?.name}</Typography>
      </div> */}
        <List placeholder={undefined}>
          <NavLink to="/atelier/upload-product">
            <ListItem placeholder={undefined} className="text-sky-800">
              <ListItemPrefix placeholder={undefined}>
                <PlusIcon className="h-5 w-5" />
              </ListItemPrefix>
              Upload Product
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/all-products">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              All Products
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/refurblish">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Refurblish
              <ListItemSuffix placeholder={undefined}>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/refurblish-and-sell">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Refurblish and sell
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/orders">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Orders
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/untag-sell">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Untag Sell
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/custom-made">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Custom Made
            </ListItem>
          </NavLink>
          <NavLink to="/atelier/Users">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Users
            </ListItem>
          </NavLink>

          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <div className="lg:block hidden">
        <IconButton placeholder={undefined} variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <Drawer placeholder={undefined} open={isDrawerOpen} onClose={closeDrawer}>
          <Card placeholder={undefined} className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  bg-blue-gray-100 border static sm:hidden ">
            <div className="mb-2 p-4">
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                Atelier Dash
              </Typography>
            </div>
            {/* <div>
        <img
          src={profileData?.photoURL}
          alt="Photo"
          className="rounded-full m-auto w-36 h-36"
        />
       <Typography variant="h5" color="blue"> {profileData?.name}</Typography>
      </div> */}
            <List placeholder={undefined}>
              <NavLink to="/atelier/upload-product">
                <ListItem className="text-sky-800" placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <PlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Upload Product
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/all-products">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  All Products
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/refurblish">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <InboxIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Refurblish
                  <ListItemSuffix placeholder={undefined}>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/refurblish-and-sell">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Refurblish and sell
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/orders">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/untag-sell">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Untag Sell
                </ListItem>
              </NavLink>
              <NavLink to="/atelier/custom-made">
                <ListItem placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Custom Made
                </ListItem>
              </NavLink>

              <ListItem placeholder={undefined} >
                <ListItemPrefix placeholder={undefined}>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </Card>
        </Drawer>
      </div>
      <Outlet />
    </div>
  )
}

export default SideBar