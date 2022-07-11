import React, { useState } from "react";
import Comments from "../Comments/Comments";
import { useObserver } from "mobx-react-lite";
import PropTypes from "prop-types";
import style from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
import { useStores } from "../../hooks/UseStores";

const Post = ({
  id,
  tags,
  user,
  userName,
  userColor,
  content,
  isSpecificPost,
}) => {
  const { uiStore } = useStores();
  const [, setFollowing] = useState(false);
  const { name } = useParams();
  const currentUser = uiStore.currentUser;
  const postId = id;
  let followButton;
  let displayAuthor;

  if (currentUser && currentUser !== user) {
    followButton = (
      <div className={style.followButtonContainer}>
        <button
          className={
            !currentUser.isFollowing(user)
              ? `${style.followButton} ${style.followButtonFalse}`
              : `${style.followButton} ${style.followButtonTrue}`
          }
          onClick={() =>
            setFollowing((currentState) => ({
              ...currentState,
              updateButton: currentUser.followUser(user),
            }))
          }
        >
          {!currentUser.isFollowing(user) ? "+ follow" : "- unfollow"}
        </button>
      </div>
    );
  } else {
    followButton = null;
  }

  // displayAuthor for a specific post
  if (name === userName) {
    displayAuthor = (
      <div className={style.post__author__title}>
        <span
          className={style.colorBlock}
          style={{
            width: "2rem",
            height: "2rem",
            background: userColor,
            borderRadius: "0.5rem",
          }}
        ></span>
        <p>{userName}</p>
      </div>
    );
  } else {
    // displayAuthor for regular posts
    displayAuthor = (
      <Link to={`/user/${userName}`} className={style.userLink}>
        <div className={style.post__author__title}>
          <span
            className={style.colorBlock}
            style={{
              width: "2rem",
              height: "2rem",
              background: userColor,
              borderRadius: "0.5rem",
            }}
          ></span>
          <p>{userName}</p>
        </div>
      </Link>
    );
  }

  console.log("currentUser " + currentUser);
  console.log(user);
  console.log("de postId is " + postId);

  return useObserver(() => (
    <li className={style.post}>
      <div className={style.post__author__container}>
        {displayAuthor}
        {followButton}
      </div>
      <div className={style.post__body}>
        <div className={style.post__tags}>
          {tags.map((tag) => (
            <div className={style.post__tag} key={tag}>
              {tag}
            </div>
          ))}
        </div>
        {isSpecificPost ? (
          <div className={style.post__content}>
            <p>{content}</p>
          </div>
        ) : (
          <Link to={`/posts/${id}`} className={style.post__link}>
            <div className={style.post__content}>
              <p>{content}</p>
            </div>
          </Link>
        )}
      </div>
      <Comments postId={postId} />
    </li>
  ));
};

Post.defaultProps = { isSpecificPost: false };

Post.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  userColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isSpecificPost: PropTypes.bool.isRequired,
};

export default Post;
