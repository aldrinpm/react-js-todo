import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Forbidden } from "./Forbidden";

export const Profile = () => {

    const [user] = useAuthState(auth);
    
    if (!user) {
        return <Forbidden />;
    }
    
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;