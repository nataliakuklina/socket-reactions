const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

const reactions = new Set([
  'like',
  'dislike',
  'heart',
  'smile',
  'sad',
]);

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('reaction', (data) => {
    socket.broadcast.emit('reaction', data);
  });
});

http.listen(3000, () => {
  console.log('Started to listen for connections');
});
