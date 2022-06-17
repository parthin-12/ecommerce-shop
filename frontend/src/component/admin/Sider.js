import React from 'react'
import "./Sider.css"
import {TreeView,TreeItem} from "@material-ui/lab"
import logo from "./../../images/ecommerceLogo2.png";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import PostAddSharpIcon from "@material-ui/icons/PostAddSharp";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import {AiTwotoneApi} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";
import {MdOutlineCategory} from "react-icons/md";
import ImportExportSharpIcon from "@material-ui/icons/ImportExportSharp";
import ListAltSharpIcon from "@material-ui/icons/ListAltSharp";
import DashboardSharpIcon from "@material-ui/icons/DashboardSharp";
import PeopleSharpIcon from "@material-ui/icons/PeopleSharp";
import RateReviewSharpIcon from "@material-ui/icons/RateReviewSharp";
import { Link } from 'react-router-dom';

const Sider = () => {
  return (
    <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="Home"/>
        </Link>
        <Link to="/admin/dashboard">
            <p><DashboardSharpIcon/> Dashboard</p>
        </Link>
        <Link to="#">
            <TreeView
            defaultExpandIcon={<ExpandMoreSharpIcon/>}
            defaultCollapseIcon={<ImportExportSharpIcon/>} 
            >
                <TreeItem label="Products" nodeId="1">
                    <Link to="/admin/products">
                        <TreeItem label="All" nodeId="2" icon={<PostAddSharpIcon/>} />
                    </Link>
                    <TreeItem label="Create" nodeId="5">
                        <Link to="/admin/api/create">
                            <TreeItem label="Api" nodeId="3" icon={<AiTwotoneApi/>} />
                        </Link>
                        <Link to="/admin/product">
                            <TreeItem label="Manually" nodeId="4" icon={<AddSharpIcon/>} />
                        </Link>
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </Link>

        <Link to="#">
            <TreeView
            defaultExpandIcon={<ExpandMoreSharpIcon/>}
            defaultCollapseIcon={<ImportExportSharpIcon/>} 
            >
                <TreeItem label="Categories" nodeId="1">
                    <Link to="/admin/category/create">
                        <TreeItem label="Create" nodeId="2" icon={<BiCategory/>} />
                    </Link>
                    <Link to="/admin/category/update">
                        <TreeItem label="Update" nodeId="3" icon={<MdOutlineCategory/>} />
                    </Link>
                </TreeItem>
            </TreeView>
        </Link>

        <Link to="/admin/orders">
            <p>
                <ListAltSharpIcon/>
                Orders
            </p>
        </Link>
        <Link to="/admin/users">
            <p>
                <PeopleSharpIcon/>
                Users
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReviewSharpIcon/>
                Reviews
            </p>
        </Link>
    </div>
  )
}

export default Sider