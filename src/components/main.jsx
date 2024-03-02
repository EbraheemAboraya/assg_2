import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ShelterManagement() {
    return (
        <div>
            <div className="shelter-management-container">
                <div className="header">
                    <h1>Welcome to Emergency Shelter Management</h1>
                    <h3>Here you can find and manage emergency shelters for people in need during crises or disasters.</h3>
                </div>
                <div className="main-content">
                </div>

            </div>
            <div className="button-section">
                <Link to="/shelterList">
                    <button className="shelter-button">View List of Shelters</button>
                </Link>
                <Link to="/shelter/add">
                    <button className="shelter-button">Add Shelter</button>
                </Link>
            </div>
        </div>
    );
}

export default ShelterManagement;
