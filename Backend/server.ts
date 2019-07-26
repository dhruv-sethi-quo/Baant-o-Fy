//import modules
import { createServer, IncomingMessage, ServerResponse } from "http";
import { MongoClient } from 'mongodb';


function createUser(data: any, callback: any) {
    //connect to database
    MongoClient.connect(mongoEndPoint, (err, db) => {
        if (err) callback("Error connecting to database", null);

        //fetch collection
        const collection = db.db("baant-o-fy");

        //check if email exists
        collection.collection("users").findOne({ "email": data.email }, (err, result) => {
            if (err) callback(err, null);

            if (result) {
                console.log("Email exists");
                callback("Email exists already!", null);
            }
            else {
                //insert record
                console.log("Inserting document..");
                collection.collection("users").insertOne(data, (err: any) => {
                console.log("Document inserted.");
                callback(null, data);
                });
            }
        });

        db.close();
    });
}

//define port
const port = 8090;

// database url
const mongoEndPoint = "mongodb://127.0.0.1:27017/";

//create server
const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    let body = '';
    console.log(request.url);
    console.log(request.method);
    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        body = JSON.parse(body);

        if ((request.url === '/signup') && (request.method === "POST")) {
            createUser(body, (err: any, success: any) => {

                if (err) {
                    response.writeHead(409, { 'Access-Control-Allow-Origin': '*' });
                    response.end(JSON.stringify(err));
                    return;
                }

                response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                response.end(JSON.stringify('Record added successfully'));
            });
        }

    });
});

//listen for incoming requests
server.listen(port);
