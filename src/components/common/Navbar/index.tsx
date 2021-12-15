import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/beaches_logo.png";
import styles from "./navbar.module.scss";
import { useEffect } from "react";

type Props = {};

const Navbar: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const menuPosition = {
    top: isMobile ? "auto" : "0",
    bottom: isMobile ? "0" : "auto",
  };
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState<boolean>(false);
  const toggleMenu = ({ state }: { state: boolean }) => {
    setIsMobileNavOpen(state);
  };

  const navLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/beaches",
      name: "Beaches",
    },
    {
      path: "/my-reservations",
      name: "My Reservations",
    },
  ];
  return (
    <AppBar
      position="fixed"
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
            display: { xs: "none", sm: "flex" },
          }}
        >
          {navLinks.map((page) => (
            <Link to={page.path} key={page.path}>
              <Button sx={{ my: 2, color: "white" }}>{page.name}</Button>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => toggleMenu({ state: true })}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="bottom"
            open={isMobileNavOpen}
            onClose={() => toggleMenu({ state: false })}
          >
            {navLinks.map((page) => (
              <Link to={page.path} key={page.path}>
                <Button
                  onClick={() => toggleMenu({ state: false })}
                  sx={{ my: 2 }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
