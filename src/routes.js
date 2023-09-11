import Home from "./pages/Home";
import NotFound from "./pages/Notfound";

const routes = [
  { path: "", component: <Home /> },
  { path: "home", component: <Home /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "*", component: <NotFound /> },
];
export default routes;
