import { useState } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

// import {  } from '../store/actions/gig.actions.js'
import { UserMsg } from "./UserMsg.jsx";
import { ChevronDown } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-wrapper">
        <div className="footer-collapsibles">
          <div className="footer-item">
            <article>
              <div className="footer-title-wrapper">
                <div className="item-title">Categories</div>
                <div className="chevron-wrapper">
                  <ChevronDown size={20} color="#62646a" />
                </div>
              </div>
              <div className="footer-collapsible-content">
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
                <div className="chevron-wrapper">
                  <ChevronDown size={20} color="#62646a" />
                </div>
              </div>
              <div className="footer-collapsible-content">
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
                <div className="chevron-wrapper">
                  <ChevronDown size={20} color="#62646a" />
                </div>
              </div>
              <div className="footer-collapsible-content">
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
                <div className="chevron-wrapper">
                  <ChevronDown size={20} color="#62646a" />
                </div>
              </div>
              <div className="footer-collapsible-content">
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
                <div className="chevron-wrapper">
                  <ChevronDown size={20} color="#62646a" />
                </div>
              </div>
              <div className="footer-collapsible-content">
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
