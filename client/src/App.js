// App.js
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import RoutesPage from "../src/pages/RoutesPage/RoutesPage";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import MyRoute from "./pages/MyRoute/MyRoute";
import Companions from "./pages/Companions/Companions";
import RouteInfo from "./pages/RouteInfo/RouteInfo";
import Start from "./pages/Start/Start";
import UserContextProvider from "./UserContextProvider";
import RequireAuth from "./RequireAuth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/start/",
    element: <Start />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <RequireAuth>
        <div className="app-container">
          <Header />
            <Outlet />
          <Footer />
        </div>
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/routes",
        element: <RoutesPage />,
      },
      {
        path: "/myroute/routes/:id",
        element: <MyRoute />,
      },
      {
        path: "/companions/:id",
        element: <Companions />,
      },
      {
        path: "/routes/:id",
        element: <RouteInfo />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <UserContextProvider>
      <RouterProvider router={router}>
        {initialLoad && <Navigate to="/start/login" />}
        <Outlet />
      </RouterProvider>
    </UserContextProvider>
  );
}
