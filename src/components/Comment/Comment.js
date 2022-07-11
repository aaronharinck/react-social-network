import React from "react";
import { useObserver } from "mobx-react-lite";
import PropTypes from "prop-types";
import style from "./Comment.module.css";
import { Link } from "react-router-dom";

const Comment = ({ id, userName, userColor, content }) => {
  // const { name } = useParams();
  let displayAuthor;

  /*
  if (name === userName) {
    displayAuthor = (
      <div className={style.authorContainer}>
        <span
          className={style.colorBlock}
          style={{
            width: "1rem",
            height: "1rem",
            background: userColor,
            borderRadius: "0.3rem",
          }}
        ></span>
        <p className={style.author}>{userName}</p>
      </div>
    );
  } else { 
  */
  displayAuthor = (
    <Link to={`/user/${userName}`} className={style.userLink}>
      <div className={style.authorContainer}>
        <span
          className={style.colorBlock}
          style={{
            width: "1rem",
            height: "1rem",
            background: userColor,
            borderRadius: "0.3rem",
          }}
        ></span>
        <p className={style.author}>{userName}</p>
      </div>
    </Link>
  );

  return useObserver(() => (
    <li className={style.comment}>
      {displayAuthor}
      <p className={style.commentContent}>{content}</p>
    </li>
  ));
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Comment;
