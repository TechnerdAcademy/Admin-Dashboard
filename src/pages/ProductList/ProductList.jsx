import Swal from 'sweetalert2';
import { DeleteOutline, EditNote } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Paper, Button, Typography } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import "./CourseList.css";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await main_axios.get('/courses');
                setCourses(response.data.map(course => ({
                    id: course._id,
                    name: course.title,
                    instructor: course.tutorName,
                    duration: course.totalDuration,
                    price: course.price,
                })));
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseDelete = async (id) => {
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
                await main_axios.delete(`/courses/${id}`);
                setCourses(courses.filter(course => course.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The course has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error("Error deleting course:", error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the course.',
                    'error'
                );
            }
        }
    };

    const handleFreeCourse = (id) => {
        navigate(`/course/free/${id}`);
    };

    const handleCourseContent = (id) => {
        navigate(`/course/content/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Course', width: 250 },
        { field: 'instructor', headerName: 'Instructor', width: 120 },
        { field: 'duration', headerName: 'Duration', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        { 
            field: 'actions', 
            headerName: 'Actions', 
            width: 400, // Adjusted width to accommodate the new button
            renderCell: (params) => (
                <div className="courseTableActions">
                    <Link to={`/course/edit/${params.row.id}`} style={{ marginRight: 8 }}>
                        <EditNote className="courseListIcon edit" />
                    </Link>
                    <DeleteOutline 
                        className="courseListIcon delete" 
                        onClick={() => handleCourseDelete(params.row.id)} 
                        style={{ marginRight: 8 }}
                    />
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="courseListIcon freeCourse"
                        onClick={() => handleFreeCourse(params.row.id)}
                        style={{ padding: '6px 12px', marginRight: 8 }} // Adjust padding
                    >
                        Free Course
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="courseListIcon courseContent"
                        onClick={() => handleCourseContent(params.row.id)}
                        style={{ padding: '6px 12px' }} // Adjust padding
                    >
                        Course Content
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div className="courseList">
            <Paper elevation={3} className="courseListPaper">
                <div className="courseListTop">
                    <Typography variant="h6" className="courseListTitle">Course List</Typography>
                    <Link to="/addCourse">
                        <Button variant="contained" color="primary" className="courseListCreateBtn">Create</Button>
                    </Link>
                </div>
                <div className="courseListContent">
                    <DataGrid
                        rows={courses}
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
