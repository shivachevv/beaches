import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
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
    </Routes>
  );
};

export default RoutesWrapper;
