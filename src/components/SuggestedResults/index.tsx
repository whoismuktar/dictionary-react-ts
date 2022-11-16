import React, { memo, useEffect, useState } from "react";
import styles from "./suggested.module.scss";

interface Props {
  loading: boolean;
  data: unknown;
  dataErr: unknown;
}
interface Result {
  word: string;
}

const SuggestedResults = (props: Props) => {
  const { loading, data, dataErr } = props;
  const [resultFound, setResultFound] = useState<number>(0);
  const [resultLen, setResultLen] = useState<number>(0);

  const getRecentSearches =
    JSON.parse(localStorage.getItem("recentSearches") as string) || [];
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);

  const openKeyword = (result:Result) => {
    setRecentSearches([...recentSearches, ...[result.word]]);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }

  useEffect(() => {
    setResultFound((data as []).length);
    setResultLen(Object.keys(data as object).length);
    // setRecentSearches([...recentSearches, ...[data]]);
    console.log({ recentSearches });

    // localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [data]);

  // console.log("active", loading)
  // console.log("data", data)
  // console.log("dataErr", dataErr)

  const RecentSearches = (
    <ul className={styles["suggested-lists recentSearches"]}>
      {(recentSearches as []).map((search: Result, i: number) => {
        return (
          <li key={i} className={styles["__list"]}>
            {search.word}
          </li>
        );
      })}
    </ul>
  );

  const Result = (
    <ul className={styles["suggested-lists results"]}>
      {(data as []).map((result: Result, i: number) => {
        return (
          <li key={i} className={styles["__list"]} onClick={() => openKeyword(result)}>
            {result.word}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`mx-auto my-0 transition duration-500 ease-linear ${styles["suggested-results"]}`}
    >
      <div className={styles["__title"]}>
        {resultFound || resultLen
          ? "Results"
          : recentSearches.length
          ? "Recent Searches"
          : "No Recent Search"}
      </div>

      {
        resultFound ? (
          Result
        ) : loading ? (
          <div className={`animate-pulse py-5 ${styles["suggested-lists"]}`}>
            <div className="flex-1 space-y-5 py-1">
              {[...Array(5)].map((loader, i) => (
                <div key={i} className="grid grid-cols-6 gap-4">
                  <div className="h-2 bg-zinc-300 rounded"></div>
                  <div className="h-2 bg-zinc-300 rounded col-span-4"></div>
                  <div className="h-2 bg-zinc-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // <div>No Result found {resultLen}</div>
          RecentSearches
        )
        // <div>
        //   { data === [] && "Recents Searches...."}
        // </div> :

        // Object.keys(data).length > 0 ?
        // <div>1</div> :
        // <ul className={`${styles["suggested-lists"]}`}>
        //   <li className={styles["__list"]}>Monogamy</li>
        //   <li className={styles["__list"]}>Computer Science</li>
        //   <li className={styles["__list"]}>Knowledge</li>
        // </ul>
      }

      {/* {
        data != null && data.length ? 
          <ul className={styles["suggested-lists"]}>
          {
            data.map((result:object, i:number) => {
              return(
                <li key={i} className={styles["__list"]}>{result}</li>
              )
            })
          }
        </ul> :

        <ul className={styles["suggested-lists"]}>
        <li className={styles["__list"]}>Monogamy</li>
        <li className={styles["__list"]}>Computer Science</li>
        <li className={styles["__list"]}>Knowledge</li>
      </ul>
      } */}
    </div>
  );
};

export default memo(SuggestedResults);
