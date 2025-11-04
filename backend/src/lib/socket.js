import { Server } from "socket.io";

export const initializeSocket = (server) => {
    const io = new Server( server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    const userSockets = new Map();// { userId: socketId }
    const userActivities = new Map();// { userId: activity }

    io.on("connection", (socket) => {
        socket.on('user_connected', (userId) => {
            userSockets.set(userId, socket.id);
            userActivities.set(userId, "Idle");

            // broadcast to all the connected sockets that this user has just logged in
            io.emit("user_connected", userId);

            socket.emit("user_online", Array.from(userActivities.keys()));
            io.emit("activities", Array.from(userActivities.entries()));
        })

        socket.on("update_activity", ({ userId, activity }) => {
            userActivities.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        });

        socket.on('disconnected', () => {
            let disconnectedUserId;
            for( const [ userId, socketId ] of userSockets.entries()){
                //find the disconnected user
                if( socketId === socket.id ){
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }

            if(disconnectedUserId){
                io.emit("user_disconnected", disconnectedUserId);
            }
        })
    })
}