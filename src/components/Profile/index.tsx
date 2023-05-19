import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {logout} from "../../store/auth/authSlice";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import Stack from "@mui/material/Stack";
import {Link} from "react-router-dom";

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.username);
    const handleLogout = () => dispatch(logout());
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{display: "flex", alignItems: "center"}}
        >
            <Typography variant="subtitle2" color="inherit" noWrap>
                Welcome {username}
            </Typography>
            <Link to={'/share-movie'}>
                <Button variant="outlined" sx={{my: 1, mx: 1.5}}>
                    Share a movie
                </Button>
            </Link>
            <Link to={'/'}>
                <Button variant="outlined" sx={{my: 1}} onClick={handleLogout}>
                    Logout
                </Button>
            </Link>
        </Stack>
    );
};

export default Profile;
