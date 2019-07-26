//import modules
import { createServer, IncomingMessage, ServerResponse } from "http";
import {MongoClient} from 'mongodb';


function createUser(data: any){
    //connect to database
    MongoClient.connect(mongoEndPoint, (err,db) =>{
        if(err) throw err;
    
        //fetch collection
        const collection = db.db("baant-o-fy");

        //insert record
        collection.collection("users").insertOne(data, (err: any)=>{
            if(err) throw err;
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
const server = createServer((request: IncomingMessage, response: ServerResponse) =>{

    let body = '';
    console.log(request.url);
    console.log(request.method);
    if((request.url ==='/signup')&&(request.method==="POST")){

        request.on('data', (chunk) => {
            body+=chunk;
        });
    
        request.on('end', ()=> {
            body = JSON.parse(body);
            createUser(body);
        });
    }

    response.writeHead(200,{'Access-Control-Allow-Origin': '*'});

    response.end(JSON.stringify('Record added successfully'));
});

//listen for incoming requests
server.listen(port);
