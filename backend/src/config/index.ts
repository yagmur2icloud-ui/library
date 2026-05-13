import dotenv from "dotenv"

dotenv.config()

export const env={
    port:process.env.PORT || "3001",
    mongo_uri:process.env.MONGO_URI,
    jwt_secret:process.env.JWT_SECRET  || "a1"
}