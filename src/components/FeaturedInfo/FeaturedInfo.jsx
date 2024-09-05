import React, { useEffect, useState } from 'react';
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward, MonetizationOn, People, School, Visibility } from "@mui/icons-material";
import main_axios from '../../utilities/mainaxios'; // Adjust the import as needed
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function FeaturedInfo() {
    const [role1Count, setRole1Count] = useState(0);
    const [role0And2Count, setRole0And2Count] = useState(0);
    const [revenue, setRevenue] = useState({ current: 0, previous: 0 });

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

        fetchRole1Count();
        fetchRole2Count();
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
                    <Link to="/users" style={{ textDecoration: 'none', color: '#87CEEB'}}>
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
                    <MonetizationOn />
                </div>
                <h2 className="featuredInfoTitle">Revenue</h2>
                <div className="featuredInfoMoney">
                    <h2 className="featuredInfoMoneyTitle">${revenue.current}</h2>
                    <span className="featuredInfoText">
                        {revenue.current - revenue.previous} 
                        <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <p className="featuredInfoDescription">Compare to last month</p>
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