import React, { memo, useEffect, useState } from "react";
import styles from "./suggested.module.scss";

interface Props {
  loading: boolean;
  data: object[];
  dataErr: unknown;
  query: string;
}
interface Result {
  word: string;
}

const SuggestedResults = (props: Props) => {
  const { loading, data, dataErr, query } = props;
  
  const [resultFound, setResultFound] = useState<number>(0);
  const [resultLen, setResultLen] = useState<number>(0);

  const getRecentSearches =
    JSON.parse(localStorage.getItem("recentSearches") as string) || [];

  const [recentSearches, setRecentSearches] = useState(getRecentSearches);

  const saveLocalStorage = () => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
    console.log("local storage done");
  }

  const openKeyword = (result: Result) => {
    console.log("lastSearch", query);

    const isDuplicate = recentSearches.includes(query);
    console.log("isDuplicate", isDuplicate);

    if (!isDuplicate) {
      setRecentSearches([...recentSearches, ...[result.word]]);
      saveLocalStorage()
    }
  };

  useEffect(() => {
    setResultFound((data as []).length);
    setResultLen(Object.keys(data as object).length);
    // setRecentSearches([...recentSearches, ...[data]]);
    console.log({ data });
    console.log({ recentSearches });

    // localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [data]);


  const RecentSearches = (
    <ul className={styles["suggested-lists recentSearches"]}>
      {(getRecentSearches as []).map((keyword: Result, i: number) => {
        return (
          <li key={i} className={styles["__list"]}>
            {keyword}
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
          // <div>...recent</div>
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
