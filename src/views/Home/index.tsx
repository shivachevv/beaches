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
  Zoom,
} from "@mui/material";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModalComponent from "./../../components/common/Modal/index";
import LoginLandingPage from "../../components/LoginLandingPage";
import { setBeaches } from "../../store/slices/beaches";
import { Beach } from "../../interfaces";
import SelectedBeach from "../../components/SelectedBeach";
import BeachMap from "../../components/BeachMap";
import backgroundImage from "../../assets/images/2.jpg";

type Props = Record<string, unknown>;

const Home: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  dispatch(setBeaches());
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );
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

  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const reserve = (beach: Beach | null): void => {
    console.log(beach);
  };

  return (
    <Container
      className={classes.container}
      disableGutters
      sx={{
        pt: 2,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgb(255 255 255 / 49%)",
      }}
    >
      {/* {renderLoginModal()} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Autocomplete
          getOptionLabel={(option: Beach) => option.name}
          onChange={(_, value) => setSelectedBeach(value)}
          disablePortal
          options={beaches || []}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Beaches" />}
        />
      </Box>
      {selectedBeach ? (
        <SelectedBeach beach={selectedBeach} reserve={reserve} />
      ) : (
        ""
      )}
      <BeachMap
        mapType={google.maps.MapTypeId.ROADMAP}
        mapTypeControl={true}
        beaches={beaches || []}
        reserve={reserve}
      />
    </Container>
  );
};

export default Home;
