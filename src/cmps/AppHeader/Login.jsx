import React, { useState } from "react"
import { userService } from "../../services/user.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"
import { LoginSignup } from "../LoginSignup.jsx"
import { UserMsg } from "../UserMsg.jsx"

export default function Login({ loggedinUser, setLoggedinUser }) {
  async function onLogin(credentials) {
    try {
      const user = await userService.login(credentials)
      setLoggedinUser(user)
      showSuccessMsg(`Welcome ${user.fullname}`)
    } catch (err) {
      console.log("Cannot login :", err)
      showErrorMsg(`Cannot login`)
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await userService.signup(credentials)
      setLoggedinUser(user)
      showSuccessMsg(`Welcome ${user.fullname}`)
    } catch (err) {
      console.log("Cannot signup :", err)
      showErrorMsg(`Cannot signup`)
    }
  }

  async function onLogout() {
    console.log("logout")
    try {
      await userService.logout()
      showSuccessMsg(`Goodbye ${loggedinUser.fullname}`)
      setLoggedinUser(null)
    } catch (err) {
      console.log("can not logout")
      showErrorMsg(`Cannot logout`)
    }
  }

  function isAllowed() {
    return loggedinUser?.isAdmin
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <section className="login-signup-container">
          {!loggedinUser && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}

          {loggedinUser && (
            <div className="user-preview">
              <h3>Hello {loggedinUser.fullname}</h3>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </section>
      </section>
      <UserMsg />
    </header>
  )
}
