import React, { useEffect, useState } from "react";
// import { api } from "../../constants";
// import "./Searchbar.scss"
import styles from "../../styles/modules/SearchBar.module.scss"

enum ResultType {
    User = "User"
}

const SearchResults = ({
    results, query
}: {
    results: Record<string, ResultType>;
    query: string;
}) => (
    <div className={styles["result-container"]}>
        <ul className={styles["results"]}>
            {Object.entries(results).filter(x => x[0].includes(query)).map((x, i, arr) => (
                <li
                    className={styles["result"]}
                    id={i === arr.length - 1 ? "last-result" : ""}
                >
                    <button className={styles["result-button"]}>
                        <p className={styles["result-name"]}>{x[0]}</p>
                        <code className={styles["result-type"]}>{x[1]}</code>
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

const SearchBar = () => {
    const [query, setUserQuery] = useState("");
    const [resultsData, setResultsData] = useState<Record<string, ResultType>>({});

    // useEffect(() => {
    //     console.log("use effect called")
    //     fetch(api + "users")
    //         .then(x => x.json())
    //         .then((data: any[]) => {
    //             data.forEach(x => setResultsData(r => ({ ...r, [x.name]: ResultType.User })));
    //         });
    // }, [query]);

    return (
        <div className={styles["search-bar"]}>
            <div className={styles["search-container"]}>
                <input className={styles["search-input"]} type="text" value={query} onChange={e => setUserQuery(e.target.value)} />
            </div>
            <div className={styles[query.length === 0 ? "hidden" : ""]}>
                <SearchResults results={resultsData} query={query} />
            </div>
        </div>);
}

export default SearchBar;