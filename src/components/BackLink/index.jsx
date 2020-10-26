import React from "react";
import style from "./BackLink.module.css";
import { useHistory } from "react-router-dom";

const BackLink = () => {
  const history = useHistory();
  return (
    <button
      className={style.back}
      onClick={() => {
        history.goBack();
      }}
    >
      &larr; back
    </button>
  );
};

export default BackLink;
