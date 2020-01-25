import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header.cmp";
import HomePage from "./pages/HomePage/HomePage.cmp";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.cmp";

class App extends Component {


  render() {
    return (
      <div className="app-container">
        <ToastContainer />
        <Router>
          <Header></Header>
          <Route exact path="/" component={HomePage} />
          <Route path="/favorites" component={FavoritesPage} />
        </Router>
      </div>
    );
  }
}

export default App;
