import publicClient from "../client/public.client";
import store from "../../store";
import {setAccessToken, setUsername} from "../../store/auth/authSlice";
import {AxiosResponse} from "axios";
import privateClient from "../client/private.client";
import {getYoutubeVideoId} from "../../utils/utils";

const authEndpoints = {
    signin: "auth/login",
    signup: "users/signup",
    videos: "videos"
};

export type LoginParams = {
    username: string;
    password: string;
};

export type RegisterParams = {
    username: string;
    password: string;
};

export type AuthDTO = {
    username: string;
    accessToken: string;
};

export type ResponseAuthMockup = {
    username: string;
    access_token: string
}
export const login = async (loginParams: LoginParams) => {
    const {
        data: {username, access_token},
    } = await publicClient.post<AuthDTO, AxiosResponse<ResponseAuthMockup>, LoginParams>(
        authEndpoints.signin,
        loginParams
    );
    store.dispatch(setUsername(username));
    store.dispatch(setAccessToken(access_token));
};

export const register = async (registerParams: RegisterParams) => {
    const {
        data: {username, accessToken},
    } = await publicClient.post<AuthDTO, AxiosResponse<AuthDTO>, RegisterParams>(
        authEndpoints.signup,
        registerParams
    );

    store.dispatch(setUsername(username));
    store.dispatch(setAccessToken(accessToken));
};

export const shareUrl = async (url: string) => {
    let request = {
        url: url
    }
    const {data} = await privateClient.post(authEndpoints.videos, request)
    return data
}

export const fetchVideos = async () => {
    let {data} = await publicClient.get(authEndpoints.videos)
    const promises = data.map(async (item: any) => {
        let response: any = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getYoutubeVideoId(item.url)}&key=AIzaSyC8rmh8TeQEIZR9N6J0E1xFjwi-_nL4TW4`)
        let dataFetch = await response.json()
        return {
            id: getYoutubeVideoId(item.url),
            title: dataFetch.items[0].snippet.title,
            description: dataFetch.items[0].snippet.description,
            sharedBy: item.username
        }
    })
    const videos = await Promise.all(promises)

    return videos
}

