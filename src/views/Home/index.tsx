import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { PageTitles } from "../../utils/enums";
import { setPageTitle, useStyles } from "../../utils/helpers";
import { Backdrop, Box, Container, Fade, Modal } from "@mui/material";
import styles from "./styles";
import { useAppSelector } from "../../store/hooks";
import ModalComponent from "./../../components/common/Modal/index";
import LoginLandingPage from "../../components/LoginLandingPage";

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles(styles);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setPageTitle(PageTitles.HOME);

    if (isAuthenticated) {
      handleModalOpen();
    }
  }, []);

  // Logged out Modal details
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
        <LoginLandingPage></LoginLandingPage>
      </ModalComponent>
    );
  };

  return (
    <Container className={classes.container} disableGutters>
      {renderLoginModal()}
    </Container>
  );
};

export default Home;
