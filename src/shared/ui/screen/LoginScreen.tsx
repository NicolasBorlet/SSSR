import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // import the useNavigate hook
import { userState } from "../../atoms/shared-atoms";

const LoginScreen = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser(true);
    navigate("/");
  };

  useEffect(() => {
    console.log("user", user);
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Login Screen</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginScreen;
