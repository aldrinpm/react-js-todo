import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { auth } from "../config/firebase";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    return (
        <Box component="nav" sx={{ display: "flex", flexDirection: "row", padding: 2, backgroundColor: "#f0f0f0", boxShadow: 1, width: "100%" }}>
            <Box sx={{ backgroundColor: "#a6a6aa", borderRadius: 2, padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Box data-name="links" sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                    <Link to={"/"}><Typography variant="h6">Home</Typography></Link>
                    {user && (
                        <>
                            <Link to={"/todo"}><Typography variant="h6">Todo</Typography></Link>
                            <Link to={"/profile"}><Typography variant="h6">Profile</Typography></Link>
                        </>
                    )}
                </Box>
                <Login />
            </Box>
        </Box>
    );
}