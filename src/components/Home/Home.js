import { useObserver } from "mobx-react-lite";
import React from "react";
import Posts from "../Posts/Posts";
import Login from "../Login/Login";
import { useStores } from "../../hooks/UseStores";
import style from "./Home.module.css";

const Home = () => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <>
      <section className={style.introSection}>
        <div className={style.introHeadlineLoginPart}>
          <div className={style.headlineContainer}>
            <h2 className={style.headline}>
              The social network for{" "}
              <span className={style.headlineHighlighted}>anonymous </span>
              users
            </h2>
            <p className={style.headlineIntroText}>
              <strong>IncogniTOO</strong> is the
              <strong> privacy-first</strong> social media network.
              <strong> Anonymously engage in the community</strong>, without
              having to give your personal data away.
            </p>
          </div>
          {uiStore.currentUser === undefined && <Login />}
        </div>

        <div className={style.introCardsPart}>
          <div className={style.card}>
            <h3 className={style.cardTitle}>
              Fast and privacy-focused sign up process.
            </h3>
            <p className={style.cardText}>
              We don't ask for personal data like your email, just create a
              session by selecting a username and you're good to go!
            </p>
          </div>
          <div className={style.card}>
            <h3 className={style.cardTitle}>
              Show off some of your personality.
            </h3>
            <p className={style.cardText}>
              Express yourself by picking your favorite color — or don't, and
              just get a color randomly assigned, it's your choice!
            </p>
          </div>
          <div className={style.card}>
            <h3 className={style.cardTitle}>
              Keep using the social features you love.
            </h3>
            <p className={style.cardText}>
              Add posts, view the posts of others, leave a comment and
              follow/unfollow other users!
            </p>
          </div>
        </div>
      </section>
      <div className={style.fullWidthIgnoreContainer}>
        <Posts />
      </div>
    </>
  ));
};

export default Home;
