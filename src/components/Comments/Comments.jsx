import React from "react";
import { useObserver } from "mobx-react-lite";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import { useStores } from "../../hooks/UseStores";
import style from "./Comments.module.css";

const Comments = ({ postId }) => {
  const { dataStore, uiStore } = useStores();
  const post = dataStore.getPostById(postId);
  if (post !== undefined) {
    console.log(post);
    // console.log("comment post:" + post.comments[0].content);
    // console.log("comment post:" + post.comments[1].content);
  }
  return useObserver(() => (
    <>
      <ul>
        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            userName={comment.user.name}
            userColor={comment.user.userColor}
            content={comment.content}
          />
        ))}
      </ul>
      {uiStore.currentUser === undefined ? (
        <a href="/#loginForm" className="removeDecoration">
          <p className={style.infoText}>Create a session before commenting</p>
        </a>
      ) : (
        <CommentForm postId={postId} />
      )}
    </>
  ));
};

export default Comments;
