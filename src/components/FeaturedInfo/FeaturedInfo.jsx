import React, { useEffect, useState } from 'react';
import "./FeaturedInfo.css";
import { ArrowDownward, MonetizationOn, People, School, Visibility } from "@mui/icons-material";
import main_axios from '../../utilities/mainaxios'; // Adjust the import as needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function FeaturedInfo() {
    const [role1Count, setRole1Count] = useState(0);
    const [role0And2Count, setRole0And2Count] = useState(0);
    const [revenue, setRevenue] = useState({ current: 0 }); // Removed previous

    useEffect(() => {
        const fetchRole1Count = async () => {
            try {
                const response = await main_axios.get('/auth/studentcount');
                setRole1Count(response.data.total);
            } catch (error) {
                console.error("Failed to fetch student count", error);
            }
        };

        const fetchRole2Count = async () => {
            try {
                const response = await main_axios.get('/auth/teacherscount');
                setRole0And2Count(response.data.total);
            } catch (error) {
                console.error("Failed to fetch teacher count", error);
            }
        };

        const fetchRevenue = async () => {
            try {
                const response = await main_axios.get('/payment/get-total-amount-accepted');
                // Set current revenue based on totalAmount from the response
                setRevenue({
                    current: parseFloat(response.data.totalAmount) || 0, // Convert to float and handle NaN
                });
            } catch (error) {
                console.error("Failed to fetch revenue", error);
            }
        };

        fetchRole1Count();
        fetchRole2Count();
        fetchRevenue(); // Call the fetchRevenue function
    }, []);

    return (
        <div className="featuredInfo">
            <div className="featuredInfoItem">
                <div className="featuredInfoIcon">
                    <People />
                </div>
                <h2 className="featuredInfoTitle">Total Number Of Students</h2>
                <div className="featuredInfoMoney">
                    <h2 className="featuredInfoMoneyTitle">{role1Count}</h2>
                </div>
                <p className="featuredInfoDescription">Number of students enrolled</p>
                <div className="featuredInfoDisplay">
                    <Link to="/users" style={{ textDecoration: 'none', color: '#87CEEB' }}>
                        <span style={{ verticalAlign: 'bottom', marginRight: 5 }}>
                            <Visibility style={{ verticalAlign: 'bottom' }} />
                        </span>
                        <span style={{ verticalAlign: 'bottom' }}>Display</span>
                    </Link>
                </div>
            </div>
            <div className="featuredInfoItem">
                <div className="featuredInfoIcon">
                    <School />
                </div>
                <h2 className="featuredInfoTitle">Total Number Of Teachers</h2>
                <div className="featuredInfoMoney">
                    <h2 className="featuredInfoMoneyTitle">{role0And2Count}</h2>
                </div>
                <p className="featuredInfoDescription">Number of teachers in the system</p>
                <div className="featuredInfoDisplay">
                    <Link to="/teachers" style={{ textDecoration: 'none', color: '#87CEEB' }}>
                        <span style={{ verticalAlign: 'bottom', marginRight: 5 }}>
                            <Visibility style={{ verticalAlign: 'bottom' }} />
                        </span>
                        <span style={{ verticalAlign: 'bottom' }}>Display</span>
                    </Link>
                </div>
            </div>
            <div className="featuredInfoItem">
                <div className="featuredInfoIcon">
                    {/* <MonetizationOn /> */}
                </div>
                <h2 className="featuredInfoTitle">Revenue</h2>
                <div className="featuredInfoMoney">
                    <h2 className="featuredInfoMoneyTitle">{revenue.current} ₹</h2> {/* Display currency */}
                    {/* Assuming you don't need previous revenue anymore */}
                    <span className="featuredInfoText">
                        {/* You can include any other relevant comparison logic here */}
                    </span>
                </div>
                <p className="featuredInfoDescription">Total revenue accepted</p>
                <div className="featuredInfoDisplay">
                    <Link to="/transactions" style={{ textDecoration: 'none', color: '#87CEEB' }}>
                        <span style={{ verticalAlign: 'bottom', marginRight: 5 }}>
                            <Visibility style={{ verticalAlign: 'bottom' }} />
                        </span>
                        <span style={{ verticalAlign: 'bottom' }}>Display</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
