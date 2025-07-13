import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";

const Profile = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation />
      </div>
      {/* <Divider orientation="vertical" flexItem /> */}
      <div className="lg:w-[80%]">
        <Routes>
        <Route path="/" element={<UserProfile/>} />
          <Route path="/órdenes" element={<Orders/>} />
          <Route path="/direcciones" element={<UsersAddresses/>} />
          <Route path="/favoritos" element={<Favorite/>} />
          <Route path="/pagos" element={<Orders/>} />
          <Route path="/eventos" element={<CustomerEvents/>} />
          <Route path="/notificaciones" element={<Notifications/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
