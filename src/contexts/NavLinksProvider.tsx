import React, { createContext, useEffect, useState } from "react";
import { NavLink } from "../interfaces";
import { useAppSelector } from "../store/hooks";
import { NAV_LINKS } from "../utils/constants";

type Props = {
  children: any;
};

export const NavLinksContext = createContext<NavLink[]>(NAV_LINKS);

const NavLinksProvider = (props: Props) => {
  const [stateNavLinks, setStateNavLinks] = useState(NAV_LINKS);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavLinksContext.Provider value={stateNavLinks}>
      {props.children}
    </NavLinksContext.Provider>
  );
};
export default NavLinksProvider;
