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
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
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
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;
