import { Link } from "react-router-dom";

export function GigPreview({ gig }) {
    return <article className="gig-preview">
        <Link to={`/gigs/${gig.id}`}>
            {/* <img src={`https://robohash.org/${robot.type}`} /> */}
            
            <h4>{gig.title}</h4>
            <h4>{gig.price}</h4>
        </Link>
    </article>

}
