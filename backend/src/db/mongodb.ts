import mongoose from "mongoose";
import { env } from "../config";


export const mongoConnect=async ()=>{
    try{
         if (!env.mongo_uri) {
      throw new Error("MONGO_URI tanımlı değil!");
    }

    await mongoose.connect(env.mongo_uri);

    console.log("MongoDB bağlantısı başarılı");
    }catch (err) {
        console.error(`mongo connect error`);
        process.exit(1)
    }
}