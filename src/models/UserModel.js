import { decorate, observable, action, configure } from "mobx";
import { v4 } from "uuid";

configure({ enforceActions: "observed" });

class UserModel {
  constructor({ id = v4(), name, userColor = "#D0021B", store }) {
    this.name = this._sanitizeUsername(name);
    // pick a randomcolor if the user did not pick a color
    if (
      userColor === "#ffffff" ||
      userColor === undefined ||
      userColor === ""
    ) {
      this.userColor = this._randomColor();
    } else {
      this.userColor = userColor;
    }
    this.id = id;
    this.posts = [];
    this.followers = [];
    this.following = [];
    this.comments = [];
    if (!store) {
      throw new Error("user must have a store");
    }
    this.store = store;
    this.store.addUser(this);
  }

  _sanitizeUsername(user) {
    // kan later msn nog in een sanitize() func omgezet worden voor herbruikbaarheid
    let sanitizedUser = user.match(/[A-Z-a-z-0-9]/g); // haal alleen de toegestane karakters eruit bv ['u','s','r','1']
    if (sanitizedUser === null) {
      //generate random username when there are no valid characters
      return (sanitizedUser = `anon${v4()}`).toLowerCase();
    } else return sanitizedUser.join("").toLowerCase(); // combine de karakters naar 1 woord bv 'usr1'
  }

  linkComment(comment) {
    !this.comments.includes(comment) && this.comments.push(comment);
  }

  linkPost(post) {
    !this.posts.includes(post) && this.posts.push(post);
    //!this.post.user.includes(this) && post.linkUser(this);
  }

  _randomColor() {
    // get a randomcolor when no color was selected
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  followUser(user) {
    let runned = false;
    if (this.following.includes(user)) {
      const index = this.following.indexOf(user);
      console.log("index:" + index);
      if (index > -1) {
        console.log(this.following);
        this.following.splice(index, 1);
        console.log(this.following);
        runned = true;
      }
    }

    !this.following.includes(user) &&
      runned === false && // prevent run if already runned
      this.id !== user.id && // prevent following yourself
      this.following.push(user);
  }

  isFollowing(user) {
    if (this.following.includes(user)) {
      return true;
    } else {
      return false;
    }
  }
}

decorate(UserModel, {
  _sanitizeUsername: action,
  linkComment: action,
  linkPost: action,
  _randomColor: action,
  posts: observable,
  following: observable,
  followUser: action,
  isFollowing: action,
  comments: observable,
});

export default UserModel;
