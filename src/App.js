import { React, Fragment, useState, useEffect } from "react";
import {
  Homepage,
  Header,
  AddToolbox,
  ConstructionSites,
  AddExtWorker,
  User,
  ConstructionSitesDetails,
  WorkerDetailsPage, AddToolboxPerWorker
} from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { message } from "antd";
// import AuthContext from "./context/auth-context";
import "./App.css";

const App = () => {
  // const ctx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedCrsfToken = sessionStorage.getItem("crsf_token");
    const storedUserLogoutToken = sessionStorage.getItem("logout_token");

    if (storedUserLoggedCrsfToken && storedUserLogoutToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    window.location.href = "/";
    message.success("Successfully Logged In");
  };
  const logoutHandler = () => {
    sessionStorage.removeItem("crsf_token");
    sessionStorage.removeItem("logout_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");
    setIsLoggedIn(false);
    window.location.href = "/";
  };
  return (
    <Fragment>
      {/* <AuthContext.Provider value={{isLoggedIn:ctx.isLoggedIn}}> */}
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
        <Routes>
          <Route
            path={"/"}
            exact
            element={
              isLoggedIn ? (
                <ConstructionSites className="container" />
              ) : (
                <Homepage onLogin={loginHandler} />
              )
            }
          />
          <Route
            path={"/add-toolbox/:id"}
            exact
            element={isLoggedIn ? <AddToolbox /> : <Homepage />}
          />
          <Route
            path={"/add-toolbox-per-worker/:id"}
            exact
            element={isLoggedIn ? <AddToolboxPerWorker /> : <Homepage />}
          />
          <Route
            path="/add-external-worker/:id"
            exact
            element={isLoggedIn ? <AddExtWorker /> : <Homepage />}
          />
          <Route
            path="/user"
            exact
            element={isLoggedIn ? <User onLogout={logoutHandler}/> : <Homepage />}
          />
          <Route
            path="/construction-sites-detail/:id"
            exact
            element={isLoggedIn ? <ConstructionSitesDetails /> : <Homepage />}
          />
          <Route
            path="/worker-details/:id"
            exact
            element={isLoggedIn ? <WorkerDetailsPage /> : <Homepage />}
          />
        </Routes>
      </Router>
      {/* </AuthContext.Provider> */}
    </Fragment>
  );
};

export default App;
