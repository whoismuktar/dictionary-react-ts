import React, { useEffect, useState } from 'react'
import styles from "./search.module.scss"
import useFetch from '../../hooks/useFetch'
import SuggestedResults from "../SuggestedResults"

export default function Search() {
  const [query, setQuery] = useState("")
  const {data, dataErr, loading} = useFetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)

  return (
    <div className={`allChildrenCenter ${styles["search-wrapper"]}`}>
      <div className="container text-center mx-auto">
        <input type="search" autoComplete='off' id='search-input' className={`box-shadow2 ${styles["search-input"]}`} placeholder='Search Word' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button id='search-btn' className={`box-shadow2 ${styles["search-btn"]}`}>Search</button>

      </div>
        <SuggestedResults />
    </div>
  )
}
