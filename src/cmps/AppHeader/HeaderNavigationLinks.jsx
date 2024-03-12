import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Login from "./Login"
import { loadUsers, logout, setLoggedinUser } from "../../store/actions/user.actions"

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
          <dialog open={isAuthDialogOpen} className="auth-dialog">
            <Login loggedinUser={loggedinUser} setLoggedinUser={setLoggedinUser} />
            <button onClick={closeAuthDialog}>Close</button>
          </dialog>
        )}
      </ul>
    </nav>
  )
}
