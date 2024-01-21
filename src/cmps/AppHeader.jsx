import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const handleRightClick = () => {
    const categoriesMenu = document.getElementById("categories-menu-package");
    categoriesMenu.scrollBy({ left: 200, behavior: "smooth" });
    setIsScrolled(true);
  };

  const handleLeftClick = () => {
    const categoriesMenu = document.getElementById("categories-menu-package");
    categoriesMenu.scrollBy({ left: -200, behavior: "smooth" });
    setIsScrolled(false);
  };

  return (
    <div className="app-header">
      <div className="navbar">
        <div className="mobile-menu">
          <Menu size={30} />
        </div>
        <div className="logo-wrapper">
          <div className="logo-text"> Lancerr</div>
          <div className="logo-dot">.</div>
        </div>

        <div className={`search-form-wrapper ${isOnTop ? " display" : ""} `}>
          <form>
            <input
              type="search"
              className="short-placeholder"
              placeholder="Find services"
            />
            <input
              type="search"
              className="long-placeholder"
              placeholder="What service are you looking for today?"
            />
            <button className="submit-button">
              <Search size={18} color="white" />
            </button>
          </form>
        </div>

        <nav className="header-links">
          <ul>
            <li className="become-seller-btn">Become a Seller</li>
            <li className="signin-btn">Sign in</li>
            <li className="join-btn">Join</li>
          </ul>
        </nav>
      </div>
      {isOnTop && (
        <div
          className={`categories-menu-wrapper ${isScrolled ? "scrolled" : ""}`}
        >
          <button
            className="scroll-button left-scroll"
            onClick={handleLeftClick}
          >
            <ChevronLeft color="#62646a" />
          </button>
          <nav
            id="categories-menu-package"
            className="categories-menu-package default has-overflow"
          >
            <ul className="categories">
              <li>Graphics & Design</li>
              <li>Programming & Tech</li>
              <li>Digital Marketing</li>
              <li>Video & Animation</li>
              <li>Writing & Translation</li>
              <li>Music & Audio</li>
              <li>Business</li>
              <li>Data</li>
              <li>Photography</li>
              <li>AI Services</li>
            </ul>
          </nav>
          <button
            className="scroll-button right-scroll"
            onClick={handleRightClick}
          >
            <ChevronRight color="#62646a" />
          </button>
        </div>
      )}
    </div>
  );
}
