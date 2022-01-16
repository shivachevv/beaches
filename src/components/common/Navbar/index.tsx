import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/beaches_logo.png";
import styles from "./styles";
import { getUserLetters, useStyles } from "../../../utils/helpers";
import { NavLinksContext } from "../../../contexts/NavLinksProvider";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/slices/auth";
import { useContext, useState } from "react";

type Props = Record<string, unknown>;

const Navbar: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const navLinks = useContext(NavLinksContext);
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  const classes = useStyles(styles);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const menuPosition = {
    top: isMobile ? "auto" : "0",
    bottom: isMobile ? "0" : "auto",
  };
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const toggleMenu = ({ state }: { state: boolean }) => {
    setIsMobileNavOpen(state);
  };

  const renderNavLinks = ({ isMobile }: { isMobile: boolean }) =>
    navLinks.map((page) => (
      <Link to={page.path} key={page.path} className={classes.link}>
        <Button sx={{ my: 2, color: isMobile ? "" : "white" }}>
          {page.name}
        </Button>
      </Link>
    ));

  const renderUserDetails = (): React.ReactNode => {
    return isAuthenticated && currentUser ? (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button color="inherit" onClick={logoutUser}>
          Logout
        </Button>
        <Avatar sx={{ bgcolor: "orange", ml: 2 }}>
          {getUserLetters(currentUser)}
        </Avatar>
      </Box>
    ) : (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button color="inherit" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate("/register")}
          sx={{ ml: 1 }}
        >
          Register
        </Button>
      </Box>
    );
  };

  return (
    <AppBar
      position="absolute"
      color="primary"
      sx={{ top: menuPosition.top, bottom: menuPosition.bottom }}
    >
      <Toolbar>
        <Typography>
          <Box
            component="img"
            sx={{
              height: 30,
              width: 30,
            }}
            alt="Logo"
            src={logo}
          />
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "flex",
              justifyContent: "space-between",
            },
          }}
        >
          <Box sx={{ pl: 2 }}>{renderNavLinks({ isMobile: false })}</Box>
          {!isMobile && renderUserDetails()}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: "flex",
              justifyContent: "space-between",
              sm: "none",
            },
          }}
        >
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => toggleMenu({ state: true })}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {isMobile && renderUserDetails()}
          <Drawer
            anchor="bottom"
            open={isMobileNavOpen}
            onClose={() => toggleMenu({ state: false })}
          >
            {renderNavLinks({ isMobile: true })}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
