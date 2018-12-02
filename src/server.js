import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import PrayerTimes from "./PrayerTimes";

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(
  bodyParser.json({
    limit: "1024kb"
  })
);

PrayerTimes(app);

app.server.listen(process.env.PORT || 3000);
console.log(`PrayerTimes::: ${app.server.address().port}`);
