import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { PageTitles } from "../../utils/enums";
import { setPageTitle, useStyles } from "../../utils/helpers";
import {
  Autocomplete,
  Backdrop,
  Box,
  Container,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModalComponent from "./../../components/common/Modal/index";
import LoginLandingPage from "../../components/LoginLandingPage";
import { setBeaches } from "../../store/slices/beaches";
import { Beach } from "../../interfaces";

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  dispatch(setBeaches());
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { beaches } = useAppSelector((state) => state.beaches);

  const classes = useStyles(styles);

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
      <div>
        <Autocomplete
          getOptionLabel={(option: Beach) => option.name}
          disablePortal
          options={beaches || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Beaches" />}
        />
      </div>
    </Container>
  );
};

export default Home;
