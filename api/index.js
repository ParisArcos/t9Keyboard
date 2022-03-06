import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());

const whitelist = [process.env.CLIENT_URL];
const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors Error"));
    }
  },
};

app.use(cors(corsConfig));

app.listen(4000, () => {
  console.log("Listen on PORT:4000");
});
