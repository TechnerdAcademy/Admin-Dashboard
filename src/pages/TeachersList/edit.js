import React, { useState, useEffect } from "react";
import { Paper, Button, Typography, TextField, Grid } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom"; // For fetching the teacher ID from the URL
import Header from "../../utilities/Header";

export default function EditTeacher() {
    const { id } = useParams(); // Fetch teacher ID from the URL
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    // Fetch the current teacher's data on page load
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await main_axios.get(`/teachers/${id}`);
                const { name, email, mobile } = response.data;
                setName(name);
                setEmail(email);
                setMobile(mobile);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load teacher data.',
                });
                console.error("Error fetching teacher data:", error);
            }
        };

        fetchTeacherData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await main_axios.put(`/teachers/${id}`, {
                name,
                email,
                mobile,
                password, // Optionally update the password
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Teacher updated successfully.',
            }).then(() => {
                // Redirect to TeacherList page after showing the success message
                window.location.href = "/teachers";
            });
        } catch (error) {
            let errorMessage = 'Error updating teacher. Please try again.';

            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            });
            console.error("Error updating teacher:", error);
        }
    };

    return (
        <div style={{ padding: 20 }}>
             <Header
        title="Edit Teachers"
        breadcrumbItems={[
        //   { title: "Courses List", url: "/courses" },
          { title: "", url: "" },
        ]}
        titleMarginRight="270px"
      />
            <Paper elevation={3} style={{ padding: 20, backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Edit Teacher</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mobile"
                                    value={mobile}
                                    onChange={(event) => setMobile(event.target.value)}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                    placeholder="Leave empty to keep current password"
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 20 }}>Update Teacher</Button>
                    </form>
                </div>
            </Paper>
        </div>
    );
}
