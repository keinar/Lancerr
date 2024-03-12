import React, { useEffect, useState } from "react"
import HeaderCategoriesMenu from "./HeaderCategoriesMenu"
import HeaderLogo from "./HeaderLogo"
import HeaderMobileMenuButton from "./HeaderMobileMenuButton"
import HeaderNavigationLinks from "./HeaderNavigationLinks"
import HeaderSearchForm from "./HeaderSearchForm"
import { useLocation, useSearchParams } from "react-router-dom"

export function AppHeader() {
  const [isOnTop, setIsOnTop] = useState(true)
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      setIsOnTop(currentScrollY <= 0)
      setShowCategoriesMenu(currentScrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section>
      <section className={`app-header main-container full ${location.pathname === "/" && "fixed"} ${isOnTop && location.pathname === "/" ? "header-transparent" : ""}`}>
        <header className="navbar">
          <HeaderMobileMenuButton />
          <HeaderLogo />
          <div className={`search-form-wrapper ${location.pathname === "/" ? (showCategoriesMenu ? "display" : "") : "display"}`}>
            <HeaderSearchForm />
          </div>
          <HeaderNavigationLinks />
        </header>
      </section>
      <div className={`cat-wrapper ${location.pathname === "/" && "fixed"} full main-container ${location.pathname === "/" ? (showCategoriesMenu ? "visible" : "") : "visible"}`}>
        <HeaderCategoriesMenu />
      </div>
    </section>
  )
}
