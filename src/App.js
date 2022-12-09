import { React, Fragment, useState, useEffect } from "react";
import {
  Homepage,
  Header,
  NoMatch,
  AddToolbox,
  ConstructionSites,
  AddExtWorker,
  User,
  ConstructionSitesDetails,
  WorkerDetailsPage,
  AddToolboxPerWorker,
  ArchiveConstructionSites
} from "./components";
import { useAuth } from "./context/auth-context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn);

  useEffect(() => {
      setIsLoggedIn(auth.isLoggedIn);
      if(!auth.isLoggedIn){
        sessionStorage.removeItem("crsf_token");
        sessionStorage.removeItem("logout_token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("user_id");
      }
  }, [auth.isLoggedIn]);
  console.log("APP.js",isLoggedIn);
  return (
    <Fragment>
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path={"/"}
            exact
            element={
              isLoggedIn ? (
                <ConstructionSites className="container" />
              ) : (
                <Homepage />
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
            path={"/archive-construction-sites"}
            exact
            element={isLoggedIn ? <ArchiveConstructionSites /> : <Homepage />}
          />
          <Route
            path="/user"
            exact
            element={
              isLoggedIn ? <User /> : <Homepage />
            }
          />
          <Route
            path="/construction-sites-detail/:id"
            exact
            element={isLoggedIn ? <ConstructionSitesDetails /> : <Homepage />}
          />
          <Route
            path="/archive-construction-sites/:id"
            exact
            element={isLoggedIn ? <ConstructionSitesDetails /> : <Homepage />}
          />
          <Route
            path="/worker-details/:id"
            exact
            element={isLoggedIn ? <WorkerDetailsPage /> : <Homepage />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
