import React, { useEffect, useState } from "react";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";
import { setIsAuthenticated, setCurrentUser } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Container, CssBaseline } from "@mui/material";
import NavLinksProvider from "../../contexts/NavLinksProvider";
import { loadMapApi } from "../../utils/helpers";
import backgroundImage from "../../assets/images/2.jpg";
import ModalComponent from "../../components/common/Modal";
import LoginLandingPage from "../../components/LoginLandingPage";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  useEffect(() => {
    dispatch(setIsAuthenticated());
    dispatch(setCurrentUser());
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setGoogleScriptLoaded(true);
    });
  }, []);

  // Logged out Modal details
  const { isAuthenticated, loading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const location = useLocation();

  useEffect(() => {
    if (!authLoading) {
      const excludedPaths = ["/register", "/login"];

      if (!isAuthenticated && !excludedPaths.includes(location.pathname)) {
        handleModalOpen();
      }
    }
  }, [authLoading]);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const handleModalOpen = () => setLoginModalOpen(true);
  const handleModalClose = () => setLoginModalOpen(false);
  const renderLoginModal = () => {
    return (
      <ModalComponent
        isOpen={loginModalOpen}
        open={handleModalOpen}
        close={handleModalClose}
        modalStyles={{ width: "120vh", height: "90vh" }}
      >
        <LoginLandingPage
          handleModalClose={handleModalClose}
        ></LoginLandingPage>
      </ModalComponent>
    );
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        padding: "70px 0 0 0",
        backgroundSize: "cover",
        backgroundImage: `url(${backgroundImage})`,
        boxShadow: "inset 0 0 0 2000px rgb(255 255 255 / 49%)",
      }}
      disableGutters
    >
      <NavLinksProvider>
        <CssBaseline />
        <Navbar />
        {googleScriptLoaded && <ContentWrapper />}
        {renderLoginModal()}
      </NavLinksProvider>
    </Container>
  );
};

export default App;
