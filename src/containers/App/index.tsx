import React from "react";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";
import { setIsAuthenticated } from "../../store/slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { Container, CssBaseline } from "@mui/material";
import NavLinksProvider from "../../contexts/NavLinksProvider";
import { useStyles } from "../../utils/helpers";
import styles from "./styles";

type Props = {};

const App: React.FC<Props> = (props: Props) => {
  const classes = useStyles(styles);
  const dispatch = useAppDispatch();
  dispatch(setIsAuthenticated());

  return (
    <Container className={classes.container} disableGutters maxWidth={false}>
      <NavLinksProvider>
        <CssBaseline />
        <Navbar />
        <ContentWrapper />
        {/* TODO: <Footer /> */}
      </NavLinksProvider>
    </Container>
  );
};

export default App;
