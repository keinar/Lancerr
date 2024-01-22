import { GigDetails } from "./pages/GigDetails.jsx";
import { GigIndex } from "./pages/GigIndex.jsx";
import { GigSeller } from "./pages/GigSeller.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NewGig } from "./pages/NewGig.jsx";
import Payment from "./pages/Payment.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "Lancerr",
  },
  {
    path: "lancerr/gig",
    component: <GigIndex />,
    label: "Explore",
  },
  {
    path: "lancerr/seller",
    component: <GigSeller />,
    label: "Become a Seller",
  },
  {
    path: "lancerr/details",
    component: <GigDetails />,
    label: "Gig Details",
  },
  {
    path: "lancerr/gig/edit/:gigId?",
    component: <NewGig />,
    label: "Create a new gig",
  },
  {
    path: "lancerr/payment",
    component: <Payment />,
    label: "Payment",
  },
];

export default routes;
