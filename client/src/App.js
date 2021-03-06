import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvide } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvide>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/post/:id" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvide>
  );
}

export default App;
