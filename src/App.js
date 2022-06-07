import { React, Fragment } from "react";
import { Homepage, Header, Footer } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
        </Routes>
        <Footer />
      </Router>
    </Fragment>
  );
};

export default App;
