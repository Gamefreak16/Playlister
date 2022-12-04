import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';
import Box from '@mui/material/Box';



/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    if(store.currentList !== null && auth.loggedIn === true){
        return (
            <Box id="playlister-statusbar">
                <Typography variant="h4">{text}</Typography>
            </Box>
        );
    }
    else{return null}

}

export default Statusbar;