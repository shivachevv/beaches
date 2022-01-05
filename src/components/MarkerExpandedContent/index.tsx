import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Beach } from "../../interfaces";
import {
  getBeachAvailabilityColor,
  getBeachFlagColor,
} from "../../utils/helpers";
import FlagIcon from "@mui/icons-material/Flag";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { styled } from "@mui/system";

type Props = {
  beach: Beach;
};

const MarkerExpandedContent: React.FC<Props> = ({ beach }: Props) => {
  const StyledButton = styled("button")({
    background: "#1976d2",
    color: "white",
    fontSize: "1rem",
    fontWeight: "500",
    border: "none",
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "10px",
    boxShadow: "0px 3px 3px 0px rgb(0 0 0 / 20%)",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#1565c0",
      transition: "background-color 0.2s",
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: getBeachFlagColor(beach?.flag),
            width: 30,
            height: 30,
          }}
        >
          <FlagIcon fontSize="small" />
        </Avatar>
        <Typography variant="button" sx={{ ml: 1, lineHeight: "inherit" }}>
          {beach?.name}
        </Typography>
        <Box
          sx={{
            bgcolor: getBeachAvailabilityColor({
              capacity: beach?.capacity,
              available: beach?.available,
            }).bgcolor,
            color: getBeachAvailabilityColor({
              capacity: beach?.capacity,
              available: beach?.available,
            }).color,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            padding: "0 7px",
            ml: 1,
          }}
        >
          <BeachAccessIcon
            sx={{
              color: getBeachAvailabilityColor({
                capacity: beach?.capacity,
                available: beach?.available,
              }).color,
              mr: 1,
            }}
            fontSize="medium"
          />
          <Typography variant="subtitle2">
            {`${beach?.available} / ${beach?.capacity}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <StyledButton id="info-window-reserve">Reserve</StyledButton>
      </Box>
    </Box>
  );
};

export default MarkerExpandedContent;
