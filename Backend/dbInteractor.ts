import { MongoClient } from 'mongodb';

class dbInteractor{

    createUser(mongoEndPoint: string,data: any) {
        
        MongoClient.connect(mongoEndPoint,(error, database)=>{
            if(error)
                return "Error connecting to database.";
            
            //fetch collection
            const collection = database.db("baant-o-fy");

            //check if email exists
            collection.collection("users").findOne({ "email": data.email }, (error, result) =>{
                if(error)
                    return "Error executing query.";

                if(result)
                    return "Email exists already!";

                else {
                    //insert record
                    console.log("Inserting document..");
                    collection.collection("users").insertOne(data, (err: any) => {
                    console.log("Document inserted.");
                    return null;
                    });
                }
            });
            database.close();
        });
    }

    modifyUser(mongoEndPoint: string, email: string, newData: any){

        MongoClient.connect(mongoEndPoint,(error, database)=>{
            if(error)
                return "Error connecting to database.";
            
            //fetch collection
            const collection = database.db("baant-o-fy");

            //finds user with data and replaces with newData
            collection.collection("users").update({ "email": email }, { $set: newData });

            database.close();
            return null;
        });

    }

    fetchUser(mongoEndPoint: string, email: string){

        MongoClient.connect(mongoEndPoint,(error, database)=>{
            if(error)
                return "Error connecting to datbasee.";
            
            //fetch collection
            const collection = database.db("baant-o-fy");

            //fetch user based on email provided
            let user = collection.collection("users").find({
                "email":email
            });
            database.close();
            return user;
        })
    }

}
