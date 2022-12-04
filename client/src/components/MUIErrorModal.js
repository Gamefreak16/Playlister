import { useContext } from 'react'
import AuthContext from '../auth'
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    
};

export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);

    function closedal() {
        auth.modalConfirm();
    }
    
    

    return (
        <Modal
            open={auth.isModal()}
        >
            <Box sx={style}>
                <div className="modal-dialog">

                <Alert severity='error'
                    sx={{
                        margin: 'auto',
                        fontSize: '14pt',
                      }}
                >
                
                    <AlertTitle>Error:</AlertTitle>
                    {auth.error + "\n"}
                    <br></br>
                    <Button
                        onClick={closedal}
                        variant={"outlined"}
                    >
                    Confirm
                    </Button>
                </Alert>
            </div>
            </Box>
        </Modal>
    );
}