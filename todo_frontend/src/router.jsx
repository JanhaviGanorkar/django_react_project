import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AllTodos from "./components/AllTodos";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AllTodos /> },
      // { path: "product", element: <Products /> },
      // {path: "customer", element: <CustomerForm />}
    
    ],
  },
]);
