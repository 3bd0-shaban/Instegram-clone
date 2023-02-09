let onlineUsers = []
const addUser = (userid, socketId) =>
    !onlineUsers.some(user => user.userid === userid) && onlineUsers.push({ userid, socketId });

const removeUser = socketId => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};
const findConnectedUser = userid =>
    onlineUsers.find(user => user.userid === userid);

const SocketServer = (socket) => {
    socket.on('join', (userid) => {
        addUser(userid, socket.id);
        socket.emit("getusers", onlineUsers);

    });


    const handler = (sender, receiver, { type, reactionType, post }) => {
        const receiverSocket = findConnectedUser(receiver.username);
        if (receiverSocket && sender.id != receiver.id) {
            io.to(receiverSocket.socketId).emit('notificationReceived', {
                sender,
                receiverUsername: receiver.username,
                type,
                reactionType,
                post,
            });
        }
    };


    //#region //!Messages

    socket.on("Message", ({ sender, receiver }) => {
        const user = onlineUsers.find((user) => user.userid === receiver);
        user &&
            // socket.to(user.socketId, sender)
            socket.emit("MessagetoClient", { sender, receiver });
    });



    socket.on('like', ({ sender, receiver, reactionType, post }) => {
        handler(sender, receiver, { type: 'react', reactionType, post });
    });

    socket.on('comment', ({ sender, receiver, post }) => {
        handler(sender, receiver, { type: 'comment', post });
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log('reft')
    });
}

export default SocketServer