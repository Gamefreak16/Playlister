import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import AuthContext from '../auth'

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    function guest(){
        auth.loginGuest();
    }

    return (
        <div id="splash-screen">
            
            <img src='listerlogo.png' alt='Help'/>
            <Box sx={{fontSize:'40pt', fontStyle: 'italic', textDecoration: 'underline', marginTop:'-20px'}}>
            <div>
            Welcome to playlister!
            </div>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24pt', 
                        fontStyle: 'italic', marginTop:'5px', width:'100%' }}>
            Create, play and share playlists with others! Explore and listen<br/>to playlists created by other users, and leave reviews!
            </Box>
            <Box sx={{ flexGrow: 1, }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                <Button disableElevation sx={{background:'linear-gradient(138deg, #77A5EE,#FCECFE)', 
                    marginTop:'10px', marginLeft:'30%', height:'100px', width:'200px'}} href='/login/'>
                <Typography sx={{font: ' 0.9em "Times New Roman", Lexend Exa', fontSize:'25pt',fontStyle:'italic'}}>Login</Typography>
                </Button>
                </Grid>
                <Grid item xs={6}>
                <Button disableElevation sx={{background:'linear-gradient(204deg, #77A5EE,#FCECFE)', 
                    marginTop:'10px', marginLeft:'-30%', height:'100px', width:'200px'}} onClick={guest}>
                <Typography sx={{font: ' 0.9em "Times New Roman", Lexend Exa', fontSize:'22pt', fontStyle:'italic'}}>Continue As Guest</Typography>

                </Button>
                </Grid>
                <Grid item xs={12}>
                <Button disableElevation sx={{ background:'linear-gradient(0deg, #77A5EE,#FCECFE)', 
                    marginTop:'10px', height:'100px', width:'200px'}} href='/register/'>
                <Typography sx={{font: ' 0.9em "Times New Roman", Lexend Exa', fontSize:'22pt', fontStyle:'italic'}} >Create Account</Typography>
                </Button>
                </Grid>
            </Grid>
            </Box>
            
            <Box sx={{fontSize:'10pt', fontStyle: 'italic', textDecoration: 'underline', marginTop:'20px'}} >
                App Created By Jake Hoffman
            </Box>
        </div>
    )
}