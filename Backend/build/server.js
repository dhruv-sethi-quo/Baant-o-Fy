"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import modules
const http_1 = require("http");
const mongodb_1 = require("mongodb");
function createUser(data) {
    //connect to database
    mongodb_1.MongoClient.connect(mongoEndPoint, (err, db) => {
        if (err)
            throw err;
        //fetch collection
        const collection = db.db("baant-o-fy");
        //insert record
        collection.collection("users").insertOne(data, (err) => {
            if (err)
                throw err;
            console.log("Document inserted.");
        });
        db.close();
    });
}
//define port
const port = 8090;
// database url
const mongoEndPoint = "mongodb://127.0.0.1:27017/";
//create server
const server = http_1.createServer((request, response) => {
    let body = '';
    console.log(request.url);
    console.log(request.method);
    if ((request.url === '/signup') && (request.method === "POST")) {
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            body = JSON.parse(body);
            createUser(body);
        });
    }
    response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    response.end(JSON.stringify('Record added successfully'));
});
//listen for incoming requests
server.listen(port);
