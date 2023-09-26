import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home, { serviceLoader } from "../pages/Home/Home";
import Notfound from "../pages/Notfound/Notfound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Accessories, { accessoriesLoader } from "../pages/Accessories/Accessories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: serviceLoader,
      },
      {
        path: "/accessories",
        element: <Accessories />,
        loader:accessoriesLoader
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
  {
    path: "*",
    element: <Notfound />,
  },

]);
