import { decorate, action } from "mobx";
import { v4 } from "uuid";

class CommentModel {
  constructor({ user, post, content }) {
    if (!user) {
      throw new Error("A comment must have a user");
    }
    if (!post) {
      throw new Error("A comment must belong to a post");
    }
    if (!content || content === "") {
      throw new Error("A comment must have some content");
    }
    this.id = v4();
    this.user = user;
    this.user.name = this._sanitizeUsername(user.name);
    this.post = post;
    this.content = content;
    this.post.linkComment(this);
    this.user.linkComment(this);
  }

  _sanitizeUsername(user) {
    // kan later msn nog in een sanitize() func omgezet worden voor herbruikbaarheid
    const sanitizedUser = user.match(/[A-Z-a-z-0-9]/g); // haal alleen de toegestane karakters eruit bv ['u','s','r','1']
    return sanitizedUser.join("").toLowerCase(); // combine de karakters naar 1 woord bv 'usr1'
  }
}

decorate(CommentModel, {
  _sanitizeUsername: action,
});

export default CommentModel;
