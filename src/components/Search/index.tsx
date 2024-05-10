import React, { useState } from "react";
import styles from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";

interface ISearch {
  placeholder: string;
}

//Teste provisório
const teste = () => {
  console.log("Clicou no ícone de busca!");
};

const Search = (props: ISearch) => {

  return (
    <div className={styles.Search}>
      <input type="text" placeholder={props.placeholder} />
      <IoIosSearch className={styles.SearchIcon} onClick={teste}/>
    </div>
  );
};

export default Search;