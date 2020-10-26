import UiStore from "../../stores/UiStore";
import DataStore from "../../stores/DataStore";
import UserModel from "../../models/UserModel";

test("Create a new empty uiStore", function() {
  const uiStore = new UiStore();
  expect(uiStore).not.toBeUndefined();
  expect(this.currentUser).toBeUndefined();
});

test("Set a currentUser", () => {
  const uiStore = new UiStore();
  const dataStore = new DataStore();
  const user = new UserModel({
    name: "testuser",
    store: dataStore,
    userColor: "#4A90E2"
  });
  uiStore.setCurrentUser(user);
  expect(uiStore.currentUser).toBe(user);
});
