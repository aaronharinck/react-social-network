import { decorate, observable, action } from "mobx";
import { v4 } from "uuid";

class PostModel {
  constructor({
    content,
    user,
    userColor,
    tags = false,
    picture = false,
    id = v4(),
  }) {
    if (!user) {
      throw new Error("A post must have a user");
    }
    if (!content || content === "") {
      throw new Error("A post must have some content");
    }
    this.id = id;
    this.content = content;
    console.log("pm user:", user);
    this.user = user;
    this.user.name = this._sanitizeUsername(user.name);
    this.tags = tags;
    this.picture = picture;
    this.userColor = userColor;
    this.comments = [];
    this.user.linkPost(this);
  }

  _sanitizeUsername(user) {
    // kan later msn nog in een sanitize() func omgezet worden voor herbruikbaarheid
    console.log("user: " + user);
    const sanitizedUser = user.substring(0, 30).match(/[A-Z-a-z-0-9]/g); // trim tot max 30 karakters en haal alleen de toegestane eruit bv ['u','s','r','1']
    return sanitizedUser.join("").toLowerCase(); // combine de karakters naar 1 woord bv 'usr1'
  }

  linkUser(user) {
    user.linkPost(this);
  }

  linkComment(comment) {
    !this.comments.includes(comment) && this.comments.push(comment);
  }

  // pushPost(post) {
  //   !this.posts.includes(post) && this.posts.push(post);
  // }
}

decorate(PostModel, {
  _sanitizeUsername: action,
  linkUser: action,
  linkComment: action,
  comments: observable,
  // unread: observable,
  // setUnread: action
});

export default PostModel;
