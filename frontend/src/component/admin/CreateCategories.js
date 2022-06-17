import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction} from '../../redux/actions/productActions';
import MetaData from '../layout/metaData'
import Sider from './Sider'
import { toast } from 'react-toastify';
import AccountTreeSharpIcon from "@material-ui/icons/AccountTreeSharp";
import { Button } from '@material-ui/core';
import "./CreateCategories.css"
import { NEW_CATEGORY_RESET } from '../../redux/constants/productConstants';


const CreateCategories = () => {

  const dispatch=useDispatch();
  const {success,error} =useSelector((state)=>(state.categories));

  const [category, setCategory] = useState("");



  useEffect(() => {
    if(error){
      toast.error(error);
    }else{

      if(success){
        toast.success("Category Create Successfully");
        dispatch({type:NEW_CATEGORY_RESET});
      }

    }
  }, [dispatch,error,success]);


  const createCategorySubmitFormHandler=(e)=>{
    e.preventDefault();

    const myform = new FormData();

    myform.set("category",category)

    dispatch(createCategoryAction(myform));

  }

  return (
    <Fragment>
        <MetaData title="Create Category"/>
        <div className="dashboard">
            <Sider/>
            <div className="newCategoryContainer">
                <form className='createCategoryForm' onSubmit={createCategorySubmitFormHandler}>
                    <h1>Create New Category</h1>
                    <div>
                        <AccountTreeSharpIcon />
                        <input 
                        type="text"
                        placeholder='category'
                        required
                        value={category}
                        onChange={(e)=>(setCategory(e.target.value))} 
                        />
                        {/* <select
                            onChange={(e)=>(setCategory(e.target.value))}
                            value={category}
                        >
                            <option value="">Choose Category</option>
                            {categories && categories.map((e)=>(
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select> */}
                    </div>
                    <Button id="createCategoryBtn" type="submit" disabled={success?true:false}>Create</Button>               
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default CreateCategories