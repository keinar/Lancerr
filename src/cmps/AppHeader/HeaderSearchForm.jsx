import { Search } from "lucide-react";
import React from "react";

export default function HeaderSearchForm() {
  return (
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
  );
}
