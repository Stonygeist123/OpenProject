import React, { useState, useEffect } from "react";
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

  const [session, setSession] = useState<UserSession | null>(null);
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
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

    const data = (await fetchJson(`/api/user/login`, {
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
      const { allowed, found } = data;
      if (!allowed) {
        setInvalidLogin(true);
      } else if (!found) {
        setInvalidLogin(true);
      } else if (allowed) {
        mutateUser(data.user as UserSession, false);
        await router.push("/");
      }

      setDisableControls(false);
    } catch (e) {
      if (e instanceof FetchError) console.log(e.data.message);
      else console.error("An unexpected error happened:", e);
    }
  };

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/get_session").then(data => setSession(data.user));
  }, [session]);

  const logOut = async () => {
    fetchJson("/api/user/logout");
    await router.push("/");
  };

  return session === null ? (
    <>
      <h1 className={styles["heading"]}>Login</h1>
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
          <button className={styles["login-button"]} onClick={handleOnClick} disabled={disableControls || !validation.name || !validation.password}>
            Login
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>You are already logged in</h1>
      <button className={styles["logout-button"]} onClick={logOut}>
        Logout?
      </button>
    </>
  );
};

export default LoginPage;
