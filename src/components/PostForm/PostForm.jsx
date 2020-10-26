import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import PostModel from "../../models/PostModel";
// import PropTypes from "prop-types";
import { useStores } from "../../hooks/UseStores";

const PostForm = () => {
  const { dataStore, uiStore } = useStores();
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState(false);

  const handleFormSubmit = e => {
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
          picture: false
        })
      );
      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <section className="form">
        <h3 className="hidden">Add post</h3>
        <label htmlFor="content"></label>
        <input
          className="form__input"
          id="content"
          name="content"
          placeholder="Type your post"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </section>
    </form>
  ));
};

// geen props meer nodig dankzij useStores()
// PostForm.propTypes = {
//   dataStore: PropTypes.object.isRequired
// };

export default PostForm;
