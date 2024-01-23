import React, { useEffect, useState } from "react";
import HeaderCategoriesMenu from "./HeaderCategoriesMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavigationLinks from "./HeaderNavigationLinks";
import HeaderSearchForm from "./HeaderSearchForm";

export function AppHeader() {
  const [isOnTop, setisOnTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleIsOnTop);

    return () => {
      window.removeEventListener("scroll", handleIsOnTop);
    };
  }, []);

  function handleIsOnTop() {
    window.scrollY > 100 ? setisOnTop(true) : setisOnTop(false);
  }

  return (
    <div className="app-header">
      <div className="navbar">
        <HeaderMobileMenuButton />
        <HeaderLogo />
        <div className={`search-form-wrapper ${isOnTop ? " display" : ""} `}>
          <HeaderSearchForm />
        </div>

        <HeaderNavigationLinks />
      </div>
      {isOnTop && <HeaderCategoriesMenu />}
    </div>
  );
}
