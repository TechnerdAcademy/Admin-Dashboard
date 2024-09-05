import React, { useEffect, useState } from 'react';
import "./WidgetSm.css";
import { Visibility } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import main_axios from '../../utilities/mainaxios';

// Function to generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to get initials from the name
const getInitials = (name) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
        return nameArray[0][0] + nameArray[1][0];
    }
    return nameArray[0][0];
};

export default function WidgetSm() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await main_axios.get('/auth/last'); // Adjust the URL as needed
                setMembers(response.data);
            } catch (error) {
                console.error("Failed to fetch members", error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="widgetSm">
            <h3 className="widgetSmTitle">New Join Members</h3>
            <ul className="widgetSmList">
                {members.map((member) => (
                    <li key={member.id} className="widgetSmListItem">
                        <Avatar
                            className="widgetSmImg"
                            style={{ backgroundColor: getRandomColor() }} // Apply random background color
                            alt={member.name}
                        >
                            {getInitials(member.name)} {/* Display initials */}
                        </Avatar>
                        <div className="widgetSmUserText">
                            <span className="widgetSmUserName">{member.name}</span>
                            <span className="widgetSmUserTitle">{member.title}</span>
                        </div>
                        <div className="widgetSmButton">
                            <Link to="/users" style={{ textDecoration: 'none' }}>
                                <button className="widgetSmBtn" style={{ backgroundColor: 'transparent', border: 'none', padding: 0, color: '#87CEEB' }}>
                                    <span style={{ verticalAlign: 'bottom', marginRight: 5, color: '#87CEEB' }}>
                                        <Visibility style={{ verticalAlign: 'bottom' }} />
                                    </span>
                                    <span style={{ verticalAlign: 'bottom' }}>Display</span>
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
