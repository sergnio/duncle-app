import React, { useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Profile from "../Profile/Profile";

type NavbarProps = {
  name: string;
  route: string;
};

export default function Navbar() {
  const navbarTabs: NavbarProps[] = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Calendar", route: "/calendar" },
    { name: "Add Library", route: "/library/new" },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const history = useHistory();

  const handleChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
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
