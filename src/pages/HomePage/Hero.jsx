import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-backgrounds">
        <div className="hero-background hero-jenny">
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@Jenny</div>
              <div>
                <b>Children's Voice Over</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-colin"></div>
        <div className="hero-background hero-scarlett"></div>
        <div className="hero-background hero-jordan"></div>
      </div>
    </section>
  );
}
