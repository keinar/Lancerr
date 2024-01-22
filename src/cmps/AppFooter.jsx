import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AppFooter() {
  const [expandStates, setExpandStates] = useState({
    categories: false,
    about: false,
    supportAndEducation: false,
    community: false,
    businessSolutions: false,
  });

  function handleToggleIsExpand(category) {
    setExpandStates((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  return (
    <footer className="app-footer">
      <div className="footer-wrapper">
        <div className="footer-collapsibles">
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">Categories</div>
                <div
                  className="chevron-wrapper"
                  onClick={() => handleToggleIsExpand("categories")}
                >
                  {expandStates.categories ? (
                    <ChevronUp size={20} color="#62646a" />
                  ) : (
                    <ChevronDown size={20} color="#62646a" />
                  )}
                </div>
              </div>
              <div
                className={`footer-collapsible-content ${
                  expandStates.categories ? "display-content" : ""
                }`}
              >
                <ul>
                  <li> Graphics & Design</li>
                  <li>Digital Marketing</li>
                  <li>Writing & Translation</li>
                  <li>Video & Animation</li>
                  <li>Music & Audio</li>
                  <li>Fiverr Logo Maker</li>
                  <li>Programming & Tech</li>
                  <li>Data</li>
                  <li>Business</li>
                  <li>Lifestyle</li>
                  <li>Photography</li>
                  <li>End-to-End Projects</li>
                  <li>Sitemap</li>
                </ul>
              </div>
            </article>
          </div>
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">About</div>
                <div
                  className="chevron-wrapper"
                  onClick={() => handleToggleIsExpand("about")}
                >
                  {expandStates.about ? (
                    <ChevronUp size={20} color="#62646a" />
                  ) : (
                    <ChevronDown size={20} color="#62646a" />
                  )}
                </div>
              </div>
              <div
                className={`footer-collapsible-content ${
                  expandStates.about ? "display-content" : ""
                }`}
              >
                <ul>
                  <li> Careers</li>
                  <li>Press & News</li>
                  <li>Partnerships</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Intellectual Property Claims</li>
                  <li>Investor Relations</li>
                </ul>
              </div>
            </article>
          </div>
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">Support and Education</div>
                <div
                  className="chevron-wrapper"
                  onClick={() => handleToggleIsExpand("supportAndEducation")}
                >
                  {expandStates.supportAndEducation ? (
                    <ChevronUp size={20} color="#62646a" />
                  ) : (
                    <ChevronDown size={20} color="#62646a" />
                  )}
                </div>
              </div>
              <div
                className={`footer-collapsible-content ${
                  expandStates.supportAndEducation ? "display-content" : ""
                }`}
              >
                <ul>
                  <li> Help & Support</li>
                  <li>Trust & Safety</li>
                  <li>Selling on Fiverr</li>
                  <li>Buying on Fiverr</li>
                  <li>Fiverr Guides</li>
                  <li>Fiverr Workspace</li>
                  <li>Learn</li>
                </ul>
              </div>
            </article>
          </div>
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">Community</div>
                <div
                  className="chevron-wrapper"
                  onClick={() => handleToggleIsExpand("community")}
                >
                  {expandStates.community ? (
                    <ChevronUp size={20} color="#62646a" />
                  ) : (
                    <ChevronDown size={20} color="#62646a" />
                  )}
                </div>
              </div>
              <div
                className={`footer-collapsible-content ${
                  expandStates.community ? "display-content" : ""
                }`}
              >
                <ul>
                  <li> Customer Success Stories</li>
                  <li>Community Hub</li>
                  <li>Forum</li>
                  <li>Events</li>
                  <li>Blog</li>
                  <li>Influencers</li>
                  <li>Affiliates</li>
                  <li>Podcast</li>
                  <li>Invite a Friend</li>
                  <li>Become a Seller</li>
                  <li>Community Standards</li>
                </ul>
              </div>
            </article>
          </div>
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">Business Solutions</div>
                <div
                  className="chevron-wrapper"
                  onClick={() => handleToggleIsExpand("businessSolutions")}
                >
                  {expandStates.businessSolutions ? (
                    <ChevronUp size={20} color="#62646a" />
                  ) : (
                    <ChevronDown size={20} color="#62646a" />
                  )}
                </div>
              </div>
              <div
                className={`footer-collapsible-content ${
                  expandStates.businessSolutions ? "display-content" : ""
                }`}
              >
                <ul>
                  <li> About Business Solutions</li>
                  <li>Fiverr Pro</li>
                  <li>Fiverr Certified</li>
                  <li>Fiverr Enterprise</li>
                  <li>ClearVoice</li>
                  <li>Working Not Working</li>
                  <li>Contact Sales</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </div>
      {/* <UserMsg /> */}
    </footer>
  );
}
