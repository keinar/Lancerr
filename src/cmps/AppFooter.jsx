
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

// import {  } from '../store/actions/gig.actions.js'
import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {
    

    return (
        <footer className="app-footer">
            <p>
            Categories/About/Support and Education....
            </p>
 
 
            <UserMsg />
        </footer>
    )
}