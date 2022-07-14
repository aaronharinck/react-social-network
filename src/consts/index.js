const ROUTES = {
  home: ["/", "/index.html"],
  user: { path: "/user/:name", to: "/" },
  users: "/users",
  post: { path: "/posts/:id", to: "/" },
  groups: "/groups",
  add: "/add",
};

export { ROUTES };
