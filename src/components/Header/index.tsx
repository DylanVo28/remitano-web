import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Box, IconButton, InputAdornment} from "@mui/material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, useForm} from "react-hook-form";
import {useIsMutating, useMutation} from "react-query";
import {useMemo, useState} from "react";
import Joi from "joi";
import {
    login,
    LoginParams,
    register,
    RegisterParams,
} from "../../services/modules/auth.api";
import {ServerError} from "../../services/client/private.client";
import {useAppSelector} from "../../store/hook";
import {Link} from "react-router-dom";
import Profile from "../Profile";

interface HeaderProps {
}

type FormData = {
    username: string;
    password: string;
};

const defaultState: FormData = {
    username: "",
    password: "",
};

const schema = Joi.object({
    username: Joi.string()
        .lowercase()
        .min(3)
        // .regex(/^[a-z0-9-]+$/, "only lowercase characters, numbers and hyphens")
        .required(),
    password: Joi.string().min(6).required(),
});

const Header: React.FC<HeaderProps> = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const [showPassword, setShowPassword] = useState(false);

    const isMutating = useIsMutating();
    const isLoadingLogin = useMemo(() => isMutating > 0, [isMutating]);

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: defaultState,
        resolver: joiResolver(schema),
    });

    const {mutateAsync: loginMutation} = useMutation<void,
        ServerError,
        LoginParams>(login);

    const {mutateAsync: registerMutaion, isLoading: isLoadingRegister} =
        useMutation<void, ServerError, RegisterParams>(register);

    const onLogin = async ({username, password}: FormData) => {
        await loginMutation({username, password});
    };

    const onRegister = async ({username, password}: FormData) => {
        await registerMutaion({username, password});
    };

    const PasswordVisibility = (): React.ReactElement => {
        const handleToggle = () => setShowPassword((showPassword) => !showPassword);

        return (
            <InputAdornment position="end">
                <IconButton edge="end" onClick={handleToggle}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            </InputAdornment>
        );
    };

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                padding: "16px 0",
            }}
        >
            <Toolbar sx={{flexWrap: "wrap"}}>
                <Box sx={{flexGrow: 1}}>
                    <Link to={'/'}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{display: "flex", alignItems: "center"}}
                        >
                            <HomeIcon fontSize="large"/>
                            <Typography variant="h5" color="inherit" noWrap>
                                Funny Movies
                            </Typography>
                        </Stack>
                    </Link>
                </Box>
            {!isLoggedIn ? (
                <>
                    <nav>
                        <form>
                            <Stack direction="row" spacing={2}>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({field, fieldState}) => (
                                        <TextField
                                            autoFocus
                                            id="username"
                                            label="Username"
                                            type="text"
                                            autoComplete="current-username"
                                            size="small"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({field, fieldState}) => (
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            size="small"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            InputProps={{endAdornment: <PasswordVisibility/>}}
                                            {...field}
                                        />
                                    )}
                                />
                            </Stack>
                        </form>
                    </nav>
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={handleSubmit(onLogin)}
                        disabled={isLoadingLogin}
                        sx={{my: 1, mx: 1.5}}
                    >
                        Login
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={handleSubmit(onRegister)}
                        disabled={isLoadingRegister}
                        sx={{my: 1}}
                    >
                        Register
                    </Button>
                </>
            ) : (
                <Profile/>
            )}
        </Toolbar>
</AppBar>
)
    ;
};

export default Header;
