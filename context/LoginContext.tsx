import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextInterface {
  token: string;
  onLogin: (username: string) => void;
  onLogout: () => void;
  onStart: () => void;
}

// const AppContext = createContext({
//     user: {
//         id: "",
//         isLoggedIn: false,
//     },
//     onLogin: (username: string) => { },
//     onLogout: () => { },
//     onStart: () => { }
// });

const AppContext = createContext<AppContextInterface | null>(null);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const AuthContextProvider = (props: Props) => {
  useEffect(() => {
    console.log("use effect from auth context");
    getLocalData();
  }, []);

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (token !== "") {
      window.localStorage.setItem("token", token);
      console.log("local storage updated");
    } else {
      window.localStorage.removeItem("token");
      console.log("user not logged in");
    }
  }, [token]);

  function loginHandler(token: string) {
    setToken(token);
    window.localStorage.setItem("token", token);
  }

  function logoutHandler() {
    window.localStorage.removeItem("token");
    setToken("");
  }

  function getLocalData() {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
    }
  }

  const myAppContext: AppContextInterface = {
    token: token as string,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onStart: getLocalData,
  };

  return (
    <AppContext.Provider value={myAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AuthContextProvider;
