import http from 'http';

console.log('Project started.');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});
