import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetAllShelters from './components/getShelters';
import ShelterManagement from './components/main';
import AddShelter from './components/addShelter';
import GetShelterById from './components/getshelterid';
import UpdateShelter from './components/updateShelter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ShelterManagement />} />
          <Route path="/shelterList" element={<GetAllShelters />} />
          <Route path="shelter/add" element={<AddShelter />} />
          <Route path="/shelter/:shelterId" element={<GetShelterById />} />
          <Route path="/update/:shelterId" element={<UpdateShelter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
