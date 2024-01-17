import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { GigIndex } from "./pages/GigIndex.jsx";
import { ReviewIndex } from "./pages/ReviewIndex.jsx";
import { ChatApp } from "./pages/Chat.jsx";
import { AdminApp } from "./pages/AdminIndex.jsx";
import { GigSeller } from "./pages/GigSeller.jsx";
import GigDetails from "./pages/GigDetails.jsx";
import CreateGig from "./pages/CreateGig.jsx";
import Payment from "./pages/Payment.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "Lancherr",
  },
  {
    path: "explore",
    component: <GigIndex />,
    label: "Explore",
  },
  {
    path: "seller",
    component: <GigSeller />,
    label: "Become a Seller",
  },
  {
    path: "details",
    component: <GigDetails />,
    label: "Gig Details",
  },
  {
    path: "create",
    component: <CreateGig />,
    label: "Create a new gig",
  },
  {
    path: "payment",
    component: <Payment />,
    label: "Payment",
  },
];

export default routes;
