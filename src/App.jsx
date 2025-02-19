import {
    AppBar, Box, Container, List, ListItem, ListItemText, Typography,
} from '@mui/material'
import {Eclipse, Film, Users} from "lucide-react"
import React, {useState} from 'react'
import {Card} from './components/my-card-components.jsx'
import ResponsiveBox from './components/my-responsive-box.jsx'
import {SearchTextField} from './components/my-search-component.jsx'
import {Toggles} from './components/my-toggles-components.jsx'
import {useStarWarData} from './data/star-wars-data.js'

function App () {
    const [endpoints, setendpoints] = useState(['planets', 'people', 'films'])
    // const [endpoints, setendpoints] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)

    const {data, isLoading, isError} = useStarWarData({
        searchQuery: searchQuery,
        entities: endpoints,
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
        <Box sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <AppBar position="static" sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
            }}>
                {/*Logo Image*/}
                <Box component="img"
                     src="/starwars-db-icon-no-bg.svg"
                     sx={{width: '2em'}}
                     alt="Logo"
                />
                <Typography variant="h5" color="primary">
                    StarWars DB
                </Typography>
            </AppBar>

            {/* Main Content */}
            <Container component="main" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flex: 1,
            }}>
                <Box sx={{textAlign: "center"}}>
                    <Typography variant="h2" component="h1" color="primary"
                                gutterBottom>
                        Explore the Galaxy Far, Far Away
                    </Typography>
                    <Typography variant="h5" component="p"
                                color="text.secondary" paragraph>
                        Your ultimate source for Star Wars information
                    </Typography>
                </Box>

                <Box display="flex" gap={2} sx={(theme)=>({
                    position:'sticky',
                    top:'2em',
                    zIndex:1,
                    background:theme.palette.background.default
                })}>
                    <SearchTextField
                        isLoading={isLoading}
                        fullWidth
                        variant="outlined"
                        placeholder="Search the database for planets, people and films"
                        value={searchQuery}

                        onChange={handleSearching}
                    />
                    <Toggles
                        value={endpoints}
                        onChange={handleSelection}
                        options={[{
                            value: 'planets',
                            label: <Eclipse/>,
                            title: 'Planets',
                        }, {
                            value: 'people',
                            label: <Users/>,
                            title: 'People',
                        }, {
                            value: 'films',
                            label: <Film/>,
                            title: 'Films',
                        }]}
                    />
                < /Box>
                <ResponsiveBox>

                    {/* Left Side: List of Suggestions */}
                    <Card header="Result" >
                        {isLoading &&
                            <Typography>Loading...</Typography>}
                        {isError &&
                            <Typography>Error fetching
                                data</Typography>}

                        {data && (
                            <List>
                                {data?.map((item, index) => (
                                    <ListItem
                                        sx={{cursor: 'pointer'}}
                                        component="li"
                                        key={index}
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        <ListItemText
                                            primary={item.name || item.title}/>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Card>

                    {/* Right Side: JSON Details */}
                    <Card header="Details" show={!!data} >
                        {
                            selectedItem ?
                                <pre>{JSON.stringify(selectedItem, null, 2)}</pre> :
                                <Typography>Select item from the result list to
                                    see more details</Typography>
                        }
                    </Card>
                </ResponsiveBox>
            </Container>
        </Box>
    )
}

export default App