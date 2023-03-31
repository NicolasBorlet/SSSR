import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import App from "../App";
import BrandScreen from "../features/brand/ui/screen/BrandScreen";
import BrandSoloScreen from "../features/brand/ui/screen/BrandSoloScreen";
import CategorieScreen from "../features/categorie/ui/screens/CategorieScreen";
import DiscountScreen from "../features/discount/ui/screens/DiscountScreen";
import ProductConfigurationScreen from "../features/product/ui/screen/ProductConfigurationScreen";
import ProductScreen from "../features/product/ui/screen/ProductScreen";
import ProductSoloScreen from "../features/product/ui/screen/ProductSoloScreen";
import { userState } from "./atoms/shared-atoms";
import ErrorScreen from "./ui/screen/ErrorScreen";
import LoginScreen from "./ui/screen/LoginScreen";

const View = createRoutesFromChildren(
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/brand" element={<BrandScreen />}>
      <Route path=":id" element={<BrandSoloScreen />} />
    </Route>
    <Route path="/product" element={<ProductScreen />}>
      <Route path=":id" element={<ProductSoloScreen />}>
        <Route path="configuration" element={<ProductConfigurationScreen />} />
      </Route>
    </Route>
    <Route path="/categories" element={<CategorieScreen />} />
    <Route path="/discount" element={<DiscountScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="*" element={<ErrorScreen />} />
  </Routes>
);

export default View;
