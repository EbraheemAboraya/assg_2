import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShelterService from '../services/service';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const ShelterById = () => {
    const { shelterId } = useParams(); // Access the shelterId parameter from the URL
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getShelter = async () => {
            setLoading(true);
            try {
                const data = await ShelterService.fetchShelterById(shelterId);
                setShelter(data);
            } catch (error) {
                setError(`Failed to fetch shelter: ${error.message || error.toString()}`);
            } finally {
                setLoading(false);
            }
        };

        if (shelterId) {
            getShelter();
        }
    }, [shelterId]);

    if (loading) return <div>Loading shelter data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!shelter) return <div>No shelter found</div>;

    return (
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h2" gutterBottom>Shelter Details</Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Location:</strong> {shelter.location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Title:</strong> {shelter.title}
                </Typography>
                <Typography variant="body1">
                    <strong>Capacity:</strong> {shelter.capacity}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ShelterById;
