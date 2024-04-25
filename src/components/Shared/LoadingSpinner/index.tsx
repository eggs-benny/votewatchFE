import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {
    return (
        <Box
            data-testid="loading-spinner"
            sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress size={64} disableShrink thickness={3} />
        </Box>
    )
}

export default LoadingSpinner;
