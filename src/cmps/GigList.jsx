import { Link } from "react-router-dom";
import { GigPreview} from "./GigPreview";

export function GigList({ gigs, onRemove }) {

  return (
      <ul className="gig-list gigs-layout" >
          {
              gigs.map(gig => <li key={gig._id}>
                   {/* <Link to={`/gig/edit/${gig._id}`}> */}
                  <GigPreview gig={gig} />
                  {/* </Link> */}
                  
                  
              </li>)
          }
      </ul>
  )
}
