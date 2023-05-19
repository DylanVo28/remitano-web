import {io} from "socket.io-client";

export const socket = io('wss://remitano-service-production.up.railway.app/notifications')