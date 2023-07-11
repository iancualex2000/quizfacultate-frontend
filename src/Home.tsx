import { Box, Button, Container } from "@mui/material"
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getQuestions } from "./features/questionSlice";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const start = () => {
        dispatch(getQuestions()).then(() => navigate('/form'))
    }

    return(
        <Container maxWidth="sm">
            <Box sx={{display: "flex", flexDirectio: "column", justifyContent: "center", margin: "2rem"}}>
                <Button variant="contained" onClick={start}>Start</Button>
            </Box>
        </Container>
    )
}