import { decorate, observable, action, configure } from "mobx";

configure({ enforceActions: "observed" });

class UiStore {
  constructor() {
    this.currentUser = undefined;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    console.log("currentUser", user);
  }
}

decorate(UiStore, {
  currentUser: observable,
  setCurrentUser: action
});

export default UiStore;
