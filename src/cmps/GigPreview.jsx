import { Link } from "react-router-dom"

export function GigPreview({ gig }) {
  return (
    <>
      <div className="img-container">
        <Link to={`/details/${gig._id}`}>
          <div className="gig-img">
            <img src={gig.imgUrl} alt="gig-img" />
          </div>
        </Link>
      </div>
      <div className="owner-details">
        <div className="owner-details-header">
          <img className="owner-profile-img" src={gig.owner.imgUrl} alt="progile-img" />
          <span className="owner-fullname">{gig.owner.fullname}</span>
          <span className="level-number">{gig.owner.level}</span>
        </div>
        <div className="owner-details-gig-title">
          <a href={`/details/${gig._id}`}>
            <h3 className="owner-gig-title">{gig.title}</h3>
          </a>
        </div>
        <div className="owner-details-rate">
          <span className="fa fa-star checked"></span>
          <span className="owner-rate">{gig.owner.rate}</span>
          <span className="owner-number-rates">{`(${gig.owner.rate})`}</span>
        </div>
      </div>

      <span className="gig-price">
        <span>From &nbsp;</span>
        <span>{`$${gig.price}`}</span>
      </span>
    </>
  )
}
