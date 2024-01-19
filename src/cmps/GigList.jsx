import { Link } from "react-router-dom";
import { GigPreview} from "./GigPreview";

export function GigList({ gigs, onRemove }) {

  return (
      <ul className="gig-list">
          {
              gigs.map(gig => <li key={gig._id}>
                  <GigPreview gig={gig} />
                  <div className="gig-actions">
                      <button onClick={() => onRemove(gig._id)}>X</button>
                      <Link to={`/gig/edit/${gig._id}`}>Edit</Link>
                  </div>
              </li>)
          }
      </ul>
  )
}
