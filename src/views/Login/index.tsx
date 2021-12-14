import { Button } from "@mui/material";
import * as React from "react";
import { login, logout } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { dummyPassword } from "../../utils/constants";

type Props = {};

const Navbar: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();
  const loginUser = () => {
    dispatch(
      login({
        email: "admin@gmail.com",
        password: dummyPassword,
      })
    );
  };
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Button variant="contained" onClick={loginUser}>
        Login
      </Button>
      <Button variant="contained" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
