import { Box, Button, Typography, Paper } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ResWithBeach } from "../../interfaces";
import { RESERVATION_PERIOD } from "../../utils/constants";

type Props = {
  reservation: ResWithBeach;
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<ResWithBeach | null>>;
};

const ReservationCard: React.FC<Props> = ({
  reservation,
  setSelected,
  selected,
}: Props) => {
  const [elevation, setElevation] = useState<number>(3);

  const msToTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = (ms / (1000 * 60) - hours * 60).toFixed(0);
    return `${hours} hrs ${minutes} mins.`;
  };

  const timeLeft = (timeMade: string): string => {
    const now = Date.now();
    const made = Date.parse(timeMade);
    const expires = made + RESERVATION_PERIOD;
    const isExpired = expires < now;

    if (isExpired) {
      return "Reservation Expired!";
    }

    const left = expires - now;

    return msToTime(left);
  };
  const onMouseOver = (): void => {
    setElevation(7);
  };

  const onMouseOut = (): void => {
    setElevation(3);
  };

  const goToClosest = (beachName: string | undefined): any => {
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      if (beachName) {
        window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${
          latitude + "," + longitude
        }&destination=${encodeURIComponent(beachName)}`;
      }
      return undefined;
    };

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: 2,
      }}
      onClick={() => setSelected(reservation)}
    >
      <Paper
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        elevation={elevation}
        sx={{ width: "100%", display: "flex", cursor: "pointer" }}
      >
        <Box
          sx={{
            px: 1,
            py: 1,
            display: "flex",
            alignItems: "center",
            width: "35%",
            background: "#f5deb3",
          }}
        >
          {reservation?.beach && (
            <Button
              sx={{ py: 1, px: 2, my: 1 }}
              variant="contained"
              fullWidth
              onClick={() => goToClosest(reservation?.beach?.name)}
            >
              {reservation.beach?.name}
            </Button>
          )}
        </Box>
        <Box
          sx={{
            px: 1,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            background: "#f8edd9",
          }}
        >
          <Typography variant="button">
            {reservation.sets} umbrella(s),
            <br /> {+reservation.sets * 2} chair(s),
          </Typography>
        </Box>
        <Box
          sx={{
            px: 1,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "35%",
            background: "#ffd382",
          }}
        >
          <Typography variant="button">{timeLeft(reservation.time)}</Typography>
        </Box>
      </Paper>
      <Box
        sx={{
          textAlign: "center",
          maxHeight: selected === reservation.id ? "60px" : "0px",
          height: "60px",
          transition: "max-height 0.4s ease",
          overflow: "hidden",
        }}
      ></Box>
    </Box>
  );
};

export default ReservationCard;
