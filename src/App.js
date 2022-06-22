import { React, Fragment, useState, useEffect } from "react";
import {
  Homepage,
  Header,
  AddToolbox,
  ConstructionSites,
  AddExtWorker, User, ConstructionSitesDetails
} from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {message} from 'antd'
// import AuthContext from "./context/auth-context";
import "./App.css";

const App = () => {
  // const ctx = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedCrsfToken = localStorage.getItem('crsf_token');
    const storedUserLogoutToken = localStorage.getItem('logout_token')

    if (storedUserLoggedCrsfToken && storedUserLogoutToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () =>{
    window.location.href = '/';
    message.success("Successfully Logged In")
  }
  const logoutHandler = ()=>{
    localStorage.removeItem('crsf_token');
    localStorage.removeItem('logout_token');
    setIsLoggedIn(false)
  }
  return (
    <Fragment>
      {/* <AuthContext.Provider value={{isLoggedIn:ctx.isLoggedIn}}> */}
        <Router>
          <Header isLoggedIn ={isLoggedIn} onLogout={logoutHandler}/>
          <Routes>
            <Route path={'/'} exact element={isLoggedIn ? <ConstructionSites className="container"/> : <Homepage onLogin={loginHandler}/>} />
            <Route path={"/add-toolbox/:id"} exact element={isLoggedIn && <AddToolbox />} />
            {/* <Route
              path="/construction-sites"
              exact
              element={isLoggedIn && <ConstructionSites />}
            /> */}
            <Route
              path="/add-external-worker"
              exact
              element={isLoggedIn && <AddExtWorker />}
            />
            <Route
              path="/user"
              exact
              element={isLoggedIn && <User />}
            />
            <Route
              path="/construction-sites-detail/:id"
              exact
              element={isLoggedIn && <ConstructionSitesDetails />}
            />
          </Routes>
        </Router>
      {/* </AuthContext.Provider> */}
    </Fragment>
  );
};

export default App;
