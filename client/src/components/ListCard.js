import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleExpand(event){
        setExpand(!expand);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
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
    if(true){
        publish  = <><Typography>Published:</Typography><Typography>The Date</Typography></>;
        views =  <><Typography>Listens:</Typography><Typography sx={{pr:'80px'}}>Number</Typography></>;
    }


    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            // sx={{ marginTop: '8px', display: 'flex', p: 1, bgcolor:'background.paper',border: 'thick double gray', borderRadius: '20px' }}
            // style={{ width: '100%', fontSize: '48pt' }}
            className={"list-card"}

            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
            <Card sx={{width:'200%'}}>
                <CardContent>
                <Typography variant="h4" component="div">
                {idNamePair.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                author:
                </Typography>

                </CardContent>
                {/* //render when true */}
                {/* {accordion} */}
                <div><Accordion expanded={expand} disableGutters={true} elevation={0} sx={{border:0, backgroundColor:"white"}}>
        <AccordionSummary sx={{display:'none'}} disableGutters={true} disabled={true}></AccordionSummary>
        <AccordionDetails>Hello world</AccordionDetails>
        </Accordion></div>
                <Stack direction='row' spacing={"auto"} justifyContent="center">
                    <Stack direction={'row'} sx={{pl:'10px'}}>
                        
                        {publish}
                    </Stack>
                    <Stack direction={'row'} sx={{pr:'20px'}}>
                        {views}
                        <Button onClick={handleExpand} sx={{mt:'-7px'}}>
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

    if (editActive) {
        cardElement =
            <TextField
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
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;