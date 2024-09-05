import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Paper, Button, Typography } from '@mui/material';
import { EditNote, DeleteOutline } from '@mui/icons-material';
import main_axios from '../../utilities/mainaxios';
// import './FreeCoursesList.css'; // Ensure you have appropriate styles

const FreeCoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await main_axios.get('/freecourse');
        setCourses(response.data.map(course => ({
          id: course._id,
          title: course.title,
          tutorName: course.tutorName,
          duration: course.totalDuration,
          startDate: new Date(course.startDate).toLocaleDateString()
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
        await axios.delete(`http://localhost:4001/v1/freecourse/${id}`);
        setCourses(courses.filter(course => course.id !== id));
        Swal.fire('Deleted!', 'The course has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting course:", error);
        Swal.fire('Error!', 'There was an error deleting the course.', 'error');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'tutorName', headerName: 'Tutor', width: 200 },
    { field: 'duration', headerName: 'Duration', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 160,
    //   renderCell: (params) => (
    //     <div className="courseTableAction">
    //       <Link to={`/editCourse/${params.row.id}`}>
    //         <EditNote className="courseListIcon edit" />
    //       </Link>
    //       <DeleteOutline
    //         className="courseListIcon delete"
    //         onClick={() => handleCourseDelete(params.row.id)}
    //       />
    //     </div>
    //   )
    // }
  ];

  return (
    <div className="courseList">
      <Paper elevation={3} className="courseListPaper">
        <div className="courseListTop">
          <Typography variant="h6" className="courseListTitle">Free Courses List</Typography>
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
};

export default FreeCoursesList;
