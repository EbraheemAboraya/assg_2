import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, IconButton, Paper } from '@mui/material';
import { MdDelete, MdUpdate } from 'react-icons/md';
import ShelterService from '../services/service';
import '../App.css';
const GetAllShelters = () => {
    const [shelterList, setShelterList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const data = await ShelterService.fetchSheltersData();
                setShelterList(data);
                console.log('Fetched data:', data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch shelter data.');
            }
        };

        fetchShelters();
    }, []);

    const handleDelete = async (shelterId) => {
        try {
            await ShelterService.deleteShelter(shelterId);
            const updatedShelters = shelterList.filter(shelter => shelter._id !== shelterId);
            setShelterList(updatedShelters);
            console.log(`Shelter with ID ${shelterId} deleted.`);
        } catch (error) {
            console.error('Failed to delete shelter:', error);
            setError('Failed to delete shelter.');
        }
    };

    return (
        <div className="shelter-container">
            <Typography variant="h1" gutterBottom className="shelter-title">Shelters</Typography>
            <div className="shelter-list">
                {shelterList.map((shelter) => (
                    <Paper key={shelter._id} elevation={3} className="shelter-card">
                        <div className="shelter-info">
                            <img src="/image/A5191.png" alt="Shelter Image" className="shelter-image" />
                            <Typography variant="body1"><strong>Title:</strong> {shelter.title}</Typography>
                            <Typography variant="body1"><strong>Location:</strong> {shelter.location}</Typography>
                            <Typography variant="body1"><strong>Capacity:</strong> {shelter.capacity}</Typography>
                        </div>
                        <div className="action-buttons">
                            <Link to={`/update/${shelter._id}`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" startIcon={<MdUpdate />}>Update</Button>
                            </Link>
                            <IconButton color="error" onClick={() => handleDelete(shelter._id)} aria-label="delete">
                                <MdDelete />
                            </IconButton>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default GetAllShelters;
