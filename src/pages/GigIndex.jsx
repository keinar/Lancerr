import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GigList } from "../cmps/GigList.jsx"
import { loadGigs, setFilterBy } from "../store/actions/gig.actions.js"
import { GigFilter } from "../cmps/GigFilter.jsx"
import { useSearchParams } from "react-router-dom"
import { gigService } from "../services/gig.service.local.js"

export function GigIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)

  useEffect(() => {    
    setFilterBy(gigService.getFilterFromParams(searchParams))
  }, [])

  useEffect(() => {
    // Sanitize filterBy
    
    loadGigs();
    setSearchParams(filterBy)
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    fieldsToUpdate = { ...filterBy, ...fieldsToUpdate }    
    setFilterBy(fieldsToUpdate)
  }

  if (!gigs) return <div>Loading..</div>

  return (
    <main className="main-container">
      <section className="GigIndex full main-container">
        <GigFilter onSetFilter={onSetFilter} />
        <article className="filter-title">
          <a className="home" href="/"><img className="home-icon" src="/src/assets/imgs/home-icon.svg"
            alt="Home" title="Go to homepage" />
          </a>
          <span className="divider">/</span>
          <a className="home-title" title="Current main category from filter varaible" href="/gig">Current main category from filter varaible</a>
        </article>
        <div className="top-of-gigs">
          <div className="number-of-results">(Counter from service)Num of services available</div>
          <label className="sort-container"><span className="sort-title">Add Filter Sort by:</span><span className="drop-down-btn">Recommended</span></label></div>
        <section>
          <GigList gigs={gigs} />
        </section>
      </section>
    </main>
  )
}
