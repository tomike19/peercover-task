import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import $api from "./helpers/api";
import PageNotFound from "./pages/404/404.page";
import Dashboard from "./pages/index/index.page";
import MarketerPage from "./pages/index/_id/marketer.page";
import LoginPage from "./pages/login/login.page";

function App() {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const user = jsCookie.get("user");
//     if (user) {
//       setUser(JSON.parse(user));
//     }
//   }, []);

  useEffect(() => {
    if (user) {
      jsCookie.set("user", JSON.stringify(user));
      $api.$axios.interceptors.request.use((config) => {
        config.headers.Authorization = user.token;
        return config;
      });
      $api.$axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (error.response?.status === 403) {
            jsCookie.remove("user");
            setUser(null);
          }

          return Promise.reject(error);
        }
      );
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route
        path="login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
      <Route path="/:marketer" element={<MarketerPage user={user} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
