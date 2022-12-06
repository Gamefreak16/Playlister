import { useContext, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AddIcon from '@mui/icons-material/Add';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const handleKeyPress = useCallback((event) => {
        if(event.key === 'z' && event.ctrlKey && store.currentSongIndex === -1){
            store.undo();
        }
        if(event.key === 'y' && event.ctrlKey && store.currentSongIndex === -1){
            store.redo();
        }
      }, []);
    
      useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // remove the event listener
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleAddNewSong() {
        store.addNewSong();
    }
    useEffect(()=>{
        if(store.currentList === null){
            store.history.push('/')
        }
    }, [store.currentList])
    console.log("Local List is" + store.currentList);
    if(store.currentList !== null){
    return (
       
        <Box>
        <List 
            id="playlister-workspace" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}} className={"list-card unselected-list-card"}
            id={'addSong'}
            onClick={handleAddNewSong}
            >  
            <AddIcon fontSize='medium'/>
            </Box>
         </List>            
         { modalJSX }
         </Box>
    )
    }
    else{return null}
}

export default WorkspaceScreen;