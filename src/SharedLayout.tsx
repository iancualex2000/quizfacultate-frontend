import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"


export const SharedLayout = () => {
    return(
        <>
            <Typography variant="h2" textAlign="center">Grile Licenta</Typography>
            <Outlet/>
        </>
    )
}