import React, { useState } from 'react'
import styles from "./search.module.scss"
import useFetch from '../../hooks/useFetch'
import SuggestedResults from "../SuggestedResults"
import SearchIcon from "../../images/search.svg"

export default function Search() {
  const [query, setQuery] = useState("")
  const {data, dataErr, loading} = useFetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
  const [searchFocused, setSearchFocused]  = useState(false)
  const onSearchFocus = () => setSearchFocused(true)
  // const onSearchBlur = () => setSearchFocused(false)
  
  const searchIcon = document.getElementById("searchIcon")
  searchIcon?.addEventListener("contextmenu", e => e.preventDefault())

  return (
    <div className={`flex justify-center relative mx-auto ${styles["search-wrapper"]}`}>
      <div className={`container absolute top-1/4 align-center box-shadow2 ${styles["search-parent"]}`}>
        <div className={`text-center ${styles["search-input-wrapper"]}`}>
          <img src={SearchIcon} width="30" id='searchIcon' className={`icon ${styles["search-icon"]}`} alt="search icon" />
          <input type="search" autoComplete='off' id='search-input' className={`${styles["search-input"]}`} placeholder='Search Word' onFocus={onSearchFocus} value={query} onChange={(e) => setQuery(e.target.value)} />

        </div>
        {searchFocused && <SuggestedResults loading={loading} data={data} />}
      </div>
    </div>
  )
}
