import Home from "../home/home";
import Musicollection from "../musicollection/musicollection"

var route = [
  { key: 1, exact: true, path: "/", component: Home },
  { key: 2, exact: true, path: "/musicollection", component: Musicollection }
];

export default route;