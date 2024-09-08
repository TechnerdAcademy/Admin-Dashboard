import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Grid, Typography, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import main_axios from '../../utilities/mainaxios';
import ThumbnailButton from '../../utilities/thubnailbutton'; // Ensure path is correct
import AddButton from '../../utilities/AddButton '; // Ensure path is correct
import ResetButton from '../../utilities/ResetButton'; // Ensure path is correct
import CancelButton from '../../utilities/CancelButton'; // Ensure path is correct
import { useNavigate, useParams } from 'react-router-dom';
import './FreeCourseForm.css';
import Header from '../../utilities/Header'; // Ensure path is correct
import axios from 'axios';

const FreeCourseForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract parentId from URL
   console.log(id , "id aaya");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Helper function to upload a thumbnail
  const uploadThumbnail = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const { data } = await axios.post("https://tecknerdacademy.in/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(data.data.Location); // Debug image URL
      return data.data.Location;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw new Error("Thumbnail upload failed");
    }
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      title: '',
      startDate: '',
      description: '',
      tutorName: '',
      imageUrl: '',
      totalDuration: '',
      playlistLink: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      startDate: Yup.date().required('Start Date is required'),
      description: Yup.string().required('Description is required'),
      tutorName: Yup.string().required('Tutor Name is required'),
      totalDuration: Yup.string().required('Total Duration is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form submission triggered');
     

      setIsLoading(true);

      try {
        let imageUrl = '';
        if (thumbnail && typeof thumbnail === 'object') {
          imageUrl = await uploadThumbnail(thumbnail);
        } else {
          imageUrl = values.imageUrl;
        }

        const courseData = {
          title: values.title,
          startDate: values.startDate ? new Date(values.startDate).toISOString() : '',
          description: values.description,
          tutorName: values.tutorName,
          imageUrl,
          totalDuration: values.totalDuration,
          playlistLink: values.playlistLink || '',
          parentId: id, // Ensure parentId is included
        };

        console.log('Sending data to API:', courseData); // Log data before API call

        const response = await main_axios.post('/freecourse/', courseData);
        console.log('API Response:', response); // Log response from the API

        Swal.fire('Success', 'Free course created successfully', 'success');
        navigate('/free-courses');
      } catch (error) {
        console.error('API error:', error); // Log error if API call fails
        Swal.fire('Error', 'There was an error saving the course', 'error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Header
        title="Free Courses"
        breadcrumbItems={[
          // { title: "Courses List", url: "/courses" },
          { title: "", url: "" },
        ]}
        titleMarginRight="270px"
      />
      <Paper elevation={3} className="freeCourseFormContainer" style={{ padding: '10px' }}>
        <Typography variant="h5" className="formTitle">Add Free Course</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ThumbnailButton onChange={setThumbnail} />
              {thumbnail && (
                <img
                  src={typeof thumbnail === 'object' ? URL.createObjectURL(thumbnail) : thumbnail}
                  width="70px"
                  alt="thumbnail"
                />
              )}
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Course Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {formik.errors.title && formik.touched.title && <p className="error">{formik.errors.title}</p>}
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              {formik.errors.startDate && formik.touched.startDate && <p className="error">{formik.errors.startDate}</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tutor Name"
                name="tutorName"
                value={formik.values.tutorName}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {formik.errors.tutorName && formik.touched.tutorName && <p className="error">{formik.errors.tutorName}</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Total Duration"
                name="totalDuration"
                value={formik.values.totalDuration}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {formik.errors.totalDuration && formik.touched.totalDuration && <p className="error">{formik.errors.totalDuration}</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Playlist Link"
                name="playlistLink"
                value={formik.values.playlistLink}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              {formik.errors.description && formik.touched.description && <p className="error">{formik.errors.description}</p>}
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item>
              <AddButton onClick={formik.handleSubmit} /> {/* Ensure it's a submit button */}
            </Grid>
            <Grid item>
              <ResetButton onClick={() => formik.resetForm()} />
            </Grid>
            <Grid item>
              <CancelButton />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default FreeCourseForm;
