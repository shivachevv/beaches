import React, { createContext, useEffect, useState } from "react";
import { NavLink } from "../interfaces";
import { useAppSelector } from "../store/hooks";
import { NAV_LINKS } from "../utils/constants";

type Props = {
  children: any;
};

type NavLinks = Array<{
  path: string;
  name: string;
  requiresAuth: boolean;
}>;

export const NavLinksContext = createContext<NavLink[]>(NAV_LINKS);

const NavLinksProvider = (props: Props) => {
  const [stateNavLinks, setStateNavLinks] = useState<NavLinks>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const updatedLinks = isAuthenticated
      ? NAV_LINKS
      : NAV_LINKS.filter((link) => !link.requiresAuth);

    setStateNavLinks(updatedLinks);
  }, [isAuthenticated]);

  return (
    <NavLinksContext.Provider value={stateNavLinks}>
      {props.children}
    </NavLinksContext.Provider>
  );
};
export default NavLinksProvider;
