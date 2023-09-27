const { Server } = require("socket.io");

const io = new Server(8080, { cors: { origin: "*" } });
const clients = {};
// connection is default , socket is who make the connection
io.on("connection", (socket) => {
  //   console.log(socket.id);
  //   console.log(socket.handshake.headers);
  const user_id = socket.handshake.headers.user_id;
  clients[user_id] = { socket_id: socket.id, user_id };
  console.log(clients);
  socket.on("disconnect", () => {
    // console.log(socket.id);
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });
});
