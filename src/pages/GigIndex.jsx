import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GigList } from "../cmps/GigList.jsx";
import { loadGigs } from "../store/actions/gig.actions.js";

export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs);

  useEffect(() => {
    // Sanitize filterBy
    loadGigs();
  }, []);

  if (!gigs) return <div>Loading..</div>;
  return (
    <main className="main-container">
      <section className="GigIndex full main-container">
        <article className="filter-title">
          <a className="home" href="/"><img className="home-icon" src="/src/assets/imgs/home-icon.svg"
            alt="Home" title="Go to homepage" />
          </a>
          <span className="divider">/</span>
          <a className="home-title" title="Current main category from filter varaible" href="/gig">Current main category from filter varaible</a>
        </article>
        <h1 className="category-header">Current main category from filter varaible</h1>
        <p className="category-sub-header">Current sub category from filter varaible</p>

        <div className="btns-container">selector filter buttons
          <button>Options </button>
          <button>Seller details </button>
          <button>Budget </button>
          <button>Delivery time </button>
        </div>
        <div className="top-of-gigs">
          <div className="number-of-results">(Counter from service)Num of services available</div>
          <label className="sort-container"><span className="sort-title">Add Filter Sort by:</span><span className="drop-down-btn">Recommended</span></label></div>
        <section>
          <GigList gigs={gigs} />
        </section>
      </section>
    </main>
  );
}
