import { GlobalStoreContext } from '../store/index.js'
import React, { useContext, useState } from 'react'
import { Box, ListItem, Typography } from '@mui/material';


export default function CommentCard (props) {
    const { store } = useContext(GlobalStoreContext);
    const { comm, index } = props;
    console.log(comm)
    return(

        <Box
            key={index}
            id={'song-' + index + '-card'}
            className={"comment-card"}
            bgcolor='peachpuff'
        >
            <Typography>
                {comm.username}
            </Typography>
            <Typography>
                {comm.text}
            </Typography>
        </Box>






    )

}

