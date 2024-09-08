import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as Yup from "yup";
import ThumbnailButton from "../../utilities/thubnailbutton";
import AddButton from "../../utilities/AddButton ";
import CancelButton from "../../utilities/CancelButton";
import ResetButton from "../../utilities/ResetButton";
import Header from '../../utilities/Header';
import main_axios from "../../utilities/mainaxios";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourses = () => {
  const formRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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
      console.log(data.data.Location);
      return data.data.Location;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw new Error("Thumbnail upload failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      objective: [""],
      whatYouLearn: [""],
      projects: [""],
      price: "",
      discountedPrice: "",
      isFree: false,
      tutorName: "",
      totalDuration: "",
      category: "",
      liveClassLink: "",
      playlistLink: "",
      startDate: "",
      imageUrl: "",
      totalDurationType: "",
    },

    onSubmit: async (values) => {
      try {
        let imageUrl = "";
        if (thumbnail) {
          imageUrl = await uploadThumbnail(thumbnail);
        }

        const courseData = {
          title: values.title,
          description: values.description,
          objective: values.objective,
          projects: values.projects,
          whatYouLearn: values.whatYouLearn,
          price: parseFloat(values.price),
          discountedPrice: values.discountedPrice ? parseFloat(values.discountedPrice) : null,
          isFree: values.isFree,
          tutorName: values.tutorName,
          totalDuration: values.totalDuration,
          category: values.category,
          liveClassLink: values.liveClassLink || "",
          playlistLink: values.playlistLink || "",
          startDate: values.startDate ? new Date(values.startDate).toISOString() : "",
          imageUrl,
          totalDurationType: values.totalDurationType,
        };

        console.log("Course Data:", courseData); // Debugging line to check the data

        const response = await main_axios.post("/courses", courseData);
        console.log("Course added successfully:", response.data);

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Course added successfully!",
        });
      } catch (error) {
        console.error("Error adding course:", error);

        // Error alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add course. Please try again.",
        });
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setThumbnail(null);
  };

  const addProjectField = () => {
    formik.setFieldValue("projects", [...formik.values.projects, ""]);
  };

  const handleProjectChange = (index, value) => {
    const newProjects = [...formik.values.projects];
    newProjects[index] = value;
    formik.setFieldValue("projects", newProjects);
  };

  const removeProjectField = (index) => {
    const newProjects = formik.values.projects.filter((_, i) => i !== index);
    formik.setFieldValue("projects", newProjects);
  };

  return (
    <>
      <Header
        title="Add Course"
        breadcrumbItems={[
          // { title: "Courses List", url: "/courses" },
          { title: "Add Course", url: "" },
        ]}
        titleMarginRight="270px"
      />
      <Paper elevation={3} style={{ padding: "10px" }}>
        <form onSubmit={formik.handleSubmit} ref={formRef}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ThumbnailButton onChange={setThumbnail} />
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  width={"70px"}
                  alt="thumbnail"
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="title"
                label="Course Title"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                value={formik.values.title}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.title && formik.touched.title && (
                <FormHelperText error>{formik.errors.title}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
              {formik.errors.price && formik.touched.price && (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="discountedPrice"
                label="Discounted Price"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                type="number"
                value={formik.values.discountedPrice}
                onChange={formik.handleChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
              {formik.errors.discountedPrice && formik.touched.discountedPrice && (
                <FormHelperText error>{formik.errors.discountedPrice}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth margin="normal" color="secondary">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  size="small"
                >
                  <MenuItem value="Programming">Programming</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
                {formik.errors.category && formik.touched.category && (
                  <FormHelperText error>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="tutorName"
                label="Tutor Name"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                value={formik.values.tutorName}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.tutorName && formik.touched.tutorName && (
                <FormHelperText error>{formik.errors.tutorName}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="totalDuration"
                label="Total Duration"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                value={formik.values.totalDuration}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.totalDuration && formik.touched.totalDuration && (
                <FormHelperText error>{formik.errors.totalDuration}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.startDate}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.startDate && formik.touched.startDate && (
                <FormHelperText error>{formik.errors.startDate}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.description && formik.touched.description && (
                <FormHelperText error>{formik.errors.description}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="objective"
                label="Objective"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                multiline
                rows={4}
                value={formik.values.objective}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.objective && formik.touched.objective && (
                <FormHelperText error>{formik.errors.objective}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="whatYouLearn"
                label="What You Will Learn"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                multiline
                rows={4}
                value={formik.values.whatYouLearn}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.whatYouLearn && formik.touched.whatYouLearn && (
                <FormHelperText error>{formik.errors.whatYouLearn}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Projects</InputLabel>
                {formik.values.projects.map((project, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      name={`projects[${index}]`}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={project}
                      onChange={(e) => handleProjectChange(index, e.target.value)}
                      size="small"
                    />
                    <IconButton onClick={() => removeProjectField(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </div>
                ))}
                <IconButton onClick={addProjectField}>
                  <AddIcon />
                </IconButton>
                {formik.errors.projects && formik.touched.projects && (
                  <FormHelperText error>{formik.errors.projects}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} marginTop={2}>
            <Grid item>
              <AddButton onClick={formik.handleSubmit} />
            </Grid>
            <Grid item>
              <ResetButton onClick={handleReset} />
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

export default AddCourses;
