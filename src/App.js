import React from "react";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, Link } from "react-router-dom";
import { ROUTES } from "./consts";
import PostsList from "./components/PostsList/PostsList";
import Posts from "./components/Posts/Posts";
import User from "./components/User/User";
import style from "./css/App.module.css";

const App = () => {
  return useObserver(() => (
    <section className="container">
      <header className="header">
        <h2 className={style.header__title}>
          <Link className={style.title__link} to="/">
            incogniTOO
          </Link>
        </h2>
      </header>
      <Switch>
        <Route path={ROUTES.user.path}>
          <User />
        </Route>
        <Route path={ROUTES.post.path}>
          <PostsList />
        </Route>
        <Route path={ROUTES.add}>
          <p>Add tag</p>
        </Route>
        <Route exact path={ROUTES.home}>
          <h2 className={style.pageTitle}>Home</h2>
          <Posts />
        </Route>
        <Route>
          <h2 className={style.pageTitle}>Not found</h2>
        </Route>
      </Switch>
    </section>
  ));
};

export default App;
