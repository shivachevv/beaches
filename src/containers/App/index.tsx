import React from "react";
import "./App.css";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";
import { setIsAuthenticated } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { CssBaseline } from "@mui/material";

type Props = {};

const App: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  dispatch(setIsAuthenticated())
  
  return (
    <div>
      <CssBaseline/>
      <Navbar />
      <ContentWrapper />
      {/* TODO: <Footer /> */}
    </div>
  );
};

export default App;
