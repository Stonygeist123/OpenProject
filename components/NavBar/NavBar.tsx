import styles from "../../styles/modules/NavBar.module.scss";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <>
      <nav className={styles["nav"]}>
        <div className={styles["nav-flex-container"]}>
          <Link href="/">
            <div className={styles["logo-container"]}>
              <h1 className={styles["logo"]}>Logo</h1>
            </div>
          </Link>

          <div className={styles["search-back-div"]}>
            <SearchBar />
          </div>
          <div style={{ display: "inline-block" }}>
            <Link href="/login"> login</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
