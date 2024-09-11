import React from 'react';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAnnouncementPage = () => {
  // Form validation using Formik and Yup
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Prepare the data for the API request with only the title
        const announcementData = {
          title: values.title,
        };

        // Make the POST request to the API
        const response = await axios.post('https://tecknerdacademy.in/api/v1/announcement/', announcementData);

        if (response.status === 201) {
          // Show success alert using SweetAlert
          Swal.fire({
            title: 'Success!',
            text: 'Announcement created successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          });
          resetForm();
        } else {
          // Show failure alert using SweetAlert
          Swal.fire({
            title: 'Error!',
            text: 'Failed to create the announcement',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#d33'
          });
        }
      } catch (error) {
        console.error('Error creating announcement:', error);
        // Show error alert using SweetAlert
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while creating the announcement',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
      }
    },
  });

  return (
    <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Announcement
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ marginBottom: '1rem' }}
        />
        <Box textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            Add Announcement
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddAnnouncementPage;
