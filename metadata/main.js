const http = require("http");
const port = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.end(
    JSON.stringify({
      name: "Tanya",
      description: "A mindful creature. Just woke up like this.",
      image: "https://i.imgur.com/t1fye4S.jpg",
    })
  );
});

server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
