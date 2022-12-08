import { GlobalStoreContext } from '../store/index.js'
import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { Box, Button, Stack, Typography } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


export default function Player () {
    const { store } = useContext(GlobalStoreContext);
    const [stats, setStats] = useState({name:"?", index:"?", title:"?", artist:"?"})
    const [vid, setVid] = useState(null);
    const [currentSong, setCurrent] = useState(0);

    // let currentSong = 0
    if(store.expandedList !== null){
        console.log(store.expandedList.songs)

        
        
    }
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

    const playerOptions = {
        height: '300',
        width: '500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    let currentS = [];
    if(store.expandedList !== null){
        store.expandedList.songs.forEach(element => currentS.push(element.youTubeId));
        
    }

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = null;
        if(store.expandedList !== null && store.expandedList.songs.length > 0 && currentSong< store.expandedList.songs.length && currentSong > -1){
            song = store.expandedList.songs[currentSong].youTubeId
            stats.name = store.expandedList.name;
            setStats({name:store.expandedList.name, index:(currentSong+1), title:store.expandedList.songs[currentSong].title, artist:store.expandedList.songs[currentSong].artist})
        }
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        if(store.expandedList !== null && store.expandedList.songs.length > 0 && currentSong< store.expandedList.songs.length-1)
        // currentSong++;
        setCurrent(currentSong+1);
        //currentSong = currentSong % playlist.length;
    }

    function nextSong(event){
        console.log(currentSong)
        if(store.expandedList !== null && store.expandedList.songs.length > 0 && currentSong< store.expandedList.songs.length-1)
        // currentSong++;
        setCurrent(currentSong+1);
        console.log(currentSong)
        loadAndPlayCurrentSong(vid)
    }

    function prevSong(event){
        console.log(currentSong)
        if(store.expandedList !== null && store.expandedList.songs.length > 0 && currentSong > 0)
        // currentSong--;
        setCurrent(currentSong-1)
        console.log(currentSong)
        loadAndPlayCurrentSong(vid)
    }

    function playSong(event){
        vid.playVideo();
    }

    function stopSong(event){
        vid.pauseVideo();
    }

    function onPlayerReady(event) {
        console.log("Here!")
        setVid(event.target)
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return <Box><YouTube
        videoId={currentS[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'left', textAlign:'left', }}>
            <Typography>Playlist: {stats.name}</Typography>
            <Typography>Song #: {stats.index}</Typography>
            <Typography>Title: {stats.title}</Typography>
            <Typography>Artist: {stats.artist}</Typography>
            </Box>

            <Box sx={{alignItems:'center', textAlign:'center', verticalAlign:'middle'}}>
                <Stack direction={'row'} sx={{alignItems:'center', textAlign:'center', verticalAlign:'middle'}}>
                   <Button onClick={prevSong}> <FastRewindIcon fontSize='large' /> </Button>
                   <Button onClick={stopSong}> <StopIcon fontSize='large'/></Button>
                    <Button onClick={playSong} >  <PlayArrowIcon fontSize='large'/></Button>
                    <Button onClick={nextSong} >   <FastForwardIcon fontSize='large'/></Button>
                    
                </Stack>
            </Box>
        </Box>


}

