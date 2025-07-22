import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <Box component="nav" sx={{ display: "flex", flexDirection: "row", padding: 2, backgroundColor: "#f0f0f0", boxShadow: 1, width: "100%" }}>
            <Box sx={{ backgroundColor: "#a6a6aa", borderRadius: 2, padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box data-name="links" sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                    <Link to={"/"}><Typography variant="h6">Home</Typography></Link>
                    <Link to={"/todo"}><Typography variant="h6">Todo</Typography></Link>
                    <Link to={"/profile"}><Typography variant="h6">Profile</Typography></Link>
                </Box>
                <Box data-name="login" sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: 1, gap: 2 }}>
                    <Button variant="contained" sx={{ height: 40, borderRadius: 2 }}><Typography>Login</Typography></Button>
                    <Typography>Welcome User</Typography>
                    <Button variant="contained" sx={{ height: 40, borderRadius: 2 }}><Typography>Logout</Typography></Button>
                </Box>
            </Box>
        </Box>
    );
}