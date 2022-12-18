import Home from "../home/home";
import albumcollection from "../albumcollection/albumcollection"
import ZipCodeSearch from "../zip_code_search/zip_code_search"

var route = [
  { key: 1, exact: true, path: "/", component: Home },
  { key: 2, exact: true, path: "/albumcollection", component: albumcollection },
  { key: 3, exact: true, path: "/zip_code_search", component: ZipCodeSearch }
];

export default route;