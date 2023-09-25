import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home, { serviceLoader } from "../pages/Home/Home";
import Notfound from "../pages/Notfound/Notfound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

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
