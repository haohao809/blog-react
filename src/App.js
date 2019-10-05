import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./views/Login.js";
import Blog from "./views/Blog.js";
import 'element-theme-default';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Login} />
        <Route path="/blog" component={Blog} />
      </div>
    </Router>
  );
}
function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
    </ul>
  );
}

export default App;
