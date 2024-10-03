// CouponsList.js

import { useState, useEffect } from "react";
import { Button, Typography, Paper, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function CouponsList() {
    const [coupons, setCoupons] = useState([]);
    const navigate = useNavigate(); // For navigation to add coupon page

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await main_axios.get('/coupon');
                setCoupons(response.data.map(coupon => ({
                    id: coupon._id,
                    code: coupon.code,
                    discountValue: coupon.discountValue,
                    startDate: coupon.startDate,
                    endDate: coupon.endDate,
                })));
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };

        fetchCoupons();
    }, []);

    const handleDeleteCoupon = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await main_axios.delete(`/coupon/${id}`);
                setCoupons(coupons.filter(coupon => coupon.id !== id));
                Swal.fire('Deleted!', 'The coupon has been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting coupon:", error);
                Swal.fire('Error!', 'There was an error deleting the coupon.', 'error');
            }
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'code', headerName: 'Coupon Code', width: 220 },
        { field: 'discountValue', headerName: 'Discount (%)', width: 200 },
        { field: 'startDate', headerName: 'Start Date', width: 200, valueGetter: (params) => new Date(params.value).toLocaleDateString() },
        { field: 'endDate', headerName: 'End Date', width: 150, valueGetter: (params) => params.value ? new Date(params.value).toLocaleDateString() : 'No end date' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteCoupon(params.row.id)}
                >
                    Delete
                </Button>
            )
        },
    ];

    return (
        <div className="coupons-list">
            <Paper elevation={3} className="couponsPaper" style={{ padding: '20px' }}>
                <Typography variant="h6" className="couponsTitle">Manage Coupons</Typography>
                {/* <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/coupons/add')} // Navigate to add coupon page
                    className="addCouponButton"
                    style={{ marginBottom: '20px' }}  
                >
                    Add Coupon
                </Button> */}
                <div className="couponsTable">
                    <DataGrid
                        rows={coupons}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                    />
                </div>
            </Paper>
        </div>
    );
}
