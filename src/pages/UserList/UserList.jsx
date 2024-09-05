import React, { useEffect, useState } from 'react';
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from "@mui/material";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "./UserList.css"; // Ensure this file exists and includes necessary styles
import main_axios from '../../utilities/mainaxios';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await main_axios.get('auth/');
                // Transform the data to match DataGrid's expectations
                const transformedData = data.map(user => ({
                    id: user._id, // Map _id to id
                    username: user.name, // Map name to username
                    email: user.email,
                    role: user.role_id === 1 ? "Student" : "Unknown", // Convert role_id to role label
                    mobile: user.mobile,
                    createdAt: new Date(user.createdAt).toLocaleString(), // Format createdAt
                    avatar: "https://via.placeholder.com/150" // Placeholder avatar URL
                }));
                
                setUsers(transformedData);
                console.log(transformedData, "transformedData");
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    const handleUserDelete = (id) => {
        // Show SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Perform deletion on confirmation
                setUsers(users.filter(user => user.id !== id));
                
                // Call backend API to delete the user
                try {
                    await main_axios.delete(`/auth/${id}`);
                    Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire('Error', 'There was a problem deleting the user', 'error');
                }
            }
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListUserImg" src={params.row.avatar} alt={params.row.username} />
                        <span className="userListUsername">{params.row.username}</span>
                    </div>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'role', headerName: 'Role', width: 120 }, // Updated field from roleId to role
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 130, 
            renderCell: (params) => {
                return (
                    <div className="userTableAction">
                        <DeleteOutline 
                            className="userListIcon delete" 
                            onClick={() => handleUserDelete(params.row.id)} 
                        />
                    </div>
                );
            }
        },
    ];

    return (
        <div className="userList">
            <Paper elevation={3} className="userListPaper" style={{ maxWidth: 1200, maxHeight: 1000, overflow: 'auto' }}>
                <div className="userListTop">
                    <Typography variant="h6" className="userListTitle">User List</Typography>
                </div>
                <div className="userListContent">
                    <DataGrid
                        rows={users}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        autoHeight
                    />
                </div>
            </Paper>
        </div>
    );
}
