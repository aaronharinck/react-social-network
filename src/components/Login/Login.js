import React, { useState } from "react";
import style from "./Login.module.css";
import UserModel from "../../models/UserModel";
import { useStores } from "../../hooks/UseStores";

const Login = () => {
  const [name, setName] = useState("");
  const [userColor, setUserColor] = useState("#ffffff");
  const { dataStore, uiStore } = useStores();

  const handleSubmit = e => {
    e.preventDefault();
    if (name !== "") {
      const u = new UserModel({ name, store: dataStore, userColor });
      console.log(userColor);
      uiStore.setCurrentUser(u);
      dataStore.addUser(u);
      //history.push(ROUTES.userDetail.to + u.id);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={style.loginForm}>
        <p className={style.subtitle}>Login to post</p>
        <div className={style.labels}>
          <label htmlFor="name" className={style.label}>
            Pick a username
            <input
              type="text"
              className={style.input}
              id="name"
              name="name"
              placeholder="JohnDoe24"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label htmlFor="userColor" className={style.label}>
            Pick a color
            <input
              type="color"
              className={style.inputColor}
              id="userColor"
              name="userColor"
              value={userColor}
              onChange={e => setUserColor(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Login" className={style.button} />
      </form>
    </>
  );
};

export default Login;
