import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import Products from "./pages/Products";
import Resgister from "./pages/Resgister";

const routes = [
  { path: "", component: <Home /> },
  { path: "home", component: <Home /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "cart", component: <Cart /> },
  { path: "products", component: <Products /> },
  { path: "*", component: <NotFound /> },
  { path: "register", component: <Resgister /> },
  { path: "login", component: <Login /> },
];
export default routes;
