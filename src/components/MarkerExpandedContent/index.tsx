import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Beach } from "../../interfaces";
import {
  getBeachAvailabilityColor,
  getBeachFlagColor,
} from "../../utils/helpers";
import FlagIcon from "@mui/icons-material/Flag";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

type Props = {
  beach: Beach;
  reserve: (beach: Beach) => void;
};

const MarkerExpandedContent: React.FC<Props> = ({ beach, reserve }: Props) => {
  const test = (beach1: any) => {
    console.log(beach1);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box>
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
        <Button
          fullWidth
          sx={{ py: 1, px: 2 }}
          variant="contained"
          endIcon={<BeachAccessIcon />}
          onClick={() => test(beach)}
        >
          Reserve
        </Button>
      </Box>
    </Box>
  );
};

export default MarkerExpandedContent;
