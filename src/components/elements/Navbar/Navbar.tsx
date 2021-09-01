import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Location } from "history";
import { useHistory, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import useAuth from "../../../hooks/Auth/useAuth";
import RefreshData from "../../atoms/Button/RefreshData";

type NavbarProps = {
  name: string;
  route: string;
  adminOnly?: boolean;
};

const navbarTabs: NavbarProps[] = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "Calendar", route: "/calendar" },
  { name: "Add Library", route: "/library/new" },
  { name: "Manage Territories", route: "/territories", adminOnly: true },
];
const DEFAULT_NAVBAR = 0;

export default () => {
  const { pathname } = useLocation<Location>();
  const [currentTab, setCurrentTab] = useState(DEFAULT_NAVBAR);
  const history = useHistory();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const matchingIndex = navbarTabs.findIndex(
      ({ route }) => route === pathname
    );
    const indexNotFound = matchingIndex === -1;
    setCurrentTab(indexNotFound ? DEFAULT_NAVBAR : matchingIndex);
  }, [pathname, setCurrentTab]);

  const handleChange = (_, newValue: number) => {
    history.push(navbarTabs[newValue].route);
  };

  return (
    <AppBar position="static">
      <Tabs value={currentTab} onChange={handleChange} centered>
        {navbarTabs
          .filter(({ adminOnly }) => !adminOnly || isAdmin)
          .map(({ name }) => (
            <Tab key={name} label={name} />
          ))}
        <RefreshData />
        <Profile />
      </Tabs>
    </AppBar>
  );
};
