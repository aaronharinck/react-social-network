import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";
import CommentModel from "../../models/CommentModel";
import DataStore from "../../stores/DataStore";

const dataStore = new DataStore();

test("Create a post with all params", () => {
  const user = new UserModel({
    id: "userid1",
    name: "user4&@",
    store: dataStore,
    userColor: "#4A90E2"
  });
  const post = new PostModel({
    content: "hey",
    user: user,
    userColor: "#4A90E2",
    tags: ["funny", "cats"]
  });
  expect(post.content).toBe("hey");
  expect(post.user.name).toBe("user4");
  expect(post.user.userColor).toBe("#4A90E2");
  expect(post.tags).toStrictEqual(["funny", "cats"]);
});

test("Create a post with no optional params", () => {
  const user5 = new UserModel({
    name: "user5&@",
    store: dataStore,
    userColor: "#4A90E2"
  });
  const post = new PostModel({
    content: '"Ik ben blij", vertelde hij!',
    user: user5
  });
  expect(post.content).toBe('"Ik ben blij", vertelde hij!');
  expect(post.user.name).toBe("user5");
  expect(post.user.id).not.toBe(undefined);
  expect(post.user.following).toStrictEqual([]);
  expect(post.user.following.length).toBe(0);
  expect(post.comments).toStrictEqual([]);
  expect(post.user.userColor).toBe("#4A90E2");
  expect(post.tags).toStrictEqual(false);
  expect(post.picture).toBe(false);
});

test("Create a post with a username that is not allowed", () => {
  const userWrong = new UserModel({
    name: `uSeR5&")$ù=p4tRç&é"(§è!çà`,
    store: dataStore,
    userColor: "#4A90E2"
  });
  const post = new PostModel({
    content: "Ik ben een scriptkiddie!",
    user: userWrong
  });
  expect(post.content).toBe("Ik ben een scriptkiddie!");
  expect(post.user.name).toBe("user5p4tr");
  expect(post.user.userColor).toBe("#4A90E2");
  expect(post.tags).toStrictEqual(false);
  expect(post.picture).toBe(false);
});

test("post must have a user", () => {
  expect(() => new PostModel({ content: "test" })).toThrow(
    "A post must have a user"
  );
});

test("Post must have some conent", () => {
  const userOnly = new UserModel({
    name: "userOnly",
    store: dataStore
  });
  expect(() => new PostModel({ user: userOnly })).toThrow(
    "A post must have some content"
  );
});

// test("Link a user", () => {
//   const userLink = new UserModel({
//     name: "userLink",
//     store: dataStore
//   });
//   const postLink = new PostModel({
//     content: "Link test",
//     userColor: "#4A90E2"
//   });
//   postLink.linkUser(userLink);
// });
