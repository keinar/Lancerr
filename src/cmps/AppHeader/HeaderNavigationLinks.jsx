import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import Login from "./Login"
import { login, logout, signup } from "../../store/actions/user.actions"
import { Check } from "lucide-react"
import { showErrorMsg } from "../../services/event-bus.service"
import { Link } from "react-router-dom"

export default function HeaderNavigationLinks() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isNavDialogOpen, setIsNavDialogOpen] = useState(false)
  const user = useSelector(storeState => storeState.userModule.user)
  const navDialogRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (navDialogRef.current && !navDialogRef.current.contains(event.target)) {
        if (isNavDialogOpen) closeNavDialog()
        if (isAuthDialogOpen) closeAuthDialog()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isNavDialogOpen, isAuthDialogOpen])

  function openAuthDialog() {
    setIsAuthDialogOpen(true)
  }

  function closeAuthDialog() {
    setIsAuthDialogOpen(false)
  }

  function openNavDialog() {
    setIsNavDialogOpen(true)
  }

  function closeNavDialog() {
    setIsNavDialogOpen(false)
  }

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      setIsAuthDialogOpen(false)
      setIsNavDialogOpen(false)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot login")
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      setIsAuthDialogOpen(false)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot signup")
    }
  }

  async function onLogout() {
    try {
      await logout()
      setIsNavDialogOpen(false)
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  return (
    <nav className="header-links">
      <ul>
        <Link to={"/explore"}>
          <li className="explore-btn">Explore</li>
        </Link>
        {!user && (
          <li className="signin-btn" onClick={openAuthDialog}>
            Sign in
          </li>
        )}
        {!user && (
          <li className="join-btn" onClick={openAuthDialog}>
            Join
          </li>
        )}

        {user && (
          <span className="user-info" ref={navDialogRef}>
            <li>Orders</li>
            <div>
              {user.imgUrl && <img src={user.imgUrl} alt="user-img" className="user-img" onClick={openNavDialog} title={user.fullname} />}
              <dialog open={isNavDialogOpen} className="nav-popover-items-content">
                <ul onClick={onLogout}>
                  <li>Logout</li>
                </ul>
              </dialog>
            </div>
          </span>
        )}

        {isAuthDialogOpen && (
          <div className="auth-dialog-container">
            <dialog open={isAuthDialogOpen} className="auth-dialog">
              <section className="dialog-left">
                <h2>Success starts here</h2>
                <ul>
                  <li>
                    <span>
                      <Check size={15} />
                    </span>
                    Over 600 categories
                  </li>
                  <li>
                    <span>
                      <Check size={15} />
                    </span>
                    Pay per project, not per hour
                  </li>
                  <li>
                    <span>
                      <Check size={15} />
                    </span>
                    Access to talent and businesses across the globe
                  </li>
                </ul>
              </section>
              <section className="dialog-right">
                <section className="container">
                  {!user && (
                    <div className="user-info">
                      <Login onLogin={onLogin} onSignup={onSignup} />
                    </div>
                  )}
                </section>

                <button onClick={closeAuthDialog}>Close</button>
              </section>
            </dialog>
          </div>
        )}
      </ul>
    </nav>
  )
}
