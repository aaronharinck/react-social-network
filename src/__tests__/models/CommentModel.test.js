import CommentModel from "../../models/CommentModel";
import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";
import DataStore from "../../stores/DataStore";

const dataStore = new DataStore();

test("comment must have a user", () => {
  expect(() => new CommentModel({ content: "test" })).toThrow(
    "A comment must have a user"
  );
});

test("comment must belong to a post", () => {
  const user = new UserModel({
    id: "userid1",
    name: "user4&@",
    store: dataStore,
    userColor: "#4A90E2"
  });
  expect(() => new CommentModel({ content: "test", user })).toThrow(
    "A comment must belong to a post"
  );
});

test("comment must have some content", () => {
  const user2 = new UserModel({
    id: "userid2",
    name: "user2&@",
    store: dataStore,
    userColor: "#4A90E2"
  });
  const post1 = new PostModel({
    content: "post1 content",
    user: user2
  });
  expect(() => new CommentModel({ user: user2, post: post1 })).toThrow(
    "A comment must have some content"
  );
});
