import React from "react";
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from '../../views/Home';
import Login from "../../views/Login";

type Props = {}

const RoutesWrapper: React.FC<Props> = (props: Props) => {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  );
};

export default RoutesWrapper;
