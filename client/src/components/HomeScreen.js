import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import ViewWindow from './ViewWindow'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { AppBar, Box, Button, Menu, MenuItem, Stack, TextField, Toolbar } from '@mui/material'
import { height } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SortIcon from '@mui/icons-material/Sort';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const menuId = 'search-song-menu';
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortName = (event) => {
        setAnchorEl(null);
        store.sortIt(function(a,b){return a.name.localeCompare(b.name)});
    }

    const sortDate = (event) => {
        setAnchorEl(null);
        store.sortIt(function(a,b){return a.list.createdAt.localeCompare(b.list.createdAt)});
    }

    const sortListen = (event) => {
        setAnchorEl(null);
        store.sortIt(function(a,b){return a.name.localeCompare(b.name)});
    }

    const sortLikes = (event) => {
        setAnchorEl(null);
        store.sortIt(function(a,b){return a.playlist.likes.localeCompare(b.playlist.likes)});
    }

    const sortDislikes = (event) => {
        setAnchorEl(null);
        store.sortIt(function(a,b){return a.playlist.dislikes.localeCompare(b.playlist.dislikes)});
    }

    // if(val === 1){
    //     store.idNamePairs.sort(function(a,b){return a.name.localCompare(b.name)})
    // }
    // else if(val === 2){
    //     store.idNamePairs.sort(function(a,b){return a.name.localCompare(b.name)})
    // }
    // else if(val === 3){
    //     store.idNamePairs.sort(function(a,b){return a.name.localCompare(b.name)})
    // }
    // else if(val === 4){
    //     store.idNamePairs.sort(function(a,b){return a.name.localCompare(b.name)})
    // }
    // else if(val === 5){
    //     store.idNamePairs.sort(function(a,b){return a.name.localCompare(b.name)})
    // }



    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }


    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '95%' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        //bar goes here
        
        <div id="playlist-selector" >
            
            <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{bgcolor:"gray", height:"50px"}} >
                <Toolbar sx={{}}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } , zIndex:1, marginLeft:'-15px' }}>
                    <Stack direction={'row'} spacing={4} sx={{mb:'5px'}}>

                    <Button ><HomeIcon fontSize='large' sx={{color:'white'}}/></Button >
                    <Button ><PersonIcon fontSize='large' sx={{color:'white'}}/></Button >
                    <Button ><GroupsIcon fontSize='large' sx={{color:'white'}}/></Button >
                    </Stack>
                    </Box>  
                    <Box sx={{ flexGrow: 1 }}></Box><TextField label="Search" sx={{bgcolor:'white', mr:'40px', mb:'5px', width:'300px'}}></TextField>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mb:'5px' }} onClick={handleMenuOpen}>
                        <Typography variant='h5' sx={{pr:'15px'}}>Sort By</Typography> <SortIcon fontSize='large' sx={{color:'white'}}/>
                    </Box>
                    
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        id={menuId}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={sortName}>Name (A-Z)</MenuItem>
                        <MenuItem onClick={sortDate}>Publish Date (Newest)</MenuItem>
                        <MenuItem onClick={sortListen}> (High - Low)</MenuItem>
                        <MenuItem onClick={sortLikes}>Likes (High - Low)</MenuItem>
                        <MenuItem onClick={sortDislikes}>Dilikes (High - Low)</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            
        </Box>
            <div id="list-selector-heading"
            style={{backgroundColor:'#95c4e453'}}>
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                size="small"
            >
                <AddIcon />
            </Fab>
                <Typography variant="h3">Your Lists</Typography>
            </div>
            <div id="list-selector-list"
            style={{backgroundColor:'#95c4e453'}}
            >
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            <div id='view-window'
            style={{backgroundColor:'#FFc4e4'}}>
                {
                    <ViewWindow/>
                }
            
            </div>
        </div>)
}

export default HomeScreen;