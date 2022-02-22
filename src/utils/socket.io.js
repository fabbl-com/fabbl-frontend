import { GET_CHAT_LIST_USERS_REQUEST } from "../redux/constants/messageActionTypes";

export const getChatList = (socket, eventEmitter, userId, dispatch) => {
  dispatch({ type: GET_CHAT_LIST_USERS_REQUEST });
  console.log(userId);
  socket.emit("chat-list", userId);
  socket.on("chat-list-response", (data) => {
    eventEmitter.emit("chat-list-response", data);
  });
};

export const sendMessage = (socket, message) => {
  socket.emit("send-message", message);
};

export const exitChat = (socket, eventEmitter, userId) => {
  socket.emit("exit-chat", userId);
  socket.on("exit-chat-response", (data) => {
    eventEmitter.emit("exit-chat-response", data);
  });
};

export const getRandomUsers = (socket, data) => {
  socket.emit("get-random-users", {
    userId: data.userId,
    page: data.page,
    limit: data.limit,
    choices: data.choices
  });
};

export const like = (socket, data) => {
  socket.emit("like", data);
};

export const view = (socket, data) => {
  socket.emit("view", data);
};

export const makeMessageSeen = (socket, data, eventEmitter) => {
  socket.emit("read", data);
  socket.on("read-response", (data) => {
    eventEmitter.emit("read-response", data);
  });
};

export const getLikes = (socket, eventEmitter) => {
  socket.on("like-response", (data) => {
    eventEmitter.emit("like-response", data);
  });
};
