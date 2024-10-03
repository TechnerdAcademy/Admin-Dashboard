import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from "@mui/material";
import main_axios from '../../utilities/mainaxios';
import "./UserList.css"; // Ensure this file exists and includes necessary styles

export default function EnrolledStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                const { data } = await main_axios.get('/payment/get-total-enrolled-students');
                
                // Check if the API response is successful
                if (data.success) {
                    const transformedData = data.users.map(user => ({
                        id: user._id, // Use _id as id
                        name: user.name,
                        email: user.email,
                        role: user.role_id === 1 ? "Student" : "Unknown", // Convert role_id to role label
                        mobile: user.mobile,
                        enrolledAt: new Date(user.createdAt).toLocaleString(), // Format createdAt
                        avatar: "https://via.placeholder.com/150" // Placeholder avatar URL
                    }));

                    setStudents(transformedData);
                    console.log(transformedData, "transformedData");
                } else {
                    console.error("Error: API response was not successful.");
                }
            } catch (err) {
                console.error("Error fetching enrolled students:", err);
            }
        };

        fetchEnrolledStudents();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'user', 
            headerName: 'User', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListUserImg" src={params.row.avatar} alt={params.row.name} />
                        <span className="userListUsername">{params.row.name}</span>
                    </div>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'role', headerName: 'Role', width: 120 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'enrolledAt', headerName: 'Enrolled At', width: 200 },
    ];

    return (
        <div className="userList">
            <Paper elevation={3} className="userListPaper" style={{ maxWidth: 1200, maxHeight: 1000, overflow: 'auto' }}>
                <div className="userListTop">
                    <Typography variant="h6" className="userListTitle">Enrolled Students</Typography>
                </div>
                <div className="userListContent">
                    <DataGrid
                        rows={students} // Ensure this is using the students state
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                    />
                </div>
            </Paper>
        </div>
    );
}
