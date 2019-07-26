//import modules
import {MongoClient} from 'mongodb';

// database url
const url = "mongodb://127.0.0.1:27017/";

function addUser(collection: any, data: any){
    collection.collection("users").insertOne(data, (err: any)=>{
        if(err) throw err;
        console.log("Document inserted.");
    });
}

//connection to database
MongoClient.connect(url, (err,db) =>{
    if(err) throw err;

    //fetch collection
    const collection = db.db("sample");
    
    //sample data
    var data = {
        name:"Dhruv",
        age:23
    };

    //add user to collection
    addUser(collection,data);

    db.close();
});