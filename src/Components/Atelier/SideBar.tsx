
import React from 'react'
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
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
  import { useState } from "react";
  import { NavLink, Outlet } from "react-router-dom";
//   import { auth, db } from "../firebase/auth";
//   import { signOut } from "firebase/auth";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  import { useEffect } from "react";
//   import { onAuthStateChanged } from "firebase/auth";
//   import { doc, getDoc } from "firebase/firestore";

const SideBar = () => {
    const [open, setOpen] = useState(0);
    const [openAlert, setOpenAlert] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
  
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div className="flex  relative ">
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  bg-blue-gray-100 border static sm:hidden ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
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
      <List>
        <NavLink to="/atelier/upload-product">
          <ListItem className="text-sky-800">
            <ListItemPrefix>
                
            </ListItemPrefix>
            Upload Product
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/all-products">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            All Products
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/refurblish">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Refurblish 
            <ListItemSuffix>
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
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Refurblish and sell
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/orders">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/untag-sell">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Untag Sell
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/custom-made">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Custom Made
          </ListItem>
        </NavLink>

        <ListItem >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    <div className="lg:block hidden">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
      <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  bg-blue-gray-100 border static sm:hidden ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
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
      <List>
        <NavLink to="/atelier/upload-product">
          <ListItem className="text-sky-800">
            <ListItemPrefix>
                
            </ListItemPrefix>
            Upload Product
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/all-products">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            All Products
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/refurblish">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Refurblish 
            <ListItemSuffix>
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
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Refurblish and sell
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/orders">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/untag-sell">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Untag Sell
          </ListItem>
        </NavLink>
        <NavLink to="/atelier/custom-made">
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Custom Made
          </ListItem>
        </NavLink>

        <ListItem >
          <ListItemPrefix>
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