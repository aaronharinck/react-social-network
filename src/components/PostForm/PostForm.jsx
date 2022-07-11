import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import PostModel from "../../models/PostModel";
// import PropTypes from "prop-types";
import { useStores } from "../../hooks/UseStores";
import style from "./PostForm.module.css";

const PostForm = () => {
  const { dataStore, uiStore } = useStores();
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (content !== "") {
      dataStore.addPost(
        new PostModel({
          content,
          user: uiStore.currentUser,
          // userColor: uiStore.userColor,
          // user: "newUser1&@23",
          // userColor: "#D0021B",
          // tags,
          tags: ["miscellaneous", "new"],
          picture: false,
        })
      );
      setContent("");
    }
  };

  return useObserver(() => (
    <>
      <div className={style.form}>
        {uiStore.currentUser ? (
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="content" className={style.subtitle}>
              Add a post
            </label>
            <input
              className={style.form__input}
              id="content"
              name="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </form>
        ) : (
          <a href="/#loginForm" className="removeDecoration">
            <p className={style.subtitle}>Add a post</p>
            <p className={`${style.form__input} ${style.disabled}`}>
              You can only post after you have created a session.
            </p>
          </a>
        )}
      </div>
    </>
  ));
};

// geen props meer nodig dankzij useStores()
// PostForm.propTypes = {
//   dataStore: PropTypes.object.isRequired
// };

export default PostForm;
