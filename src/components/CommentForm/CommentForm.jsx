import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import CommentModel from "../../models/CommentModel";
import PropTypes from "prop-types";
import { useStores } from "../../hooks/UseStores";
import style from "./CommentForm.module.css";

const CommentForm = ({ postId }) => {
  const { dataStore, uiStore } = useStores();
  const [content, setContent] = useState("");

  console.log("postId", postId);
  console.log(uiStore.currentUser);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (content !== "") {
      const post = dataStore.getPostById(postId);
      new CommentModel({
        content,
        user: uiStore.currentUser,
        post: post,
        // userColor: uiStore.userColor,
        // user: "newUser1&@23",
        // userColor: "#D0021B",
        // tags,
      });
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <div className={style.commentForm}>
        <label htmlFor="content"></label>
        <input
          className={style.formInput}
          id="content"
          name="content"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </div>
    </form>
  ));
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentForm;
