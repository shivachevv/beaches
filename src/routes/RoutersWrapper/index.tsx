import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import MyProfile from "../../views/MyProfile";
import MyReservations from "../../views/MyReservations";
import Register from "../../views/Register";
import PrivateRoute from "../guards/PrivateRoute";
import ReserveSpot from "./../../views/ReserveSpot/index";

type Props = Record<string, unknown>;

const RoutesWrapper: React.FC<Props> = (props: Props) => {
  return (
    <Routes>
      {/* Private Routes */}
      {/* <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      /> */}

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/reserve/:beachId" element={<ReserveSpot />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/reservations/:userId" element={<MyReservations />} />
    </Routes>
  );
};

export default RoutesWrapper;
