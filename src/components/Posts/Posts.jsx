import React from "react";
import { useObserver } from "mobx-react-lite";
import PostsList from "../PostsList/PostsList";
import PostForm from "../PostForm/PostForm";
import { useStores } from "../../hooks/UseStores";
import Login from "../../components/Login/Login";

const Posts = () => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <>
      {uiStore.currentUser === undefined ? (
        <Login />
      ) : (
        <div className="addPost">
          <PostForm />
        </div>
      )}
      <PostsList />
    </>
  ));
};

export default Posts;
