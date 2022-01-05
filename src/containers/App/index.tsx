import React, { useEffect, useState } from "react";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";
import { setIsAuthenticated } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { Container, CssBaseline } from "@mui/material";
import NavLinksProvider from "../../contexts/NavLinksProvider";
import { loadMapApi } from "../../utils/helpers";

type Props = Record<string, unknown>;

const App: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  dispatch(setIsAuthenticated());

  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setGoogleScriptLoaded(true);
    });
  }, []);

  return (
    <Container maxWidth={false} sx={{ minHeight: "100vh" }} disableGutters>
      <NavLinksProvider>
        <CssBaseline />
        <Navbar />
        {googleScriptLoaded && <ContentWrapper />}
        {/* <ContentWrapper /> */}
        {/* TODO: <Footer /> */}
      </NavLinksProvider>
    </Container>
  );
};

export default App;
