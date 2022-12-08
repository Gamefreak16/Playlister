import CommentCard from './CommentCard.js'

import { GlobalStoreContext } from '../store/index.js'
import { Box, List, Stack, TextField } from '@mui/material'
import { useContext, useState } from 'react';



export default function CommentList () {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let her = text;
            setText("")
            store.newComment(text);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    return(

        <Box sx={{height:'80%'}}>
        {store.expandedList !== null ? <>
        <List 
            id="playlister-workspace" 
            
            sx={{ display:'flex', maxHeight:'50%'}}
        ><Stack>
            {
                store.expandedList.comments.map((comm, index) => (
                    <CommentCard
                        id={'comment-' + (index)}
                        key={'comment-' + (index)}
                        index={index}
                        comm={comm}
                    />
                ))  
            }
            </Stack>
        </List>  
        <TextField label="Comment" 
                    value={text}
                    disabled={store.expandedList === null || !store.expandedList.published}
                    defaultValue={""} 
                    sx={{bgcolor:'white', mr:'40px', width:'50%', height:'55px', position:'absolute', bottom:'20px'}}
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    inputProps={{style: {fontSize: 18}}}
                    InputLabelProps={{style: {fontSize: 24}}}
                    variant="filled"
                    >
        </TextField> 
     </> 
     : null    
    
    }       
         </Box>






    )

}

