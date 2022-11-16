import React, { useState, useContext, useEffect } from "react";
import styles from "./search.module.scss";
import useFetch from "../../hooks/useFetch";
import SuggestedResults from "../SuggestedResults";
import SearchIcon from "../../images/search.svg";
// import defaultContext from "../../context/defaults"

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])
  const [dataErr, setDataErr] = useState(null)
  const  [loading, setLoading]  = useState(false)
  // const { data, dataErr, loading } = useFetch(
  //   `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  // );
  const [searchFocused, setSearchFocused] = useState(false);
  // const [showModal, setShowModal] = useState<boolean>(true)
  const onSearchFocus = () => {setSearchFocused(true); console.log("ffff");
  };
  const onSearchBlur = () => setSearchFocused(false);
  const initSearch = () => {
    console.log("init search");
    setLoading(true)
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data })
        setData(data)
      })
      .catch((err) => {
        setDataErr(err)
      })
      .finally(()=> setLoading(false));

    // console.log({ data, dataErr, loading });
  }
  // const initSearch = () => {
  //   console.log("init search");
  //   const { data, dataErr, loading } = useFetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  //   );

  //   console.log({ data, dataErr, loading });

  //   setData(data)
  //   setDataErr(dataErr)
  //   setLoading(loading)
  // }
  // const {modal} = useContext(defaultContext)

  const searchIcon = document.getElementById("searchIcon");
  searchIcon?.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div
      className={`flex justify-center relative mx-auto ${styles["search-wrapper"]}`}
    >
      <div
        className={`container absolute top-1/4 align-center box-shadow2 ${styles["search-parent"]}`}
      >
        <div className={`text-center ${styles["search-input-wrapper"]}`}>
          <img
            src={SearchIcon}
            width="30"
            id="searchIcon"
            className={`icon ${styles["search-icon"]}`}
            alt="search icon"
          />
          <input
            type="search"
            autoComplete="off"
            id="search-input"
            className={`${styles["search-input"]}`}
            placeholder="Search Word"
            onFocus={onSearchFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e)=> e.key === "Enter" && initSearch()}
          />
        </div>
        {/* {searchFocused && (
          <div>123</div>
        )} */}
        {searchFocused && (
          <SuggestedResults loading={loading} data={data} dataErr={dataErr} />
        )}
      </div>

      {/* { modal.active && <Modal toggleModal={setShowModal} /> } */}
    </div>
  );
}
