import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home, { serviceLoader } from "../pages/Home/Home";
import Notfound from "../pages/Notfound/Notfound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Accessories, {
  accessoriesLoader,
} from "../pages/Accessories/Accessories";
import ScheduleOrder from "../pages/ScheduleOrder/ScheduleOrder";
import About from "../pages/About/About";
import Contactus from "../pages/Contactus/Contactus";
import Admin from "../pages/Admin/admin";

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
        path: "accessories",
        element: <Accessories />,
        loader: accessoriesLoader,
      },
      {
        path: "scheduleorder",
        element: <ScheduleOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contactus",
        element: <Contactus />,
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
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
