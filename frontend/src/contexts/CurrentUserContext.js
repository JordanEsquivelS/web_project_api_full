import { createContext } from "react";

const CurrentUserContext = createContext({
  user: null,
  setUser: () => {},
});

export default CurrentUserContext;
