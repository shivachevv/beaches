import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { setPageTitle } from "../../utils/helpers";
import { PAGE_TITLES } from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSelectedBeach } from "../../store/slices/beaches";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import { Reservation } from "../../models/reservation";
import BeachFlag from "../../components/BeachFlag";
import { Beach } from "./../../models/beaches";
import { User } from "../../models/users";
import { setCurrentUser } from "../../store/slices/auth";

type Props = Record<string, unknown>;

const steps = [
  {
    label:
      "How many beach sets (1 umbrella, 2 seats) would you like to reserve?",
  },
  {
    label: "Confirm payment",
  },
];

const ReserveSpot: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const { selectedBeach } = useAppSelector((state) => state.beaches);
  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const { beachId }: { beachId: any } = useParams();

  useEffect(() => {
    setPageTitle(PAGE_TITLES.RESERVE_SPOT);
    dispatch(fetchSelectedBeach(beachId));
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => ++prevActiveStep);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => --prevActiveStep);
  };

  const handleRedirect = (): void => {
    navigate("/");
  };

  const [sets, setSets] = useState<number>(0);
  const saveReservation = useCallback(async () => {
    if (activeStep === steps.length && !!selectedBeach && !!currentUser) {
      const updatedBeach = new Beach(selectedBeach);
      await updatedBeach.update(selectedBeach.id, {
        available: selectedBeach.available - sets,
      });

      const reservation = new Reservation({
        userId: currentUser?.id,
        beachId: selectedBeach.id,
        sets,
        time: new Date(),
      });
      await reservation.create();

      await new User(currentUser).update({
        deposit: +currentUser.deposit - +getPrices().total,
      });

      dispatch(fetchSelectedBeach(beachId));
      dispatch(setCurrentUser());
    }
  }, [activeStep]);

  useEffect(() => {
    saveReservation();
  }, [saveReservation]);

  const decrement = (): void => {
    if (sets > 0) {
      setSets((sets) => --sets);
    }
  };
  const increment = (): void => {
    setSets((sets) => ++sets);
  };

  const renderHeader = (): React.ReactNode => {
    return (
      <Box
        sx={{
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "wheat",
        }}
      >
        <Typography variant="h4" sx={{ width: "100%", textAlign: "center" }}>
          Welcome to {selectedBeach?.name}!
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 120,
              borderRadius: "5px",
            }}
            alt="Logo"
            src={`/images/beaches/${selectedBeach?.slug}.jpg`}
          />
          <Box>
            <BeachFlag beach={selectedBeach} size="50px" />
          </Box>
          <Typography
            sx={{
              padding: "10px",
            }}
            variant="button"
          >
            Available:{" "}
            {`${selectedBeach?.available} / ${selectedBeach?.capacity}`}
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px" }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <BeachAccessIcon
                fontSize="large"
                sx={{
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  borderLeft: "2px solid black",
                  padding: "10px",
                }}
                variant="button"
              >
                {selectedBeach?.prices.umbrella} lv.
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <AirlineSeatFlatIcon
                fontSize="large"
                sx={{
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="button"
                sx={{
                  borderLeft: "2px solid black",
                  padding: "10px",
                }}
              >
                {selectedBeach?.prices.seat} lv.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderSelectBeachSets = (): React.ReactNode => {
    return (
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ fontSize: "20px", marginRight: "20px" }}
          onClick={() => decrement()}
          disabled={sets === 0}
        >
          -
        </Button>
        <TextField
          label="Sets"
          type="tel"
          value={sets}
          sx={{ width: "60px" }}
          select={false}
        />
        <Button
          variant="contained"
          sx={{ fontSize: "20px", marginLeft: "20px" }}
          onClick={() => increment()}
        >
          +
        </Button>
      </Box>
    );
  };

  const getPrices = () => {
    const umbrella = selectedBeach
      ? (sets * selectedBeach?.prices.umbrella).toFixed(2)
      : 0;
    const seat = selectedBeach
      ? (sets * selectedBeach?.prices.seat * 2).toFixed(2)
      : 0;
    const total = (+umbrella + +seat).toFixed(2);
    return {
      umbrella,
      seat,
      total,
    };
  };

  const isNotEnoughMoney = () => {
    return !!currentUser && +getPrices().total > currentUser?.deposit;
  };

  const renderConfirmPayment = (): React.ReactNode => {
    return (
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <BeachAccessIcon
            fontSize="large"
            sx={{
              marginRight: "10px",
            }}
          />
          <Typography
            sx={{
              borderLeft: "2px solid black",
              padding: "10px",
            }}
            variant="button"
          >
            {sets} x {selectedBeach?.prices.umbrella.toFixed(2)} lv. ={" "}
            {getPrices().umbrella} lv.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <AirlineSeatFlatIcon
            fontSize="large"
            sx={{
              marginRight: "10px",
            }}
          />
          <Typography
            variant="button"
            sx={{
              borderLeft: "2px solid black",
              padding: "10px",
            }}
          >
            {sets * 2} x {selectedBeach?.prices.seat.toFixed(2)}lv.={" "}
            {getPrices().seat} lv.
          </Typography>
        </Box>
        <Box sx={{ marginTop: "10px", padding: "10px", background: "wheat" }}>
          <Typography variant="subtitle1">
            Total: {getPrices().total} lv.
          </Typography>
          <Typography variant="subtitle1">
            Available funds: {currentUser?.deposit} lv.
          </Typography>
          <Typography variant="subtitle1">
            {isNotEnoughMoney() && (
              <Box sx={{ ml: 1 }}>
                Insufficient funds for the reservation. Please{" "}
                <Link to="/my-profile">Deposit!</Link>
              </Box>
            )}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderHeader()}

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ width: "80%", my: 4 }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  {index === 0 && renderSelectBeachSets()}

                  {index === 1 && renderConfirmPayment()}

                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={!sets}
                    >
                      {index === 0 ? "Proceed to Payment" : "Pay & Finish"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Your reservation is ready! </Typography>
            <Button onClick={handleRedirect} sx={{ mt: 1, mr: 1 }}>
              Go to Home Page
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default ReserveSpot;
