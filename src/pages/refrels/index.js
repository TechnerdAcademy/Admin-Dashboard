// RefrelsList.js

import { useState, useEffect } from "react";
import { Typography, Paper, Button, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2';

export default function RefrelsList() {
    const [refrels, setRefrels] = useState([]);
    const [totalUsages, setTotalUsages] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchRefrels();
    }, []);

    const fetchRefrels = async () => {
        try {
            const response = await main_axios.get('/referral/');
            setRefrels(response.data.data.referrals.map(referral => ({
                id: referral._id,
                name: referral.name,
                code: referral.code,
                mobileNumber: referral.mobileNumber,
                usages: referral.usages,
                createdAt: referral.createdAt,
                updatedAt: referral.updatedAt
            })));
            setTotalUsages(response.data.data.totalUsages);
            setCount(response.data.data.count);
        } catch (error) {
            console.error('Error fetching referrals:', error);
        }
    };

    const handleCreateRefrel = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create new referral code',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Code">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Mobile Number">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    code: document.getElementById('swal-input2').value,
                    mobileNumber: document.getElementById('swal-input3').value
                }
            }
        });

        if (formValues) {
            try {
                await main_axios.post('/referral/', formValues);
                Swal.fire('Success!', 'Referral code created successfully.', 'success');
                fetchRefrels(); // Refresh the list
            } catch (error) {
                console.error('Error creating referral code:', error);
                Swal.fire('Error!', 'Failed to create referral code.', 'error');
            }
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'code', headerName: 'Code', width: 120 },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
        { field: 'usages', headerName: 'Usages', width: 100 },
        { field: 'createdAt', headerName: 'Created At', width: 200, valueGetter: (params) => new Date(params.value).toLocaleString() },
        { field: 'updatedAt', headerName: 'Updated At', width: 200, valueGetter: (params) => new Date(params.value).toLocaleString() },
    ];

    return (
        <div className="refrels-list">
            <Paper elevation={3} className="refrelsPaper" style={{ padding: '20px' }}>
                <Typography variant="h6" className="refrelsTitle">Referrals</Typography>
                <Typography variant="subtitle1">Total Active Referrers: {count}</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCreateRefrel}
                    style={{ marginBottom: '20px', marginTop: '10px' }}
                >
                    Create Referral Code
                </Button>
                <div className="refrelsTable">
                    <DataGrid
                        rows={refrels}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                    />
                </div>
            </Paper>
        </div>
    );
}
