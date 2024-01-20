import { ChevronDown, Globe, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AppHeader() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  function isActive() {
    window.scrollY > 30 ? setActive(true) : setActive(false);
  }
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <span className="text">lancerr</span>
              <span className="dot">.</span>
            </Link>
          </div>
          <div className="search-input">
            <form className="search-form">
              <input
                type="search"
                className="long-placeholder"
                placeholder="What service are you looking for today?"
                value=""
              />
              <button>
                <Search size={18} color="white" />
              </button>
            </form>
          </div>
          <div className="links">
            <span className="dropdown">
              Fiverr Pro <ChevronDown size={16} />
            </span>
            <Link to={"/gig"}>
              <span className="dropdown">
                Explore <ChevronDown size={16} />
              </span>
            </Link>
            <span>
              <Globe size={14} /> English
            </span>
            <span>Become a Seller</span>
            <span>Sign in</span>
            <button className="join">Join</button>
          </div>
        </div>
      </div>
      {active && (
        <div className="categories_menu">
          <span>Graphics & Design</span>
          <span>Programming & Tech</span>
          <span>Digital Marketing</span>
          <span>Video & Animation</span>
          <span>Writing & Translation</span>
          <span>Music & Audio</span>
          <span>Business</span>
          <span>Data</span>
          <span>Photography</span>
          <span>AI Services</span>
        </div>
      )}
    </>
  );
}

// import { Link, NavLink } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import routes from '../routes'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/actions/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'

// export function AppHeader() {
//     const user = useSelector(storeState => storeState.userModule.user)

//     async function onLogin(credentials) {
//         try {
//             const user = await login(credentials)
//             showSuccessMsg(`Welcome: ${user.fullname}`)
//         } catch(err) {
//             showErrorMsg('Cannot login')
//         }
//     }
//     async function onSignup(credentials) {
//         try {
//             const user = await signup(credentials)
//             showSuccessMsg(`Welcome new user: ${user.fullname}`)
//         } catch(err) {
//             showErrorMsg('Cannot signup')
//         }
//     }
//     async function onLogout() {
//         try {
//             await logout()
//             showSuccessMsg(`Bye now`)
//         } catch(err) {
//             showErrorMsg('Cannot logout')
//         }
//     }

//     return (
//         <header className="app-header">
//             <nav>
//                 {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

//                 {user &&
//                     <span className="user-info">
//                         <Link to={`user/${user._id}`}>
//                             {user.imgUrl && <img src={user.imgUrl} />}
//                             {user.fullname}
//                         </Link>

//                         <button onClick={onLogout}>Logout</button>
//                     </span>
//                 }
//                 {!user &&
//                     <section className="user-info">
//                         <LoginSignup onLogin={onLogin} onSignup={onSignup} />
//                     </section>
//                 }
//             </nav>
//             <h1>Find the right freeLANCERR <br/> service, right away </h1>
//         </header>
//     )
// }
