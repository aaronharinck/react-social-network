import React from "react";
import { useObserver } from "mobx-react-lite";
import PostsList from "../PostsList/PostsList";
import PostForm from "../PostForm/PostForm";

const Posts = () => {
  return useObserver(() => (
    <>
      <PostForm />
      <PostsList />
    </>
  ));
};

export default Posts;
