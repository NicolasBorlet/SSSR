import { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./atoms/shared-atoms";

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, [setUser]);

  return (
    <Route
      {...rest}
      element={
        user === true ? <Component {...rest} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
