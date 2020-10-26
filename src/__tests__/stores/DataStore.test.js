import DataStore from "../../stores/DataStore";
import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";
import CommentModel from "../../models/CommentModel";

test("Create a new empty store", function() {
  const dataStore = new DataStore();
  expect(dataStore).not.toBeUndefined();
  expect(dataStore.posts.length).toBe(0);
});

// test("Seed a store with posts", function() {
//   const dataStore = new DataStore();
//   dataStore.seed([
//     new PostModel({
//       content: "hey",
//       user: "user1",
//       userColor: "#4A90E2",
//       tags: ["funny", "cats"]
//     })
//   ]);
//   expect(store.posts.length).toBe(1);
// });

function getSeedData(dataStore) {
  const user1 = new UserModel({
    id: "user1id",
    name: "user&1",
    store: dataStore,
    userColor: "#F5A623"
  });
  const post1 = new PostModel({
    id: "post1id",
    content: "content post 1",
    tags: ["testtag1", "testtag2", "testtag3"],
    user: user1,
    store: dataStore
  });
  const comment1 = new CommentModel({
    id: "comment1id",
    content: "comment1 content!",
    post: post1,
    user: user1,
    store: dataStore
  });
  const comment2 = new CommentModel({
    id: "comment2id",
    content: "comment2 content!",
    post: post1,
    user: user1,
    store: dataStore
  });

  return [post1];
}

test("Seed data", function() {
  const dataStore = new DataStore();
  dataStore.seed(getSeedData(dataStore));
});

test("Get user by name", () => {
  const dataStore = new DataStore();
  const user = new UserModel({ name: "testuser", store: dataStore });
  const userName = user.name;
  expect(dataStore.getUserByName(userName).name).toBe("testuser");
  expect(dataStore.getUserByName(userName).userColor).toBe("#D0021B");
});

test("Get a post by the id", () => {
  const dataStore = new DataStore();
  const post = new PostModel({
    name: "testpost",
    user: new UserModel({ name: "testuser", store: dataStore }),
    store: dataStore,
    content: "testContent",
    id: "postTestId"
  });
  dataStore.addPost(post);
  const id = post.id;
  expect(dataStore.getPostById(id)).toBe(post);
});

test("add a post (no New PostModel)", () => {
  const dataStore = new DataStore();
  dataStore.addPost({
    content: "geen username sanitize / krijg undefined pic terug",
    user: "user1@&",
    userColor: "#4A90E2",
    tags: ["funny", "cats"]
  });
  //store.addPost('hey', 'user1', '#4A90E2', ['funny', 'cats']);
  expect(dataStore.posts.length).toBe(1);
  expect(dataStore.posts[0].content).toBe(
    "geen username sanitize / krijg undefined pic terug"
  );
  expect(dataStore.posts[0].user).toBe("user1@&");
  expect(dataStore.posts[0].userColor).toBe("#4A90E2");
  expect(dataStore.posts[0].tags[0]).toBe("funny");
  expect(dataStore.posts[0].picture).toBe(undefined);
});

test("add a post with New PostModel / UserModel", () => {
  const dataStore = new DataStore();
  const user = new UserModel({
    id: "user22",
    name: "user2!&2",
    store: dataStore,
    userColor: "#4A90E2"
  });
  dataStore.addPost(
    new PostModel({
      content: "username sanitize / krijg false pic terug",
      user: user,
      tags: ["funny", "cats"]
    })
  );
  expect(dataStore.posts.length).toBe(1);
  expect(dataStore.posts[0].content).toBe(
    "username sanitize / krijg false pic terug"
  );
  expect(dataStore.posts[0].user.name).toBe("user22");
  expect(dataStore.posts[0].user.userColor).toBe("#4A90E2");
  expect(dataStore.posts[0].tags[0]).toBe("funny");
  expect(dataStore.posts[0].picture).toBe(false);
});
