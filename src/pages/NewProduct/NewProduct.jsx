import React, { useRef, useState  , useEffect} from "react";
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
} from "@mui/material";
import * as Yup from "yup";
import ThumbnailButton from "../../utilities/thubnailbutton";
import AddButton from "../../utilities/AddButton ";
import CancelButton from "../../utilities/CancelButton";
import ResetButton from "../../utilities/ResetButton";
import Header from '../../utilities/Header';
import main_axios from "../../utilities/mainaxios";
import axios from "axios";
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
        const { data } = await axios.post("http://localhost:4001/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, 
        },
      });
      console.log(data.data.Location) 
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
      objective: "",
      whatYouLearn: "",
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
      totalDurationType:"",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      objective: Yup.string().required("Objective is required"),
      whatYouLearn: Yup.string().required("What You Will Learn is required"),
      price: Yup.number().required("Price is required").positive("Price must be a positive number"),
      tutorName: Yup.string().required("Tutor Name is required"),
      totalDuration: Yup.string().required("Total Duration is required"),
      category: Yup.string().required("Category is required"),
      startDate: Yup.date().required("Start Date is required"),
    }),
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
        } catch (error) {
          console.error("Error adding course:", error);
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
        title="Add Course"
        breadcrumbItems={[
          { title: "Courses List", url: "/courses" },
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
            <Grid item xs={4} >
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
                <p>{formik.errors.title}</p>
              )}
            </Grid>
            <Grid item xs={4} >
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
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {formik.errors.price && formik.touched.price && (
                <p>{formik.errors.price}</p>
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
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {formik.errors.discountedPrice && formik.touched.discountedPrice && (
                <p>{formik.errors.discountedPrice}</p>
              )}
            </Grid>

            <Grid item xs={4} >
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
              </FormControl>
              {formik.errors.category && formik.touched.category && (
                <p>{formik.errors.category}</p>
              )}
            </Grid>

            <Grid item xs={4} >
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
                <p>{formik.errors.tutorName}</p>
              )}
            </Grid>
            <Grid item xs={4} >
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
                <p>{formik.errors.totalDuration}</p>
              )}
            </Grid>

            <Grid item xs={4} >
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formik.values.startDate}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.startDate && formik.touched.startDate && (
                <p>{formik.errors.startDate}</p>
              )}
            </Grid>

            <Grid item xs={12} >
              <TextField
                name="description"
                label="Course Description"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                multiline
                rows={2}
                value={formik.values.description}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
              )}
            </Grid>

            <Grid item xs={12} >
              <TextField
                name="objective"
                label="Objective"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                value={formik.values.objective}
                onChange={formik.handleChange}
                size="small"
                multiline
                rows={2}
              />
              {formik.errors.objective && formik.touched.objective && (
                <p>{formik.errors.objective}</p>
              )}
            </Grid>

            <Grid item xs={12} >
              <TextField
                name="whatYouLearn"
                label="What You Will Learn"
                variant="outlined"
                fullWidth
                color="secondary"
                margin="normal"
                value={formik.values.whatYouLearn}
                onChange={formik.handleChange}
                size="small"
                multiline
                rows={2}
              />
              {formik.errors.whatYouLearn && formik.touched.whatYouLearn && (
                <p>{formik.errors.whatYouLearn}</p>
              )}
            </Grid>

          </Grid>

          <br />
          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item>
              <AddButton onClick={formik.handleSubmit} />
            </Grid>
            <Grid item>
              <CancelButton onClick={handleReset} />
            </Grid>
            <Grid item>
              <ResetButton onClick={handleReset} />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default AddCourses;
