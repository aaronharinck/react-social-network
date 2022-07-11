import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/UseStores";
import style from "./GetStartedButton.module.css";

const GetStartedButton = () => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <>
      {uiStore.currentUser === undefined && (
        <a className={style.gsButton} href="/#loginForm">
          Get started
        </a>
      )}
    </>
  ));
};

export default GetStartedButton;
