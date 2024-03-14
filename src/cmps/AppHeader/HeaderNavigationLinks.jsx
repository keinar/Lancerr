import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Login from "./Login"
import { login, logout, signup } from "../../store/actions/user.actions"
import { Check } from "lucide-react"
import { showErrorMsg } from "../../services/event-bus.service"

export default function HeaderNavigationLinks() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const user = useSelector(storeState => storeState.userModule.user)

  function openAuthDialog() {
    setIsAuthDialogOpen(true)
  }

  function closeAuthDialog() {
    setIsAuthDialogOpen(false)
  }
  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      setIsAuthDialogOpen(false)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot login")
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg("Cannot signup")
    }
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  return (
    <nav className="header-links">
      <ul>
        <li className="become-seller-btn">Become a Seller</li>
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
          <span className="user-info">
            {user.imgUrl && <img src={user.imgUrl} alt="user-img" className="user-img" />}
            {user.fullname}
            <button onClick={onLogout}>Logout</button>
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
