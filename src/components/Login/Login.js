import React, { useState } from "react";
import style from "./Login.module.css";
import UserModel from "../../models/UserModel";
import { useStores } from "../../hooks/UseStores";

const Login = () => {
  const [name, setName] = useState("");
  const [userColor, setUserColor] = useState("#ffffff");
  const { dataStore, uiStore } = useStores();

  const handleSubmit = (e) => {
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
      <form onSubmit={handleSubmit} className={style.loginForm} id="loginForm">
        <p className={style.subtitle}>Create a session to start engaging</p>
        <p className={style.infoText}>
          Pick a username and color for this session
        </p>
        <div className={style.labels}>
          <label htmlFor="name" className={style.label}>
            Username
            <input
              type="text"
              className={style.input}
              id="name"
              name="name"
              placeholder="JohnDoe24"
              maxLength="30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="userColor" className={style.label}>
            Color
            <input
              type="color"
              className={style.inputColor}
              id="userColor"
              name="userColor"
              value={userColor}
              onChange={(e) => setUserColor(e.target.value)}
            />
          </label>
        </div>
        <input
          type="submit"
          value="Create a session"
          className={style.button}
        />
      </form>
    </>
  );
};

export default Login;
