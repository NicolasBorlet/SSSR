import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import { userState } from "./shared/atoms/shared-atoms";
import Layout from "./shared/ui/layout/Layout";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (token) {
      setUser(true);
      console.log("user", user);
    } else {
      setUser(false);
    }
  }, [token, setUser]);

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
