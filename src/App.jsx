import React, { useState } from 'react';
import {
    ToggleButton,
    ToggleButtonGroup,
    Container,
    TextField,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    CircularProgress, // Import CircularProgress for the loader
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function App() {
    const [selectedButtons, setSelectedButtons] = useState([]); // Toggleable buttons state
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const [selectedItem, setSelectedItem] = useState(null); // Selected item state

    // Handle toggle button changes
    const handleButtonChange = (event, newSelection) => {
        setSelectedButtons(newSelection);
    };

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Fetch data using TanStack Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['starWarsData', selectedButtons[0], searchQuery], // Unique key for caching
        queryFn: async () => {
            if (selectedButtons.length > 0) {
                const endpoint = selectedButtons[0]; // Use the first selected button
                const response = await axios.get(`https://swapi.dev/api/${endpoint}/?search=${searchQuery}`);
                return response.data.results;
            }
            return [];
        },
        enabled: selectedButtons.length > 0, // Only fetch data if a button is selected
    });

    // Handle item selection from the list
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            {/* Top Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '300px' }}
                    />
                    {/* Loader Indicator */}
                    {isLoading && <CircularProgress size={24} />}
                </Box>
                <ToggleButtonGroup
                    value={selectedButtons}
                    onChange={handleButtonChange}
                    aria-label="data selection"
                >
                    <ToggleButton value="planets" aria-label="planets">
                        Planets
                    </ToggleButton>
                    <ToggleButton value="people" aria-label="people">
                        People
                    </ToggleButton>
                    <ToggleButton value="films" aria-label="films">
                        Films
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Main Content */}
            <Box display="flex" gap={3}>
                {/* Left Side: List of Results */}
                <Paper style={{ flex: 1, padding: '16px', maxHeight: '600px', overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Results
                    </Typography>
                    {isLoading && <Typography>Loading...</Typography>}
                    {isError && <Typography>Error fetching data</Typography>}
                    {!isLoading && !isError && (
                        <List>
                            {data?.map((item, index) => (
                                <ListItem button key={index} onClick={() => handleItemClick(item)}>
                                    <ListItemText primary={item.name || item.title} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>

                {/* Right Side: JSON Details */}
                <Paper style={{ flex: 1, padding: '16px', maxHeight: '600px', overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Details
                    </Typography>
                    <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
                </Paper>
            </Box>
        </Container>
    );
}

export default App;