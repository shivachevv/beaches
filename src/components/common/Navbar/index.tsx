import * as React from "react";
import {
  AppBar,
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
import { Link } from "react-router-dom";
import logo from "../../../assets/images/beaches_logo.png";
import styles from "./styles";
import { useStyles } from "../../../utils/helpers";
import { NavLinksContext } from "../../../contexts/NavLinksProvider";

type Props = {};

const Navbar: React.FC<Props> = (props: Props) => {
  const navLinks = React.useContext (NavLinksContext)

  const classes = useStyles(styles);
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

  const renderNavLinks = ({ isMobile }: { isMobile: boolean }) =>
    navLinks.map((page) => (
      <Link to={page.path} key={page.path} className={classes.link}>
        <Button sx={{ my: 2, color: isMobile ? "" : "white" }}>
          {page.name}
        </Button>
      </Link>
    ));

  return (
    <AppBar
      position="sticky"
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
          {renderNavLinks({ isMobile: false })}
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
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
            {renderNavLinks({ isMobile: true })}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
