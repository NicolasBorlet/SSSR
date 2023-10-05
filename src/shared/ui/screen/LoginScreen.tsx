import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom"; // import the useNavigate hook
import { userState } from "../../atoms/shared-atoms";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Layout from "../layout/Layout";
import { useEffect } from "react";

const LoginScreen = () => {
  const [user, setUser] = useRecoilState(userState);
  const errorMessage = localStorage.getItem("errorMessage");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove the token from localStorage
    setUser(false); // set the user state to false
    navigate("/login"); // redirect the user to the login page
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <>
      {token ? (
        <Layout>
          <div>
            <p>Vous êtes actuellement connecté</p>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none absolute right-[50%] focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Se déconnecter
            </button>
          </div>
        </Layout>
      ) : (
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          {user === true ? (
            <>
              <Header />
              <Sidebar />
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none absolute right-[50%] focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </div>
              <Footer />
            </>
          ) : (
            <div className="m-5 flex justify-center gap-12 mt-52">
              <div className="w-[30%]">
                <h3>Se connecter</h3>
                <Login />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LoginScreen;
