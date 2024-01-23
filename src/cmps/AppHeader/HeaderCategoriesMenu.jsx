import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function HeaderCategoriesMenu() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className={`categories-menu-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <button className="scroll-button left-scroll" onClick={handleLeftClick}>
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
      <button className="scroll-button right-scroll" onClick={handleRightClick}>
        <ChevronRight color="#62646a" />
      </button>
    </div>
  );
}
