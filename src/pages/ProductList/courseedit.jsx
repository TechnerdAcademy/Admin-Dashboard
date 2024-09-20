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
  FormControlLabel, // Add this import
  Checkbox, // Add this import
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
import { useParams, useNavigate } from "react-router-dom";

const EditCourse = () => {
  const formRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [token, setToken] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await main_axios.get(`/courses/${courseId}`);
      const course = response.data;
      formik.setValues({
        title: course.title || "",
        description: course.description || "",
        price: course.price || "",
        discountedPrice: course.discountedPrice || "",
        isFree: course.isFree || false,
        tutorName: course.tutorName || "",
        totalDuration: course.totalDuration || "",
        category: course.category || "",
        liveClassLink: course.liveClassLink || "",
        playlistLink: course.playlistLink || "",
        startDate: course.startDate ? new Date(course.startDate).toISOString().split("T")[0] : "",
        imageUrl: course.imageUrl || "",
        totalDurationType: course.totalDurationType || "",
        openforenrol: course.openForEnrol || "",
      });

      if (course.imageUrl) {
        setThumbnail({ preview: course.imageUrl });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch course details. Please try again.",
      });
    }
  };

  const uploadThumbnail = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const { data } = await axios.post("https://technerdacademy.in/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
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
      openForEnrol: false,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Course title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required").positive("Price must be a positive number"),
      discountedPrice: Yup.number().nullable().positive("Discounted price must be a positive number"),
      tutorName: Yup.string().required("Tutor name is required"),
      totalDuration: Yup.string().required("Total duration is required"),
      category: Yup.string().required("Category is required"),
      startDate: Yup.date().required("Start date is required").nullable(),
    }),

    onSubmit: async (values) => {
      try {
        let imageUrl = values.imageUrl;
        if (thumbnail && thumbnail.file) {
          imageUrl = await uploadThumbnail(thumbnail.file);
        }

        const courseData = {
          title: values.title,
          description: values.description,
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
          openforenrol: values.openForEnrol,
        };

        await main_axios.put(`/courses/${courseId}`, courseData);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Course updated successfully!",
        });
        navigate("/course"); // Redirect to course list page or desired page
      } catch (error) {
        console.error("Error updating course:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update course. Please try again.",
        });
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setThumbnail(null);
  };

  return (
    <>
      <Header
        title="Edit Course"
        breadcrumbItems={[
          { title: "Courses List", url: "/courses" },
          { title: "Edit Course", url: "" },
        ]}
        titleMarginRight="270px"
      />
      <Paper elevation={3} style={{ padding: "10px" }}>
        <form onSubmit={formik.handleSubmit} ref={formRef}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ThumbnailButton
                onChange={(file) => setThumbnail({ file })}
              />
              {thumbnail && thumbnail.preview && (
                <img
                  src={thumbnail.preview}
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
              <FormControl variant="outlined" fullWidth margin="normal" color="secondary">
                <InputLabel>Total Duration Type</InputLabel>
                <Select
                  name="totalDurationType"
                  label="Total Duration Type"
                  value={formik.values.totalDurationType}
                  onChange={formik.handleChange}
                  size="small"
                >
                  <MenuItem value="Hours">Hours</MenuItem>
                  <MenuItem value="Days">Days</MenuItem>
                </Select>
                {formik.errors.totalDurationType && formik.touched.totalDurationType && (
                  <FormHelperText error>{formik.errors.totalDurationType}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="startDate"
                label="Start Date"
                variant="outlined"
                type="date"
                fullWidth
                color="secondary"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formik.values.startDate}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.startDate && formik.touched.startDate && (
                <FormHelperText error>{formik.errors.startDate}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth margin="normal" color="secondary">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="openForEnrol"
                      checked={formik.values.openForEnrol}
                      onChange={formik.handleChange}
                      size="small"
                    />
                  }
                  label="Open for Enrol"
                />
              </FormControl>
              {formik.errors.openForEnrol && formik.touched.openForEnrol && (
                <FormHelperText error>{formik.errors.openForEnrol}</FormHelperText>
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

            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
  <CancelButton />
  <ResetButton onClick={handleReset} />
  <AddButton onClick={formik.handleSubmit} />
</Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default EditCourse;
