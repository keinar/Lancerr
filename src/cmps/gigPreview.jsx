import { Link } from "react-router-dom";

export function GigPreview({ gig }) {
    return <article className="gig-preview">
        <Link to={`/gig/${gig._id}`}>
            {/* <img src={`https://robohash.org/${robot.type}`} /> */}
            <img src={gig.imgUrl} alt="gig-img" />
        </Link>  
            <h4>{gig.title}</h4>
            <h4>{gig.price}</h4>
        
    </article>

}
