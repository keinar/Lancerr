import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { GigIndex } from "./pages/GigIndex.jsx";
import { ReviewIndex } from "./pages/ReviewIndex.jsx";
import { ChatApp } from "./pages/Chat.jsx";
import { AdminApp } from "./pages/AdminIndex.jsx";
import { GigSeller } from "./pages/GigSeller.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "LANCERR.",
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
];

export default routes;
