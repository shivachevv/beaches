import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { beaches } = useAppSelector((state) => state.beaches);
  const { selectedBeach } = useAppSelector((state) => state.beaches);
  const { currentUser } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const { beachId }: { beachId: any } = useParams();

  useEffect(() => {
    setPageTitle(PAGE_TITLES.RESERVE_SPOT);
    dispatch(fetchSelectedBeach(+beachId));
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
  useEffect(() => {
    if (activeStep === steps.length) {
      console.log(beaches);
    }
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ width: "100% " }}>
          Welcome to {selectedBeach?.name}!
        </Typography>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ width: "80%" }}
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
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setSets((sets) => ++sets)}
                    >
                      +
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
                      onClick={() => setSets((sets) => --sets)}
                    >
                      -
                    </Button>
                  </Box>

                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Confirm
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
      </Box>
    </Box>
  );
};

export default ReserveSpot;
