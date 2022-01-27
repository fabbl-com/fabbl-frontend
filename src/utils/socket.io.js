export const getChatList = (socket, eventEmitter, userId) => {
  console.log(userId);
  socket.emit("chat-list", userId);
  socket.on("chat-list-response", (data) => {
    eventEmitter.emit("chat-list-response", data);
  });
};

export const sendMessage = (socket, message) => {
  socket.emit("send-message", message);
};

export const receiveMessage = (socket, eventEmitter) => {
  socket.on("send-message-response", (data) => {
    console.log(data);
    eventEmitter.emit("send-message-response", data);
  });
};

export const exitChat = (socket, eventEmitter, userId) => {
  socket.emit("exit-chat", userId);
  socket.on("exit-chat-response", (data) => {
    eventEmitter.emit("exit-chat-response", data);
  });
};
