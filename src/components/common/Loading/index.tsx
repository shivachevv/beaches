import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  // children?: any;
  // open: any;
  // close: any;
  // isOpen: boolean;
  // modalStyles?: Record<string, string>;
};

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
