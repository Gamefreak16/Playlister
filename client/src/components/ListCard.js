import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, List, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkspaceScreen from './WorkspaceScreen';
import EditToolbar from './EditToolbar';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [expand, setExpand] = useState(false);
    const [localList, setLocalList] = useState(null);
    const [published, setPublished] = useState(false);

    function handleLoadList(event, id) {
        
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            //store.setCurrentList(id);
            // console.log("Local List is" + store.currentList);
            // setLocalList(store.currentList);
            
        }
    }
    // if(selected){
    //     setExpand(true);
    // }
    // else{
    //     setExpand(false);
    // }
    // useEffect(()=>{
    //     setExpand(false)

    // }, [store.currentList])
    

    function handleExpand(event, id){
        
        event.stopPropagation();
        
        console.log("handleLoadList for " + id);
        // store.closeCurrentList();
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            store.clearTrans();
            
            // CHANGE THE CURRENT LIST
            if(store.currentList !== null){
                if(store.currentList._id === idNamePair._id){
                    console.log("hereo")
                    store.closeCurrentList();
                }
                else{
                    store.setCurrentList(id);
                }
                
            }
            else{
                
                store.setCurrentList(id);
            }
        }
        
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handleToggleEdit(event) {
        if(event.detail === 2){
            event.stopPropagation();
            toggleEdit();
        }
    }


    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let publish = null;
    let views = null;
    //Implement when publish
    if(false){
        publish  = <><Typography>Published:</Typography><Typography>The Date</Typography></>;
        views =  <><Typography>Listens:</Typography><Typography sx={{pr:'80px'}}>Number</Typography></>;
    }
    let tools = <>
    <Stack direction={'row'} spacing={4} justifyContent="center" sx={{ml:'20px', pb:'20px'}}>
        <Button 
            disabled={!store.canUndo()}
            id='undo-button'
            onClick={handleUndo}
            variant="contained">
                Undo
        </Button>
        <Button 
            disabled={!store.canRedo()}
            id='redo-button'
            onClick={handleRedo}
            variant="contained">
                Redo
        </Button>


        <Button 
            disabled={!store.canRedo()}
            id='redo-button'
            //onClick={handleRedo}
            variant="contained">
                Publish
        </Button>
        <Button 
            //disabled={!store.canRedo()}
            id='redo-button'
            onClick={(event) => {
                handleDeleteList(event, idNamePair._id)
            }}
            variant="contained">
                Delete
        </Button>
        <Button 
            disabled={!store.canRedo()}
            id='redo-button'
            //onClick={handleRedo}
            variant="contained">
                Duplicate
        </Button>
    </Stack>
</>;
    

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            // sx={{ marginTop: '8px', display: 'flex', p: 1, bgcolor:'background.paper',border: 'thick double gray', borderRadius: '20px' }}
            // style={{ width: '100%', fontSize: '48pt' }}
            className={"list-card"}

            onClick={(event) => {
                // handleLoadList(event, idNamePair._id)
                handleToggleEdit(event)
            }}
        >
            <Card sx={{width:'200%'}}>
                <CardContent>
                {editActive ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id={"list-" + idNamePair._id}
                                label="Playlist Name"
                                name="name"
                                autoComplete="Playlist Name"
                                className='list-card'
                                onKeyPress={handleKeyPress}
                                onChange={handleUpdateText}
                                defaultValue={idNamePair.name}
                                inputProps={{style: {fontSize: 24}}}
                                InputLabelProps={{style: {fontSize: 24}}}
                                autoFocus
                            /> :
                    <Typography variant="h4" component="div">
                    {idNamePair.name}
                    </Typography>
                }
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                author: {idNamePair.list.Username}
                </Typography>

                </CardContent>
                {/* //render when true */}
                {/* {accordion} */}
                <div><Accordion expanded={store.currentList !== null ? store.currentList._id === idNamePair._id : false} disableGutters={true} elevation={0} sx={{border:0, backgroundColor:"white"}}>
        <AccordionSummary sx={{display:'none'}} disableGutters={true} disabled={true}></AccordionSummary>
        <AccordionDetails sx={{height:'250px'}}>
            {/* <List dense={'dense'}>
            // {/* {
            //     localList ?    
            //         localList.songs.map((song, index) => (
            //             <ListItem key={index}>
            //                 <ListItemText primary={'Helo'}/>
            //             </ListItem>
            //         ))  : <p>helo</p>
                
            // } */}
                
            {/* </List> */}
            <WorkspaceScreen/>
        </AccordionDetails>
            
        </Accordion></div>
            {store.currentList !== null ? store.currentList._id === idNamePair._id  ? 
                <Stack direction={'row'}>
                    {tools}
                </Stack> 
                : null 
            :null}
        
                <Stack direction='row' spacing={"auto"} justifyContent="center">
                    <Stack direction={'row'} sx={{pl:'10px'}}>
                        
                        {publish}
                    </Stack>
                    <Stack direction={'row'} sx={{pr:'20px'}}>
                        {views}
                        <Button onClick={(event) => {handleExpand(event, idNamePair._id)}} sx={{mt:'-7px'}}>
                            <KeyboardArrowDownIcon/>
                        </Button>
                    </Stack>
                </Stack>
                {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box> */}
            </Card>
        </ListItem>

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + idNamePair._id}
    //             label="Playlist Name"
    //             name="name"
    //             autoComplete="Playlist Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             defaultValue={idNamePair.name}
    //             inputProps={{style: {fontSize: 48}}}
    //             InputLabelProps={{style: {fontSize: 24}}}
    //             autoFocus
    //         />
    // }
    return (
        cardElement
    );
}

export default ListCard;