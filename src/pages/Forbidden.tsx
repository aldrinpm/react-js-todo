import { Button, Typography } from "@mui/material";

export const Forbidden = () => {
    return (
        <div>
            <Typography variant="h6">You do not have permission to access this page.</Typography>
            <Button variant="contained" onClick={() => window.location.href = "/"}>Back to Home</Button>
        </div>
    );
};