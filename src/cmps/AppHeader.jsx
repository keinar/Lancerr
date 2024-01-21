import { Menu, Search } from "lucide-react";
import React from "react";

export function AppHeader() {
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

        <div className="search-form-wrapper">
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
              <Search size={15} color="white" />
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
    </div>
  );
}
