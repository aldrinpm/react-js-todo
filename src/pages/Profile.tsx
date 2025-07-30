import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Forbidden } from "./Forbidden";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Typography } from "@mui/material";

interface ProfileFormData {
    position: string;
    email: string;
    address: string;
}

export const Profile = () => {
    const [user] = useAuthState(auth);
    
    const schema = yup.object().shape({
        position: yup.string().required("Position is required").max(20, "Position must be at most 20 characters long"),
        email: yup.string().email("Invalid email").required("Email is required").max(20, "Email must be at most 20 characters long")  ,
        address: yup.string().required("Address is required").max(20, "Address must be at most 20 characters long"),
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ProfileFormData) => {
        console.log(data);
    };

    if (!user) {
        return <Forbidden />;
    }

    return (
        <div>
            <h1>Profile</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Input
                        {...register("position")}
                        placeholder="Position"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    {errors.position && (
                        <Typography variant="body1" color="error">{errors.position.message}</Typography>
                    )}
                    <Input
                        {...register("email")}
                        placeholder="Email"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    {errors.email && (
                        <Typography variant="body1" color="error">{errors.email.message}</Typography>
                    )}
                    <Input
                        {...register("address")}
                        placeholder="Address"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    {errors.address && (
                        <Typography variant="body1" color="error">{errors.address.message}</Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" sx={{ height: 40, borderRadius: 2 }}>
                        <Typography variant="h6">Save</Typography>
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Profile;