import React, { useState } from "react";
import { useAppContext } from "../context/LoginContext";
import styles from "../styles/pages/login.module.scss";
import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [disableControls, setDisableControls] = useState(false);
  const [focussed, setFocussed] = useState(false);
  const [validation, setValidation] = useState({
    name: false,
    password: false,
  });

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const ctx = useAppContext();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const router = useRouter();

  const inputValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iElement = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch (iElement) {
      case "username":
        setValidation(v => ({
          ...v,
          name: value !== "" && !invalidLogin,
        }));
        break;
      case "password":
        setValidation(v => ({
          ...v,
          password: value !== "" && !invalidLogin,
        }));
        break;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "username") setName(value);
    else if (name === "password") setPassword(value);
    inputValidator(e);
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (name.trim() === "") return console.log("No username provided.");
    if (password.trim() === "") return console.log("No password provided.");

    setDisableControls(true);
    e.preventDefault();
    console.log("login attempted");

    const data = (await fetchJson(`/api/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: name,
        password,
      }),
      mode: "cors",
    })) as {
      message: string;
      allowed: boolean;
      found: boolean;
      user: UserSession;
    };

    try {
      const { user, allowed, found } = data;
      if (!allowed) {
        setInvalidLogin(true);
        console.log("Login prohibited.", user);
      } else if (!found) {
        setInvalidLogin(true);
        console.log("User doesn't exist.");
      } else if (allowed) {
        if (ctx === null) return;
        ctx!.onLogin(name);
        console.log("ctx.token" + ctx.token);
        console.log("User logged in:\n\t", user);
        mutateUser(data.user as UserSession, false);
        await router.push("/home");
      }

      setDisableControls(false);
      if (allowed) {
      }
    } catch (e) {
      if (e instanceof FetchError) console.log(e.data.message);
      else console.error("An unexpected error happened:", e);
    }
  };

  if (ctx !== null && ctx!.token !== "")
    return (
      <>
        <h1>You are already logged in</h1>
        <button
          className={styles["logout-button"]}
          onClick={ctx!.onLogout}
        >
          Logout?
        </button>
      </>
    );
  else
    return (
      <>
        <h1 className={styles["heading"]}> Login </h1>
        <div className={styles["login-entries"]}>
          <div className={styles["login-entry"]}>
            <label className={styles["login-label"]}> Username </label>
            <input
              className={`${styles["login-input"]} ${validation.name || !focussed ? null : styles["invalid-input"]}`}
              onChange={handleChange}
              onClick={() => setFocussed(v => !v)}
              name="username"
              value={name}
              disabled={disableControls}
            ></input>
          </div>
          <div className={styles["login-entry"]}>
            <label className={styles["login-label"]}> Password </label>
            <input
              className={`${styles["login-input"]} ${validation.password || !focussed ? null : styles["invalid-input"]}`}
              onChange={handleChange}
              onClick={() => setFocussed(v => !v)}
              name="password"
              type="password"
              value={password}
              disabled={disableControls}
            ></input>
          </div>
          <div className={styles["button-div"]}>
            <h3 className={`${styles["invalid-msg"]} ${invalidLogin ? null : styles["hidden"]}`}>Invalid username or password</h3>
            <button
              className={styles["login-button"]}
              onClick={handleOnClick}
              disabled={disableControls || !validation.name || !validation.password}
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
};

export default LoginPage;
