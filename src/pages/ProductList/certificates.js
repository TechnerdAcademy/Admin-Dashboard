import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2';

export default function AddCertificate() {
    const { id } = useParams();  // Get the course ID from the URL
    const navigate = useNavigate();

    const [certificate, setCertificate] = useState({
        certification: '',
        hoursOfLearning: '',
        resources: [''],
        internshipOpportunity: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCertificate((prevCertificate) => ({
            ...prevCertificate,
            [name]: value
        }));
    };

    const handleResourceChange = (index, value) => {
        const updatedResources = [...certificate.resources];
        updatedResources[index] = value;
        setCertificate((prevCertificate) => ({
            ...prevCertificate,
            resources: updatedResources
        }));
    };

    const handleAddResource = () => {
        setCertificate((prevCertificate) => ({
            ...prevCertificate,
            resources: [...prevCertificate.resources, '']
        }));
    };

    const handleRemoveResource = (index) => {
        const updatedResources = certificate.resources.filter((_, i) => i !== index);
        setCertificate((prevCertificate) => ({
            ...prevCertificate,
            resources: updatedResources
        }));
    };

    const handleCheckboxChange = (e) => {
        setCertificate((prevCertificate) => ({
            ...prevCertificate,
            internshipOpportunity: e.target.checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await main_axios.post('courses/included/', {
                ...certificate,
                parentId: id // Add parentId to the request body
            });
            Swal.fire({
                title: 'Success!',
                text: 'Certificate added successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate(`/course`);  // Redirect to course page after success
            });
        } catch (error) {
            console.error("Error adding certificate:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding the certificate.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
        
    

    return (
        <div className="addCertificate">
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h5" style={{ marginBottom: '20px' }}>Add Certificate</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Certification"
                        name="certification"
                        fullWidth
                        value={certificate.certification}
                        onChange={handleInputChange}
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Hours of Learning"
                        name="hoursOfLearning"
                        type="number"
                        fullWidth
                        value={certificate.hoursOfLearning}
                        onChange={handleInputChange}
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <Typography variant="subtitle1">Resources</Typography>
                    {certificate.resources.map((resource, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                label={`Resource ${index + 1}`}
                                value={resource}
                                onChange={(e) => handleResourceChange(index, e.target.value)}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleRemoveResource(index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button variant="contained" onClick={handleAddResource} style={{ marginBottom: '20px' }}>
                        Add Resource
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={certificate.internshipOpportunity}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Internship Opportunity"
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}
