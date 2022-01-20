import { Box } from "@mui/material";
import React from "react";
import RoutesWrapper from "../../routes/RoutersWrapper/index";

const ContentWrapper: React.FC = () => {
  return (
    <Box sx={{ mt: "200px" }}>
      <RoutesWrapper />
    </Box>
  );
};

export default ContentWrapper;
