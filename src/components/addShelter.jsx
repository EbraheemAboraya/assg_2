import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShelterService from '../services/service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddShelterForm = () => {
    const navigate = useNavigate();

    const initialShelterData = {
        location: '',
        title: '',
        capacity: '',
    };

    const [shelterData, setShelterData] = useState(initialShelterData);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setShelterData({ ...shelterData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ShelterService.addShelter(shelterData);
            console.log('Shelter added successfully!');
            setShelterData(initialShelterData);
            navigate('/');
        } catch (error) {
            console.error('Failed to add shelter:', error);
        }
    };
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}>
            <h2>Add Shelter</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Location"
                    variant="outlined"
                    name="location"
                    value={shelterData.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={shelterData.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Capacity"
                    variant="outlined"
                    type="number"
                    name="capacity"
                    value={shelterData.capacity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"

                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '40px' }}>
                    Add Shelter
                </Button>
            </form>
        </div>
    );
};

export default AddShelterForm;
