import { Box, Button, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; 

export const Login = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box data-name="login" sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: 1, gap: 2 }}>
            {user ? (
                <>
                    <img src={user?.photoURL || undefined} alt="user" style={{ borderRadius: "50%", width: "40px", height: "40px" }} />
                    <Typography>{`Welcome ${user?.displayName || ""}`}</Typography>
                    <Button onClick={handleLogout} variant="contained" sx={{ height: 40, borderRadius: 2 }}><Typography>Logout</Typography></Button>
                </>
            ) : (
                <Button onClick={handleLogin} variant="contained" sx={{ height: 40, borderRadius: 2 }}><Typography>Sign In With Google</Typography></Button>
            )}
        </Box>
    );
};