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
    <section className="main-containter full">
      <h1>Explore Page</h1>
      <main>
        <GigList gigs={gigs} />
      </main>
    </section>
  );
}
