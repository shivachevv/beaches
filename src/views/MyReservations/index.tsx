import { Box, Typography, Paper } from "@mui/material";
import * as React from "react";
import { setCurrentUser } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyReservations } from "../../store/slices/reservations";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReservationCard from "../../components/ReservationCard";
import { ResWithBeach } from "../../interfaces";
import { fetchBeaches } from "../../store/slices/beaches";
import { addBeach } from "../../utils/helpers";
import Loading from "../../components/common/Loading";
import { setPageTitle } from "../../utils/helpers";
import { PAGE_TITLES } from "../../utils/enums";

const MyReservations: React.FC = () => {
  useEffect(() => {
    setPageTitle(PAGE_TITLES.MY_RESERVATIONS);
  }, []);

  const { currentUser } = useAppSelector((state) => state.auth);
  const { myReservations } = useAppSelector((state) => state.reservations);
  const { beaches } = useAppSelector((state) => state.beaches);
  const { userId }: { userId: any } = useParams();
  const [reservationsWithBeaches, setReservationsWithBeaches] = useState<
    ResWithBeach[] | null
  >(null);

  const [selected, setSelected] = useState<ResWithBeach | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(fetchMyReservations(userId));
    dispatch(fetchBeaches());
  }, [userId]);
  useEffect(() => {
    if (!!myReservations && !!beaches) {
      setReservationsWithBeaches(addBeach(myReservations, beaches));
    }
  }, [myReservations, beaches]);

  if (currentUser && reservationsWithBeaches) {
    return (
      <Box
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          {`${currentUser.firstName} ${currentUser.lastName}'s reservations`}
        </Typography>
        <Paper
          sx={{ width: "50%", display: "flex", background: "#fef7ea" }}
          elevation={0}
        >
          <Box
            sx={{
              width: "35%",
              px: 2,
              borderBottom: "3px solid #f5deb3",
            }}
          >
            <Typography variant="button">Beach:</Typography>
          </Box>
          <Box
            sx={{
              width: "30%",
              textAlign: "center",
              borderBottom: "3px solid #f8edd9",
            }}
          >
            <Typography variant="button">Sets reserved:</Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              width: "35%",
              textAlign: "end",
              borderBottom: "3px solid #ffd382",
            }}
          >
            <Typography variant="button">Expires in:</Typography>
          </Box>
        </Paper>
        {reservationsWithBeaches
          .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
          .map((reservation) => (
            <ReservationCard
              reservation={reservation}
              key={reservation.id}
              setSelected={setSelected}
              selected={selected?.id}
            />
          ))}
      </Box>
    );
  }

  return <Loading />;
};

export default MyReservations;
