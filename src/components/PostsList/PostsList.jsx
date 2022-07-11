import React from "react";
import Post from "../Post/Post";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/UseStores";
import { useParams, Link } from "react-router-dom";
import BackLink from "../BackLink";
import style from "./PostsList.module.css";

const PostsList = () => {
  const { dataStore } = useStores();
  const { id } = useParams();
  let specificPost;

  // let posts = dataStore.posts;

  if (id) {
    console.log(dataStore.getPostById(id));
    specificPost = dataStore.getPostById(id);
    console.log(specificPost);
    console.log(`ur_lid: ${id}`);
    //posts = dataStore.posts.id;
  }

  const isSpecificPost = specificPost ? true : false;

  return useObserver(() => (
    <section className={style.posts}>
      {specificPost ? (
        <>
          <div className={style.userHeader}>
            <BackLink />
          </div>
          <h2 className={style.subtitle}>
            {id ? `Specific post` : `no specific id found`}
          </h2>
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
        <>
          {id && (
            <p className={style.errorText}>
              Could not find post (with id: {id}){" "}
              <Link to="/">Return to homepage </Link>
            </p>
          )}
          <h2 className={style.subtitle}>Community posts</h2>
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
        </>
      )}
    </section>
  ));
};

export default PostsList;
