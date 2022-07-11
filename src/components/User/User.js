import React from "react";
import BackLink from "../BackLink";
import style from "./User.module.css";
import { useParams, Redirect } from "react-router-dom";
import { useStores } from "../../hooks/UseStores";
import Post from "../Post/Post";

const User = () => {
  const { dataStore } = useStores();
  const { name } = useParams();
  let specificUser;

  if (dataStore.getUserByName(name)) {
    specificUser = dataStore.getUserByName(name);
    //posts = dataStore.posts.id;
  }
  return (
    <>
      {specificUser ? (
        <div className={style.userContainer}>
          <div className={style.userHeader}>
            <BackLink />
            <h2 className={style.pageTitle}>User - {name}'s posts</h2>
          </div>
          {specificUser.following.length > 0 && (
            <div className={style.userFollowers}>
              <p className={style.subTitle}>{name} is following:</p>
              <ul className={style.followItems}>
                {specificUser.following.map((follower) => (
                  <li
                    key={follower.id}
                    id={follower.id}
                    className={style.followItem}
                  >
                    {follower.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={style.userPost}>
            {specificUser.posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                tags={post.tags}
                user={post.user}
                userName={post.user.name}
                userColor={post.user.userColor}
                content={post.content}
              />
            ))}
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default User;
