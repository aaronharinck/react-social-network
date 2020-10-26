import { createContext } from "react";
import DataStore from "../stores/DataStore";
import UiStore from "../stores/UiStore";
import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";
import CommentModel from "../models/CommentModel";

const stores = {
  dataStore: new DataStore(),
  uiStore: new UiStore(),
};

// add example users
const u1 = new UserModel({
  id: "userseed-9969c1fc-0f51-3d3f-b687-d0835a081078",
  name: "noobmaster1&@23",
  store: stores.dataStore,
  userColor: "#F5A623",
});

const u2 = new UserModel({
  id: "userseed-eb19c00b-837e-37d3-8ea8-9cac99736e42",
  name: "f2$&dsfsdfds",
  store: stores.dataStore,
  userColor: "#4A90E2",
});

// add example posts with user ref
const p1 = new PostModel({
  id: "postseed-a74ade11-a56b-44e5-84ba-5836a7724731",
  content: "Hey",
  tags: ["funny", "food"],
  user: u1,
});

const p2 = new PostModel({
  id: "postseed-e83e0520-3c5f-49a4-aed1-89a1e866f8a6",
  content: "Hallokes",
  tags: ["funny", "food"],
  user: u2,
});

const c1 = new CommentModel({
  id: "commentseed-a74ade11-a56b-44e5-84ba-5836a7724731",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis ipsum vitae leo dictum, eget vehicula nisi imperdiet. Ah such a classic!",
  post: p1,
  user: u2,
});

const c2 = new CommentModel({
  id: "commentseed-e83e0520-3c5f-49a4-aed1-89a1e866f8a6",
  content: "Whatsupp?",
  post: p1,
  user: u1,
});

// seed some posts
stores.dataStore.seed([p1, p2]);

// Extra example posts (old)

// stores.dataStore.addPost(
//   new PostModel({
//     content: "Joow",
//     user: "1",
//     userColor: "#4A90E2",
//     tags: ["meme", "death"]
//   })
// );

// stores.dataStore.addPost(
//   new PostModel({
//     content: "Hoe is het?",
//     user: "2",
//     userColor: "#4A90E2",
//     tags: ["education", "js"]
//   })
// );

// stores.dataStore.addPost(
//   new PostModel({
//     content: "Lang niet gezien",
//     user: "2",
//     userColor: "#4A90E2",
//     tags: ["puzzle"]
//   })
// );

stores.uiStore.setCurrentUser();

window.dataStore = stores.dataStore;
window.uiStore = stores.uiStore;

export const storesContext = createContext(stores);
