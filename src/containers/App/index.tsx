import React from "react";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";
import { setIsAuthenticated } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { CssBaseline } from "@mui/material";
import NavLinksProvider from "../../contexts/NavLinksProvider";

type Props = {};

const App: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch()
  dispatch(setIsAuthenticated())
  
  return (
    <div>
      <NavLinksProvider>
      <CssBaseline/>
      <Navbar />
      <ContentWrapper />
      {/* TODO: <Footer /> */}
      </NavLinksProvider>
    </div>
  );
};

export default App;
