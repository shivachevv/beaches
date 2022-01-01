import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { CssBaseline } from "@mui/material";

type Props = Record<string, unknown>;

const LoginLandingPage: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome to the Beaches App!</h1>
        <h2>Join us and start your perfect vacation!</h2>
        <div className={styles.buttons}>
          <Link to="/login">
            <Button
              sx={{ my: 2, py: 2, px: 6 }}
              variant="contained"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button sx={{ mx: 2, py: 2, px: 6,  }} color="info" variant="contained">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPage;
