import React from "react";
import Post from "../Post/Post";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/UseStores";
import { useParams } from "react-router-dom";
import BackLink from "../BackLink";
import style from "./PostList.module.css";

const PostsList = () => {
  const { dataStore } = useStores();
  const { id } = useParams();
  let specificPost;

  // let posts = dataStore.posts;

  if (id) {
    console.log(dataStore.getPostById(id));
    specificPost = dataStore.getPostById(id);
    console.log(specificPost);
    console.log(specificPost);
    //posts = dataStore.posts.id;
  }

  const isSpecificPost = specificPost ? true : false;

  return useObserver(() => (
    <section className={style.posts}>
      <h3 className="hidden">Post {id ? `${id}` : `no specific id found`}</h3>
      {specificPost ? (
        <>
          <div className={style.userHeader}>
            <BackLink />
            <h2 className={style.pageTitle}>Specific post</h2>
          </div>
          <Post
            key={specificPost.id}
            id={specificPost.id}
            tags={specificPost.tags}
            user={specificPost.user}
            userName={specificPost.user.name}
            userColor={specificPost.user.userColor}
            content={specificPost.content}
            isSpecificPost={isSpecificPost}
          />
        </>
      ) : (
        <ul className={style.posts__list}>
          {[...dataStore.posts].reverse().map((post) => (
            <Post
              key={post.id}
              id={post.id}
              tags={post.tags}
              user={post.user}
              userName={post.user.name}
              userColor={post.user.userColor}
              content={post.content}
              isSpecificPost={isSpecificPost}
            />
          ))}
        </ul>
      )}
    </section>
  ));
};

export default PostsList;
