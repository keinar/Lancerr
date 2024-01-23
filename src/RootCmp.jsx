import React from "react";
import { Routes, Route } from "react-router";

import routes from "./routes";

import { AppHeader } from "./cmps/AppHeader/AppHeader";
import { UserDetails } from "./pages/UserDetails";
import { AppFooter } from "./cmps/AppFooter/AppFooter";
export function RootCmp() {
  return (
    <div className="root">
      <AppHeader />
      <main className="main-container">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route path="user/:id" element={<UserDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}
