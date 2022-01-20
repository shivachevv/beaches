import React, { createContext, useEffect, useState } from "react";
import { NavLink } from "../interfaces";
import { useAppSelector } from "../store/hooks";
import { NAV_LINKS } from "../utils/constants";
import { addUserId } from "../utils/helpers";

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
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const updatedLinks =
      isAuthenticated && currentUser
        ? addUserId(NAV_LINKS, currentUser.id)
        : NAV_LINKS.filter((link) => !link.requiresAuth);

    setStateNavLinks(updatedLinks);
  }, [isAuthenticated, currentUser]);

  return (
    <NavLinksContext.Provider value={stateNavLinks}>
      {props.children}
    </NavLinksContext.Provider>
  );
};
export default NavLinksProvider;
