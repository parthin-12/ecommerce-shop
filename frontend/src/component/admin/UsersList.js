import React, { Fragment, useState } from 'react';
import "./UsersList.css"
import MetaData from '../layout/metaData';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@material-ui/icons/EditSharp"
import DeleteIcon from "@material-ui/icons/DeleteSharp"
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Sider from './Sider';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';
import { deleteUser, getAllUsers } from '../../redux/actions/userActions';

const UsersList = () => {

    const dispatch=useDispatch();
    const {id}=useParams();
    const navigate=useNavigate();
    const dataGridPageSize = 10;

    const {error,users,loading,countUsers} =useSelector((state)=>(state.allUsers));
    const {error:deleteError,isDeleted} =useSelector((state)=>(state.profile));
    const [page, setPage] = useState(0);

    useEffect(() => {
      if(error){
        toast.error(error);
      }else if(deleteError){
        toast.error(deleteError);
      }
      else{

        if(isDeleted){
            toast.success("User Deleted Successfully");
            navigate("/admin/users");
            dispatch({type:DELETE_USER_RESET});
        }

      dispatch(getAllUsers(page+1,dataGridPageSize));
      }
    }, [error,dispatch,page,id,deleteError,isDeleted,navigate])
    
    const deleteUserHandler= (deleteUserId)=>{
        dispatch(deleteUser(deleteUserId));
    }

    const columns=[
        {field:"id",headerName:"User ID",minWidth:100,flex:0.3},
        {field:"email",headerName:"Email",minWidth:200,flex:0.4},
        {field:"name",headerName:"Name",minWidth:150,flex:0.2},
        {field:"role",headerName:"Role",minWidth:100,flex:0.1,cellClassName:(params)=>{
          return(params.getValue(params.id,"role")==="admin"?"redColor":(params.getValue(params.id,"role")==="master"?"masterColor":"greenColor"));
        }},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.1,sortable:false,type:"number",renderCell:(params)=>{
            return(
              <Fragment>
                    {params.getValue(params.id,"role")!=="master" && <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                        <EditIcon />
                    </Link>}
                    {params.getValue(params.id,"role")!=="master" && <Button disabled={isDeleted?true:false} onClick={()=>(deleteUserHandler(params.getValue(params.id,"id")))}>
                        <DeleteIcon />
                    </Button>}
                </Fragment>
            )
        }},
    ]

    const rows=[];

    users && users.forEach(e => {
        rows.push({id:e._id,email:e.email,name:e.name,role:e.role})
    });

  return (
    <Fragment>
        <MetaData title="All Users" />
        <div className="dashboard">
            <Sider />
            <div className="usersListContainer">
                <h1 className="usersListHeading">All Users</h1>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSize={dataGridPageSize}
                    disableSelectionOnClick
                    className='usersListTable'
                    autoHeight
                    page={page}
                    onPageChange={(newPage)=>setPage(newPage)}
                    rowsPerPageOptions={[dataGridPageSize]}
                    paginationMode="server"
                    rowCount={countUsers}
                />
            </div>
        </div>
    </Fragment>
  )
}

export default UsersList