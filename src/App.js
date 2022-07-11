import React from "react";
import { useObserver } from "mobx-react-lite";
import { Switch, Route, Link } from "react-router-dom";
import { ROUTES } from "./consts";
import PostsList from "./components/PostsList/PostsList";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import GetStartedButton from "./components/GetStartedButton/GetStartedButton";
import incognitoo_logo from "./images/incognitoo_logo.svg";
import style from "./css/App.module.css";

const App = () => {
  return useObserver(() => (
    <>
      <div>
        <div className="container">
          <header className={style.header}>
            <h1 className={style.header__title}>
              <Link className={style.title__link} to="/">
                <div className={style.logoWrapper}>
                  <img
                    src={incognitoo_logo}
                    alt="incognitoo logo"
                    className={style.logoSymbol}
                    height="25px"
                    width="25px"
                  />
                  incogniTOO
                </div>
              </Link>
            </h1>
            <GetStartedButton />
          </header>
          <main>
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
                <Home />
              </Route>

              <Route>
                <p className={style.pageTitle}>Not found</p>
                <Link to="/">Return to homepage </Link>
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <footer className="footer">
        <p>
          IncogniTOO is a fictional project <br />
          <a href="https://aaronharinck.be/">
            Created & designed by Aaron Harinck
          </a>
        </p>
      </footer>
    </>
  ));
};

export default App;
