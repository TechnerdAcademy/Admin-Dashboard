import Swal from 'sweetalert2';
import { DeleteOutline, EditNote } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Paper, Button, Typography } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import "./TeacherList.css";

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await main_axios.get('/auth/employee');
                setTeachers(response.data.map(teacher => ({
                    id: teacher._id, 
                    name: teacher.name,
                    email: teacher.email,
                    phone: teacher.mobile,
                    role: teacher.role_id === 1 ? 'Admin' : 'Teacher' // Add role to the list
                })));
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchTeachers();
    }, []);

    const handleTeacherDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await main_axios.delete(`/auth/employee/${id}`);
                setTeachers(teachers.filter(teacher => teacher.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The teacher has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error("Error deleting teacher:", error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the teacher.',
                    'error'
                );
            }
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Teacher', width: 250 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Mobile', width: 150 }, // Use 'Mobile' instead of 'Phone'
        { field: 'role', headerName: 'Role', width: 100 }, // Add role column
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 130, 
            renderCell: (params) => (
                <div className="teacherTableAction">
                    <Link to={`/editTeacher`}>
                        <EditNote className="teacherListIcon edit" />
                    </Link>
                    <DeleteOutline 
                        className="teacherListIcon delete" 
                        onClick={() => handleTeacherDelete(params.row.id)} 
                    />
                </div>
            )
        },
    ];

    return (
        <div className="teacherList">
            <Paper elevation={3} className="teacherListPaper">
                <div className="teacherListTop">
                    <Typography variant="h6" className="teacherListTitle">Teacher List</Typography>
                    <Link to="/addTeacher">
                        <Button variant="contained" color="primary" className="teacherListCreateBtn">Create</Button>
                    </Link>
                </div>
                <div className="teacherListContent">
                    <DataGrid
                        rows={teachers}
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