import { Box, CircularProgress } from "@mui/material"


export const Spinner = () => {
    return(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20%"
            }}
        >
            <CircularProgress size="4rem" color="primary"/>
        </Box>
    )
}