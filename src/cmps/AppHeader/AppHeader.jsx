import React, { useEffect, useState } from "react";
import HeaderCategoriesMenu from "./HeaderCategoriesMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavigationLinks from "./HeaderNavigationLinks";
import HeaderSearchForm from "./HeaderSearchForm";

export function AppHeader() {
  const [isOnTop, setIsOnTop] = useState(true);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      setIsOnTop(currentScrollY <= 0);
      setShowCategoriesMenu(currentScrollY > 100);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      <section
        className={`app-header main-container full fixed ${
          isOnTop ? "header-transparent" : ""
        }`}
      >
        <header className="navbar">
          <HeaderMobileMenuButton />
          <HeaderLogo />
          <div
            className={`search-form-wrapper ${
              showCategoriesMenu ? "display" : ""
            }`}
          >
            <HeaderSearchForm />
          </div>
          <HeaderNavigationLinks />
        </header>
      </section>
      <div
        className={`cat-wrapper full main-container ${
          showCategoriesMenu ? "visible" : ""
        }`}
      >
        <HeaderCategoriesMenu />
      </div>
    </section>
  );
}
