import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "../../utils/enums";
import { setPageTitle } from "../../utils/helpers";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModalComponent from "./../../components/common/Modal/index";
import LoginLandingPage from "../../components/LoginLandingPage";
import { fetchBeaches } from "../../store/slices/beaches";
import { BeachModel } from "../../interfaces";
import SelectedBeach from "../../components/SelectedBeach";
import BeachMap from "../../components/BeachMap";

type Props = Record<string, unknown>;

const Home: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBeaches());
  }, []);

  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const { beaches } = useAppSelector((state) => state.beaches);

  useEffect(() => {
    setPageTitle(PAGE_TITLES.HOME);
    console.log(isAuthenticated);

    if (!isAuthenticated) {
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
        close={handleModalClose}
        modalStyles={{ width: "120vh", height: "90vh" }}
      >
        <LoginLandingPage></LoginLandingPage>
      </ModalComponent>
    );
  };

  const [selectedBeach, setSelectedBeach] = useState<BeachModel | null>(null);
  const reserve = (beach: BeachModel | null): void => {
    navigate(`/reserve/${beach?.id}`);
  };

  const isBeachAdmin = currentUser?.id === selectedBeach?.beachAdminId;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: 2,
      }}
    >
      {renderLoginModal()}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Autocomplete
          getOptionLabel={(option: BeachModel) => option.name}
          onChange={(_, value) => setSelectedBeach(value)}
          disablePortal
          options={beaches || []}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a beach" />
          )}
        />
      </Box>
      {selectedBeach ? (
        <SelectedBeach
          beach={selectedBeach}
          reserve={reserve}
          isBeachAdmin={isBeachAdmin}
        />
      ) : (
        ""
      )}
      <BeachMap
        mapType={google.maps.MapTypeId.ROADMAP}
        mapTypeControl={true}
        beaches={beaches || []}
        selectedBeach={selectedBeach}
        reserve={reserve}
      />
    </Container>
  );
};

export default Home;
