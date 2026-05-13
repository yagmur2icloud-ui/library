import express from "express"
import {env} from "./config"
import { mongoConnect } from "./db/mongodb";
import cors from "cors"
import router from "./routes";
import { requestLogger } from "./middlewares/logger_middleware";

const app =express();
console.log("sunucu başlıyor...")

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger)

// DB connect 
mongoConnect();


//route
app.use("/api",router)
app.use("/uploads",express.static("uploads"))

app.listen(env.port,()=>{
    console.log(`sunucu çalışıyor portu:  http://localhost:${env.port} `)
})