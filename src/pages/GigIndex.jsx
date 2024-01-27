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
      <a className="home" href="/"><img class="home-icon" src="/src/assets/imgs/home-icon.svg"
       alt="Home" title="Go to homepage"/>        
      </a>
      <span className="divider">/</span>
      <a title="Current main category from filter varaible" href="/gig">Current main category from filter varaible</a>
      </article>
      <h1 className="category-header">Current main category from filter varaible</h1>
      <p className="category-sub-header">Current sub category from filter varaible</p>
      <main>
        <GigList gigs={gigs} />
      </main>
    </section>
    </main>
  );
}
