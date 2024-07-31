import React from "react";
import Header from "./Component/Header";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Logout from "./Component/Logout";
import Home from "./Component/Home";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

export default App;
