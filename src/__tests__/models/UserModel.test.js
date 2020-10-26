import UserModel from "../../models/UserModel";
import PostModel from "../../models/PostModel";
import CommentModel from "../../models/CommentModel";
import DataStore from "../../stores/DataStore";

const dataStore = new DataStore();

test("Create a new user", () => {
  const user1 = new UserModel({
    id: "userid1",
    name: "user4&@",
    store: dataStore,
    userColor: "#4A90E2"
  });
  expect(dataStore.users[0].id).toBe("userid1");
  expect(dataStore.users[0].name).toBe("user4");
  expect(dataStore.users[0].userColor).toBe("#4A90E2");
  expect(dataStore.users[0].store).toBe(dataStore);
  expect(dataStore.users[0].followers).toStrictEqual([]);
  expect(dataStore.users[0].posts).toStrictEqual([]);
  expect(dataStore.users[0].comments).toStrictEqual([]);

  expect(dataStore.users.length).toBe(1);
});

test("User gets a standardColor when no color was specified", () => {
  const user2 = new UserModel({
    id: "userid2",
    name: "user2&@",
    store: dataStore
  });
  expect(dataStore.users[1].id).toBe("userid2");
  expect(dataStore.users[1].name).toBe("user2");
  expect(dataStore.users[1].userColor).toBe("#D0021B");
  expect(dataStore.users[1].store).toBe(dataStore);
  expect(dataStore.users[1].followers).toStrictEqual([]);
  expect(dataStore.users[1].posts).toStrictEqual([]);
  expect(dataStore.users[1].comments).toStrictEqual([]);
  expect(dataStore.users.length).toBe(2);
});

test("User gets a randomColor if they didn't pick one / have the same color as website background", () => {
  const user2 = new UserModel({
    id: "userid3",
    name: "user3&@",
    store: dataStore,
    userColor: "#ffffff"
  });
  expect(dataStore.users[2].id).toBe("userid3");
  expect(dataStore.users[2].name).toBe("user3");
  expect(dataStore.users[2].userColor).not.toBe(undefined);
  expect(dataStore.users[2].userColor.length).toBe(7);
  expect(dataStore.users[2].store).toBe(dataStore);
  expect(dataStore.users[2].followers).toStrictEqual([]);
  expect(dataStore.users[2].posts).toStrictEqual([]);
  expect(dataStore.users[2].comments).toStrictEqual([]);
  expect(dataStore.users.length).toBe(3);
});

test("User gets a randomColor if they didn't pick one / have the same color as website background", () => {
  const user2 = new UserModel({
    id: "userid4",
    name: "user4&@",
    store: dataStore,
    userColor: "#ffffff"
  });
  expect(dataStore.users[3].id).toBe("userid4");
  expect(dataStore.users[3].name).toBe("user4");
  expect(dataStore.users[3].userColor).not.toBe(undefined);
  expect(dataStore.users[3].userColor.length).toBe(7);
  expect(dataStore.users[3].userColor).toMatch(/#/);
  expect(dataStore.users[3].store).toBe(dataStore);
  expect(dataStore.users[3].followers).toStrictEqual([]);
  expect(dataStore.users[3].posts).toStrictEqual([]);
  expect(dataStore.users[3].comments).toStrictEqual([]);
  expect(dataStore.users.length).toBe(4);
});

test("User gets anon name when they only have invalid characters", () => {
  expect(
    () =>
      new UserModel({
        id: "userid5",
        name: "user5&@",
        userColor: "#ffffff"
      })
  ).toThrow("user must have a store");
});

test("user must have a store", () => {
  const user6 = new UserModel({
    id: "userid6",
    name: `"&""@@@@!!!""&@"`,
    store: dataStore,
    userColor: "#4A90E2"
  });
  expect(dataStore.users[4].id).toBe("userid6");
  expect(dataStore.users[4].name).not.toBe("");
  expect(dataStore.users[4].name).toMatch(/anon/);
});

test("a user can follow another user", () => {
  dataStore.users[0].followUser(dataStore.users[1]);
  expect(dataStore.users[0].following).toStrictEqual([dataStore.users[1]]);
});

test("a user can unfollow a followed user", () => {
  dataStore.users[0].followUser(dataStore.users[1]);
  expect(dataStore.users[0].following).toStrictEqual([]);
});

test("check if a user has followed someone", () => {
  dataStore.users[1].followUser(dataStore.users[2]);
  expect(dataStore.users[0].isFollowing(dataStore.users[1])).toBe(false);
  expect(dataStore.users[1].isFollowing(dataStore.users[2])).toBe(true);
});
