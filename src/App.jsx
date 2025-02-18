import {
    Box, CircularProgress, Container, List, ListItem, ListItemText, Paper,
    TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material'
import React, {useState} from 'react'
import {useStarWarData} from './data/star-war-data.js'

function App() {
    const [endpoints, setendpoints] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)

    const {data, isLoading, isError} = useStarWarData({
        searchQuery:searchQuery,
        entities:endpoints,
    })

    const handleSelection = (event, newSelection) => {
        setendpoints(newSelection)
    }

    const handleSearching = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSelectItem = (item) => {
        setSelectedItem(item)
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            {/* Top Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label="Search"
                        variant="standard"
                        value={searchQuery}
                        helperText="Query starWars db"
                        onChange={handleSearching}
                        style={{ width: '300px' }}
                    />
                    {/* Loader Indicator */}
                    {isLoading && <CircularProgress size={24} />}
                </Box>
                <ToggleButtonGroup
                    value={endpoints}
                    onChange={handleSelection}
                >
                    <ToggleButton value="planets" >
                        Planets
                    </ToggleButton>
                    <ToggleButton value="people" >
                        People
                    </ToggleButton>
                    <ToggleButton value="films" >
                        Films
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Main Content */}
            <Box display="flex" gap={3}>
                {/* Left Side: List of Suggestions */}
                <Paper style={{ flex: 1, padding: '16px', maxHeight: '600px', overflowY: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Suggestions
                    </Typography>
                    {isLoading && <Typography>Loading...</Typography>}
                    {isError && <Typography>Error fetching data</Typography>}
                    {!isLoading && !isError && (
                        <List>
                            {data?.map((item, index) => (
                                <ListItem button key={index} onClick={() => handleSelectItem(item)}>
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
    )
}

export default App