export function getYoutubeVideoId(url:string) {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);

    if (match && match[1]) {
        return match[1];
    }
    return null;
}