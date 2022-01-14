import { Box, Button } from "@mui/material";
import * as React from "react";
import { login, logout } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { DUMMY_PASSWORD } from "../../utils/constants";

type Props = Record<string, unknown>;

const Navbar: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();
  const loginUser = () => {
    dispatch(
      login({
        email: "admin@gmail.com",
        password: DUMMY_PASSWORD,
      })
    );
  };
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ mt: "70px" }}>
      <Button variant="contained" onClick={loginUser}>
        Login
      </Button>
      <Button variant="contained" onClick={logoutUser}>
        Logout
      </Button>
    </Box>
  );
};

export default Navbar;
