import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShelterService from '../services/service';
import { Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';

const UpdateShelterForm = () => {
    const { shelterId } = useParams();
    const navigate = useNavigate();
    const [shelterData, setShelterData] = useState({
        location: '',
        title: '',
        capacity: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShelter = async () => {
            try {
                const data = await ShelterService.fetchShelterById(shelterId);
                setShelterData(data);
            } catch (error) {
                console.error('Failed to fetch shelter data:', error);
                setError('Failed to fetch shelter data.');
            }
        };

        fetchShelter();
    }, [shelterId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShelterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ShelterService.updateShelter(shelterId, shelterData);
            navigate('/');
        } catch (error) {
            console.error('Failed to update shelter:', error);
            setError('Failed to update shelter.');
        }
    };

    return (

        <Card variant="outlined">
            <CardContent style={{ backgroundColor: '#EBEDEE' }}>
                <Typography variant="h2">Update Shelter</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Title"
                            name="title"
                            value={shelterData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Location"
                            name="location"
                            value={shelterData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Capacity"
                            type="number"
                            name="capacity"
                            value={shelterData.capacity}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <Button type="submit" variant="contained">Update Shelter</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateShelterForm;