import React, { useState } from "react";
import { Paper, Button, Typography, TextField, Grid } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2'; // Import SweetAlert2
import Header from "../../utilities/Header";

export default function AddTeacher() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await main_axios.post('/auth/register', {
                name,
                email,
                mobile,
                password,
                role_id: 2, // hidden from the user
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Teacher added successfully.',
            }).then(() => {
                // Redirect to TeacherList page after showing the success message
                window.location.href = "/teachers";
            });
        } catch (error) {
            let errorMessage = 'Error adding teacher. Please try again.';
            
            // Check if the error has a response object and a data property
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
            console.error("Error adding teacher:", error);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Header
        title="Add Teachers"
        breadcrumbItems={[
        //   { title: "Courses List", url: "/courses" },
          { title: "", url: "" },
        ]}
        titleMarginRight="270px"
      />
            <Paper elevation={3} style={{ padding: 20, backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Add Teacher</Typography>
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
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 20 }}>Add Teacher</Button>
                    </form>
                </div>
            </Paper>
        </div>
    );
}
