import { React, Fragment, useContext } from "react";
import {
  Homepage,
  Header,
  AddToolbox,
  ConstructionSites,
  AddExtWorker,
} from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "./context/auth-context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";

const App = () => {
  const ctx = useContext(AuthContext);
  return (
    <Fragment>
      <AuthContext.Provider value={{isLoggedIn:ctx.isLoggedIn}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/add-toolbox" exact element={<ProtectedRoute><AddToolbox /></ProtectedRoute>} />
            <Route
              path="/construction-sites"
              exact
              element={<ProtectedRoute><ConstructionSites /></ProtectedRoute>}
            />
            <Route
              path="/add-external-worker"
              exact
              element={<ProtectedRoute><AddExtWorker /></ProtectedRoute>}
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
