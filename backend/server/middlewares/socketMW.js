const socketMW = (socket, next) => {
  if (socket[0] !== "message") {
    next(new Error("socket MW ERROR"));
  } else {
    next();
  }
};

module.exports = socketMW;
