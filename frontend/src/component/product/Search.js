import {useNavigate  } from "react-router-dom"
import React, { Fragment, useState } from 'react';
import MetaData from "../layout/metaData";
import "./Search.css"

const Search = () => {

    const [keyword, setKeyword] = useState("");
    const nagivate = useNavigate();
    const onSubmitForm=(e)=>{
        e.preventDefault();
         if(keyword.trim()){
             nagivate(`/products/${keyword}`);
         }else{
             nagivate(`/products`);
         }
    }

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchForm" onSubmit={onSubmitForm}>
          <input 
          type="text"
          placeholder='Search a Product...'
          onChange={(e)=> setKeyword(e.target.value)} 
          />
          <input type="submit" value="Search"/>
      </form>
    </Fragment>
  )
}

export default Search;