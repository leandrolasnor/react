import Home from "../home/home";
import Musicollection from "../musicollection/musicollection"
import ZipCodeSearch from "../zip_code_search/zip_code_search"

var route = [
  { key: 1, exact: true, path: "/", component: Home },
  { key: 2, exact: true, path: "/musicollection", component: Musicollection },
  { key: 3, exact: true, path: "/zip_code_search", component: ZipCodeSearch }
];

export default route;