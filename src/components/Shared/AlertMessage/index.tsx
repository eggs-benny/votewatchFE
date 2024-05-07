import { 
    Alert,
    AlertColor,
    Box,
    IconButton,
    Fade 
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

export interface AlertMessageState {
    message: string,
    severity: AlertColor
}

interface AlertMessageProps 
    {showAlertMessage: boolean, alertMessage: AlertMessageState, setShowAlertMessage: Function}


const AlertMessage = ({showAlertMessage, alertMessage, setShowAlertMessage}: AlertMessageProps) => {
    return (
        <Box 
            display="flex" 
            justifyContent="center"
            alignItems="center" 
            sx={{
                position: 'fixed',
                top: "90px",
                ml: "auto",
                mr: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: showAlertMessage ? 99999 : -9,
            }}
        >
            <Fade in={showAlertMessage} timeout={500} unmountOnExit={false}>
                <Alert
                    icon={<InfoIcon fontSize="inherit" color="inherit" />}
                    severity={alertMessage.severity}
                    sx={{
                        color: "black",
                        mt: "5px",
                        mx: "40px",
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowAlertMessage(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {alertMessage.message}
                </Alert>
            </Fade>
        </Box>
    )
}

export default AlertMessage;
