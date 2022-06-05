import React, {useEffect, useState} from 'react'
import styles from "./suggested.module.scss"

interface Props {
  loading: boolean;
  data: unknown;
  dataErr: unknown;
}
interface Result {
  word: string;
}

export default function SuggestedResults(props:Props) {
  const {loading, data, dataErr} = props
  const [resultFound, setResultFound] = useState<number>(0)
  const [noResult, setNoResult] = useState<number>(0)

  useEffect(()=> {
    setResultFound((data as []).length)
    setNoResult(Object.keys(data as object).length)
  }, [data])

  // console.log("active", loading)
  // console.log("data", data)
  console.log("dataErr", dataErr)

  const Result = <ul className={styles["suggested-lists results"]}>
  {
    (data as []).map((result:Result, i:number) => {
      return(
        <li key={i} className={styles["__list"]}>{result.word}</li>
      )
    })
  }
</ul>

  return (
    <div className={`mx-auto my-0 transition duration-500 ease-linear ${styles["suggested-results"]}`}>
      <div className={styles["__title"]}>
        { resultFound || noResult ? "Results" : "Recent Searches"}
      </div>

      {
        resultFound ? Result :
        loading ? 
        <div className={`animate-pulse py-5 ${styles["suggested-lists"]}`}>
          <div className="flex-1 space-y-5 py-1">
            {
              [...Array(5)].map((loader, i) => 
                <div key={i} className="grid grid-cols-6 gap-4">
                  <div className="h-2 bg-zinc-300 rounded"></div>
                  <div className="h-2 bg-zinc-300 rounded col-span-4"></div>
                  <div className="h-2 bg-zinc-300 rounded"></div>
              </div>
              )
            }
          </div>
        </div> 
        :
        <div>No Result found {noResult}</div>
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
  )
}
