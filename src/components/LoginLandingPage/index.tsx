import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { CssBaseline } from "@mui/material";
import { styled } from "@mui/system";

// Just a note:
// like styled-componets lib https://styled-components.com/ 
// the same custom style on compoinents should be possible with material https://mui.com/system/styled/
// 
// for const elements its ok to use this naming conention StyledContainer, if we want to create custom style component we can use
// const StyledContainer = styled('div')({
//  backgroundImage: 'url("../../assets/images/3.jpg")',
//  backgroundSize: 'cover',
//  backgroundPosition: 'center',
//  height: '100%',
//  boxShadow: '0px 14px 20px 0px rgb(0 0 0 / 43%)',
// });

type Props = Record<string, unknown>;

const LoginLandingPage: React.FC<Props> = (props: Props) => {
  return (
    // <StyledContainer></StyledContainer>
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
