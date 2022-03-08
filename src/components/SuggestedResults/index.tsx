import React from 'react'
import styles from "./suggested.module.scss"

export default function SuggestedResults() {
  return (
    <div className={`mx-auto my-0 ${styles["suggested-results"]}`}>
        <div className={styles["__title"]}>
            Recent Searches
        </div>

        <ul className={styles["suggested-lists"]}>
            <li className={styles["__list"]}>Monogamy</li>
            <li className={styles["__list"]}>Computer Science</li>
            <li className={styles["__list"]}>Knowledge</li>
        </ul>
    </div>
  )
}
