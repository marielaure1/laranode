import http from "http";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => router(request, response));

server.listen(PORT, () => {
    console.log(`Server running on Port ` + PORT);
})