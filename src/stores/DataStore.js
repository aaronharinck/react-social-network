import { decorate, observable, action, configure } from "mobx";

configure({ enforceActions: "observed" });
class Store {
  constructor() {
    this.posts = [];
    this.users = [];
    //this.counter = 0;
  }

  seed(data) {
    // this.posts = data;
    this.posts.push(...data);
    console.log(...data);
  }

  addPost(post) {
    this.posts.push(post);
    console.log(this.posts, post);
  }

  addUser(user) {
    this.users.push(user);
  }

  getPostById(postId) {
    // key word nu nog random gegenereerd, moeilijk om bij te houden
    return this.posts.find((post) => post.id === postId);
  }

  getUserByName(userName) {
    return this.users.find((user) => user.name === userName);
  }
}

decorate(Store, {
  posts: observable,
  addPost: action,
  addUser: action,
  getPostById: action,
  seed: action,
});

export default Store;
