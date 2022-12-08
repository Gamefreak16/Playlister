import Comments from './Comments.js'
import Player from './Player.js'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import { GlobalStoreContext } from '../store/index.js'
import { Box, Stack, Tabs, Typography } from '@mui/material'
import { TabsContext } from '@mui/base'
import { useContext, useState } from 'react';



export default function ViewWindow () {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let stats = {name:"?", index:"?", title:"?", artist:"?"}
    if(store.expandedList !== null && store.expandedList.length > 0){
        stats.name= store.expandedList.name
    }

    return(

        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Player" value="1" />
                <Tab label="Comments" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1" sx={{mt:'-15px'}}>
            <Box sx={{alignItems:'center', textAlign:'center', verticalAlign:'center'}}>
                <Player/>
            </Box>
            
            
            
            </TabPanel>
            <TabPanel value="2">
                <Comments>

                </Comments>
            
            
            </TabPanel>
        </TabContext>
        </Box>
    );
}