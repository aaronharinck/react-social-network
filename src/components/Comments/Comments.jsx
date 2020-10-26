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
      {uiStore.currentUser === undefined ? (
        <p className={style.infoText}>Login to comment</p>
      ) : (
        <CommentForm postId={postId} />
      )}
      <ul className="">
        {post.comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            userName={comment.user.name}
            userColor={comment.user.userColor}
            content={comment.content}
          />
        ))}
      </ul>
    </>
  ));
};

export default Comments;
