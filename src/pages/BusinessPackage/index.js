import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import main_axios from "../../utilities/mainaxios";

export default function BusinessPackageList() {
    const [businessPackages, setBusinessPackages] = useState([]);

    useEffect(() => {
        const fetchBusinessPackages = async () => {
            try {
                const response = await main_axios.get('/buisness/');
                // Map the response data to match the DataGrid row structure
                const formattedData = response.data.map((item) => ({
                    id: item._id, // DataGrid requires an 'id' field
                    name: item.fullname,
                    email: item.contactemail,
                    phone: item.mobileNumber,
                    projectDescription: item.description,
                }));
                setBusinessPackages(formattedData); // Update state with formatted data
            } catch (error) {
                console.error("Error fetching business packages:", error);
            }
        };

        fetchBusinessPackages();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Mobile', width: 150 },
        { field: 'projectDescription', headerName: 'Project Description', width: 300 },
    ];

    return (
        <div className="businessPackageList">
            <Paper elevation={3} className="businessPackageListPaper">
                <div className="businessPackageListTop">
                    <Typography variant="h6" className="businessPackageListTitle">Business Packages</Typography>
                </div>
                <div className="businessPackageListContent">
                    <DataGrid
                        rows={businessPackages}
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
}
