import mongoose from "mongoose";
import admin from "../models/adminModel";
import bcrypt from "bcryptjs";

let URI:string;

if(process.env.NODE_ENV=="development"){
    URI = process.env.MONGO_URI!
}
else{
    URI = process.env.MONGO_ATLAS_URI!
}

export async function connectToDatabse (){
    try {
        await mongoose.connect(URI);

        mongoose.connection.on("connected",()=>{
            console.log("Connected to database")
        })

        mongoose.connection.on("error",()=>{
            console.log("Error connecting to databse");
        })

        await defaultAdminCreation();
    } catch (error) {
        console.log(error);
    }
}


async function defaultAdminCreation(){
    const existingAdmin = await admin.findOne({email:process.env.ADMIN_EMAIL})
    const password = process.env.ADMIN_PASS;
    // console.log(password)

    const hashedPassword = await bcrypt.hash(password!,10);

    if(!existingAdmin){
        const defaultAdmin = new admin({
            email:process.env.ADMIN_EMAIL,
            password:hashedPassword,
        })
        await defaultAdmin.save();
    }

}