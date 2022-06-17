import { React, Fragment, useState, useEffect } from "react";
import {
  Homepage,
  Header,
  AddToolbox,
  ConstructionSites,
  AddExtWorker,
} from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
    setIsLoggedIn(true);
    window.location.href = '/construction-sites';
    console.log("Login Handler")
  }
  const logoutHandler = ()=>{
    console.log(isLoggedIn)
    window.location.href = '/';
    localStorage.removeItem('crsf_token');
    localStorage.removeItem('logout_token');
    setIsLoggedIn(false)
    console.log(isLoggedIn)
  }
  return (
    <Fragment>
      {/* <AuthContext.Provider value={{isLoggedIn:ctx.isLoggedIn}}> */}
        <Router>
          <Header isLoggedIn ={isLoggedIn} onLogout={logoutHandler}/>
          <Routes>
            <Route path={'/'} exact element={<Homepage onLogin={loginHandler}/>} />
            <Route path="/add-toolbox" exact element={isLoggedIn && <AddToolbox />} />
            <Route
              path="/construction-sites"
              exact
              element={isLoggedIn && <ConstructionSites />}
            />
            <Route
              path="/add-external-worker"
              exact
              element={isLoggedIn && <AddExtWorker />}
            />
          </Routes>
        </Router>
      {/* </AuthContext.Provider> */}
    </Fragment>
  );
};

export default App;
