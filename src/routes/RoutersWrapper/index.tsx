import React from "react";
import { Routes, Route } from "react-router-dom";
import EditBeach from "../../views/EditBeach";
import Home from "../../views/Home";
import Login from "../../views/Login";
import MyProfile from "../../views/MyProfile";
import MyReservations from "../../views/MyReservations";
import Register from "../../views/Register";
import PrivateRoute from "../guards/PrivateRoute";
import RedirectWhenLogged from "../guards/RedirectWhenLogged";
import ReserveSpot from "./../../views/ReserveSpot/index";

const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/reserve/:beachId"
        element={
          <PrivateRoute>
            <ReserveSpot />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectWhenLogged>
            <Login />
          </RedirectWhenLogged>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectWhenLogged>
            <Register />
          </RedirectWhenLogged>
        }
      />
      <Route
        path="/my-profile"
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservations/:userId"
        element={
          <PrivateRoute>
            <MyReservations />
          </PrivateRoute>
        }
      />
      <Route
        path="/beaches/:beachId"
        element={
          <PrivateRoute>
            <EditBeach />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesWrapper;
