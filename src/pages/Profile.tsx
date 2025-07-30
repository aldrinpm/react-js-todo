import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../config/firebase";
import { Forbidden } from "./Forbidden";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Snackbar, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MyDB } from "../config/indexedDb";

interface ProfileFormData {
    id: string;
    position: string;
    email: string;
    address: string;
}

export const Profile = () => {
    const [user] = useAuthState(auth);
    const [profileData, setProfileData] = useState({} as ProfileFormData);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    const schema = yup.object().shape({
        id: yup.string().optional().default(user?.uid || "unknown"),
        position: yup.string().required("Position is required").max(20, "Position must be at most 20 characters long"),
        email: yup.string().email("Invalid email").required("Email is required").max(20, "Email must be at most 20 characters long")  ,
        address: yup.string().required("Address is required").max(20, "Address must be at most 20 characters long"),
    });
    
    const { register, handleSubmit, formState: { errors }, reset, setValue  } = useForm<ProfileFormData>({
        resolver: yupResolver(schema),
    });

    const profileCollection = collection(firestoreDb, "profile");
    
    const indexedDBupdate = (data: ProfileFormData) => {
        const db = new MyDB();
        db.profile.toArray().then(profiles => {
            if (profiles.length > 0) {
                db.profile.update(profiles[0].id, data);
                setSnackbarMessage(`Profile updated: ${profiles[0].id}`);
                setSnackbarOpen(true);  
            } else {
                db.profile.add(data);
                setSnackbarMessage(`Profile added: ${data.id}`);
                setSnackbarOpen(true);
            }
        });
    };

    const onSubmit = (data: ProfileFormData) => {
        // query using dexie from profileDB where id is not null
        indexedDBupdate(data);
    };

    // get profile from Cloud Firestore from the collection named profile
    const getProfile = async () => {
        const querySnapshot = await getDocs(profileCollection);
        const profiles = {
            id: querySnapshot.docs[0].id,
            position: querySnapshot.docs[0].data().position,
            email: querySnapshot.docs[0].data().email,
            address: querySnapshot.docs[0].data().address,
        }

        setProfileData(profiles);
    };

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (profileData) {
            // clear the form
            reset();
            // update form
            setValue("position", profileData?.position);
            setValue("email", profileData?.email);
            setValue("address", profileData?.address);

            // update indexedDb
            indexedDBupdate(profileData);
        }
    }, [profileData]);

    if (!user) {
        return <Forbidden />;
    }

    return (
        <Box>
            <h1>Profile</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Typography variant="h6">Position</Typography>
                        <Input
                            {...register("position")}
                            placeholder="Position"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    </Box>
                    {errors.position && (
                        <Typography variant="body1" color="error">{errors.position.message}</Typography>
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Typography variant="h6">Email</Typography>
                        <Input
                        {...register("email")}
                        placeholder="Email"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    </Box>
                    {errors.email && (
                        <Typography variant="body1" color="error">{errors.email.message}</Typography>
                    )}
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Typography variant="h6">Address</Typography>
                        <Input
                        {...register("address")}
                        placeholder="Address"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    </Box>
                    {errors.address && (
                        <Typography variant="body1" color="error">{errors.address.message}</Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" sx={{ height: 40, borderRadius: 2 }}>
                        <Typography variant="h6">Save</Typography>
                    </Button>
                </Box>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Profile;