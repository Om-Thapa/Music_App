import { Server } from "socket.io";

export const initializeSocket = (server) => {
    const io = new Server( server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });
}