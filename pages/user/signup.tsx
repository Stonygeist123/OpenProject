import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/signup.module.scss";
import useUser from "../../lib/useUser";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [disableControls, setDisableControls] = useState<boolean>(false);
  const [focussed, setFocussed] = useState<boolean>(false);
  const [validation, setValidation] = useState({
    name: false,
    password: false,
    confirmedPassword: false,
  });

  const [session, setSession] = useState<UserSession | null>(null);
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [invalidsignup, setInvalidsignup] = useState(false);
  const router = useRouter();

  const inputValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iElement = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch (iElement) {
      case "username": {
        setValidation(v => ({
          ...v,
          name: value !== "",
        }));
        break;
      }
      case "password": {
        setValidation(v => ({
          ...v,
          password: value !== "",
        }));
        break;
      }
      case "confirmedPassword": {
        setValidation(v => ({
          ...v,
          confirmedPassword: value === password,
        }));
        break;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === "username") setName(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmedPassword") setConfirmedPassword(value);
    inputValidator(e);
  };

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (name.trim() === "") return console.log("No username provided.");
    if (password.trim() === "") return console.log("No password provided.");
    if (confirmedPassword.trim() === "") return console.log("Password confirmation is required.");

    setDisableControls(true);
    e.preventDefault();

    const data = (await fetchJson(`/api/user/account/signup`, {
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
      if (found) {
        setInvalidsignup(true);
      } else if (!allowed) {
        setInvalidsignup(true);
      } else {
        mutateUser(user, false);
        await router.push("/home");
      }

      setDisableControls(false);
    } catch (e) {
      if (e instanceof FetchError) console.log(e.data.message);
      else console.error("An unexpected error happened:\n\t", e);
    }
  };

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/account/get_session").then(data => setSession(data.user));
  }, [session]);

  const logOut = async () => {
    fetchJson("/api/user/account/logout");
    await router.push("/");
  };

  return session === null ? (
    <>
      <h1 className={styles["heading"]}> Signup </h1>
      <div className={styles["signup-entries"]}>
        <div className={styles["signup-entry"]}>
          <label className={styles["signup-label"]}> Username </label>
          <input
            className={`${styles["signup-input"]} ${validation.name || !focussed ? null : styles["invalid-input"]}`}
            onChange={handleChange}
            onClick={() => setFocussed(v => !v)}
            name="username"
            value={name}
            disabled={disableControls}
          ></input>
        </div>
        <div className={styles["signup-entry"]}>
          <label className={styles["signup-label"]}> Password </label>
          <input
            className={`${styles["signup-input"]} ${validation.password || !focussed ? null : styles["invalid-input"]}`}
            onChange={handleChange}
            onClick={() => setFocussed(v => !v)}
            name="password"
            type="password"
            value={password}
            disabled={disableControls}
          ></input>
        </div>
        <div className={styles["signup-entry"]}>
          <label className={styles["signup-label"]}> Confirm Password </label>
          <input
            className={`${styles["signup-input"]} ${validation.password || !focussed ? null : styles["invalid-input"]}`}
            onChange={handleChange}
            onClick={() => setFocussed(v => !v)}
            name="confirmedPassword"
            type="password"
            value={confirmedPassword}
            disabled={disableControls}
          ></input>
        </div>
        <div className={styles["button-div"]}>
          <h3 className={`${styles["invalid-msg"]} ${invalidsignup ? null : styles["hidden"]}`}>Invalid username or password</h3>
          <button
            className={styles["signup-button"]}
            onClick={handleOnClick}
            disabled={disableControls || !validation.name || !validation.confirmedPassword || !validation.password}
          >
            Signup
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

export default SignupPage;
