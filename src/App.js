import { React, Fragment } from "react";
import { Homepage, Header, AddToolbox, ConstructionSites, AddExtWorker } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/add-toolbox" exact element={<AddToolbox />} />
          <Route path="/construction-sites" exact element={<ConstructionSites />} />
          <Route path="/add-external-worker" exact element={<AddExtWorker />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
