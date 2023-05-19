import {Box, Button, Container, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {shareUrl} from "../services/modules/auth.api";
import {socket} from "../socket";

export default function ShareURL() {
    const [url, setUrl] = useState("")
    const handleShare = async () => {
        const data = await shareUrl(url)
        socket.emit('create_video', JSON.stringify(data))
    }
    return (
        <Container >
            <Box sx={{height: '100vh', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Stack spacing={3}>
                    <TextField label="Youtube URL" variant="outlined" onChange={(e) => setUrl(e.target.value)}/>
                    <Button variant="contained" onClick={() => handleShare()}>Share</Button>
                </Stack>
            </Box>
        </Container>
    )
}