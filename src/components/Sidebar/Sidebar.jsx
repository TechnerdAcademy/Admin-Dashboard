import React from "react";
import {
    AttachMoneyOutlined,
    Home,
    PersonOutline,
    Storefront,
    Timeline,
    TrendingUp,
    ExitToApp
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Sidebar.css";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        });
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h2 className="sidebarTitle">Dashboard</h2>
                    <ul className="sidebarList">
                        <Link className="sidebarListLink" to="/">
                            <li className="sidebarListItem active">
                                <Home className="listItemIcon" />
                                <span className="listItemText">Home</span>
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="listItemIcon" />
                            <span className="listItemText">Analytics</span>
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="listItemIcon" />
                            <span className="listItemText">Sales</span>
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h2 className="sidebarTitle">Quick Menu</h2>
                    <ul className="sidebarList">
                        <Link className="sidebarListLink" to="/users">
                            <li className="sidebarListItem">
                                <PersonOutline className="listItemIcon" />
                                <span className="listItemText">Students</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/teachers">
                            <li className="sidebarListItem">
                                <PersonOutline className="listItemIcon" />
                                <span className="listItemText">Teachers</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/course">
                            <li className="sidebarListItem">
                                <Storefront className="listItemIcon" />
                                <span className="listItemText">Courses</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/free-courses">
                            <li className="sidebarListItem">
                                <Storefront className="listItemIcon" />
                                <span className="listItemText">Free-Courses</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/business">
                            <li className="sidebarListItem">
                                <Storefront className="listItemIcon" />
                                <span className="listItemText">BusinessPackage</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/announcements">
                            <li className="sidebarListItem">
                                <Storefront className="listItemIcon" />
                                <span className="listItemText">Announcements</span>
                            </li>
                        </Link>
                        <Link className="sidebarListLink" to="/transactions">
                            <li className="sidebarListItem">
                                <AttachMoneyOutlined className="listItemIcon" />
                                <span className="listItemText">Transactions</span>
                            </li>
                        </Link>
                        <li className="sidebarListItem" onClick={handleLogout}>
                            <ExitToApp className="listItemIcon" />
                            <span className="listItemText">Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
