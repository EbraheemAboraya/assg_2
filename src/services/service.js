import http from '../http-common';

const fetchSheltersData = async () => {
    try {
        const response = await http.get('/shelters/');
        console.log('Response received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching shelters:', error);
        throw error; 
    }
};

const addShelter = async (shelterData) => {
    try {
        const response = await http.post('/shelters/add_shelter', shelterData);
        console.log('Shelter added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding shelter:', error);
        throw error; 
    }
};

const fetchShelterById = async (shelterId) => {
    try {
        const response = await http.get(`/shelters/${shelterId}`);
        console.log('Shelter fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching shelter with ID ${shelterId}:`, error);
        throw error;
    }
};

const deleteShelter = async (shelterId) => {
    try {
        const response = await http.delete(`/shelters/${shelterId}`);
        console.log('Shelter deleted successfully:', response.data);
        return response.data; // Or true to indicate success
    } catch (error) {
        console.error(`Error deleting shelter with ID ${shelterId}:`, error);
        throw error;
    }
};

const updateShelter = async (shelterId, shelterData) => {
    try {
        const response = await http.put(`/shelters/${shelterId}`, shelterData);
        console.log('Shelter updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating shelter with ID ${shelterId}:`, error);
        throw error;
    }
};

const ShelterService ={
    fetchSheltersData,
    addShelter,
    fetchShelterById,
    deleteShelter,
    updateShelter,
}

export default ShelterService ;


