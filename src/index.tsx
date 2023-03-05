import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import BrandScreen from "./features/brand/ui/screen/BrandScreen";
import BrandSoloScreen from "./features/brand/ui/screen/BrandSoloScreen";
import ProductScreen from "./features/product/ui/screen/ProductScreen";
import ProductSoloScreen from "./features/product/ui/screen/ProductSoloScreen";
import reportWebVitals from "./reportWebVitals";
import ErrorScreen from "./shared/ui/screen/ErrorScreen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/brand",
    element: <BrandScreen />,
  },
  {
    path: "/brand/:id",
    element: <BrandSoloScreen />,
  },
  {
    path: "/product",
    element: <ProductScreen />,
  },
  {
    path: "/product/:id",
    element: <ProductSoloScreen />,
  },
  {
    path: "*",
    element: <ErrorScreen />,
  },
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
