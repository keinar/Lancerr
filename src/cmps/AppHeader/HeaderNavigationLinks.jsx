import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Login from "./Login"
import { loadUsers, logout, setLoggedinUser } from "../../store/actions/user.actions"
import { Check } from "lucide-react"

export default function HeaderNavigationLinks() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  useEffect(() => {
    loadUsers()
  }, [])

  function openAuthDialog() {
    setIsAuthDialogOpen(true)
  }

  function closeAuthDialog() {
    setIsAuthDialogOpen(false)
  }

  async function onLogout() {
    console.log("logout")
    try {
      logout()
      setLoggedinUser(null)
    } catch (err) {
      console.log("can not logout")
    }
    // add logout
  }

  return (
    <nav className="header-links">
      <ul>
        <li className="become-seller-btn">Become a Seller</li>
        <li className="signin-btn">Sign in</li>
        <li className="join-btn" onClick={openAuthDialog}>
          Join
        </li>
        {isAuthDialogOpen && !loggedinUser && (
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
                <Login loggedinUser={loggedinUser} setLoggedinUser={setLoggedinUser} />
                <button onClick={closeAuthDialog}>Close</button>
              </section>
            </dialog>
          </div>
        )}
      </ul>
    </nav>
  )
}
