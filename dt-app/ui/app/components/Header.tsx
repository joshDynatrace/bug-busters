import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview/layouts";
import { TimerBar } from "./TimerBar";

export const Header = () => {
  return (
    <>
      <AppHeader>
        <AppHeader.NavItems>
          <AppHeader.AppNavLink as={Link} to="/" />
          <AppHeader.NavItem as={Link} to="/scoreboard">
            Scoreboard
          </AppHeader.NavItem>
        </AppHeader.NavItems>
      </AppHeader>
      <TimerBar />
    </>
  );
};
