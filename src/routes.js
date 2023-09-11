import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

const routes = [
  { path: "", component: <Home /> },
  { path: "home", component: <Home /> },
  { path: "/not-found", component: <NotFound /> },
  { path: "*", component: <NotFound /> },
  { path: "about", component: <About /> },
  { path: "login", component: <Login /> },
  { path: "register", component: <Register /> },
  { path: "contact", component: <Contact /> },

];
export default routes;
