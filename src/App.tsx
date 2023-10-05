import { Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./shared/ui/layout/Layout";
import { useEffect } from "react";
import HomeScreen from "./features/home/ui/screen/HomeScreen";

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <>
      {token ? <Layout children={<HomeScreen />} /> : <Navigate to="/login" />}
    </>
  );
}

export default App;
