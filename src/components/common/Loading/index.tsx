import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        background: "#fdfac05c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
