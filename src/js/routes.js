import HomePage from "../pages/home.jsx";
import Search from "../pages/search.jsx";
import Profile from "../pages/profile.jsx";
import Messaging from "../pages/messaging.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/home/",
    component: HomePage,
  },
  {
    path: "/search/",
    component: Search,
  },
  {
    path: "/profile/",
    component: Profile,
  },
  {
    path: "/messaging/",
    component: Messaging,
  },
];

export default routes;
