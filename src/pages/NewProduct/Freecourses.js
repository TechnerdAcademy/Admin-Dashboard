import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

const FreeCourseModal = ({ open, onClose, onAddCourse }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
      startDate: "",
      tutorName: "",
      totalDuration: "",
      playlistLink: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date().required("Start Date is required"),
      tutorName: Yup.string().required("Tutor Name is required"),
      totalDuration: Yup.string().required("Total Duration is required"),
    }),
    onSubmit: (values) => {
      onAddCourse({
        title: values.title,
        description: values.description,
        image: values.image,
        startDate: values.startDate,
        tutorName: values.tutorName,
        totalDuration: values.totalDuration,
        playlistLink: values.playlistLink,
      });
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Free Course</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>

        <input
            accept="image/*"
            style={{ display: "none" }}
            id="image"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>
          {formik.errors.image && formik.touched.image && (
            <Typography color="error">{formik.errors.image}</Typography>
          )}
          <TextField
            name="title"
            label="Course Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.title}
            onChange={formik.handleChange}
            size="small"
          />
          {formik.errors.title && formik.touched.title && (
            <Typography color="error">{formik.errors.title}</Typography>
          )}

          <TextField
            name="description"
            label="Course Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={formik.values.description}
            onChange={formik.handleChange}
            size="small"
          />
          {formik.errors.description && formik.touched.description && (
            <Typography color="error">{formik.errors.description}</Typography>
          )}

          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            size="small"
          />
          {formik.errors.startDate && formik.touched.startDate && (
            <Typography color="error">{formik.errors.startDate}</Typography>
          )}

          <TextField
            name="tutorName"
            label="Tutor Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.tutorName}
            onChange={formik.handleChange}
            size="small"
          />
          {formik.errors.tutorName && formik.touched.tutorName && (
            <Typography color="error">{formik.errors.tutorName}</Typography>
          )}

          <TextField
            name="totalDuration"
            label="Total Duration"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.totalDuration}
            onChange={formik.handleChange}
            size="small"
          />
          {formik.errors.totalDuration && formik.touched.totalDuration && (
            <Typography color="error">{formik.errors.totalDuration}</Typography>
          )}

          <TextField
            name="playlistLink"
            label="Playlist Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.playlistLink}
            onChange={formik.handleChange}
            size="small"
          />


        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            formik.handleSubmit();
            onClose();
          }}
          color="primary"
        >
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FreeCourseModal;
