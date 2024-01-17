import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { GigSeller } from './pages/GigSeller.jsx'
import GigDetails from './pages/GigDetails.jsx'
import CreateGig from './pages/CreateGig.jsx'
import Payment from './pages/Payment.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'LANCERR *',
    },
    {
        path: 'explore',
        component: <GigIndex />,
        label: 'Explore'
    },
    {
        path: 'Seller',
        component: <GigSeller />,
        label: 'Become a Seller'
    },
    {
        path: 'Details',
        component: <GigDetails />,
        label: 'Gig Details'
    },
    {
        path: 'Create',
        component: <CreateGig />,
        label: 'Create a new gig'
    },
    {
        path: 'Payment',
        component: <Payment />,
        label: 'Payment'
    },

]
