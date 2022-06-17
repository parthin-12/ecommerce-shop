import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateCategoryAction} from '../../redux/actions/productActions';
import MetaData from '../layout/metaData'
import Sider from './Sider'
import { toast } from 'react-toastify';
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import { Button } from '@material-ui/core';
import "./UpdateCategories.css"
import {UPDATE_CATEGORY_RESET } from '../../redux/constants/productConstants';


const UpdateCategories = () => {

  const dispatch=useDispatch();
  const {isUpdated,error,loading} =useSelector((state)=>(state.categories));
  const {categories} =useSelector((state)=>(state.products));


  const [oldCategory, setOldCategory] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("Delete");



  useEffect(() => {
    if(error){
      toast.error(error);
    }else{

      if(isUpdated){
        toast.success("Category Updated Successfully");
        dispatch({type:UPDATE_CATEGORY_RESET});
      }

      dispatch(getProducts());

    }
  }, [dispatch,error,isUpdated]);


  const updateCategorySubmitFormHandler=(e)=>{
    e.preventDefault();

    const myform = new FormData();

    myform.set("oldCategory",oldCategory);
    myform.set("updatedCategory",updatedCategory);

    dispatch(updateCategoryAction(myform,oldCategory));

  }

  return (
    <Fragment>
        <MetaData title="update Category"/>
        <div className="dashboard">
            <Sider/>
            <div className="newCategoryContainer">
                <form className='updateCategoryForm' onSubmit={updateCategorySubmitFormHandler}>
                    <h1>Update & Delete Category</h1>
                    <div>
                        <AccountTreeSharpIcon />
                        <select
                            onChange={(e)=>(setOldCategory(e.target.value))}
                            value={oldCategory}
                        >
                            <option value="">Choose Category</option>
                            {categories && categories.map((e)=>(
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>

                    {oldCategory!=="" && 
                    <div>
                        <AccountTreeSharpIcon />
                        <select
                            onChange={(e)=>(setUpdatedCategory(e.target.value))}
                            value={updatedCategory}
                        >
                            <option value="Delete">Delete</option>
                            {categories && categories.map((e)=>(
                                e!==oldCategory && <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>}

                    <Button id="updateCategoryBtn" type="submit" disabled={loading?true:false}>update</Button>               
                </form>
                <p><h6>*If you choose delete category option then all products under this categories will be deleted,Otherwise new category will be updated</h6></p>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateCategories