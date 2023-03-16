import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/shared-atoms";

const ProtectedRoute = ({ children }: any) => {
  const [user, setUser] = useRecoilState(userState);

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute;
