// CouponsAdd.js

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { Button, TextField, Typography, Paper, Grid } from "@mui/material";
import main_axios from "../../utilities/mainaxios";
import Swal from 'sweetalert2';

export default function CouponsAdd() {
    const { id } = useParams(); // Get the ID from the URL
    const [newCoupon, setNewCoupon] = useState({ code: '', discountValue: '', startDate: '', endDate: '' });
    const navigate = useNavigate(); // For navigation after adding coupon

    const handleAddCoupon = async () => {
        if (!newCoupon.code || !newCoupon.discountValue) {
            Swal.fire('Error!', 'Please fill out all required fields.', 'error');
            return;
        }

        try {
            const response = await main_axios.post('/coupon', { 
                code: newCoupon.code.toUpperCase(),
                discountType: 'percentage',  // Default value as per schema
                discountValue: newCoupon.discountValue,
                course: id,  // Use parentId taken from URL directly
                startDate: newCoupon.startDate || Date.now(),
                endDate: newCoupon.endDate || null,
            });
            
            Swal.fire('Success!', 'Coupon added successfully.', 'success');
            navigate('/couponsList'); // Navigate back to the coupons list
        } catch (error) {
            console.error("Error adding coupon:", error);
            Swal.fire('Error!', 'There was an error adding the coupon.', 'error');
        }
    };

    return (
        <div className="coupons-add">
            <Paper elevation={3} className="couponsPaper" style={{ padding: '20px' }}>
                <Typography variant="h6" className="couponsTitle">Add New Coupon</Typography>
                <Grid container spacing={2} className="couponsInputContainer">
                    <Grid item xs={4}>
                        <TextField
                            label="Coupon Code"
                            variant="outlined"
                            fullWidth
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Discount (%)"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={newCoupon.discountValue}
                            onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Start Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}  // Fix overlapping label
                            value={newCoupon.startDate}
                            onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="End Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}  // Fix overlapping label
                            value={newCoupon.endDate}
                            onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddCoupon} 
                    className="addCouponButton"
                    style={{ marginTop: '20px' }}  
                >
                    Add Coupon
                </Button>
            </Paper>
        </div>
    );
}
