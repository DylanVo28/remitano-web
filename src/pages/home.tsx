import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {fetchVideos} from "../services/modules/auth.api";
// import useWebSocket from "react-use-websocket";
import {socket} from "../socket";
import Stack from "@mui/material/Stack";
import ReadMore from "../components/ReadMore";
import toast from "react-hot-toast";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
// const WS_URL = 'wss://remitano-service-production.up.railway.app/notifications';

export default function Pricing() {
    const [movies, setMovies] = useState<any>([])
    socket.on('connect',()=>console.log('hello ae page home'))
    socket.on('receive_create_video',(stringObj) => getNotification(stringObj))
    useEffect(() => {
        async function fetchApi() {
            let videos: any[] = await fetchVideos()
            setMovies(videos)
        }
        fetchApi()
    }, [])

    async function getNotification(stringObj:string){
        let data=JSON.parse(stringObj)
        toast.success(`The user ${data.username} has shared a video.`)
        let videos: any[]=await fetchVideos()
        setMovies(videos)
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles
                styles={{ul: {margin: 0, padding: 0, listStyle: "none"}}}
            />
            <CssBaseline/>
            {/* Hero unit */}
            <Container
                disableGutters
                maxWidth="lg"
                component="main"
                sx={{pt: 8, pb: 6}}
            >
                <Box sx={{flexGrow: 1}}>
                    <Grid container rowSpacing={5}>

                        {
                            movies.map((movie: any) => (
                                <Grid item xs={12} key={movie.id}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <iframe
                                                title={"Video"}
                                                width={"100%"}
                                                height={300}
                                                src={`https://www.youtube.com/embed/${movie.id}`}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Stack>
                                                <h1 style={{marginTop: 0}}>{movie.title}</h1>
                                                <b>Shared by: {movie.sharedBy}</b>
                                                <p><b>Description:</b> <ReadMore>{movie.description}</ReadMore></p>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </Container>
            {/* End footer */}
        </ThemeProvider>
    );
}
