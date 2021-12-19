import React, { Component, createContext, useEffect, useState } from "react";
import { NavLink } from "../interfaces";
import { useAppSelector } from "../store/hooks";

const navLinks: NavLink[] = [
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
  {
    path: "/login",
    name: "Login",
  },
];

type Props = {
  children: any;
};

export const NavLinksContext = createContext<NavLink[]>(navLinks);

const NavLinksProvider = (props: Props) => {
  const [stateNavLinks, setStateNavLinks] = useState(navLinks);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
        setStateNavLinks(navLinks.filter(link => link.path !== "/login"))
    }
  },[]);

  return (
    <NavLinksContext.Provider value={stateNavLinks}>
      {props.children}
    </NavLinksContext.Provider>
  );
};
export default NavLinksProvider;
