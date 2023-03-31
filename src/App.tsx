import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { userState } from "./shared/atoms/shared-atoms";
import Layout from "./shared/ui/layout/Layout";

function App() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, [setUser]);

  return (
    <>
      {user === true ? (
        <Layout children={<div className="App"></div>} />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default App;
