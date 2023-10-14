const { Server } = require("socket.io");
const auth = require("./middlewares/auth");
const massageHandler = require("./controllers/messages");
const socketMW = require("./middlewares/socketMW");
const { error } = require("console");
const io = new Server(8080, { cors: { origin: "*" } });
const clients = {};

// namespace
const users = io.of("/users");
const admin = io.of("/admin");
users.on("connection", (socket) => {
});
admin.on("connection", (socket) => {
});
io.use(auth);
// connection,disconnect is default , socket is who make the connection
io.on("connection", (socket) => {
  socket.use(socketMW);
  const user_id = socket.handshake.headers.user_id;
  clients[user_id] = { socket_id: socket.id, user_id };

  massageHandler(socket, io);
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });
  socket.on("disconnect", () => {
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
  });
});
