import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Location } from "history";
import { useHistory, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";

type NavbarProps = {
  name: string;
  route: string;
};

const navbarTabs: NavbarProps[] = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "Calendar", route: "/calendar" },
  { name: "Add Library", route: "/library/new" },
];
const DEFAULT_NAVBAR = 0;

export default function Navbar() {
  const { pathname } = useLocation<Location>();

  const [currentTab, setCurrentTab] = useState(DEFAULT_NAVBAR);
  const history = useHistory();

  useEffect(() => {
    const matchingIndex = navbarTabs.findIndex(
      ({ route }) => route === pathname
    );
    const indexNotFound = matchingIndex === -1;

    setCurrentTab(indexNotFound ? DEFAULT_NAVBAR : matchingIndex);
  }, [setCurrentTab, pathname]);

  const handleChange = (_: any, newValue: number) => {
    history.push(navbarTabs[newValue].route);
  };

  return (
    <AppBar position="static">
      <Tabs value={currentTab} onChange={handleChange} centered>
        {navbarTabs.map(({ name }) => (
          <Tab key={name} label={name} />
        ))}
        <Profile />
      </Tabs>
    </AppBar>
  );
}
